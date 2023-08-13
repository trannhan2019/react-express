const router = require("express").Router();
const productController = require("../controllers/product.controller");
const productValidator = require("../validators/product.validator");
const passport = require("../middlewares/passport");
const uploader = require("../configs/cloudinary.config");
const { isAdmin } = require("../middlewares/isAdmin");

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
router.put(
  "/varriant/:pid",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  productController.addVarriant
);
router.delete(
  "/:pid",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  productController.deleteProduct
);
router.put(
  "/:pid",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  productController.updateProduct
);

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  isAdmin,
  uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  productController.createProduct
);

module.exports = router;
