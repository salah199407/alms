const mongoose = require("mongoose");

const StudentCoursesSchema = new mongoose.Schema({
  userId: String,
  courses: [
    {
      courseId: String,
      title: String,
      instructorId: String,
      instructorName: String,
      dateRequested: { type: Date, default: Date.now },
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
      courseImage: String,
    },
  ],
});

module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);

