import { Schema, Model, Types } from 'mongoose';

const userSchema = new Schema({
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

export default Model('User', userSchema);
