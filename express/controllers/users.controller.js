const asyncHandler = require("express-async-handler");
const User = require("../models/users.model");

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password");
  return res.status(200).json({
    status: user ? true : false,
    rs: user ? user : "User not found",
  });
});

const userController = {
  getCurrent,
};

module.exports = userController;
