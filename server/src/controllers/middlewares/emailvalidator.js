const { body, validationResult } = require("express-validator");

const validateEmailMiddleware = [
  body("email").isEmail().withMessage("Email is not valid"), // Use it as middleware and chain validation methods
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = validateEmailMiddleware;
