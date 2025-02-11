import api from '../lib/api';

export const itineraryService = {
  getAllItineraries: async () => {
    const response = await api.get('/itineraries');
    return response.data;
  },

  getItinerary: async (id) => {
    const response = await api.get(`/itineraries/${id}`);
    return response.data;
  },

  createItinerary: async (itineraryData) => {
    const response = await api.post('/itineraries', itineraryData);
    return response.data;
  },

  updateItinerary: async (id, itineraryData) => {
    const response = await api.put(`/itineraries/${id}`, itineraryData);
    return response.data;
  },

  deleteItinerary: async (id) => {
    const response = await api.delete(`/itineraries/${id}`);
    return response.data;
  }
}; 