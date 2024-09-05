import { ObjectId } from 'mongodb';
import { Redis } from '@upstash/redis';
import { TopItems } from '../types/types';
import { Preferences } from '../models/User';
import Account from '../models/Account';

type CacheItem = 'userInfo' | 'topItems' | 'preferences' | 'accounts';
type Accounts = { accounts: ReturnType<Awaited<typeof Account.find>> };
type UserInfo = { spotify: SpotifyApi.CurrentUsersProfileResponse };
type CacheData<T> = T extends 'userInfo'
  ? UserInfo
  : T extends 'topItems'
    ? TopItems
    : T extends 'preferences'
      ? Preferences
      : T extends 'accounts'
        ? Accounts
        : never;

const client = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export async function setCacheItem(
  cacheItem: CacheItem,
  data: Record<string, unknown>,
  userId: ObjectId,
) {
  await client.hset(`${cacheItem}:${userId.toString()}`, data);
}

export async function getCacheItem<T extends CacheItem>(
  cacheItem: T,
  userId: ObjectId,
): Promise<CacheData<T>> {
  const item = (await client.hgetall(`${cacheItem}:${userId.toString()}`)) as CacheData<
    typeof cacheItem
  >;
  return item;
}

export async function deleteCacheItem(cacheItem: CacheItem, userId: ObjectId) {
  await client.del(`${cacheItem}:${userId.toString()}`);
}
