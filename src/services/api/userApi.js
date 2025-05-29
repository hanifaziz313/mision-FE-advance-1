import api from "./api";

export default {
  registerUser: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },
};
