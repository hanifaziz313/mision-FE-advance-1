import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://68349caecd78db2058becb2d.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
