const enviromentVariables = require("./envVariablesConfig");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: enviromentVariables.cloudinary.name,
  api_key: enviromentVariables.cloudinary.api_key,
  api_secret: enviromentVariables.cloudinary.api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "cuahangdientu",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
