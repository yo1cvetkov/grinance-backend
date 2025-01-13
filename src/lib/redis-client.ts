import { createClient } from 'redis';
import env from 'src/config/env.config';

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (err) => {
  console.log('Redis client error', err);
});

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      console.log('Connecting to Redis...');
      await redisClient.connect();
      console.log('Connected to Redis');
    }
  } catch (error) {
    console.log((error as Error).message);
    process.exit(1);
  }
};
