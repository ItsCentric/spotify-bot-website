import { countries, languagesAll } from 'countries-list';
import { Model, Schema, Types, model, models } from 'mongoose';

export type Preferences = {
  general: {
    locale: {
      language: string;
      country: string;
    };
  };
  spotify: {
    privacy: {
      privateProfile: boolean;
      privateTopTracks: boolean;
      privateTopArtists: boolean;
      privateNowPlaying: boolean;
      whitelist: Types.ObjectId[];
      blacklist: Types.ObjectId[];
    };
    defaults: {
      timeRange: {
        topTracks: 'short_term' | 'medium_term' | 'long_term';
        topArtists: 'short_term' | 'medium_term' | 'long_term';
      };
    };
  };
};

export interface IUser {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  accounts: Types.ObjectId[];
  preferences: Preferences;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerified: Boolean,
  image: String,
  accounts: [
    {
      type: Types.ObjectId,
      ref: 'Account',
    },
  ],
  preferences: {
    type: {
      general: {
        locale: {
          language: {
            type: String,
            enum: Object.keys(languagesAll),
            required: true,
          },
          country: {
            type: String,
            enum: Object.keys(countries),
            required: true,
          },
        },
      },
      spotify: {
        privacy: {
          privateProfile: {
            type: Boolean,
            required: true,
          },
          privateTopTracks: {
            type: Boolean,
            required: true,
          },
          privateTopArtists: {
            type: Boolean,
            required: true,
          },
          privateNowPlaying: {
            type: Boolean,
            required: true,
          },
          whitelist: {
            type: [Types.ObjectId],
            ref: 'User',
            required: true,
          },
          blacklist: {
            type: [Types.ObjectId],
            ref: 'User',
            required: true,
          },
        },
        defaults: {
          timeRange: {
            topTracks: {
              type: String,
              enum: ['short_term', 'medium_term', 'long_term'],
              required: true,
            },
            topArtists: {
              type: String,
              enum: ['short_term', 'medium_term', 'long_term'],
              required: true,
            },
          },
        },
      },
    },
  },
});

const User = (models.User as Model<IUser>) ?? model<IUser>('User', userSchema);

export default User;
