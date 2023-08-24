const Restaurant = (sequelize, Sequelize) =>
  sequelize.define("restaurant", {
    restaurantid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    userid: {
      type: Sequelize.INTEGER,
    },
  });

module.exports = Restaurant;
