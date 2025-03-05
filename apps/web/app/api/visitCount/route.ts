import { NextResponse } from "next/server";
import { connectDb } from "@/dbConnection/connect";
import { VisitCount } from "@/dbConnection/Schema/visitCount";


export async function POST(): Promise<NextResponse> {
    try {
        await connectDb();
        const todayDate = new Date().toISOString().split('T')[0];
        let visit = await VisitCount.findOne();

        if (visit) {
            if (visit.lastUpdatedDate === todayDate) {
                visit.total += 1;
                visit.today += 1;
            } else {
                visit.total += 1;
                visit.today = 1;
                visit.lastUpdatedDate = todayDate;
            }
        } else {
            visit = new VisitCount({
                total: 1,
                today: 1,
                lastUpdatedDate: todayDate,
            });
        }

        await visit.save();
        return NextResponse.json({
            success: true,
            total: visit.total,
            today: visit.today,
            message: "Visit count updated successfully",
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
