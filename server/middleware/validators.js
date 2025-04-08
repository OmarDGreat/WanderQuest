const { body, query, param, validationResult } = require("express-validator");

// Custom validation function for password
const validatePassword = (value) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(value);
};

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
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
        .custom(validatePassword)
        .withMessage(
          "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
        ),
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
  validate: validate,
};

module.exports = validators;
