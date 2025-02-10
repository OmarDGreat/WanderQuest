const sequelize = require("../config/database");
const User = require("./User");
const Itinerary = require("./Itinerary");

// Define associations
User.hasMany(Itinerary, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Itinerary.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  sequelize,
  User,
  Itinerary,
};
