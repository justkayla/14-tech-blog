const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// a User can hasOne Post
User.hasOne(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// a User can hasMany Post
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',    // Does this delete all user posts?
})

// a Post belongsTo one User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// a Post can hasOne Comment
Post.hasOne(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// a Post can hasMany Comment
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',    // Does this delete all comments on post?
});

// a Comment belongsTo one Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

// Need to define User-Comment relationship, or is that relationship defined through the Post route?

module.exports = { User, Post, Comment };