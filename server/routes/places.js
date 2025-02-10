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

module.exports = router;
