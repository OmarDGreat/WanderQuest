const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");

router.get("/", auth, async (req, res) => {
  try {
    const { location, dates } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: location,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
