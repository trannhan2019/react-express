const asyncHandler = require("express-async-handler");

const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  return res.json("done");
});

const userController = {
  getUserProfile,
};

module.exports = userController;
