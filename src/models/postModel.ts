import mongoose, { Document } from 'mongoose';

import { Post } from '../generated/graphql';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  },

  publishedAt: {
    type: Date,
    required: true
  },

  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export interface PostDb extends Omit<Post, 'id'>, Document {};
export default mongoose.model<PostDb>('Post', postSchema);
