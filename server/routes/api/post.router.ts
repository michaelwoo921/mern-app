import express from 'express';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { auth } from '../../middleware/auth';
import { checkObjectId } from '../../middleware/checkObjectId';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// @route POST /api/posts
// @desc   create a post
// @access Private
router.post(
  '/',
  body('text', 'Text is required').notEmpty(),
  auth,
  async (req: any, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    // get post from req.body
    // get user id from req.user then get User
    try {
      const user = await User.findById(req.user.id);
      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('server error');
    }

    //create post and return post
  }
);

// @route GET /api/posts
// @desc   get all posts
// @access Private

router.get('/', auth, async (req: any, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route GET /api/posts/:id
// @desc   get a post by post id
// @access Private

router.get('/:id', auth, checkObjectId('id'), async (req: any, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    res.json(post);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route DELETE /api/posts/:id
// @desc   delete user's post by post id
// @access Private

router.delete('/:id', auth, checkObjectId('id'), async (req: any, res) => {
  try {
    // get Post by params.id
    const post = await Post.findById(req.params.id);
    // check user id matches post user id then delete a post
    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    if (post.user != req.user.id) {
      return res.status(401).json({ msg: 'not authorized' });
    }

    await Post.deleteOne({ _id: req.params.id });
    res.json({ msg: 'post deleted' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route PUT /api/posts/:id/like
// @desc   like a post
// @access Private
router.put('/:id/like', auth, checkObjectId('id'), async (req: any, res) => {
  try {
    // get post with params.id
    const post = await Post.findById(req.params.id);

    // add user id to likes array
    const liked = post.likes.some(
      (like: any) => like.user.toString() === req.user.id.toString()
    );
    if (liked) {
      return res.status(400).json({ msg: 'post already liked' });
    }
    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route PUT /api/posts/:id/unlike
// @desc   unlike a post
// @access Private
router.put('/:id/unlike', auth, checkObjectId('id'), async (req: any, res) => {
  try {
    // get post with params.id
    const post = await Post.findById(req.params.id);

    // remove user id from likes array if liked
    post.likes = post.likes.filter((like: any) => {
      return like.user.toString() !== req.user.id.toString();
    });

    await post.save();
    return res.json(post.likes);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @route POST /api/posts/:id/comment
// @desc   comment on a post
// @access Private
router.post(
  '/:id/comment',
  auth,
  checkObjectId('id'),
  body('text', 'Text is required').notEmpty(),
  async (req: any, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      // get post with params.id and user with user.id
      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user.id).select('-password');
      // get text from req.body
      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// @route DELETE /api/posts/:id/comment/:comment_id
// @desc   Eelete comment from post
// @access Private
router.delete(
  '/:id/comment/:comment_id',
  auth,
  checkObjectId('id'),
  async (req: any, res) => {
    try {
      // get post with req.params.id
      const post = await Post.findById(req.params.id);
      // get comment with comment_id
      const comment = post.comments.find(
        (comment: any) =>
          comment._id.toString() === req.params.comment_id.toString()
      );
      if (!comment) {
        return res.status(404).json({ msg: 'comment does not exist' });
      }

      // check comment belong to the user
      if (comment.user.toString() !== req.user.id.toString()) {
        return res.status(401).json({ msg: 'user not authorized' });
      }

      post.comments = post.comments.filter(
        (comment: any) =>
          comment._id.toString() !== req.params.comment_id.toString()
      );

      await post.save();

      return res.json(post.comments);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

export default router;
