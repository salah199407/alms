

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["super_admin", "org_admin", "instructor", "student"], 
    required: true 
  },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", default: null },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);





