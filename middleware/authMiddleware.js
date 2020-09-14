/** @format */

const config = require('config');
const { decodeToken } = require('../helper/jwToken');

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ data: { msg: 'No token, authorization denied' } });
  }
  // Verify token
  try {
    const decoded = await decodeToken(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
};
