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
      
      // Process the response to add fallback URLs
      if (response.data && response.data.results) {
        response.data.results = response.data.results.map(place => {
          if (place.photos && place.photos.length > 0) {
            place.photos = place.photos.map(photo => {
              return {
                ...photo,
                fallback_url: `https://via.placeholder.com/400x300?text=${encodeURIComponent(place.name || 'Place')}`
              };
            });
          }
          return place;
        });
      }

      res.json(response.data);
    } catch (error) {
      console.error("Places API error:", error.message);
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
      
      // Add fallback URLs to photos
      if (response.data && response.data.result && response.data.result.photos) {
        response.data.result.photos = response.data.result.photos.map(photo => {
          return {
            ...photo,
            fallback_url: `https://via.placeholder.com/800x600?text=${encodeURIComponent(response.data.result.name || 'Place Detail')}`
          };
        });
      }

      res.json(response.data);
    } catch (error) {
      console.error("Place details API error:", error.message);
      next(error);
    }
  },
};

module.exports = placesController;
