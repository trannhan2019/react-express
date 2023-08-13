const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  if (+role !== 1945)
    return res.status(401).json({
      status: false,
      message: " REQUIRE ADMIN ROLE",
    });
  next();
});

module.exports = { isAdmin };
