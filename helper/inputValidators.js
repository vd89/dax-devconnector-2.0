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
  profileInputRules: () => {
    return [body('status', 'Status is required').not().isEmpty(), body('skills', 'Skills is required').not().isEmpty()];
  },
  experienceInputRules: () => {
    return [
      body('title', 'Title is required').not().isEmpty(),
      body('company', 'Company is required').not().isEmpty(),
      body('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ];
  },
  educationInputRules: () => {
    return [
      body('school', 'School is required').not().isEmpty(),
      body('degree', 'Degree is required').not().isEmpty(),
      body('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      body('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ];
  },
  postInputRules: () => {
    return [body('text', 'Text is required').not().isEmpty()];
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
