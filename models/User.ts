import { Model, Schema, Types, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  accounts: Types.ObjectId[];
  preferences: {
    privacy: {
      publicProfile: boolean;
      publicTopTracks: boolean;
      publicTopArtists: boolean;
      publicNowPlaying: boolean;
      whitelist: Types.ObjectId[];
      blacklist: Types.ObjectId[];
    };
    defaults: {
      timeRange: {
        topTracks: 'short_term' | 'medium_term' | 'long_term';
        topArtists: 'short_term' | 'medium_term' | 'long_term';
      };
    };
    language: string;
  };
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
      privacy: {
        publicProfile: Boolean,
        publicTopTracks: Boolean,
        publicTopArtists: Boolean,
        publicNowPlaying: Boolean,
        whitelist: {
          type: [Types.ObjectId],
          ref: 'User',
        },
        blacklist: {
          type: [Types.ObjectId],
          ref: 'User',
        },
      },
      defaults: {
        timeRange: {
          topTracks: {
            type: String,
            enum: ['short_term', 'medium_term', 'long_term'],
          },
          topArtists: {
            type: String,
            enum: ['short_term', 'medium_term', 'long_term'],
          },
        },
      },
      language: {
        type: String,
        required: true,
      },
    },
  },
});

const User = (models.User as Model<IUser>) ?? model<IUser>('User', userSchema);

export default User;
