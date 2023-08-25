const express = require("express");
const { addUser, loginUser } = require("../../services/user");
const jwt = require("jsonwebtoken");
const verifyUser = require("../middlewares/verifyjwttoken");

const userRoute = express.Router();

// passport.authenticate("local"),
userRoute.post("/login", async (req, res) => {
  const user = await loginUser(req.body.email);

  if (user == null) {
    res.status(404).json({
      auth: false,
      message: "User Not found",
      token: null,
    });
  } else if (user.password != req.body.password) {
    res.status(404).json({
      auth: false,
      message: "Password Not Match",
      token: null,
    });
  } else {
    jwt.sign({ user }, "umar", { expiresIn: "1h" }, (err, token) => {
      if (err) {
        res.status(400).json({
          auth: false,
          message: "Error in loging in Please try again",
          token: null,
        });
      } else {
        const userdata = {
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          userid: user.userid,
        };

        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 900000000),
          httpOnly: true,
          sameSite: true,
        });
        res.status(200).header("token", token).json({
          auth: true,
          userdata,
          token,
        });
      }
    });
  }
});

userRoute.post("/signup", async (req, res) => {
  try {
    const signupData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      phone: req.body.phone,
    };
    const addeddata = await addUser(signupData);
    if (!addeddata) {
      res.status(400).json({
        auth: true,
        message: "Error in loging in Please try again",
        token: null,
      });
    } else {
      jwt.sign({ addeddata }, "umar", { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.status(400).json({
            auth: true,
            message: "Error in loging in Please try again",
            token: null,
          });
        }
        res.status(200).header({ token: token }).json({
          auth: true,
          message: "Success",
          addeddata,
          token,
        });
      });
    }
  } catch (error) {
    res.status(500).send(error.msg);
  }
});
userRoute.get("/getuserbyid", async (req, res) => {
  try {
    const addeddata = await addUser(req.id);
    res.status(200).json(addeddata);
  } catch (error) {
    s;
    res.status(500).send(error.msg);
  }
});
userRoute.post("/logout", verifyUser, async (req, res) => {
  console.log("User Loged out");
  res.status(200).json({ auth: false, message: "Logged Out" });
});

userRoute.post("/verifyuser", verifyUser, async (req, res) => {
  res.status(200).json({ auth: true, message: "User Verified" });
});

module.exports = userRoute;
