import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

const globalForRedis = global as unknown as {
  redisClient: ReturnType<typeof createClient>;
};

export const redisClient =
  globalForRedis.redisClient ||
  createClient({
    url: redisUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redisClient = redisClient;
}

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export const getRedisClient = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
};

export const publishEvent = async (channel: string, message: any) => {
  const client = await getRedisClient();
  await client.publish(channel, JSON.stringify(message));
};
