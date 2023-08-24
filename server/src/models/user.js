const users = (sequelize, Sequelize) =>
  sequelize.define("users", {
    userid: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      validator: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      validator: {
        length: { min: 6, max: 10 },
      },
    },
    role: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: "user",
    },
    phone: {
      type: Sequelize.STRING,
    },
  });

module.exports = users;
