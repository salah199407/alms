// const express = require("express");
// const router = express.Router();
// const {
//   getAllCoursesForHome,
//   getCourseDetailsForHome,
//   searchCoursesByTitle,
// } = require("../../controllers/course-controller/course-home-controller");

// // ✅ Public route to get all courses (with filters)
// router.get("/", getAllCoursesForHome);

// // ✅ Public route to search courses by title
// router.get("/search", searchCoursesByTitle);

// // ✅ Public route to get course details by ID
// router.get("/:id", getCourseDetailsForHome);

// module.exports = router;


const express = require("express")
const router = express.Router()
const {
  getAllCoursesForHome,
  getCourseDetailsForHome,
  searchCoursesByTitle,
} = require("../../controllers/course-controller/course-home-controller")

// ✅ Public route to get all courses (with filters)
router.get("/", getAllCoursesForHome)

// ✅ Public route to search courses by title
// CORRECTION: Accepter plusieurs paramètres de recherche possibles
router.get("/search", searchCoursesByTitle)

// ✅ Public route to get course details by ID
router.get("/:id", getCourseDetailsForHome)

module.exports = router
