const enviromentVariables = require("./envVariablesConfig");

const mongoose = require("mongoose");

module.exports = async function connect() {
  try {
    await mongoose.connect(enviromentVariables.mongodb_uri);
    console.log("Connect to MongoDB server successfully!");
  } catch (error) {
    console.log("Error when connecting to MongoDB server!", error);
  }
};
