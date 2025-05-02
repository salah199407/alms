import React, { useEffect, useState } from "react"
import { Dialog } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateOrganization } from "@/services"
import {
  Building,
  ImageIcon,
  Loader2,
  Save,
  X,
  ArrowLeft,
  Pen,
} from "lucide-react"

const EditOrganizationModal = ({ isOpen, onClose, organization, onSuccess }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (organization && organization._id) {
      setName(organization.name || "")
      setDescription(organization.description || "")
      setPreviewUrl(organization.image || "")
      setImageFile(null)
    }
  }, [organization])

  const handleUpdate = async () => {
    if (!organization?._id) {
      alert("❌ Organization ID is missing.")
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    if (imageFile) formData.append("image", imageFile)

    try {
      const res = await updateOrganization(organization._id, formData)
      if (res.success) {
        onSuccess(res.data)
        onClose()
      } else {
        alert("❌ Error updating organization.")
      }
    } catch (error) {
      console.error("Error in update:", error)
      alert("❌ Unexpected error.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          open={isOpen}
          onClose={() => !isSubmitting && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md rounded-2xl bg-white border-[8px] border-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative rounded-t-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 h-14 opacity-90" />
              <div className="relative px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <Building className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-md font-bold text-white">Edit Organization</h2>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content (scrollbar hidden) */}
            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <Building className="h-4 w-4 mr-2 text-orange-500" />
                  Organization Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Organization name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <Pen className="h-4 w-4 mr-2 text-orange-500" />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSubmitting}
                  rows={4}
                  placeholder="Describe the organization"
                  className="w-full border border-gray-200 rounded-lg shadow-sm p-3 focus:ring-orange-200 focus:border-orange-500 resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                  <ImageIcon className="h-4 w-4 mr-2 text-orange-500" />
                  Upload New Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0]
                    setImageFile(file)
                    setPreviewUrl(URL.createObjectURL(file))
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

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="border-gray-200 hover:bg-gray-50 flex items-center"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  className="bg-orange-500 hover:bg-orange-600 text-white shadow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default EditOrganizationModal
