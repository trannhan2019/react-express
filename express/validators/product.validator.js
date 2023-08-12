const { check, validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");

const validateRatings = [
  check("star").notEmpty().withMessage("Star is required!"),
  check("pid").notEmpty().withMessage("Product is required!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }
    next();
  },
];

const productValidator = {
  validateRatings,
};

module.exports = productValidator;
