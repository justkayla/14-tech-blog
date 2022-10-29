const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage with posts from users
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const resp = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = resp.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Retrieve a specific post by id
router.get('/post/:id', async (req, res) => {
    try {
        const resp = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['first_name','last_name'],
                },
            ],
        });

        const post = resp.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Render a specific user's profile w/ associated posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find logged in user based on session ID
        const resp = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = resp.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// LOGIN route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        // Where to redirect logged in users: Homepage? User's profile?
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

// CREATE ACCOUNT route
router.get('/create-account', (req, res) => {
    res.render('create-account');
});

module.exports = router;