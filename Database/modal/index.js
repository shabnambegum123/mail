const sequelize = require("../database");

const profile = require("./userindex");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("error", error);
  });

module.exports = sequelize


