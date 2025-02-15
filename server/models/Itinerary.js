module.exports = (sequelize, DataTypes) => {
  const Itinerary = sequelize.define(
    "Itinerary",
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weatherData: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      activities: {
        type: DataTypes.JSONB,
        defaultValue: [],
      },
    },
    {
      timestamps: true,
    }
  );

  // Set up associations
  Itinerary.associate = function (models) {
    Itinerary.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Itinerary;
};
