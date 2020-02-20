import mongoose from 'mongoose';

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
      ref: 'UserModel'
    }
  ],

  author: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel'
  }
});

export default mongoose.model('PostModel', postSchema);
