// src/services/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-mockapi-url.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api; // ✅ ini penting!
