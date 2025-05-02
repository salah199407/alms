
const Course = require("../../models/Course")

// ✅ Get all courses with filters (Public Access)
exports.getAllCoursesForHome = async (req, res) => {
  try {
    const { category, level, language, sortBy } = req.query
    const filter = {}

    // 🌟 Apply filters
    if (category) filter.category = category
    if (level) filter.level = level
    if (language) filter.primaryLanguage = language

    let query = Course.find(filter)

    // 🌟 Apply Sorting
    if (sortBy === "newest") query = query.sort({ createdAt: -1 })
    if (sortBy === "alphabetical") query = query.sort({ title: 1 })

    const courses = await query.exec()

    res.status(200).json({ success: true, data: courses })
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching courses", error })
  }
}

// ✅ Get a single course by ID (Public Access)
exports.getCourseDetailsForHome = async (req, res) => {
  console.log("Controller hit: getCourseDetailsForHome with ID:", req.params.id)
  try {
    const courseId = req.params.id

    // Validate the course ID
    if (!courseId || courseId.length !== 24) {
      console.error("Invalid course ID:", courseId)
      return res.status(400).json({ success: false, message: "Invalid course ID" })
    }

    const course = await Course.findById(courseId)
    if (!course) {
      console.error("Course not found for ID:", courseId)
      return res.status(404).json({ success: false, message: "Course not found" })
    }

    console.log("Course found:", course)
    res.status(200).json({ success: true, data: course })
  } catch (error) {
    console.error("Error fetching course details:", error)
    res.status(500).json({ success: false, message: "Error fetching course details", error })
  }
}

// Modifier la fonction searchCoursesByTitle pour supprimer les console.log
exports.searchCoursesByTitle = async (req, res) => {
  try {
    // Vérifier tous les paramètres possibles
    const searchQuery = req.query.query || req.query.q || req.query.title || ""

    if (!searchQuery) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "Veuillez fournir un terme de recherche",
      })
    }

    // Recherche insensible à la casse avec une expression régulière
    const courses = await Course.find(
      { title: { $regex: new RegExp(searchQuery, "i") } },
      { title: 1, category: 1, level: 1, primaryLanguage: 1, description: 1, image: 1 },
    )

    res.status(200).json({
      success: true,
      data: courses,
      count: courses.length,
    })
  } catch (error) {
    console.error("Erreur lors de la recherche:", error)
    res.status(500).json({ success: false, message: "Error searching courses", error })
  }
}
