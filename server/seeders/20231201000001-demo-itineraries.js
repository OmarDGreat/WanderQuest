"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Itineraries", [
      {
        id: "123e4567-e89b-12d3-a456-426614174001",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        title: "Weekend in Paris",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-03"),
        budget: 1500.0,
        activities: JSON.stringify([
          {
            name: "Eiffel Tower Visit",
            date: "2024-03-01",
            time: "10:00",
            cost: 25.0,
          },
          {
            name: "Louvre Museum",
            date: "2024-03-02",
            time: "13:00",
            cost: 17.0,
          },
        ]),
        weatherData: JSON.stringify({
          forecast: "Partly cloudy",
          temperature: 18,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174002",
        userId: "123e4567-e89b-12d3-a456-426614174000",
        title: "Tokyo Adventure",
        startDate: new Date("2024-04-15"),
        endDate: new Date("2024-04-20"),
        budget: 2500.0,
        activities: JSON.stringify([
          {
            name: "Shibuya Crossing",
            date: "2024-04-15",
            time: "14:00",
            cost: 0.0,
          },
          {
            name: "Mount Fuji Tour",
            date: "2024-04-16",
            time: "09:00",
            cost: 150.0,
          },
        ]),
        weatherData: JSON.stringify({
          forecast: "Sunny",
          temperature: 22,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Itineraries", null, {});
  },
};
