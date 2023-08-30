const Sequelize = require("sequelize");
const users = require("./user");
const restaurant = require("./resturant");

const dbconfig = require("../config/dbconfig");
const sequelize = new Sequelize(dbconfig);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = users(sequelize, Sequelize);
db.restaurant = restaurant(sequelize, Sequelize);
db.item = require("./Item")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);
db.orderitem = require("./orderitem")(sequelize, Sequelize);
db.category = require("./category")(sequelize, Sequelize);
db.categoryitem = require("./categoryitem")(sequelize, Sequelize);

db.restaurant.belongsTo(db.users, { foreignKey: "userid" });
db.item.belongsTo(db.restaurant, { foreignKey: "restaurantid" });
//order tabel relations
db.order.belongsTo(db.restaurant, { foreignKey: "restaurantid" });
db.order.belongsTo(db.users, { foreignKey: "userid" });

//orderitem relations
db.orderitem.belongsTo(db.order, { foreignKey: "orderid" });
db.orderitem.belongsTo(db.item, { foreignKey: "itemid" });

//category relations
//db.categoryitem.belongsTo(db.item, { foreignKey: "itemid" });
db.categoryitem.belongsTo(db.category, { foreignKey: "categoryid" });

sequelize.authenticate().then(() => {
  //("Connected to database successfully");
});

sequelize.sync({ force: false }).then(() => {
  //("Database has been synced");
});

module.exports = db;
