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

      res.json(response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = weatherController;
