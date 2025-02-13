import { NextResponse } from "next/server";
import { apiService } from "@/apiService";
import { MobileTracking } from "@/dbConnection/Schema/mobileTracking";
import { headers } from "next/headers";
import { z } from "zod";
import { connectDb } from "@/dbConnection/connect";
import { rateLimit } from "@/lib/rateLimiter";

const RATE_LIMIT = 100;
const WINDOW_SEC = 3600;

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const url = new URL(request.url);
        const rawMobile = url.searchParams.get("mobile") || `0000000000`;
        const mobileSchema = z
            .string()
            .trim()
            .regex(/^\d{10}$/, "Invalid mobile number. It must be exactly 10 digits.");

        const result = mobileSchema.safeParse(rawMobile);
        const mobile = result.success ? result.data : "0000000000";

        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for");

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
