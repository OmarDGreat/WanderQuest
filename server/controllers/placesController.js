const axios = require("axios");

const placesController = {
  searchPlaces: async (req, res, next) => {
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
      next(error);
    }
  },

  getPlaceDetails: async (req, res, next) => {
    try {
      const { placeId } = req.params;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: process.env.GOOGLE_PLACES_API_KEY,
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = placesController;
