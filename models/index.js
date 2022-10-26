const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User hasMany Post

// Post belongsTo User

// User hasMany Comment

// Post hasMany Comment

// Comment belongsTo Post && User

module.exports = { User, Post, Comment };