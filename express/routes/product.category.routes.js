const router = require("express").Router();
const productCategoryController = require("../controllers/product.category.controller");

router.get("/", productCategoryController.getCategories);

module.exports = router;
