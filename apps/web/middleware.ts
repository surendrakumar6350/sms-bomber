import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { method, url, headers } = request;

    const ip =
        headers.get("cf-connecting-ip") || // Cloudflare
        headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // Vercel / proxies
        "unknown";

    const istTime = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(new Date());

    console.log(`[${istTime}] ${method} ${url} — IP: ${ip}`);

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
