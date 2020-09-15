/** @format */

const { Router } = require('express');
const {
  getMeProfile,
  createOrUpdateProfile,
  getAllProfile,
  getSingleProfile,
  deleteProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  githubUsername,
} = require('../../controller/profileController');
const {
  profileInputRules,
  validate,
  experienceInputRules,
  educationInputRules,
} = require('../../helper/inputValidators');
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

/*  @route  DELETE api/profile
    @desc   Delete profile, user & post
    @access Private
 */
profileRoute.delete('/', auth, deleteProfile);

/*  @route  PUT api/profile/experience
    @desc   Add profile experience
    @access Private
 */
profileRoute.put('/experience', auth, experienceInputRules(), validate, addExperience);

/*  @route  PUT api/profile/education
    @desc   Add profile education
    @access Private
 */
profileRoute.put('/education', auth, educationInputRules(), validate, addEducation);

/*  @route  DELETE api/profile/experience/:expId
    @desc   Delete profile experience
    @access Private
 */
profileRoute.delete('/experience/:expId', auth, deleteExperience);

/*  @route  DELETE api/profile/education/:eduId
    @desc   Delete profile education
    @access Private
 */
profileRoute.delete('/education/:eduId', auth, deleteEducation);

/*  @route  GET api/profile/github/:username
    @desc   Get User repos from Github
    @access Public
 */
profileRoute.get('/github/:username', githubUsername);



module.exports = profileRoute;
