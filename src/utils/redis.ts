// filepath: /Users/Shared/CODING-SHARED/Ride Sharing App/Rider-App-Development/services/driver-service/src/utils/redis.ts
import Redis from 'ioredis';

let redis: RedisType | null = null;

/**
 * Initializes the Redis client if it hasn't been initialized yet.
 *
 * @returns {RedisType} - The Redis client instance.
 */
const initializeRedis = (): RedisType => {
  if (!redis) {
    redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD || undefined,
      db: parseInt(process.env.REDIS_DB || '0', 10),
    });
    console.log('Redis client initialized');
  }
  return redis;
};

// Utility function to set a value in Redis
export const setValue = async (key: string, value: string) => {
  try {
    const client = initializeRedis();
    await client.set(key, value);
    console.log(`Set key ${key} with value ${value}`);
  } catch (error) {
    console.error('Error setting value in Redis:', error);
    throw error;
  }
};

// Utility function to get a value from Redis
export const getValue = async (key: string) => {
  try {
    const client = initializeRedis();
    const value = await client.get(key);
    console.log(`Got value ${value} for key ${key}`);
    return value;
  } catch (error) {
    console.error('Error getting value from Redis:', error);
    throw error;
  }
};

// Utility function to delete a key from Redis
export const deleteKey = async (key: string) => {
  try {
    const client = initializeRedis();
    await client.del(key);
    console.log(`Deleted key ${key}`);
  } catch (error) {
    console.error('Error deleting key from Redis:', error);
    throw error;
  }
};
