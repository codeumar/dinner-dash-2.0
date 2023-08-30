const jwt = require("jsonwebtoken");
const verifyUser = require("../controllers/middlewares/verifyjwttoken");
const express = require("express");
const {
  LoginUser,
  SignUpUser,
  GetUserById,
  getUserByUserId,
  logoutUser,
  verifyUserAndAuth,
} = require("../controllers/routes/user");

const userRoute = express.Router();

userRoute.post("/login", LoginUser);
userRoute.post("/signup", SignUpUser);
userRoute.get("/getuserbyid", GetUserById);
userRoute.get("/getuserbyid/:id", getUserByUserId);
userRoute.post("/logout", verifyUser, logoutUser);
userRoute.post("/verifyuser", verifyUser, verifyUserAndAuth);

module.exports = userRoute;
