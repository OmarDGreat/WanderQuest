const { Itinerary } = require("../models");

const itineraryController = {
  getAllItineraries: async (req, res) => {
    try {
      const itineraries = await Itinerary.findAll({
        where: { userId: req.user.id },
      });
      res.json(itineraries);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createItinerary: async (req, res) => {
    try {
      const itinerary = await Itinerary.create({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(itinerary);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateItinerary: async (req, res) => {
    try {
      const itinerary = await Itinerary.findOne({
        where: { id: req.params.id, userId: req.user.id },
      });

      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      await itinerary.update(req.body);
      res.json(itinerary);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteItinerary: async (req, res) => {
    try {
      const itinerary = await Itinerary.findOne({
        where: { id: req.params.id, userId: req.user.id },
      });

      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      await itinerary.destroy();
      res.json({ message: "Itinerary deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = itineraryController;
