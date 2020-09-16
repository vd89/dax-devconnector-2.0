/** @format */


const { compareSync } = require('bcryptjs');
const { createJwt } = require('../helper/jwToken');
const User = require('../models/userModel');

module.exports = {
  getUserData: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select('-password -createdAt -updatedAt ');
      return res.status(200).json({ data: { msg: 'Success', user } });
    } catch (error) {
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: [{ msg: 'Invalid Credentials' }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = await createJwt(payload);
      user.password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;

      return res.status(200).json({ data: { msg: 'Success', user, token } });
    } catch (error) {
      next(error);
    }
  },
};
