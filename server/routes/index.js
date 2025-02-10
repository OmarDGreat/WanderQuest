const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const itineraryRoutes = require('./itineraries');
const weatherRoutes = require('./weather');
const placesRoutes = require('./places');

// Mount routes
router.use('/auth', authRoutes);
router.use('/itineraries', itineraryRoutes);
router.use('/weather', weatherRoutes);
router.use('/places', placesRoutes);

module.exports = router; 