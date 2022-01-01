import express from 'express';

const router = express.Router();

// @route GET /api/profile
// @desc   Test profile route
// @access Public
router.get('/', (req, res) => {
  res.status(200).send('profile routes');
});

export default router;
