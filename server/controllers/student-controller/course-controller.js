const StudentCourses = require("../../models/StudentCourses");
const Course = require("../../models/Course");

// Student requests to enroll in a course
const requestCourseEnrollment = async (req, res) => {
  try {
    const { userId, courseId, studentName, studentEmail } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const studentCourses = await StudentCourses.findOne({ userId });
    if (studentCourses) {
      const alreadyRequested = studentCourses.courses.some(course => course.courseId === courseId);
      if (alreadyRequested) {
        return res.status(400).json({ success: false, message: "Enrollment already requested" });
      }

      studentCourses.courses.push({ courseId, title: course.title, instructorId: course.instructorId, status: "pending" });
      await studentCourses.save();
    } else {
      const newEnrollment = new StudentCourses({
        userId,
        courses: [{ courseId, title: course.title, instructorId: course.instructorId, status: "pending" }],
      });
      await newEnrollment.save();
    }

    res.status(201).json({ success: true, message: "Enrollment request sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error processing request" });
  }
};

// Instructor approves/rejects enrollment
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { courseId, studentId, status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const studentCourses = await StudentCourses.findOne({ userId: studentId });
    if (!studentCourses) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const courseIndex = studentCourses.courses.findIndex(course => course.courseId === courseId);
    if (courseIndex === -1) {
      return res.status(404).json({ success: false, message: "Course not found in student's enrollment" });
    }

    studentCourses.courses[courseIndex].status = status;
    await studentCourses.save();

    await Course.findByIdAndUpdate(courseId, {
      $set: { "students.$[elem].status": status },
    }, { arrayFilters: [{ "elem.studentId": studentId }] });

    res.status(200).json({ success: true, message: `Enrollment ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

// Get courses for a specific student
const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({ userId: studentId });

    if (!studentCourses) {
      return res.status(404).json({ success: false, message: "No courses found" });
    }

    res.status(200).json({ success: true, data: studentCourses.courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving courses" });
  }
};

// Get approved courses for a student
const getApprovedCourses = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({ userId: studentId });

    if (!studentCourses) {
      return res.status(404).json({ success: false, message: "No courses found" });
    }

    const approvedCourses = studentCourses.courses.filter(course => course.status === "approved");

    res.status(200).json({ success: true, data: approvedCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving approved courses" });
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
      message: "Some error occurred!",
    });
  }
};

// Ensure all functions are exported
module.exports = {
  getCoursesByStudentId,
  requestCourseEnrollment,
  updateEnrollmentStatus,
  getAllCourses,
  getApprovedCourses,
};
