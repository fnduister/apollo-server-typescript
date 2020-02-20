import mongoose, { Document } from 'mongoose';
// eslint-disable-next-line no-unused-vars
import { UserDbObject } from '../generated/graphql';

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

export interface IUser extends UserDbObject, Document {}

export default mongoose.model('UserModel', userSchema);
