module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Itineraries", "weatherData", {
      type: Sequelize.JSONB, // Use JSONB for PostgreSQL, JSON for other databases
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Itineraries", "weatherData");
  },
}; 