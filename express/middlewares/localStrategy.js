const User = require("../models/users.model");
const LocalStrategy = require("passport-local").Strategy;
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = new LocalStrategy(
  { usernameField: "email", passwordField: "password", session: false },
  async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      return done(
        new UnauthorizedError("Email or Password not correct"),
        false
      );
    }
    if (!(await user.isCorrectPassword(password))) {
      return done(
        new UnauthorizedError("Email or Password not correct"),
        false
      );
    }
    return done(null, user);
  }
);
