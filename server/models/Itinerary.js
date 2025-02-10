const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Itinerary extends Model {}

Itinerary.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    budget: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    activities: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    weatherData: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: "Itinerary",
  }
);

module.exports = Itinerary;
