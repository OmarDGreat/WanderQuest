"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Itineraries", [
      {
        id: "123e4567-e89b-12d3-a456-426614174001",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        title: "Weekend in Paris",
        startDate: new Date("2024-06-01"),
        endDate: new Date("2024-06-03"),
        budget: 1500.00,
        activities: JSON.stringify([
          { name: "Eiffel Tower Visit", time: "10:00", day: 1 },
          { name: "Louvre Museum", time: "14:00", day: 1 },
          { name: "Seine River Cruise", time: "19:00", day: 1 }
        ]),
        weatherData: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174002",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        title: "Tokyo Adventure",
        startDate: new Date("2024-07-15"),
        endDate: new Date("2024-07-20"),
        budget: 2500.00,
        activities: JSON.stringify([
          { name: "Shibuya Crossing", time: "11:00", day: 1 },
          { name: "Senso-ji Temple", time: "14:00", day: 1 },
          { name: "Shinjuku Gyoen", time: "10:00", day: 2 }
        ]),
        weatherData: JSON.stringify({}),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Itineraries", null, {});
  },
};
