import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../lib/mongooseConnect';
import { Session, getServerSession } from 'next-auth';
import Account from '../../../models/Account';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import { deleteCacheItem } from '../../../lib/redisClient';
import User from '../../../models/User';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connection();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });
  if (!(await User.exists({ _id: session.user.id })))
    return res.status(400).json({ error: 'User not found' });

  const user = session.user;

  if (req.method === 'DELETE') {
    await handleDELETE(user);
    return res.status(200).json({ message: 'User deleted' });
  }
  return res.status(400).json({ error: 'Invalid request' });
}

async function handleDELETE(user: Session['user']) {
  const adapter = MongoDBAdapter(clientPromise);
  await adapter.deleteUser(user.id.toString());
  await Account.deleteMany({ userId: user.id });
  await deleteCacheItem('userInfo', user.id);
  await deleteCacheItem('accounts', user.id);
  await deleteCacheItem('preferences', user.id);
  await deleteCacheItem('topItems', user.id);
}
