import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Building,
  ImageIcon,
  Loader2,
  Save,
  ArrowLeft,
  Pen,
  User,
  CheckCircle,
} from "lucide-react";
import Select from "react-select";
import {
  getAllUsers,
  createOrganizationWithImage,
  updateUserRole,
} from "@/services";

const COLORS = {
  orange: "rgb(246, 115, 22)",
  orangeDark: "rgba(246, 115, 22, 0.9)",
};

export default function CreateOrganizationModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [adminUserId, setAdminUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    const fetchUsers = async () => {
      const res = await getAllUsers();
      if (res.success) setUsers(res.data);
    };
    fetchUsers();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      resetForm(false);
    }
  }, [isOpen]);

  const userOptions = users.map((u) => ({
    value: u._id,
    label: `${u.userName} (${u.userEmail})`,
  }));

  const handleCreate = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!adminUserId) newErrors.admin = "Admin user is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      setIsSuccess(true); // ✅ Affiche le message de succès
    } else {
      alert("❌ Failed to create organization.");
    }

    setIsSubmitting(false);
  };

  const resetForm = (close = true) => {
    setName("");
    setDescription("");
    setImageFile(null);
    setPreviewUrl("");
    setAdminUserId("");
    setIsSubmitting(false);
    setErrors({});
    setIsSuccess(false);
    if (close) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md border-[6px] border-white min-h-[500px]">
        {/* Header */}
        <div
          className="pb-4 text-white rounded-md -mt-6 -mx-6 px-6 pt-6"
          style={{
            background: `linear-gradient(to right, ${COLORS.orange}, ${COLORS.orangeDark})`,
          }}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <Building size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Create Organization</h2>
              <p className="text-white/80 text-sm mt-1">
                Fill in the details to create a new organization
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Success Message */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <CheckCircle size={60} className="text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold text-green-600">
              Organization created successfully!
            </h3>
            <p className="text-gray-500 mt-2 text-sm">You can now close this window.</p>
          </div>
        ) : (
          <div className="space-y-5 mt-4">
            {/* Name */}
            <div>
              <Label className="text-gray-700 flex items-center gap-1 mb-1">
                <Building size={16} className="text-orange-500" />
                Name
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Organization name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label className="text-gray-700 flex items-center gap-1 mb-1">
                <Pen size={16} className="text-orange-500" />
                Description
              </Label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
                className="w-full border border-gray-200 rounded-lg shadow-sm p-3 focus:ring-orange-300 focus:border-orange-500 resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Admin */}
            <div>
              <Label className="text-gray-700 flex items-center gap-1 mb-1">
                <User size={16} className="text-orange-500" />
                Admin User
              </Label>
              <Select
                options={userOptions}
                onChange={(opt) => setAdminUserId(opt?.value || "")}
                placeholder="Choose a user"
                value={userOptions.find((u) => u.value === adminUserId) || null}
                isDisabled={isSubmitting}
                isClearable
                noOptionsMessage={() => "No users found"}
              />
              {errors.admin && (
                <p className="text-sm text-red-500 mt-1">{errors.admin}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <Label className="text-gray-700 flex items-center gap-1 mb-1">
                <ImageIcon size={16} className="text-orange-500" />
                Upload Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
                disabled={isSubmitting}
              />
              {previewUrl && (
                <div className="mt-3 flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-40 h-24 object-cover rounded-lg border border-gray-300 shadow"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
              <Button
                variant="outline"
                onClick={() => resetForm()}
                disabled={isSubmitting}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center"
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
        )}
      </DialogContent>
    </Dialog>
  );
}
