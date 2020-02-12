const mongoose = require('mongoose');

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

  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Post', postSchema);
