const express = require("express");
const {
  getCoursesByStudentId,
  requestCourseEnrollment,
  updateEnrollmentStatus,
  getApprovedCourses,
  getAllCourses, // Add this import
} = require("../../controllers/student-controller/course-controller"); // Corrected import path

const router = express.Router();

// Fetch all courses
router.get("/get", getAllCourses); // Add this route

// Fetch all courses requested/enrolled by a student
router.get("/get/:studentId", getCoursesByStudentId);

// Student requests enrollment in a course
router.post("/enroll/request", requestCourseEnrollment);

// Instructor approves or rejects enrollment
router.put("/enroll/update", updateEnrollmentStatus);

// Get approved courses for a student
router.get("/enroll/approved/:studentId", getApprovedCourses);

module.exports = router;
