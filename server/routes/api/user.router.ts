import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import { User } from '../../models/User';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// @route POST /api/users
// @desc   Register user, returns token
// @access Public

router.post(
  '/',
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // get email and password from body
    const { name, email, password } = req.body;
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: '404' });
    // save email and password to database if email not found from db
    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        email,
        password,
        name,
        avatar,
      });
      // hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jsobwebtoken
      const payload = { user: { id: user._id } };

      jwt.sign(
        payload,
        process.env.jwtKey as string,
        {
          expiresIn: 3600000,
        },
        (err, token) => {
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
