const router = require('express').Router();
const { Post } = require('../../models');
// Only verified and authorized users can make a post
const withAuth = require('../../utils/auth');

// The `/api/posts` endpoint

// CREATE a new post

// UPDATE an existing post
    // Reload post
    // Display post changes
    // Display any comments added

// DELETE an existing post

module.exports = router;