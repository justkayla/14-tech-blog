const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Is this correct? When there is a post created, it should include which user created it
    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users.id,
        });
    }

    // Is this correct? When there is a comment, it should include the post and user information it belongs to
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            post_id: post.id,
            user_id: users.id,
        });
    }

    process.exit(0);
};

seedDatabase();