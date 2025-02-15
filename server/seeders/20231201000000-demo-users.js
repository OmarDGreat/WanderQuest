"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password", 10);

    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "123e4567-e89b-12d3-a456-426614174000",
          email: "demo@example.com",
          password: hashedPassword,
          preferences: JSON.stringify({}),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
