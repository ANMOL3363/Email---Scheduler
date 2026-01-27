
import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

export const checkHourlyLimit = async (
  userEmail: string
) => {
  const maxPerHour = Number(process.env.MAX_EMAILS_PER_HOUR);

  const now = new Date();

  const hourKey = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}`;

  const redisKey = `email_rate:${userEmail}:${hourKey}`;

  const count = await redis.incr(redisKey);

  if (count === 1) {
    // expire after 1 hour
    await redis.expire(redisKey, 60 * 60);
  }

  return {
    allowed: count <= maxPerHour,
    count,
    maxPerHour,
    resetAt: now.setMinutes(60, 0, 0),
  };
};
