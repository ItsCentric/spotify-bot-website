import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../lib/mongooseConnect';
import User from '../../../models/User';
import { getCacheItem, setCacheItem } from '../../../lib/redisClient';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import areFieldsEqual from '../../../lib/areFieldsEqual';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connection();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  if (!(await User.exists({ _id: session.user.id }))) {
    return res.status(400).json({ error: 'User not found' });
  }

  switch (req.method) {
    case 'GET':
      return await handleGet(res, session.user.id);
    case 'POST':
      return await handlePost(res, req, session.user.id);
    default:
      return res.status(400).json({ error: 'Invalid request' });
  }

  async function handleGet(res: NextApiResponse, userId: ObjectId) {
    const userPreferences = await getCacheItem('preferences', userId);
    if (userPreferences) return res.status(200).json({ preferences: userPreferences });

    const user = await User.findById(userId);
    return res.status(200).json({ preferences: user.preferences });
  }

  async function handlePost(res: NextApiResponse, req: NextApiRequest, userId: ObjectId) {
    const user = await User.findById(userId);
    const userJson = user.toJSON();

    if (!areFieldsEqual(req.body, userJson.preferences, ['_id'])) {
      return res.status(400).json({ error: 'Invalid preferences' });
    }

    await setCacheItem('preferences', req.body, session.user.id);
    user.preferences = req.body;
    user.save();
    return res.status(200).json({ success: 'Preferences updated' });
  }
}
