import { Schema, Types, model, Model, models } from 'mongoose';
import { EncryptedContent } from '../types/types';

export interface IAccount {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: EncryptedContent;
  token_type: string;
  expires_at: number;
  refresh_token: EncryptedContent;
  scope: string;
  userId: {
    type: Types.ObjectId;
    ref: string;
    required: Boolean;
  };
}

interface IAccountMethods {
  updateTokens(
    accessToken: EncryptedContent,
    refreshToken: EncryptedContent
  ): { _id: Types.ObjectId; accessToken: EncryptedContent; refreshToken: EncryptedContent };
}

type AccountModel = Model<IAccount, {}, IAccountMethods>;

const accountSchema = new Schema<IAccount, AccountModel, IAccountMethods>(
  {
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
    },
    scope: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { collection: 'accounts' }
);
accountSchema.method('updateTokens', async function (accessToken, refreshToken) {
  this.access_token = accessToken;
  this.refresh_token = refreshToken;
  this.expires_at = Date.now() + 3600;
});

const Account =
  (models.Account as Model<IAccount, AccountModel, IAccountMethods>) ??
  model<IAccount, AccountModel>('Account', accountSchema);

export default Account;
