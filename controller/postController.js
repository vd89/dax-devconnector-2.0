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
      if (!post) return res.status(400).json({ data: { msg: 'Fail', result: 'Post Not Found' } });
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

  likePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ data: { msg: 'Fail', result: 'Post Not Found' } });
      // Check if the post has already been liked
      if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ data: { msg: 'Fail', result: 'Post already liked' } });
      }
      post.likes.unshift({ user: req.user.id });
      await post.save();
      return res.status(200).json({ data: { msg: 'Success', result: post.likes } });
    } catch (error) {
      next(error);
    }
  },

  unlikePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ data: { msg: 'Fail', result: 'Post Not Found' } });
      // Check if the post has already been liked
      if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ data: { msg: 'Fail', result: 'Post has not yet been liked' } });
      }
      // Remove the like
      post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);
      await post.save();
      return res.status(200).json({ data: { msg: 'Success', result: post.likes } });
    } catch (error) {
      next(error);
    }
  },

  addComment: async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ data: { msg: 'Fail', result: 'Post Not Found' } });

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);
    await post.save();
    return res.status(200).json({ data: { msg: 'Success', result: post.comments } });
  },

  removeComment: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ data: { msg: 'Fail', result: 'Post Not Found' } });

      const comment = post.comments.find((comment) => comment.id === req.params.commentID);
      if (!comment) return res.status(404).json({ data: { msg: 'Fail', result: 'Comment does not exist' } });
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ data: { msg: 'Fail', result: 'User not Authorized' } });
      }
      post.comments = post.comments.filter(({ id }) => id !== req.params.commentID);
      await post.save();
      return res.status(200).json({ data: { msg: 'Success', result: post.comments } });
    } catch (error) {
      next(error);
    }
  },
};
