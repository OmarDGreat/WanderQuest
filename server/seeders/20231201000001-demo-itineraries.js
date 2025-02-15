"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Itineraries",
      [
        {
          id: "123e4567-e89b-12d3-a456-426614174001",
          userId: "123e4567-e89b-12d3-a456-426614174000",
          title: "Weekend in Paris",
          startDate: new Date("2024-06-01"),
          endDate: new Date("2024-06-03"),
          location: "Paris",
          budget: 1500.0,
          activities: JSON.stringify([
            { name: "Eiffel Tower Visit", time: "10:00", day: 1 },
            { name: "Louvre Museum", time: "14:00", day: 1 },
          ]),
          weatherData: JSON.stringify({
            coordinates: {
              lat: 48.8566,
              lon: 2.3522,
            },
            location: "Paris",
            message: "Weather forecast will be available closer to trip date",
            sampleData: [],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "123e4567-e89b-12d3-a456-426614174002",
          userId: "123e4567-e89b-12d3-a456-426614174000",
          title: "Tokyo Adventure",
          startDate: new Date("2024-07-15"),
          endDate: new Date("2024-07-20"),
          location: "Tokyo",
          budget: 2500.0,
          activities: JSON.stringify([
            { name: "Shibuya Crossing", time: "11:00", day: 1 },
            { name: "Senso-ji Temple", time: "14:00", day: 1 },
          ]),
          weatherData: JSON.stringify({
            coordinates: {
              lat: 35.6762,
              lon: 139.6503,
            },
            location: "Tokyo",
            message: "Weather forecast will be available closer to trip date",
            sampleData: [],
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Itineraries", null, {});
  },
};
