import { Schema, Model, Types } from 'mongoose';

const accountSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  providerAccountId: String,
  access_token: {
    iv: Buffer,
    encryptedData: String,
    authTag: Buffer,
    required: true,
  },
  token_type: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Number,
    required: true,
  },
  refresh_token: {
    iv: Buffer,
    encryptedData: String,
    authTag: Buffer,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default Model('Account', accountSchema);
