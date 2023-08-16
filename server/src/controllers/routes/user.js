const express = require("express");
const addUser = require("../../services/user");
const userRouter = express.Router();
const validateEmailMiddleware = require("../middlewares/user");


userRouter.post("/newuser",async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      phone: req.body.phone,
    };
    console.log(userData);
    const addeddata = await addUser(userData);
    res.status(201).send(addeddata);
  } catch (error) {
    res.status(500).send(error.msg);
  }
});

module.exports = userRouter;
