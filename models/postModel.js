/** @format */

const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    text: { type: String, required: true },
    name: { type: String },
    avatar: { type: String },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        text: { type: String, required: true },
        name: { type: String },
        avatar: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

class Post {}

postSchema.loadClass(Post);

module.exports = model('post', postSchema);
