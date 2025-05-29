import { useState, useEffect } from "react";
import courseApi from "@/services/api/courseApi";

const useCourseApi = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await courseApi.getCourses();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError("Gagal memuat kursus");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (data) => {
    try {
      const added = await courseApi.addCourse(data);
      setCourses((prevCourses) => [...prevCourses, added]);
      setError(null);
    } catch (err) {
      setError("Gagal menambahkan kursus");
      console.error("Error adding course:", err);
    }
  };

  const updateCourse = async (id, updatedData) => {
    try {
      const updated = await courseApi.updateCourse(id, updatedData);
      setCourses((prevCourses) => prevCourses.map((course) => (course.id === id ? updated : course)));
      setError(null);
    } catch (err) {
      setError("Gagal mengupdate kursus");
      console.error("Error updating course:", err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await courseApi.deleteCourse(id);
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
      setError(null);
    } catch (err) {
      setError("Gagal menghapus kursus");
      console.error("Error deleting course:", err);
    }
  };

  return {
    courses,
    loading,
    error,
    addCourse,
    updateCourse,
    deleteCourse,
    refetch: fetchCourses,
  };
};

export default useCourseApi;
