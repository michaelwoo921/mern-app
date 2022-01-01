import express from 'express';

const router = express.Router();

// @route GET /api/user
// @desc   Test user route
// @access Public
router.get('/', (req: any, res) => {
  console.log(req.user);
  console.log(req.headers);
  console.log(req.body);
  res.status(200).send('user routes');
});

export default router;
