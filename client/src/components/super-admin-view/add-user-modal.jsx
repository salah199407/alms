import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllOrganizations } from "@/services";

export default function AddUserModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    role: "",
    organizationId: null,
  });

  const [organizations, setOrganizations] = useState([]);
  const [errors, setErrors] = useState({});

  // Load organizations when modal opens
  useEffect(() => {
    if (isOpen) {
      loadOrganizations();
    }
  }, [isOpen]);

  const loadOrganizations = async () => {
    const res = await getAllOrganizations();
    if (res.success) setOrganizations(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRoleChange = (value) => {
    setUserData((prev) => ({
      ...prev,
      role: value,
      organizationId:
        value === "org_admin" || value === "instructor"
          ? prev.organizationId
          : null,
    }));
    if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
  };

  const handleOrgChange = (value) => {
    setUserData((prev) => ({ ...prev, organizationId: value }));
    if (errors.organizationId) setErrors((prev) => ({ ...prev, organizationId: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.userName) newErrors.userName = "UserName is required.";
    if (!userData.userEmail || !/\S+@\S+\.\S+/.test(userData.userEmail))
      newErrors.userEmail = "Valid userEmail is required.";
    if (!userData.role) newErrors.role = "Role is required.";
    if (
      (userData.role === "org_admin" || userData.role === "instructor") &&
      !userData.organizationId
    ) {
      newErrors.organizationId = "Organization is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(userData); // ⚠️ Password is generated in the backend
      setErrors({});
    } catch (err) {
      if (err.response?.data?.message) {
        const message = err.response.data.message;

        if (message.includes("userName")) {
          setErrors((prev) => ({ ...prev, userName: message }));
        } else if (message.includes("userEmail")) {
          setErrors((prev) => ({ ...prev, userEmail: message }));
        } else if (message.includes("role")) {
          setErrors((prev) => ({ ...prev, role: message }));
        } else {
          setErrors((prev) => ({ ...prev, general: message }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Unexpected error. Please try again.",
        }));
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white rounded-lg overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">Create User</h2>

        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* UserName */}
          <div>
            <Label>UserName</Label>
            <Input
              name="userName"
              placeholder="Full name"
              value={userData.userName}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
          </div>

          {/* UserEmail */}
          <div>
            <Label>UserEmail</Label>
            <Input
              name="userEmail"
              type="userEmail"
              placeholder="user@example.com"
              value={userData.userEmail}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.userEmail && <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>}
          </div>

          {/* Role */}
          <div>
            <Label>Role</Label>
            <Select value={userData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="org_admin">Organization Admin</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Organization (only visible for org_admin or instructor) */}
          {(userData.role === "org_admin" || userData.role === "instructor") && (
            <div>
              <Label>Organization</Label>
              <Select
                value={userData.organizationId || ""}
                onValueChange={handleOrgChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org._id} value={org._id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.organizationId && (
                <p className="text-red-500 text-sm mt-1">{errors.organizationId}</p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
