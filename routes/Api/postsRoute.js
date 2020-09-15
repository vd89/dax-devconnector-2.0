/** @format */

const { Router } = require('express');
const { createPost, getAllPost, getPostByID, deletePostByID } = require('../../controller/postController');
const { validate, postInputRules, paramsValidating } = require('../../helper/inputValidators');
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



module.exports = postRoute;
