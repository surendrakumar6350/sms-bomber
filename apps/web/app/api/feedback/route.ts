import { NextResponse } from "next/server";
import { connectDb } from "@/dbConnection/connect";
import { CategoryFeedback } from "@/dbConnection/Schema/categoryFeedback";
import { z } from "zod";

const feedbackSchema = z.object({
    category: z.string().min(1, "Category is required"),
    message: z.string().min(1, "Message is required"),
    rating: z.number().min(1).max(5),
});

export async function POST(request: Request): Promise<NextResponse> {
    try {
        // Parse JSON body
        const body = await request.json();

        // Validate using zod
        const parsed = feedbackSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: parsed.error.format(),
                },
                { status: 400 }
            );
        }

        const { category, message, rating } = parsed.data;

        // Connect to database
        await connectDb();

        // Store feedback
        const feedback = new CategoryFeedback({
            category,
            message,
            rating,
        });

        await feedback.save();

        return NextResponse.json({
            success: true,
            message: "Feedback submitted successfully",
        });
    } catch (error) {
        console.error("Feedback API error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while submitting feedback",
                error,
            },
            { status: 500 }
        );
    }
}
