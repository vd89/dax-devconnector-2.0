/** @format */

const { body, validationResult } = require('express-validator');

module.exports = {
  registerRules: () => {
    return [
      body('name', 'Name is required').not().isEmpty(),
      body('email', 'Email valid email address').isEmail(),
      body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ];
  },
  loginRules: () => {
    return [body('email', 'Email valid email address').isEmail(), body('password', 'Password is required').exists()];
  },
  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => {
      extractedErrors.push({ [err.location]: err.location, [err.param]: err.msg });
    });

    return res.status(400).json({ errors: extractedErrors });
  },
};