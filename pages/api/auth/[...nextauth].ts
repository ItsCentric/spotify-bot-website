import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import axios from 'axios';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import encryption from '../../../lib/encryption';
import { connect, connection } from 'mongoose';
import Account from '../../../models/Account';

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
      connect(process.env.MONGODB_URI);
      if (account) {
        token.accessToken = account.access_token;
      }
      // Initial sign in
      if (account && user) {
        const accountToUpdate = await Account.findOne({
          providerAccountId: account.providerAccountId,
        });
        accountToUpdate.updateTokens(
          encryption(account.access_token),
          encryption(account.refresh_token)
        );
        accountToUpdate.save();
        connection.close();

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
