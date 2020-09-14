/** @format */

const { Router } = require('express');

const postRoute = new Router();

// Test Route
postRoute.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'The profile route' });
});

module.exports = postRoute;
