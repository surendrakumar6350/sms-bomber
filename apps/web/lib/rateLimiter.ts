import { Redis } from "ioredis";

declare global {
    var _redis: Redis | undefined;
}

// Use global cache if available, otherwise create new Redis instance
const redis = global._redis || new Redis(process.env.REDIS_URL as string);

// Cache the Redis instance globally (for reuse)
if (!global._redis) {
    global._redis = redis;
}

/**
 * Rate limiting using a sliding window based on Redis sorted sets.
 * @param key Unique key to identify the client (e.g., IP)
 * @param limit Max number of requests allowed within the time window
 * @param windowSec Time window in seconds
 * @returns `true` if allowed, `false` if rate limit exceeded
 */
export async function rateLimit(key: string, limit: number, windowSec: number): Promise<boolean> {
    const now = Date.now();
    const windowStart = Math.floor(now / 1000) - windowSec;

    try {
        // Remove entries older than the current window
        await redis.zremrangebyscore(key, 0, windowStart);

        // Count remaining requests in the window
        const requestCount = await redis.zcard(key);

        if (requestCount >= limit) {
            return false; // Rate limit exceeded
        }

        // Add current request timestamp
        await redis.zadd(key, now, now.toString());

        // Set key to expire after the window duration
        await redis.expire(key, windowSec);

        return true;
    } catch (error) {
        console.error("Rate limiting error:", error);
        // Allow request in case Redis fails (fail open)
        return true;
    }
}
