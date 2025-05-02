const { uploadMediaToCloudinary } = require("../../helpers/cloudinary");
const Organization = require("../../models/Organization");
const User = require("../../models/User");

// ✅ CREATE ORGANIZATION
const createOrganization = async (req, res) => {
    try {
        const { name, adminUserId, description } = req.body;

        const superAdmin = await User.findById(req.user._id);
        if (!superAdmin || superAdmin.role !== "super_admin") {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        let imageUrl = null;
        if (req.file) {
            const uploadResult = await uploadMediaToCloudinary(req.file.path);
            imageUrl = uploadResult.secure_url;
        }

        const newOrg = new Organization({
            name,
            description,
            image: imageUrl,
            createdBy: superAdmin._id,
            admins: [adminUserId]
        });

        await newOrg.save();

        await User.findByIdAndUpdate(adminUserId, {
            role: "org_admin",
            organizationId: newOrg._id
        });

        res.status(201).json({ success: true, data: newOrg });
    } catch (error) {
        console.error("Error creating organization:", error);
        res.status(500).json({ success: false, message: "Error", error: error.message });
    }
};

// ✅ UPDATE ORGANIZATION
const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        let updateData = { name, description };
        if (req.file) {
            const uploadResult = await uploadMediaToCloudinary(req.file.path);
            updateData.image = uploadResult.secure_url;
        }

        const updatedOrg = await Organization.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedOrg) {
            return res.status(404).json({ success: false, message: "Organization not found" });
        }

        res.status(200).json({ success: true, message: "Organization updated", data: updatedOrg });
    } catch (error) {
        console.error("Error updating organization:", error);
        res.status(500).json({ success: false, message: "Error updating organization", error: error.message });
    }
};

// ✅ DELETE ORGANIZATION
const deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrg = await Organization.findByIdAndDelete(id);
        if (!deletedOrg) {
            return res.status(404).json({ success: false, message: "Organization not found" });
        }

        // Clean up users
        await User.updateMany({ organizationId: id }, { organizationId: null });

        res.status(200).json({ success: true, message: "Organization deleted" });
    } catch (error) {
        console.error("Error deleting organization:", error);
        res.status(500).json({ success: false, message: "Error deleting organization", error: error.message });
    }
};

// ✅ CREATE USER FOR ORG
const createUserForOrganization = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const orgAdmin = await User.findById(req.user._id);

        if (!orgAdmin || orgAdmin.role !== "org_admin") {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        const newUser = new User({ userName: name, userEmail: email, password, role, organizationId: orgAdmin.organizationId });
        await newUser.save();

        const field = role === "org_admin" ? "admins" : "instructors";
        await Organization.findByIdAndUpdate(orgAdmin.organizationId, { $push: { [field]: newUser._id } });

        res.status(201).json({ success: true, message: "User created successfully", data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
};

// ✅ GET ALL ORGS
const getAllOrganizations = async (req, res) => {
    try {
        const superAdmin = await User.findById(req.user._id);
        if (!superAdmin || superAdmin.role !== "super_admin") {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        const organizations = await Organization.find({});
        res.status(200).json({ success: true, data: organizations });
    } catch (error) {
        console.error("Error fetching organizations:", error);
        res.status(500).json({ success: false, message: "Error fetching organizations", error: error.message });
    }
};

// ✅ GET ORG DETAILS
const getOrganizationDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const organization = await Organization.findById(id).populate("admins instructors students");

        if (!organization) {
            return res.status(404).json({ success: false, message: "Organization not found" });
        }

        res.status(200).json({ success: true, data: organization });
    } catch (error) {
        console.error("Error fetching organization details:", error);
        res.status(500).json({ success: false, message: "Error fetching organization details", error: error.message });
    }
};

module.exports = {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    createUserForOrganization,
    getAllOrganizations,
    getOrganizationDetails
};
