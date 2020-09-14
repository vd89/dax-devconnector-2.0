/** @format */

const { Router } = require('express');

const authRoute = new Router();

// Test Route
authRoute.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'The auth route' });
});

module.exports = authRoute;
