import { createContext, useState } from "react";

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async (fetchCoursesService) => {
    setLoading(true);
    try {
      const response = await fetchCoursesService();
      if (response.success) {
        setCourses(response.data);
      } else {
        console.error("Error fetching courses:", response.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseDetails = async (courseId, fetchCourseDetailsService) => {
    setLoading(true);
    try {
      const response = await fetchCourseDetailsService(courseId);
      if (response.success) {
        setCurrentCourse(response.data);
      } else {
        console.error("Error fetching course details:", response.message);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        currentCourse,
        loading,
        fetchCourses,
        fetchCourseDetails,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}
