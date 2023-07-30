const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/users.model");
const enviromentVariables = require("../configs/envVariablesConfig");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = enviromentVariables.auth.access_token_secret;

module.exports = new JwtStrategy(opts, async function (jwt_payload, done) {
  const user = await User.findOne({ id: jwt_payload.sub });
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});
