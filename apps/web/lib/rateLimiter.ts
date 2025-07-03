import { Redis } from "ioredis";

let redis: Redis | null = null;

function getRedis(): Redis {
    if (!redis) {
        redis = new Redis(process.env.REDIS_URL as string);
    }
    return redis;
}

/**
 * Rate limiting using a sliding window based on Redis sorted sets.
 * @param key Unique key to identify the client (e.g., IP address)
 * @param limit Max number of requests allowed within the time window
 * @param windowSec Time window in seconds
 * @returns `true` if allowed, `false` if rate limit exceeded
 */
export async function rateLimit(key: string, limit: number, windowSec: number): Promise<boolean> {
    const redis = getRedis();

    const now = Date.now();
    const windowStart = Math.floor(now / 1000) - windowSec;

    try {
        await redis.zremrangebyscore(key, 0, windowStart);
        const requestCount = await redis.zcard(key);

        if (requestCount >= limit) return false;

        await redis.zadd(key, now, now.toString());
        await redis.expire(key, windowSec);

        return true;
    } catch (error) {
        console.error("Rate limiting error:", error);
        return true; // Fail open
    }
}
