import express from 'express';
import axios from 'axios';
import { auth } from '../../middleware/auth';
import { User } from '../../models/User';
import { Profile } from '../../models/Profile';
import { checkObjectId } from '../../middleware/checkObjectId';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// @route POST /api/profile
// @desc   create/update user profile
// @access Private
router.post(
  '/',
  body('status', 'Status is required').notEmpty(),
  body('skills', 'Skills is required').notEmpty(),
  auth,
  async (req: any, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // get user id from req.user

    // get profile from req.body
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      facebook,
      linkedin,
      ...rest
    } = req.body;

    // create and update profile
    const profileField = {
      user: req.user.id,
      website,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill: string) => skill.trim()),
      ...rest,
    };

    const socialFields = { youtube, twitter, instagram, facebook, linkedin };
    profileField.social = socialFields;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: profileField,
        },
        {
          new: true,
          upsert: true,
        }
      );

      // return profile
      res.json(profile);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);
// @route GET /api/profile
// @desc   get all user profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route DELETE /api/profile
// @desc   delete authenticated user's profile
// @access Private
router.delete('/', auth, async (req: any, res) => {
  try {
    // get authenticed users id then find and delete profile, delete user

    await Promise.all([
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ]);
    res.json({ msg: 'user deleted' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route POST /api/profile/user/:id
// @desc   get user profile by user id
// @access Private
router.get('/me', auth, async (req: any, res) => {
  // find profile by authenticated user id
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'no profile found' });
    }

    // return profile
    res.json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route GET /api/profile/user/:id
// @desc   get user profile by user id
// @access Public
router.get('/user/:id', checkObjectId('id'), async (req, res) => {
  // check id is a valid object id

  // find profile by user id
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'no profile found' });
    }

    // return profile
    res.json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route PUT /api/profile/experience
// @desc   Add profile experience
// @access Private

router.put(
  '/experience',
  body('title', 'Title is required').notEmpty(),
  body('company', 'Company is required').notEmpty(),
  body('from', 'from date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }: any) =>
      req.body.to ? value < req.bodt.to : true
    ),
  auth,
  async (req: any, res) => {
    const errors = validationResult(req);
    return res.status(400).json({ errors: errors.array() });
    // get experience from body
    const experience = req.body;

    try {
      // get profile of authenticated user req.user.id
      const newProfile = await Profile.findOne({ user: req.user.id });
      newProfile.experience.unshift(experience);
      const profile = await newProfile.save();
      // add experience to profile and return profile
      res.json(profile);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route DELETE /api/profile/experience/:exp_id
// @desc   Delete profile experience by exp_id
// @access Private

router.delete('/experience/:exp_id', auth, async (req: any, res) => {
  try {
    // check if experience is in the profile experience and delete one.
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.experience = foundProfile.experience.filter(
      (exp: any) => exp._id.toString() !== req.params.exp_id.toString()
    );
    const profile = await foundProfile.save();
    res.json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route PUT /api/profile/education
// @desc   Add profile education
// @access Private

router.put(
  '/education',
  auth,
  body('school', 'School is required').notEmpty(),
  body('degree', 'Degree is required').notEmpty(),
  body('fieldofstudy', 'Field of Study is required').notEmpty(),
  body('from', 'from date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }: any) =>
      req.body.to ? value < req.bodt.to : true
    ),
  async (req: any, res) => {
    const errors = validationResult(req);
    return res.status(400).json({ errors: errors.array() });
    // get education from body
    const education = req.body;

    try {
      // get profile of authenticated user req.user.id
      console.log(req.body);
      const newProfile = await Profile.findOne({ user: req.user.id });
      newProfile.education.unshift(education);
      const profile = await newProfile.save();
      // add education to profile and return profile
      res.json(profile);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route DELETE /api/profile/education/:edu_id
// @desc   Delete profile education by exp_id
// @access Private

router.delete('/education/:edu_id', auth, async (req: any, res) => {
  try {
    // check if education is in the profile education and delete one.
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu: any) => edu._id.toString() !== req.params.edu_id.toString()
    );
    const profile = await foundProfile.save();
    res.json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route GET /api/profile/github/:username
// @desc   GET user repos from github
// @access Public

router.get('/github/:username', async (req, res) => {
  try {
    const uri = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`;
    const resp = await axios.get(uri);
    return res.json(resp.data);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

export default router;
