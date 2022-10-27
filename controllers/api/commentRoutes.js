const router = require('express').Router();
const { Comment } = require('../../models');
// Only verified and authorized users can leave a comment
const withAuth = require('../../utils/auth');

// The `/api/comments` endpoint

// CREATE a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const resp = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(resp);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

// UPDATE a comment

// DELETE a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const resp = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!resp) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(resp);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;