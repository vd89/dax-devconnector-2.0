/** @format */

const { Router } = require('express');
const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    return res.status(200).json({ name: 'API', status: 'IT_Works', message: 'Yes, server is running ' });
  } catch (error) {
    next(error);
  }
});

router.use('/users', require('./Api/userRoutes'));
router.use('/posts', require('./Api/postsRoute'));
router.use('/auth', require('./Api/authRoute'));
router.use('/profile', require('./Api/profileRoute'));

module.exports = router;
