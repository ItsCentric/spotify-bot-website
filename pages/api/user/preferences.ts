import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../lib/mongooseConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connection();
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const user = await User.findOne({ _id: session.user.id });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }
  if (req.method === 'GET') {
    return res.status(200).json({ preferences: user.preferences });
  } else if (req.method === 'POST') {
    if (Object.keys(req.body) !== Object.keys(user.preferences)) {
      return res.status(400).json({ error: 'Invalid preferences' });
    }
    user.preferences = req.body;
    user.save();
    return res.status(200).json({ success: 'Preferences updated' });
  } else {
    return res.status(400).json({ error: 'Invalid request' });
  }
}
