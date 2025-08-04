const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


// Get all posts with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Server error',
      message: err.message 
    });
  }
});


// Create a new post
router.post('/', async (req, res) => {
  try {
    const { content, image, author } = req.body;
    console.log(req.body);

    // Validate required fields
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }
    if (!author) {
      return res.status(400).json({ error: 'Author is required' });
    }

    const post = new Post({
      content: content.trim(),
      image: image ? image.trim() : undefined,
      author
    });

    await post.save();
    
    // Populate author details
    await post.populate('author', 'firstName lastName email');
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        success: false,
        error: 'Validation failed',
        details: errors 
      });
    }
    res.status(500).json({ 
      success: false,
      error: 'Server error',
      message: err.message 
    });
  }
});


// Get single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'firstName lastName email');
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
        error: 'Post not found' 
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Server error',
      message: err.message 
    });
  }
});

// Like a post
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false,
      error: 'Post not found' 
      });
    }
    
    const isLiked = post.likes.includes(userId);
    
    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    
    await post.save();
    
    res.json({
      success: true,
      data: {
        likesCount: post.likes.length,
        isLiked: !isLiked
      }
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: 'Server error',
      message: err.message 
    });
  }
});

module.exports = router;
