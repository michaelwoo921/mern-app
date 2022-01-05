import express from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../../middleware/auth';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// @route GET /api/auth
// @desc   Get user by token
// @access Private

router.get('/', auth, async (req: any, res) => {
  try {
    // get user using req.user.id
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err: any) {
    console.error(err.message);

    res.status(500).send('server error');
  }
});

// @route POST api/auth
// @desc login and return token
// @access Private

router.post(
  '/',
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'password must be at least four characters').isLength({
    min: 4,
  }),
  async (req: any, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // get email, password from req.body
    const { email, password } = req.body;

    try {
      // comapre password with password from db
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'wrong credential' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'wrong credential' });
      }
      // return token
      jwt.sign(
        { user: { id: user._id } },
        process.env.jwtKey as string,
        (err: any, token: any) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

export default router;
