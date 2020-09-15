/** @format */

const { Router } = require('express');
const { createPost, getAllPost } = require('../../controller/postController');
const { validate, postInputRules } = require('../../helper/inputValidators');
const auth = require('../../middleware/authMiddleware');

const postRoute = new Router();

/*  @route  POST api/posts
    @desc   Create a post
    @access Private
 */
postRoute.post('/', auth, postInputRules(), validate, createPost);

/*  @route  GET api/posts
    @desc   CGet all Post
    @access Private
 */
postRoute.get('/',auth , getAllPost);

module.exports = postRoute;
