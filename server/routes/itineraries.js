const express = require("express");
const router = express.Router();
const itineraryController = require("../controllers/itineraryController");
const auth = require("../middleware/auth");
const { Itinerary } = require("../models");

// Get all itineraries for a user
router.get("/", auth, itineraryController.getAllItineraries);

// Create new itinerary
router.post("/", auth, itineraryController.createItinerary);

// Update itinerary
router.put("/:id", auth, itineraryController.updateItinerary);

// Delete itinerary
router.delete("/:id", auth, itineraryController.deleteItinerary);

module.exports = router;
