const asyncHandler = require("express-async-handler");
const ExistedError = require("../errors/ExistedError");
const NotFoundError = require("../errors/NotFoundError");
const User = require("../models/users.model");
const { generateAccessToken, generateRefreshToken } = require("../ultils/jwt");
const enviromentVariables = require("../configs/envVariablesConfig");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new ExistedError("This User has already been registered!");
  else {
    const newUser = await User.create({
      email,
      password,
      firstname,
      lastname,
      mobile,
    });
    return res.status(201).json({
      status: true,
      message: newUser
        ? "Register Acount sucssec"
        : "Some went wrong, please try later",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { password, role, refreshToken, ...userData } = req.user.toObject();
  // Tạo access token
  const accessToken = generateAccessToken(req.user._id, role);
  // Tạo refresh token
  const newRefreshToken = generateRefreshToken(req.user._id);
  // Lưu refresh token vào database
  await User.findByIdAndUpdate(
    req.user._id,
    { refreshToken: newRefreshToken },
    { new: true }
  );
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(201).json({
    status: true,
    accessToken,
    userData,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError("Email not exist !!");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${enviromentVariables.client_url}/reset-password/${resetToken}>Click here</a>`;

  const data = {
    email,
    html,
    subject: "Forgot password",
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    status: rs.response?.includes("OK") ? true : false,
    message: rs.response?.includes("OK")
      ? "Check your mail please."
      : "Something went wrong. Please try later",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  // console.log(password);
  // console.log(token);

  if (!token) throw new NotFoundError("Token not correct");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new NotFoundError("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    status: user ? true : false,
    message: user ? "Updated password" : "Something went wrong",
  });
});

// const refreshAccessToken = asyncHandler(async (req, res) => {
//   // Lấy token từ cookies
//   const cookie = req.cookies;
//   console.log(cookie.refreshToken);
//   return res.json("sadfasdf");
// });

const authController = {
  register,
  login,
  forgotPassword,
  resetPassword,
  // refreshAccessToken,
};

module.exports = authController;
