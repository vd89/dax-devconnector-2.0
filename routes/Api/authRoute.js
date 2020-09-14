/** @format */

const { Router } = require('express');
const { getUserData } = require('../../controller/authController');
const authMiddleware = require('../../middleware/authMiddleware');

const authRoute = new Router();

/* @route GET api/auth
   @desc  auth user Data 
   @access Private
 */
authRoute.get('/', authMiddleware, getUserData);

module.exports = authRoute;
