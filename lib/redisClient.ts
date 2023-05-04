import { ObjectId } from 'mongodb';
import { createClient } from 'redis';

type CacheItem = 'userInfo' | 'topItems' | 'preferences' | 'accounts';
const client = createClient({ url: process.env.REDIS_URL });

client.on('ready', () => {
  console.log('Redis client ready');
});

client.on('error', (err) => {
  console.log('Redis error: ' + err);
});

async function connect() {
  if (!client.isOpen) {
    await client.connect();
  }
}

export async function setCacheItem(cacheItem: CacheItem, data: object, userId: ObjectId) {
  await connect();
  await client.set(`${cacheItem}:${userId.toString()}`, JSON.stringify(data));
}

export async function getCacheItem(cacheItem: CacheItem, userId: ObjectId) {
  await connect();
  const item = await client.get(`${cacheItem}:${userId.toString()}`);

  return JSON.parse(item);
}

export async function deleteCacheItem(cacheItem: CacheItem, userId: ObjectId) {
  await connect();
  await client.del(`${cacheItem}:${userId.toString()}`);
}
