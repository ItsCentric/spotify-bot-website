import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../lib/mongooseConnect';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Account from '../../../models/Account';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import { deleteCacheItem } from '../../../lib/redisClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connection();
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const user = session.user;

  if (req.method === 'DELETE') {
    await handleDELETE(user);
    return res.status(200).json({ message: 'User deleted' });
  }
  return res.status(400).json({ error: 'Invalid request' });
}

async function handleDELETE(user: Session['user']) {
  const userIdString = user.id.toString();
  const adapter = MongoDBAdapter(clientPromise);
  await adapter.deleteUser(userIdString);
  await Account.deleteMany({ userId: user.id });
  await deleteCacheItem('userInfo', userIdString);
  await deleteCacheItem('accounts', userIdString);
  await deleteCacheItem('preferences', userIdString);
  await deleteCacheItem('topItems', userIdString);
}
