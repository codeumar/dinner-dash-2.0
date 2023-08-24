module.exports = (sequelize, Sequelize) =>
  sequelize.define("order", {
    orderid: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantid: {
      type: Sequelize.DataTypes.INTEGER,
      require: true,
    },
    status: {
      type: Sequelize.DataTypes.ENUM(
        "pending",
        "completed",
        "cancelled",
        "delivered"
      ),
    },
    totalprice: {
      type: Sequelize.DataTypes.INTEGER,
      require: true,
    },
    userid: {
      type: Sequelize.DataTypes.INTEGER,
      require: true,
    },
  });
