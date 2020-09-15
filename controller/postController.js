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

  getPostByID: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return status(400).json({ data: { msg: 'Fail', result: 'Post Not Found' } });
      return res.status(200).json({ data: { msg: 'Success', post } });
    } catch (error) {
      next(error);
    }
  },

  deletePostByID: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ data: { msg: 'Fail', result: 'Post Not Found' } });
      // Check if user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ data: { msg: 'Fail', result: 'User not authorized' } });
      }
      await post.remove();
      return res.status(200).json({ data: { msg: 'Success', result: 'Post deleted' } });
    } catch (error) {
      next(error);
    }
  },
};
