const { body, validationResult } = require("express-validator");

const validateEmailMiddleware = (req, res, next) => {
  
  body("email").isEmail();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).send({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = validateEmailMiddleware;