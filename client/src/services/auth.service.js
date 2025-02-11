import api from "../lib/api";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (email, password) => {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
