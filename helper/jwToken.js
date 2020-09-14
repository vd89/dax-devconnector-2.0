/** @format */

const { sign, verify } = require('jsonwebtoken');
const config = require('config');

module.exports = {
  createJwt: async (payload) => {
    return await sign(payload, config.get('jwtSecret'), { expiresIn: '10h' });
  },
  decodeToken: async (token) => {
    return await verify(token, config.get('jwtSecret'));
  },
};
