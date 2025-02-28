const axios = require("axios");

const weatherController = {
  getWeather: async (req, res, next) => {
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
      
      // Process weather data to add fallback icon URLs
      if (response.data && response.data.list) {
        response.data.list = response.data.list.map(item => {
          if (item.weather && item.weather.length > 0) {
            item.weather = item.weather.map(w => ({
              ...w,
              fallback_icon: `/weather-icons/${w.icon}.png` // Path to local fallback icons
            }));
          }
          return item;
        });
      }

      res.json(response.data);
    } catch (error) {
      console.error("Weather API error:", error.message);
      
      // Provide fallback weather data if API fails
      if (error.response && error.response.status === 404) {
        return res.status(404).json({
          error: "Location not found",
          message: `Weather data for "${location}" could not be retrieved.`
        });
      }
      
      next(error);
    }
  },
};

module.exports = weatherController;
