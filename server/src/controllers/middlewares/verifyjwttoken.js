const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyUser = async (req, res, next) => {
  try {
    ////(req.headers);
    const token = req.headers.authorization;
    if (!token) {
      res.status(403).json({ auth: false, message: "No Tokken Provided" });
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) {
          res.status(401).json({ auth: false, message: "Token Expired" });
        } else {
          req.id = user.user.userid;
          next();
        }
      });
    }
  } catch (error) {
    //(error);
  }
};

module.exports = verifyUser;
