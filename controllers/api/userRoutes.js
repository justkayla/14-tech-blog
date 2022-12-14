const router = require("express").Router();
const { User } = require("../../models");

// The `/api/users` endpoint

// CREATE user
router.post("/create-account", async (req, res) => {
  try {
    const resp = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });
    
    req.session.save(() => {
      req.session.user_id = resp.id;
      req.session.logged_in = true; // are you the problem?

      res.json({ user: resp });
    });
  } catch (err) {
    res.status(400).json('Failed to sign up');
  }
});

// LOGIN user
router.post("/login", async (req, res) => {
  try {
    const resp = await User.findOne({ where: { email: req.body.email } });
    
    if (!resp) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
   
    const validPassword = await resp.checkPassword(req.body.password);
    
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    
    req.session.save(() => {
      req.session.user_id = resp.id;
      req.session.logged_in = true;

      res.json({ user: resp, message: "Success! You are now logged in" });
    });
  
  } catch (err) {
    res.status(400).json('Failed to log in');
  }
});

// LOGOUT user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
