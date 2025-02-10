const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preferences: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      timestamps: true,
    }
  );

  // Instance method to validate password
  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  // Set up associations
  User.associate = function (models) {
    User.hasMany(models.Itinerary, {
      foreignKey: "userId",
      as: "itineraries",
    });
  };

  return User;
};
