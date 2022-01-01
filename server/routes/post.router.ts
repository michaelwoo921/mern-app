import express from 'express';

const router = express.Router();

// @route GET /api/post
// @desc   Test post route
// @access Public
router.get('/', (req, res) => {
  res.status(200).send('post routes');
});

export default router;
