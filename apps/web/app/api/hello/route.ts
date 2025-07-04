import { NextResponse } from "next/server";
import { MobileTracking } from "@/dbConnection/Schema/mobileTracking";
import { headers } from "next/headers";
import { z } from "zod";
import { connectDb } from "@/dbConnection/connect";
import { rateLimit } from "@/lib/rateLimiter";
import axios from "axios";

const RATE_LIMIT = 6; // 6 requests
const WINDOW_SEC = 5; // 5 seconds

export async function GET(request: Request): Promise<NextResponse> {
    try {
        // Check if worker configuration is set
        if (!process.env.WORKER_URI || !process.env.WORKER_SECRET) {
            return NextResponse.json({
                success: false,
                message: "Worker configuration missing."
            }, { status: 500 });
        }

        // Extract and validate the `mobile` query parameter
        const url = new URL(request.url);
        const rawMobile = url.searchParams.get("mobile");
        const mobileSchema = z
            .string()
            .trim()
            .regex(/^\d{10}$/, "Invalid mobile number. It must be exactly 10 digits.");

        const result = mobileSchema.safeParse(rawMobile);
        if (!result.success) {
            return NextResponse.json(
                { success: false, message: result.error },
                { status: 400 }
            );
        }
        const mobile = result.data;


        // Extract IP address from request headers (Cloudflare-aware)
        const headersList = await headers();
        const ip =
            headersList.get("cf-connecting-ip") || // Used if behind Cloudflare
            headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || // Fallback
            "unknown";

        if (ip === "unknown") {
            return NextResponse.json(
                { success: false, message: "Unable to determine IP address." },
                { status: 400 }
            );
        }


        // Check if the mobile number is in the excluded list
        const excludedNumbers = process.env.EXCLUDED_NUMBERS?.split(",") || [];
        if (excludedNumbers.includes(mobile)) {
            return NextResponse.json({
                success: false,
                message: "SMS sending is not allowed for this number.",
            });
        }


        // Apply rate limiting based on IP
        const rateLimitKey = `rate_limit:${ip}`;
        const allowed = await rateLimit(rateLimitKey, RATE_LIMIT, WINDOW_SEC);

        if (!allowed) {
            return NextResponse.json(
                { success: false, message: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        // Connect to the database and log the request
        await connectDb();
        let record = await MobileTracking.findOne({ mobileNumber: mobile });

        const now = new Date();
        const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000); // 5 hours ago

        if (record) {
            // Count how many entries are within the last 5 hour
            const recentEntries = record.entries.filter((entry: any) => {
                return entry.timestamp > fiveHoursAgo;
            });

            if (recentEntries.length >= 100) {
                return NextResponse.json({
                    success: false,
                    message: "Too many requests from this mobile number.",
                }, { status: 429 });
            }

            // Add new entry
            record.entries.push({ ip, timestamp: now });
        } else {
            // Create new record
            record = new MobileTracking({
                mobileNumber: mobile,
                entries: [{ ip, timestamp: now }],
            });
        }
        await record.save();


        // Uncomment the following line if you want to send the mobile number to an external API
        // await apiService.send(mobile);

        // Send SMS via external background worker (offloaded for speed)
        try {
            await axios(`https://${process.env.WORKER_URI}/?mobile=${mobile}&secret=${process.env.WORKER_SECRET}`);
        } catch (e: any) {
            console.error("Worker call failed:", e.message || e);
            return NextResponse.json({
                success: false,
                message: "Failed to send SMS via worker.",
                error: e.message || "Unknown error"
            }, { status: 500 });
        }

        console.log(`Request from IP: ${ip}, Mobile: ${mobile} Record: ${record.entries.length}`);

        return NextResponse.json({
            success: true,
            message: "SMS sent successfully."
        });
    } catch (error) {
        console.error("Error in GET API:", error);

        return NextResponse.json(
            {
                success: false,
                error: "An error occurred while processing the request.",
                message: "An error occurred while processing the request."
            },
            { status: 500 }
        );
    }
}
