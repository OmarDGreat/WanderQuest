const { Itinerary } = require("../models");
const axios = require("axios");

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
      const { title, startDate, endDate, budget, location } = req.body;
      console.log("Request body:", req.body);

      // Get current date and calculate days until start date
      const today = new Date();
      const startDateObj = new Date(startDate);
      const daysUntilStart = Math.ceil(
        (startDateObj - today) / (1000 * 60 * 60 * 24)
      );

      let weatherData = [];

      try {
        // Always fetch weather data for debugging
        console.log("Fetching weather data from OpenWeather API...");
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`,
          {
            params: {
              q: location,
              appid: process.env.OPENWEATHER_API_KEY,
              units: "metric",
            },
          }
        );

        // Since the trip is in the future, store the location coordinates
        weatherData = {
          coordinates: weatherResponse.data.city.coord,
          location: location,
          message: "Weather forecast will be available closer to trip date",
          sampleData: weatherResponse.data.list.slice(0, 3).map((entry) => ({
            date: entry.dt_txt,
            temp: entry.main.temp,
            feels_like: entry.main.feels_like,
            description: entry.weather[0].description,
            icon: entry.weather[0].icon,
            humidity: entry.main.humidity,
            wind_speed: entry.wind.speed,
          })),
        };

        console.log("Final weather data:", weatherData);
      } catch (weatherError) {
        console.error("Error fetching weather data:", weatherError.message);
        if (weatherError.response) {
          console.error("API Response:", weatherError.response.data);
          console.error("API Status:", weatherError.response.status);
        }
      }

      // Create itinerary with weather data
      const itinerary = await Itinerary.create({
        title,
        startDate,
        endDate,
        budget,
        location,
        userId: req.user.id,
        weatherData,
        activities: req.body.activities || [],
      });

      res.status(201).json(itinerary);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      res.status(400).json({
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
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

  getItineraryById: async (req, res) => {
    try {
      const itinerary = await Itinerary.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });

      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      res.json(itinerary);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = itineraryController;
