const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const validators = require("../middleware/validators");

router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    validators.validate,
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").exists(),
    validators.validate,
  ],
  authController.login
);

router.get("/profile", auth, authController.getProfile);

module.exports = router;
