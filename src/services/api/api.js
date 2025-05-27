import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://68324f19c3f2222a8cb1faf9.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
