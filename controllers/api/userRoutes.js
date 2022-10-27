const router = require('express').Router();
const { User } = require('../../models');

// The `/api/users` endpoint

// CREATE user
router.post('/', async (req, res) => {
    try {
        const resp = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = resp.isSoftDeleted;
            req.session.logged_in = true;

            res.status(200).json(resp);
        });
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// LOGIN user
router.post('/login', async (req, res) => {
    try {
        const resp = await User.findOne({ where: { email: req.body.email } });

        if (!resp) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await resp.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = resp.id;
            req.session.logged_in = true;

            res.json({ user: resp, message: 'Success! You are now logged in' });
        });
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// LOGOUT user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// UPDATE user
router.put('/:id', async (req, res) => {
    try {
        const resp = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!resp[0]) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }

        res.status(200).json(resp);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const resp = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!resp) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(resp);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;