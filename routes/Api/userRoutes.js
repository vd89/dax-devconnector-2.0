/** @format */

const { Router } = require('express');
const { registerUser } = require('../../controller/userController');
const { registerRules, validate } = require('../../helper/inputValidators');

const userRoute = new Router();


/* @ route POST api/users
   @ Register User
   @ access Public
 */
userRoute.post('/', registerRules(),validate,registerUser);

module.exports = userRoute;
