import api from "../lib/api";

export const placesService = {
  searchPlaces: async (location, preferences) => {
    const response = await api.get(`/places`, {
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

  searchNearbyPlaces: async (location, type, radius = 5000) => {
    const response = await api.get(`/places/nearby`, {
      params: {
        location,
        type,
        radius, // in meters
      },
    });
    return response.data;
  },

  getPlacePhotos: async (photoReference) => {
    // Get the auth token from localStorage
    const token = localStorage.getItem("token");
    // Return URL with auth token
    return `${api.defaults.baseURL}/places/photos/${encodeURIComponent(
      photoReference
    )}?token=${token}`;
  },

  searchByCategory: async (location, category) => {
    const response = await api.get(`/places/category`, {
      params: {
        location,
        category, // e.g., 'restaurant', 'museum', 'park'
      },
    });
    return response.data;
  },
};
