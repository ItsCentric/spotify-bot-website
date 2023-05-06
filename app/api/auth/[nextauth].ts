import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import axios from 'axios';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import encryption from '../../../lib/encryption';
import Account from '../../../models/Account';
import connection from '../../../lib/mongooseConnect';
import User from '../../../models/User';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  accessTokenExpires: number;
  expires_in: number;
  refresh_token: string;
};
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

    const tokenResponse: AccessTokenResponse = await response.data;

    if (!response.status) {
      throw tokenResponse;
    }

    return {
      ...token,
      accessToken: tokenResponse.access_token,
      accessTokenExpires: Date.now() + tokenResponse.expires_in,
      refreshToken: tokenResponse.refresh_token ?? token.refreshToken, // Fall back to old refresh token
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
      clientId: process.env.SPOTIFY_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
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
      await connection();
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      // Initial sign in
      if (account && user) {
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
  events: {
    async createUser(message) {
      const userObject = message.user;
      await connection();
      const user = await User.findById(userObject.id);
      if (!user) return;
      user.preferences = {
        general: {
          locale: {
            language: 'en',
            country: 'US',
          },
        },
        spotify: {
          privacy: {
            privateProfile: false,
            privateTopTracks: false,
            privateTopArtists: false,
            privateNowPlaying: false,
            whitelist: [],
            blacklist: [],
          },
          defaults: {
            timeRange: {
              topTracks: 'medium_term',
              topArtists: 'medium_term',
            },
          },
        },
      };
      user.save();
    },
    async signIn(message) {
      if (message.isNewUser) {
        await connection();
        const account = await Account.findOne({ userId: message.user.id });
        const user = await User.findById(message.user.id);
        if (!user || !account) return;
        user.accounts.push(account._id);
        user.save();
      }
    },
  },
};

export default NextAuth(authOptions);
