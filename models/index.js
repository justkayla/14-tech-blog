const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// a User can have many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// a User can have many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// a Post belongs to one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// a Post can have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// a Comment belongs to one Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// a Comment belongs to one User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Post, Comment };