const express = require("express");
const { addcategory, getallcategory } = require("../../services/category");
const categoryRouter = express.Router();

categoryRouter.post("/create", async (req, res) => {
  try {
    const responce = await addcategory(req.body);
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
  }
});
categoryRouter.get("/getallcategory", async (req, res) => {
  try {
    const responce = await getallcategory();
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
  }
});

module.exports = categoryRouter;
