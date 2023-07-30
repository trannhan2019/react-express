const jwt = require("jsonwebtoken");
const enviromentVariables = require("../configs/envVariablesConfig");

const generateAccessToken = (uid, role) =>
  jwt.sign({ _id: uid, role }, enviromentVariables.auth.access_token_secret, {
    expiresIn: "7d",
  });
const generateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, enviromentVariables.auth.refresh_token_secret, {
    expiresIn: "7d",
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
