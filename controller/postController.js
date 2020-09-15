/** @format */

const Post = require('../models/postModel');
const User = require('../models/userModel');

module.exports = {
  createPost: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      return res.status(200).json({ data: { msg: 'Success', post } });
    } catch (error) {
      next(error);
    }
  },

  getAllPost: async (req, res, next) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.status(200).json({ data: { msg: 'Success', posts } });
    } catch (error) {
      next(error);
    }
  },
};
