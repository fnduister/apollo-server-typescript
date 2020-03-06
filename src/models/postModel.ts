import mongoose, { Document } from 'mongoose';

import { Post } from '../generated/graphql';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: { unique: true }
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

export type PostOmitId = Omit<Post, 'id'>;
export interface PostDb extends PostOmitId, Document {};
export default mongoose.model<PostDb>('Post', postSchema);
