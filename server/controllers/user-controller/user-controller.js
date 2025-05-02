const User = require("../../models/User");
const Organization = require("../../models/Organization");
const bcrypt = require("bcryptjs");
const generateTempPassword = require("../../utils/generateTempPassword");
const sendUserEmail = require("../../utils/emailService");

// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "userName userEmail role createdAt lastLogin");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving users.",
    });
  }
}

// ✅ Update user role
const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ success: false, message: "Role is required." });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      data: user,
    })
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ✅ Update user info
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { userName, userEmail, role } = req.body;

  if (!userName || !userEmail || !role) {
    return res.status(400).json({
      success: false,
      message: "Required fields: userName, userEmail, role.",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userName, userEmail, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ✅ Delete user
const deleteUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findByIdAndDelete(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ✅ Update last login timestamp
const updateLastLogin = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, { lastLogin: new Date() });
    return true;
  } catch (error) {
    console.error("Error updating last login:", error);
    return false;
  }
};

// ✅ Create a new user with temporary password + userEmail notification
const createUser = async (req, res) => {
  const { userName, userEmail, role, organizationId } = req.body;

  const allowedRoles = ["super_admin", "org_admin", "instructor"];
  if (!userName || !userEmail || !role) {
    return res.status(400).json({
      success: false,
      message: "Required fields: userName, userEmail, role.",
    });
  }

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized role provided.",
    });
  }

  try {
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "UserEmail is already in use." });
    }

    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = new User({
      userName,
      userEmail,
      password: hashedPassword,
      role,
      organizationId: organizationId || null,
    });

    await user.save();

    let orgName = "ODC LMS";
    if (organizationId) {
      const org = await Organization.findById(organizationId);
      if (org) orgName = org.name;
    }

    const loginUrl = `${process.env.CLIENT_URL}/login`;

    await sendUserEmail({
      to: userEmail,
      subject: `Welcome to ${orgName}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#333">
          <h2>Hello ${userName},</h2>
          <p>You have been added as a <strong>${role}</strong> in <strong>${orgName}</strong>.</p>
          <p><strong>UserEmail:</strong> ${userEmail}<br/>
             <strong>Temporary Password:</strong> ${tempPassword}</p>
          <p>Click here to log in: <a href="${loginUrl}">${loginUrl}</a></p>
          <p style="margin-top:20px;font-size:13px;color:#666;">The ${orgName} Team</p>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message: "User created and welcome userEmail sent.",
      data: {
        _id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// ✅ Exports
module.exports = {
  getAllUsers,
  updateUserRole,
  updateUser,
  deleteUser,
  updateLastLogin,
  createUser,
};
