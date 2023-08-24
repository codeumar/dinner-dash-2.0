module.exports = (sequelize, Sequelize) =>
  sequelize.define("orderitem", {
    itemid: {
      type: Sequelize.DataTypes.INTEGER,
    },
    orderid: {
      type: Sequelize.DataTypes.INTEGER,
      require: true,
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      require: true,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      require: true,
    },
  });
