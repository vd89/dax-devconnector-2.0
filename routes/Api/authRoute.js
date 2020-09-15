/** @format */

const { Router } = require('express');
const { getUserData, loginUser } = require('../../controller/authController');
const { loginRules, validate } = require('../../helper/inputValidators');
const auth = require('../../middleware/authMiddleware');

const authRoute = new Router();

/* @route GET api/auth
   @desc  auth user Data 
   @access Private
 */
authRoute.get('/', auth, getUserData);

/* @route POST api/auth
   @desc  auth user Get user
   @access Public
 */
authRoute.post('/', loginRules(),validate, loginUser);

module.exports = authRoute;
