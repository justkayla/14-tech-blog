const router = require("express").Router();
const { Post } = require("../../models");
// Only verified and authorized users can make a post
const withAuth = require("../../utils/auth");

// The `/api/posts` endpoint

// CREATE a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const resp = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(resp);
  
  } catch (err) {
    res.status(400).json(err.message);
  }
});

/* DELETE an existing post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const resp = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!resp) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

module.exports = router;
