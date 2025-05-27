// services/api/userApi.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default {
  // Daftar user baru
  registerUser: async (userData) => {
    const response = await apiClient.post("/users", userData);
    return response.data;
  },

  // Ambil semua user (untuk simulasi login)
  getAllUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },
};
