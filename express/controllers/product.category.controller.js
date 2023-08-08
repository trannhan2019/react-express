const asyncHandler = require("express-async-handler");
const ProductCategory = require("../models/product.category.model");

const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find();
  return res.json({
    status: response ? true : false,
    prodCategories: response ? response : "Cannot get product-category",
  });
});

module.exports = {
  getCategories,
};
