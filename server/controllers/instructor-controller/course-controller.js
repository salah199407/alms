const Course = require("../../models/Course");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;

    // Validation minimale
    if (!courseData.title || !courseData.category || !courseData.description) {
      return res.status(400).json({
        success: false,
        message: "Title, category and description are required"
      });
    }

    if (!courseData.curriculum || !Array.isArray(courseData.curriculum) || courseData.curriculum.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one module is required"
      });
    }

    // Ajout des valeurs par défaut
    const completeCourseData = {
      ...courseData,
      approvalStatus: "pending",
      isPublished: false,
      date: new Date(),
      students: [],
      reviews: []
    };

    console.log("Saving course with data:", completeCourseData);

    const newCourse = new Course(completeCourseData);
    const savedCourse = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: savedCourse
    });

  } catch (error) {
    console.error("Error saving course:", {
      message: error.message,
      stack: error.stack,
      errors: error.errors
    });

    let errorMessage = "Failed to create course";
    if (error.name === 'ValidationError') {
      errorMessage = "Validation error: " + Object.values(error.errors).map(e => e.message).join(', ');
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      errors: error.errors
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getCourseDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateCourseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;
    delete updatedCourseData.pricing; // Remove pricing field if present

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

// Get all categories including custom ones
const getAllCategories = async (req, res) => {
  try {
    // Get all courses to extract unique categories
    const courses = await Course.find({});
    
    // Create a Set to store unique categories
    const categoriesSet = new Set();
    
    // Extract categories from courses
    courses.forEach(course => {
      if (course.category) {
        categoriesSet.add(JSON.stringify({
          name: course.category.name,
          isCustom: course.category.isCustom
        }));
      }
    });

    // Convert Set to Array and parse JSON strings
    const categories = Array.from(categoriesSet).map(cat => JSON.parse(cat));

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching categories"
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseByID,
  getCourseDetailsByID,
  getAllCategories
};
