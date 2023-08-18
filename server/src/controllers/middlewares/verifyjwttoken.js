const jwt = require("jsonwebtoken");
const verifyUser = async (req, res, next) => {
  try {
    const token = req.body.Authorization;
    if (!token) {
      res.status(403).json({ auth: false, message: "No Tokken Provided" });
    } else {
      jwt.verify(token, "umar", (err, user) => {
        if (err) {
          res.status(403).json({ auth: false, message: "Error" });
        } else {
          req.id = user.id;
          next();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyUser;
