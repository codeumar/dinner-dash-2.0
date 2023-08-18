module.exports = (sequelize, Sequelize) =>
  sequelize.define("resturant", {
    resturantid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    userid: {
      type: Sequelize.STRING,
      defaultValue: "user",
    },
  });
