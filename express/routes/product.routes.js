const router = require("express").Router();
const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");
const passport = require("../middlewares/passport");

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProduct);
router.put(
  "/ratings",
  productValidator.validateRatings,
  passport.authenticate("jwt", {
    session: false,
  }),
  productController.ratings
);

module.exports = router;
