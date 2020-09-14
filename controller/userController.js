/** @format */
const gravatar = require('gravatar');
const { createJwt } = require('../helper/jwToken');
const User = require('../models/userModel');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      /* Todo 
          -> check user Exists 
          -> get user Gravatar 
          -> encrypt password it is coming from the model as will save  
          -> return user JsonWebtoken 
         */

      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ data: { error: [{ msg: 'User Already Exists' }] } });
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = await User.create({ name, email, avatar });
      await user.setPassword(password);

      const payload = {
        user: { id: user.id },
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
