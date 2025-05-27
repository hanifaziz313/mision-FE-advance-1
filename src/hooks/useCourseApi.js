import { useState, useEffect } from "react";
import courseApi from "@/services/api/courseApi";

const useCourseApi = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const data = await courseApi.getCourses();
      setCourses(data);
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
      setCourses([...courses, added]);
    } catch (err) {
      setError("Gagal menambahkan kursus");
    }
  };

  const updateCourse = async (id, updatedData) => {
    try {
      const updated = await courseApi.updateCourse(id, updatedData);
      setCourses(courses.map((course) => (course.id === id ? updated : course)));
    } catch (err) {
      setError("Gagal mengupdate kursus");
    }
  };

  const deleteCourse = async (id) => {
    try {
      await courseApi.deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      setError("Gagal menghapus kursus");
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
