module.exports = (sequelize, Sequelize) =>
  sequelize.define("item", {
    itemid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    restaurantId: { 
      type: Sequelize.INTEGER, 
      references: {
        model: 'restaurants', 
        key: 'id', 
      },
    },
    quantiy: {
      type: Sequelize.INTEGER,
      
    },
  });
