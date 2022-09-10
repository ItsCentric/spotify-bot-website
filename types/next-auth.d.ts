import NextAuth, { DefaultSession } from "next-auth";
import * as mongodb from 'mongodb';

declare module "next-auth" {
    interface Session {
        user: {
            id?: mongodb.ObjectId,
        } & DefaultSession['user'],
    }
}