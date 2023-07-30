const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const enviromentVariables = require("../configs/envVariablesConfig");

const sendMail = asyncHandler(async ({ email, html, subject }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: enviromentVariables.email.user, // generated ethereal user
      pass: enviromentVariables.email.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Tran Nhan dev" <no-relply@trannhan.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });

  return info;
});

module.exports = sendMail;
