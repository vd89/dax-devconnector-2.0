/** @format */

const { Router } = require('express');
const {
  createPost,
  getAllPost,
  getPostByID,
  deletePostByID,
  likePost,
  unlikePost,
  addComment,
  removeComment,
} = require('../../controller/postController');
const { validate, postInputRules, paramsValidating, commentRules } = require('../../helper/inputValidators');
const auth = require('../../middleware/authMiddleware');

const postRoute = new Router();

/*  @route  POST api/posts
    @desc   Create a post
    @access Private
 */
postRoute.post('/', auth, postInputRules(), validate, createPost);

/*  @route  GET api/posts
    @desc   Get all Post
    @access Private
 */
postRoute.get('/', auth, getAllPost);

/*  @route  GET api/posts/:id
    @desc   Get  Post by id
    @access Private
 */
postRoute.get('/:id', auth, paramsValidating(), validate, getPostByID);

/*  @route  DELETE api/posts/:id
    @desc   Delete  Post by id
    @access Private
 */
postRoute.delete('/:id', auth, paramsValidating(), validate, deletePostByID);

/*  @route  PUT api/posts/like/:id
    @desc   Like a Post
    @access Private
 */
postRoute.put('/like/:id', auth, paramsValidating(), validate, likePost);

/*  @route  PUT api/posts/unlike/:id
    @desc   Unlink a Post
    @access Private
 */
postRoute.put('/unlike/:id', auth, paramsValidating(), validate,unlikePost );

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
postRoute.post('/comment/:id', auth, commentRules(), validate, addComment)

// @route    Delete api/posts/comment/:id/:commentID
// @desc     Remove Comment
// @access   Private
postRoute.delete('/comment/:id/:commentID', auth, commentRules(), validate, removeComment)

module.exports = postRoute;
