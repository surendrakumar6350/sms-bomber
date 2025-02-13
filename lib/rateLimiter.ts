import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL as string);

export async function rateLimit(key: string, limit: number, windowSec: number) {
    const now = Date.now();
    const windowStart = Math.floor(now / 1000) - windowSec;

    await redis.zremrangebyscore(key, 0, windowStart);
    const requestCount = await redis.zcard(key);

    if (requestCount >= limit) {
        return false;
    }
    await redis.zadd(key, now, now.toString());
    await redis.expire(key, windowSec);

    return true;
}
