require("dotenv").config();

const enviroment_variables = {
  server_port: process.env.SERVER_PORT || 5000,
  client_url: process.env.CLIENT_URL,
  mongodb_uri: process.env.MONGO_URI,
  auth: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  },
  email: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  server_enviroment: process.env.SERVER_ENVIROMENT,
};

module.exports = Object.freeze(enviroment_variables);
