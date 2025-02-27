import api from "../lib/api";

export const placesService = {
  searchPlaces: async (location, preferences) => {
    const response = await api.get(`/places/search`, {
      params: {
        location,
        preferences,
      },
    });
    return response.data;
  },

  getPlaceDetails: async (placeId) => {
    const response = await api.get(`/places/${placeId}`);
    return response.data;
  },
};
