const express = require("express");
const router = express.Router();
const passport = require("../middlewares/passport");
const uploader = require("../configs/cloudinary.config");
const { isAdmin } = require("../middlewares/isAdmin");

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

router.put(
  "/current",
  passport.authenticate("jwt", { session: false }),
  uploader.single("avatar"),
  userController.updateUser
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  userController.getUsers
);
router.delete(
  "/:uid",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  userController.deleteUser
);
router.put(
  "/:uid",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  userController.updateUserByAdmin
);

module.exports = router;
