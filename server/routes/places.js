const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");

router.get("/", auth, async (req, res) => {
  try {
    const { location, preferences } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: `${preferences} in ${location}`,
          key: process.env.GOOGLE_PLACES_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New routes
router.get("/nearby", auth, async (req, res) => {
  try {
    const { location, type, radius } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location,
          type,
          radius,
          key: process.env.GOOGLE_PLACES_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/photos/:photoReference", auth, async (req, res) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo`,
      {
        params: {
          photoreference: req.params.photoReference,
          maxwidth: 400,
          key: process.env.GOOGLE_PLACES_API_KEY,
        },
        responseType: 'arraybuffer'
      }
    );
    res.type('image/jpeg').send(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/category", auth, async (req, res) => {
  try {
    const { location, category } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: category,
          location,
          type: category,
          key: process.env.GOOGLE_PLACES_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
