import api from "../lib/api";

export const itineraryService = {
  getAllItineraries: async () => {
    const response = await api.get("/itineraries");
    return response.data;
  },

  getItineraryById: async (id) => {
    const response = await api.get(`/itineraries/${id}`);
    return response.data;
  },

  createItinerary: async (itineraryData) => {
    const response = await api.post("/itineraries", itineraryData);
    return response.data;
  },

  updateItinerary: async (id, itineraryData) => {
    const response = await api.put(`/itineraries/${id}`, itineraryData);
    return response.data;
  },

  deleteItinerary: async (id) => {
    const response = await api.delete(`/itineraries/${id}`);
    return response.data;
  },

  // New methods
  getDashboardStats: async () => {
    const response = await api.get("/itineraries/stats");
    return response.data;
  },

  searchItineraries: async (query) => {
    const response = await api.get(
      `/itineraries/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  getUpcoming: async () => {
    const response = await api.get("/itineraries/upcoming");
    return response.data;
  },
};
