const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // ✅ nouveau
  image: { type: String },       // ✅ nouveau
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Organization", OrganizationSchema);
