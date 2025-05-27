import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default {
  getCourses: async () => {
    const response = await apiClient.get("/courses");
    return response.data;
  },
  addCourse: async (data) => {
    const response = await apiClient.post("/courses", data);
    return response.data;
  },
  updateCourse: async (id, data) => {
    const response = await apiClient.put(`/courses/${id}`, data);
    return response.data;
  },
  deleteCourse: async (id) => {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
  },
};
