/** @format */

const { Router } = require('express');

const userRoute = new Router();

userRoute.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'The user route' });
});

module.exports = userRoute;
