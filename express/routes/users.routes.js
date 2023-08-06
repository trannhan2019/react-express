const express = require("express");
const router = express.Router();
const passport = require("../middlewares/passport");

const userController = require("../controllers/users.controller");

// router.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   userController.getUserProfile
// );
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.getCurrent
);

module.exports = router;
