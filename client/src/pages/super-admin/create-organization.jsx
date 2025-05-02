import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // ✅ Ajouté ici
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Building,
  ImageIcon,
  Loader2,
  Save,
  ArrowLeft,
  Pen,
  User,
} from "lucide-react";
import Select from "react-select";
import { getAllUsers, createOrganizationWithImage, updateUserRole } from "@/services";
import { motion } from "framer-motion";

const COLORS = {
  orange: "rgb(246, 115, 22)",
  orangeLight: "rgba(246, 115, 22, 0.1)",
  orangeDark: "rgba(246, 115, 22, 0.8)",
};

const CreateOrganizationModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [adminUserId, setAdminUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setImageFile(null);
      setPreviewUrl("");
      setAdminUserId("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await getAllUsers();
      if (res.success) setUsers(res.data);
    }
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const userOptions = users.map((u) => ({
    value: u._id,
    label: `${u.userName} (${u.userEmail})`,
  }));

  const handleCreate = async () => {
    if (!name || !adminUserId) {
      alert("Name and Admin are required.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("adminUserId", adminUserId);
    if (imageFile) formData.append("image", imageFile);

    const res = await createOrganizationWithImage(formData);
    if (res.success) {
      await updateUserRole(adminUserId, "org_admin");
      onSuccess?.(res.data);
      onClose();
    } else {
      alert("❌ Failed to create organization.");
    }

    setIsSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-2xl w-full mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Header */}
        <div
          className="p-6 text-white"
          style={{
            background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.orangeDark})`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <Building size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create Organization</h2>
              <p className="text-white/80 text-sm mt-1">
                Fill out the form to create a new organization
              </p>
            </div>
          </motion.div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <Label className="text-sm flex items-center gap-2 text-gray-700 mb-1">
              <Building size={16} className="text-orange-500" />
              Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Organization name"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label className="text-sm flex items-center gap-2 text-gray-700 mb-1">
              <Pen size={16} className="text-orange-500" />
              Description
            </Label>
            <textarea
              className="w-full border border-gray-200 rounded-lg shadow-sm p-3 focus:ring-orange-200 focus:border-orange-500 resize-none"
              rows="3"
              placeholder="Describe the organization..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label className="text-sm flex items-center gap-2 text-gray-700 mb-1">
              <User size={16} className="text-orange-500" />
              Admin User
            </Label>
            <Select
              options={userOptions}
              onChange={(selected) => setAdminUserId(selected?.value || "")}
              value={userOptions.find((u) => u.value === adminUserId) || null}
              isDisabled={isSubmitting}
              placeholder="Search and select a user"
              className="rounded-md border border-gray-200"
              isClearable
              noOptionsMessage={() => "No users found"}
            />
          </div>

          <div>
            <Label className="text-sm flex items-center gap-2 text-gray-700 mb-1">
              <ImageIcon size={16} className="text-orange-500" />
              Upload Image
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              }}
              disabled={isSubmitting}
            />
            {previewUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-44 h-28 object-cover rounded-lg border border-gray-300 shadow"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <Button
              onClick={onClose} // Close modal on cancel
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 flex items-center"
              disabled={isSubmitting}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-orange-500 hover:bg-orange-600 text-white shadow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Organization
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// ✅ Ajout de PropTypes
CreateOrganizationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func, // pas obligatoire
};

export default CreateOrganizationModal;
