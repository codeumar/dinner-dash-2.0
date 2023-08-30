module.exports = (sequelize, Sequelize) =>
  sequelize.define("item", {
    itemid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      require: true,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
      require: true,
    },
    restaurantid: {
      type: Sequelize.INTEGER,
      require: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      require: true,
    },
    imageurl: {
      type: Sequelize.STRING,
      require: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
