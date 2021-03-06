import mongoose, { Document } from 'mongoose';
import { User } from '../generated/graphql';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  lastSeen: {
    type: Date,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

export type UserOmitId = Omit<User, 'id'>;
export interface UserDb extends UserOmitId, Document{
};
export default mongoose.model<UserDb>('User', userSchema);
