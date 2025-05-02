const Course = require("../../models/Course");

const getAllCourses = async (req, res) => {
  try {
    // Fetch all courses for super_admin
    const courses = await Course.find({}); // Adjust query if needed for filtering
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
    });
  }
};

module.exports = { getAllCourses };
