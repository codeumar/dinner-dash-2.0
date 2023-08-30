const db = require("../models");

const addcategory = async (categorydata) => {
  try {
    return await db.category.create(categorydata);
  } catch (error) {
    throw new Error(error);
  }
};
const getallcategory = async () => {
  try {
    return await db.category.findAll();
  } catch (error) {
    throw new Error(error);
  }
};
const additemtocategory = async (itemobject) => {
  try {
    return await db.categoryitem.create(itemobject);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { addcategory, getallcategory, additemtocategory };
