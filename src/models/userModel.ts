import mongoose, { Document } from 'mongoose';
import { User } from '../generated/graphql';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
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
    required: true
  },

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PostModel'
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserModel'
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserModel'
    }
  ]
});

export interface UserDb extends Omit<User, 'id'>, Document{
};
export default mongoose.model<UserDb>('UserModel', userSchema);
