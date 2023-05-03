import NextAuth, { Account, DefaultSession } from 'next-auth';
import * as mongodb from 'mongodb';
import { Preferences } from '../models/User';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: mongodb.ObjectId;
    } & DefaultSession['user'];
    accessToken: string;
    accessTokenExpires: number;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: Session.user;
    accessToken: string;
    accessTokenExpires: number;
    error: string;
  }
}
