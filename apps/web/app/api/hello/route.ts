import { NextResponse } from "next/server";
import { apiService } from "@repo/core-services"
import { MobileTracking } from "@/dbConnection/Schema/mobileTracking";
import { headers } from "next/headers";
import { z } from "zod";
import { connectDb } from "@/dbConnection/connect";
import { rateLimit } from "@/lib/rateLimiter";

const RATE_LIMIT = 6; // 6 requests
const WINDOW_SEC = 5; // 5 seconds

export async function GET(request: Request): Promise<NextResponse> {
    try {
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

        const headersList = await headers();
        const ip =
            headersList.get("cf-connecting-ip") || // Cloudflare-specific header
            headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || // First IP in the list
            "unknown";

        if (ip === "unknown") {
            return NextResponse.json(
                { success: false, message: "Unable to determine IP address." },
                { status: 400 }
            );
        }

        const rateLimitKey = `rate_limit:${ip}`;
        const allowed = await rateLimit(rateLimitKey, RATE_LIMIT, WINDOW_SEC);

        if (!allowed) {
            return NextResponse.json(
                { success: false, message: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        await connectDb();
        let record = await MobileTracking.findOne({ mobileNumber: mobile });

        if (!record) {
            record = new MobileTracking({
                mobileNumber: mobile,
                entries: [{ ip, timestamp: new Date() }],
            });
        } else {
            record.entries.push({ ip, timestamp: new Date() });
        }

        await record.save();
        const excludedNumbers = process.env.EXCLUDED_NUMBERS?.split(",") || [];

        if (excludedNumbers.includes(mobile)) {
            return NextResponse.json({
                success: false,
                message: "SMS sending is not allowed for this number.",
            });
        }
        await apiService.send(mobile);

        console.log(`Request from IP: ${ip}, Mobile: ${mobile} Record: ${record.entries.length}`);

        return NextResponse.json({
            success: true,
            message: "SMS sent successfully.",
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
