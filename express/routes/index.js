const express = require("express");
const router = express.Router();

//Error handler middleware
const errorHandler = require("../middlewares/errorHandler");

const authRoutes = require("./auth.routes");
const usersRoutes = require("./users.routes");
const productCategoryRouter = require("./product.category.routes");

router.use("/auth", authRoutes);
router.use("/user", usersRoutes);
router.use("/prodcategory", productCategoryRouter);

//Apply error handler
router.use(errorHandler);

module.exports = router;
