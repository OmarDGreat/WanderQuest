import api from "../lib/api";
import { storage } from "../utils/storage.utils";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token } = response.data;
    storage.set("token", token);
    return response.data;
  },

  register: async (email, password) => {
    const response = await api.post("/auth/register", { email, password });
    const { token } = response.data;
    storage.set("token", token);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await api.put("/auth/profile", userData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  logout: () => {
    storage.remove("token");
  },

  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};
