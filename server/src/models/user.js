module.exports = (sequelize, Sequelize) =>
  sequelize.define("users", {
    userid: {
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
      validator:{
        isEmail:true
      }
    },
    password: {
      type: Sequelize.STRING,
      validator:{
        length:({min:6,max:10})
      }
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: "user",
    },
    phone: {
      type: Sequelize.STRING,
    },
  });
