const router = require('express').Router();
const { Comment } = require('../../models');
// Only verified and authorized users can leave a comment
const withAuth = require('../../utils/auth');

// The `/api/comments` endpoint

// CREATE a comment

// UPDATE a comment

// DELETE a comment

module.exports = router;