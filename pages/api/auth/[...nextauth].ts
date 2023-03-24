import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import axios from 'axios';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import encryption from '../../../lib/encryption';
import { ObjectId } from 'mongodb';
import type { Db, Collection, Document } from 'mongodb';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshAccessToken(token) {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.SPOTIFY_ID + ':' + process.env.SPOTIFY_SECRET
          ).toString('base64')}`,
        },
      }
    );

    const refreshedTokens = await response.data;

    if (!response.status) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      error: null,
    };
  } catch (error) {
    console.log(error.response.data, error.message, error.response.status, error.response.headers);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: {
        params: {
          scope:
            'user-read-recently-played user-read-playback-state user-read-email user-top-read user-read-currently-playing user-library-read user-read-private user-modify-playback-state',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      // Initial sign in
      if (account && user) {
        let db: Db;
        let collection: Collection<Document>;

        await clientPromise.then((client) => (db = client.db('test')));
        collection = db.collection('accounts');
        await collection.updateOne(
          { userId: new ObjectId(user.id) },
          {
            $set: {
              access_token: encryption(account.access_token),
              refresh_token: encryption(account.refresh_token),
              expires_at: Date.now() + 3600,
            },
          }
        );
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + 3600,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token, user }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    },
  },
};

export default NextAuth(authOptions);
