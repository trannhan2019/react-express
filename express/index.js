const enviromentVariables = require("./configs/envVariablesConfig");

const express = require("express");
const cookie_parser = require("cookie-parser");
const cors = require("cors");

const app = express();

const connect_mongodb = require("./configs/mongodbConnect");
const routes = require("./routes");
const passport = require("./middlewares/passport");

app.use(
  cors({
    origin: [enviromentVariables.client_url, "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Using cookies
app.use(cookie_parser());

const PORT = enviromentVariables.server_port;

app.use(passport.initialize());
app.use("/api", routes);

connect_mongodb();
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
