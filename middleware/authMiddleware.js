/** @format */

const { verify } = require('jsonwebtoken');
const config = require('config');

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
