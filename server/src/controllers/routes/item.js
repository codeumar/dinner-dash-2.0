const jwt = require("jsonwebtoken");
const express = require("express");
const itemRouter = express.Router();
const Cloudinary = require("cloudinary").v2;
Cloudinary.config({
  cloud_name: "dfgaay92d",
  api_key: "576263258294367",
  api_secret: "nHY6bmvb3mz1_kYhbG0fqIbU6js",
});
const verifyUser = require("../middlewares/verifyjwttoken");
const {
  additem,
  getAllFoodItems,
  getItemById,
  getItemByrestaurantId,
  retireitem,
  restoreItem,
} = require("../../services/item");
const { additemtocategory } = require("../../services/category");

itemRouter.post("/additem", verifyUser, async (req, res) => {
  try {
    const files = req.files.img;

    //
    Cloudinary.uploader.upload(files.tempFilePath, async (err, result) => {
      if (err) {
        //
        res.status(201).send("Error in uploading image");
      }

      const itemData = req.body;

      itemData.imageurl = result.url;
      const item = await additem(itemData);
      if (item === -1) {
        res.status(200).send("Item already exists");
        return;
      }

      if (typeof itemData.categories === "string") {
        let data = [];
        data.push(itemData.categories);
        itemData.categories = data;
      }
      if (itemData.categories != null) {
        itemData.categories.map(async (category) => {
          const categoryid = parseInt(category);
          const itemobject = { categoryid, itemid: item.dataValues.itemid };
          //ct);
          await additemtocategory(itemobject);
        });
      }

      res.status(200).send("Item Addedd Successfully");
    });
  } catch (error) {
    if (error.message.includes("already exists")) {
      res.status(400).send({ error: error.message });
    } else {
      //
      res.status(500).send("Internal server error");
    }
  }
});
itemRouter.get("/getallitems", async (req, res) => {
  try {
    const items = await getAllFoodItems();
    res.status(200).send(items);
  } catch (error) {}
});
itemRouter.get("/getallitemsbyrestaurantid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const items = await getItemByrestaurantId(id);
    res.status(200).send(items);
  } catch (error) {}
});
itemRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  //
  try {
    const item = await getItemById(id);
    if (item === null) {
      res.status(200).json({ message: "-1" });
    } else {
      res.status(200).json(item);
    }
  } catch (error) {}
});
itemRouter.put("/retire/:id", async (req, res) => {
  const { id } = req.params;
  //);
  try {
    const item = await retireitem(id, req.body);

    res.status(200).json({ item, message: "Item Retired" });
  } catch (error) {}
});
itemRouter.put("/restore/:id", async (req, res) => {
  const { id } = req.params;
  //);
  try {
    const item = await restoreItem(id, req.body);

    res.status(200).json({ item, message: "Item Retired" });
  } catch (error) {}
});

module.exports = itemRouter;
