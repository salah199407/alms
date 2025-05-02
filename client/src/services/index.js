import axios from "axios";
import axiosInstance from "@/api/axiosInstance";

/* ------------------ AUTHENTICATION ------------------ */
export async function registerService(formData) {
  const { data } = await axiosInstance.post("/api/auth/register", {
    ...formData,
    role: "student",
  });
  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/api/auth/login", formData);
  return data;
}

export async function checkAuthService(token) {
  const { data } = await axiosInstance.get("/api/auth/check-auth", {   // ✅ Correction ici
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function forgotPasswordService(userEmail) {
  const { data } = await axiosInstance.post("/api/auth/forgot-password", { userEmail });
  return data;
}

export async function resetPasswordService(token, newPassword) {
  const { data } = await axiosInstance.post("/api/auth/reset-password", {
    token,
    newPassword,
  });
  return data;
}

/* ------------------ MEDIA UPLOAD ------------------ */
export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/api/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgressCallback(percentCompleted);
    },
  });
  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/api/media/delete/${id}`);
  return data;
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/api/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgressCallback(percentCompleted);
    },
  });
  return data;
}

/* ------------------ INSTRUCTOR COURSE ------------------ */
export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get("/api/instructor/course/get");
  return data;
}

export async function addNewCourseService(formData) {
  try {
    console.log("Sending course data:", formData); // Ajoutez ce log
    
    const { data } = await axiosInstance.post("/api/instructor/course/add", formData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      timeout: 10000
    });
    return data;
  } catch (error) {
    console.error("Full error details:", {
      message: error.message,
      response: error.response?.data,
      request: error.request,
      config: error.config
    });
    throw error;
  }
}

export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(`/api/instructor/course/get/details/${id}`);
  return data;
}

export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(`/api/instructor/course/update/${id}`, formData);
  return data;
}

/* ------------------ STUDENT VIEW COURSES ------------------ */
export async function fetchStudentViewCourseListService() {
  try {
    const { data } = await axiosInstance.get('/api/courses');
    return data;
  } catch (error) {
    console.error("Error fetching course list:", error);
    return { success: false, message: "Error fetching course list" };
  }
}

export async function searchCoursesByTitleService(query) {
  try {
    const { data } = await axiosInstance.get(`/api/courses/search?query=${encodeURIComponent(query)}`);   // ✅ Correction d'URL ici
    return {
      success: true,
      data: data.data || [],
    };
  } catch (error) {
    console.error("Service: Erreur lors de la recherche:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function checkCourseEnrollmentService(courseId, studentId) {
  const { data } = await axiosInstance.get(`/api/student/course/enrollment-info/${courseId}/${studentId}`);
  return data;
}

export async function checkCoursePurchaseInfoService(courseId, userId) {
  const { data } = await axiosInstance.get(`/api/student/course/purchase-info/${courseId}/${userId}`);
  return data;
}

/* ------------------ COURSE PROGRESS ------------------ */
export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(`/api/student/progress/get/${userId}/${courseId}`);
  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(`/api/student/progress/mark-lecture-viewed`, {
    userId,
    courseId,
    lectureId,
  });
  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(`/api/student/progress/reset-progress`, {
    userId,
    courseId,
  });
  return data;
}

/* ------------------ ORGANIZATION ------------------ */
export async function getAllOrganizations() {
  const { data } = await axiosInstance.get("/api/organizations");
  return data;
}

export async function createOrganization(formData) {
  const { data } = await axiosInstance.post("/api/organizations/create", formData);
  return data;
}

export async function createOrganizationWithImage(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/api/organizations/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (onProgressCallback) onProgressCallback(percentCompleted);
    },
  });
  return data;
}

export async function getOrganizationDetails(id) {
  const { data } = await axiosInstance.get(`/api/organizations/${id}`);
  return data;
}

export async function deleteOrganizationById(id) {
  const { data } = await axiosInstance.delete(`/api/organizations/${id}`);
  return data;
}

export async function updateOrganization(id, formData) {
  const { data } = await axiosInstance.put(`/api/organizations/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function createUserForOrganization(formData) {
  const { data } = await axiosInstance.post("/api/organizations/create-user", formData);
  return data;
}

/* ------------------ ENROLLMENT ------------------ */
export async function requestCourseEnrollmentService(formData) {
  const { data } = await axiosInstance.post(`/api/student/course/enroll-request`, formData);
  return data;
}

export async function fetchStudentEnrolledCoursesService(studentId) {
  const { data } = await axiosInstance.get(`/api/student/courses-enrolled/get/${studentId}`);
  return data;
}

/* ------------------ USERS (Super Admin) ------------------ */
export async function getAllUsers() {
  const { data } = await axiosInstance.get("/api/users");
  return data;
}

export async function createUser(userData) {
  const { data } = await axiosInstance.post("/api/users", userData);
  return data;
}

export async function updateUser(userId, userData) {
  const { data } = await axiosInstance.put(`/api/users/${userId}`, userData);
  return data;
}

export async function deleteUserService(userId) {
  const { data } = await axiosInstance.delete(`/api/users/${userId}`);
  return data;
}

export async function updateUserRole(userId, role) {
  const { data } = await axiosInstance.put(`/api/users/${userId}/role`, { role });
  return data;
}

export async function getAllCourses() {
  const { data } = await axiosInstance.get("/api/users/courses");
  return data;
}

/* ------------------ COURSE CATEGORIES ------------------ */
export async function getAllCategoriesService() {
  try {
    const { data } = await axiosInstance.get('/api/courses/categories');
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, message: "Error fetching categories" };
  }
}
