import { NextResponse } from "next/server";
import { apiService } from "@/apiService";
import { MobileTracking } from "@/dbConnection/Schema/mobileTracking";
import { headers } from "next/headers";

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const url = new URL(request.url);
        const mobile = url.searchParams.get("mobile") || `0000000000`;

        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for");

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
