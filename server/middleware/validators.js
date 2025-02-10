const { body, param, query } = require("express-validator");
const { validationResult } = require("express-validator");

// Middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules
const validators = {
  auth: {
    register: [
      body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Must be a valid email address"),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      validate,
    ],
    login: [
      body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Must be a valid email address"),
      body("password").exists().withMessage("Password is required"),
      validate,
    ],
  },
  itinerary: {
    create: [
      body("title").trim().notEmpty(),
      body("startDate").isISO8601(),
      body("endDate").isISO8601(),
      body("budget").isNumeric(),
      validate,
    ],
    update: [
      param("id").isUUID(4),
      body("title").optional().trim().notEmpty(),
      body("startDate").optional().isISO8601(),
      body("endDate").optional().isISO8601(),
      body("budget").optional().isNumeric(),
      validate,
    ],
  },
  weather: {
    get: [
      query("location").trim().notEmpty(),
      query("dates").optional().isISO8601(),
      validate,
    ],
  },
  places: {
    get: [
      query("location").trim().notEmpty(),
      query("preferences").optional().trim(),
      validate,
    ],
  },
};

module.exports = validators;
