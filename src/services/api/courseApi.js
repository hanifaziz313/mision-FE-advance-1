import api from "./api";

export default {
  getCourses: () => api.get("/courses").then((res) => res.data),
  addCourse: (data) => api.post("/courses", data).then((res) => res.data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data).then((res) => res.data),
  deleteCourse: (id) => api.delete(`/courses/${id}`).then((res) => res.data),
};
