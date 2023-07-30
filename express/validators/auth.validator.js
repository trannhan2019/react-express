const { check, validationResult } = require("express-validator");
const ValidationError = require("../errors/ValidationError");

const validateRegister = [
  check("firstname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("FirstName is required!")
    .isString()
    .withMessage("Fullname must be a string value!"),
  check("lastname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("LastName is required!")
    .isString()
    .withMessage("LastName must be a string value!"),
  check("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 7, max: 15 })
    .withMessage("Password must be from 6 to 15 charaters!"),
  check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email!"),
  check("mobile")
    .notEmpty()
    .withMessage("Phone number is required!")
    .isLength({ min: 10, max: 11 })
    .withMessage("Invalid phone number!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    next();
  },
];

const validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isString()
    .withMessage("Email must be a string value!")
    .isEmail(),
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isString()
    .withMessage("Password must be a string value!")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be from 6 to 15 charaters!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    next();
  },
];

const validateForgotPassword = [
  check("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isString()
    .withMessage("Email must be a string value!")
    .isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }
    next();
  },
];

const validateResetPassword = [
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isString()
    .withMessage("Password must be a string value!")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be from 6 to 15 charaters!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }
    next();
  },
];

const authValidator = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
};

module.exports = authValidator;
