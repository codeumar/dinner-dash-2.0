const db = require("../models");

const addUser = async (userData) => {
  return  await db.users.create(userData);
};

module.exports = addUser ;
