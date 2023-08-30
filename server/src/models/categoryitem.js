module.exports = (sequelize, Sequelize) =>
  sequelize.define("categoryitem", {
    itemid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    categoryid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
