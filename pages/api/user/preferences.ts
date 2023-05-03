import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../lib/mongooseConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';
import { getCacheItem, setCacheItem } from '../../../lib/redisClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connection();
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const user = await User.findById(session.user.id);
  const userJson = user.toJSON();
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }
  const userPreferences = await getCacheItem('preferences', session.user.id.toString());
  if (req.method === 'GET') {
    if (userPreferences) return res.status(200).json({ preferences: userPreferences });
    return res.status(200).json({ preferences: user.preferences });
  } else if (req.method === 'POST') {
    if (
      Object.keys(req.body).toString() !==
      Object.keys(userJson.preferences)
        .filter((key) => key != '_id')
        .toString()
    ) {
      return res.status(400).json({ error: 'Invalid preferences' });
    }

    await setCacheItem('preferences', req.body, session.user.id.toString());
    user.preferences = req.body;
    user.save();
    return res.status(200).json({ success: 'Preferences updated' });
  } else {
    return res.status(400).json({ error: 'Invalid request' });
  }
}
