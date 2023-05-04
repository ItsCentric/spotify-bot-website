import { NextApiRequest, NextApiResponse } from 'next';
import Account from '../../../models/Account';
import connection from '../../../lib/mongooseConnect';
import User from '../../../models/User';
import { getCacheItem, setCacheItem } from '../../../lib/redisClient';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connection();
  const session = await getServerSession(req, res, authOptions);
  const userId = session.user.id;
  if (!session) return res.status(401).json({ error: 'Unauthorized' });
  if (!(await User.exists({ _id: userId })))
    return res.status(400).json({ error: 'User not found' });

  switch (req.method) {
    case 'GET':
      return handleGet(res, userId);
    case 'DELETE':
      return handleDelete(res, req, userId);
    default:
      return res.status(400).json({ error: 'Invalid request' });
  }
}

async function handleGet(res: NextApiResponse, userId: ObjectId) {
  const cachedAccounts = await getCacheItem('accounts', userId);
  if (cachedAccounts) {
    const cachedAccountsJson = cachedAccounts.accounts;
    return res.status(200).json({ accounts: cachedAccountsJson });
  } else {
    const accounts = await Account.find({ userId: userId }).lean();
    const accountsObject = { accounts };
    await setCacheItem('accounts', accountsObject, userId);
    if (accounts.length === 0) return res.status(400).json({ error: 'No accounts found' });

    return res.status(200).json({ accounts: accountsObject.accounts });
  }
}

async function handleDelete(res: NextApiResponse, req: NextApiRequest, userId: ObjectId) {
  const account = await Account.findOne({ providerAccountId: req.query.providerAccountId });

  if (JSON.stringify(account) === '{}') return res.status(400).json({ error: 'No accounts found' });
  if (!account.userId.equals(userId)) return res.status(401).json({ error: 'Unauthorized' });
  await Account.deleteOne({ providerAccountId: req.query.providerAccountId });
  return res.status(200).json({ message: 'Account deleted' });
}
