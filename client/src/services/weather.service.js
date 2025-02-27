import api from "../lib/api";

export const weatherService = {

  getWeatherForLocation: async (location) => {
    const response = await api.get(`/weather?location=${encodeURIComponent(location)}`);
    return response.data;
  },
};