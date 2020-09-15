/** @format */

const { Router } = require('express');
const {
  getMeProfile,
  createOrUpdateProfile,
  getAllProfile,
  getSingleProfile,
} = require('../../controller/profileController');
const { profileInputRules, validate } = require('../../helper/inputValidators');
const auth = require('../../middleware/authMiddleware');

const profileRoute = new Router();

/*  @route  GET api/profile/me
    @desc   Get User Profile
    @access Private
 */
profileRoute.get('/me', auth, getMeProfile);

/*  @route  POST api/profile/
    @desc   create or update User Profile 
    @access Private
 */
profileRoute.post('/', auth, profileInputRules(), validate, createOrUpdateProfile);

/*  @route  GET api/profile/
    @desc   Get User Profile
    @access Public
 */
profileRoute.get('/', getAllProfile);

/*  @route  GET api/profile/user/:userID
    @desc   Get User Profile
    @access Public
 */
profileRoute.get('/user/:userID', getSingleProfile);

module.exports = profileRoute;
