const db = require("../models");

const addUser = async (signupData) => {
  return await db.users.create(signupData);
};
const loginUser = async (email) => {
  const user = await db.users.findOne({
    where: { email: email },
    attributes: ["userid", "role", "password", "email", "name", "phone"],
  });

  return user;
};
const findUserById = async (userid) => {
  const user = await db.users.findOne({
    where: { userid: userid },
    attributes: ["userid", "role", "password", "name", "email", "phone"],
  });
  return user;
};

module.exports = { addUser, loginUser, findUserById };
