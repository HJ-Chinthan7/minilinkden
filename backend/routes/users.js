const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const router = express.Router();


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id })
      .populate('author', 'name username avatar')
      .sort({ createdAt: -1 });
      
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
