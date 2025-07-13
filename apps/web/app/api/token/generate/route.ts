import { NextRequest, NextResponse } from "next/server";
import { validateTurnstileToken } from "next-turnstile";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    // Step 1: Validate Turnstile token
    const validationResponse = await validateTurnstileToken({
        token,
        secretKey: process.env.TURNSTILE_SECRET_KEY!,
        idempotencyKey: uuidv4(),
    });

    if (!validationResponse.success) {
        return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    // Step 2: Create JWT (valid for 10 minutes)
    const jwtToken = jwt.sign(
        { verified: true },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "10m" }
    );

    // Step 3: Set token in HTTP-only cookie
    const response = NextResponse.json({ message: "Verification Successfull" });
    response.cookies.set("bot_token", jwtToken, {
        maxAge: 600, // 10 minutes in seconds
        sameSite: "strict",
        path: "/",
    });

    return response;
}
