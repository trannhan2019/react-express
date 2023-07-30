const express = require("express");
const router = express.Router();
const authValidator = require("../validators/auth.validator");

const authController = require("../controllers/auth.controller");
const passport = require("../middlewares/passport");

router.post(
  "/register",
  authValidator.validateRegister,
  authController.register
);

router.post(
  "/login",
  authValidator.validateLogin,
  passport.authenticate("local", {
    session: false,
  }),
  authController.login
);

router.post(
  "/forgotpassword",
  authValidator.validateForgotPassword,
  authController.forgotPassword
);

router.put(
  "/resetpassword",
  authValidator.validateResetPassword,
  authController.resetPassword
);

// router.get("/refresh", authController.refreshAccessToken);

module.exports = router;
