import { NextApiRequest, NextApiResponse } from 'next';
import Account from '../../../models/Account';
import connection from '../../../lib/mongooseConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connection();
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const userId = session.user.id;
  const user = await User.findById(userId);

  if (req.method !== 'GET' && req.method !== 'DELETE')
    return res.status(400).json({ error: 'Invalid request' });

  if (req.method === 'GET') {
    if (!user) return res.status(400).json({ error: 'User not found' });

    const accounts = await Account.find({ userId: userId });
    if (accounts.length === 0) return res.status(400).json({ error: 'No accounts found' });

    return res.status(200).json({ accounts: accounts });
  } else if (req.method === 'DELETE') {
    const account = await Account.findOne({ providerAccountId: req.query.providerAccountId });

    if (JSON.stringify(account) === '{}')
      return res.status(400).json({ error: 'No accounts found' });
    if (!account.userId.equals(userId)) return res.status(401).json({ error: 'Unauthorized' });
    await Account.deleteOne({ providerAccountId: req.query.providerAccountId });
    return res.status(200).json({ message: 'Account deleted' });
  } else {
    return res.status(400).json({ error: 'Invalid request' });
  }
}
