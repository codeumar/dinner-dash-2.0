const Sequelize = require("sequelize");
const users = require("./user");
const resturant = require("./resturant");

const dbconfig = require("../config/dbconfig");
const sequelize = new Sequelize(dbconfig);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = users(sequelize, Sequelize);
db.resturant = resturant(sequelize, Sequelize);

sequelize.authenticate().then(() => {
  console.log("Connected to database successfully");
});

sequelize.sync({ force: false }).then(() => {
  console.log("Database has been synced");
});

module.exports = db;
