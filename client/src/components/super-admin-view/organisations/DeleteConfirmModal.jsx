import React, { useState } from "react"
import Modal from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import {
  Trash2,
  AlertTriangle,
  ArrowLeft,
  X,
  Building,
} from "lucide-react"

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, organization }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!isOpen || !organization) return null

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm(organization._id)
      onClose()
    } catch (err) {
      console.error("Delete failed:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="max-w-md mx-auto">
        {/* 🔴 Header */}
        <div className="relative mb-6 rounded-t-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-90" />
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Delete Organization</h2>
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

        <div className="p-6 pt-0">
          {/* 🔔 Warning */}
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Irreversible Action</h3>
                <p className="mt-1 text-sm text-red-700">
                  This will permanently delete the organization and all its data.
                </p>
              </div>
            </div>
          </div>

          {/* 🏢 Org details */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
            {organization?.image ? (
              <img
                src={organization.image}
                alt={organization.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-red-500 text-white flex items-center justify-center">
                <Building className="h-5 w-5" />
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">You are about to delete</p>
              <p className="text-lg font-bold text-gray-800">{organization.name}</p>
            </div>
          </div>

          {/* ❗ Final text */}
          <p className="mb-6 text-gray-600 text-sm">
            Are you sure you want to continue? This action cannot be undone.
          </p>

          {/* 🔘 Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 flex items-center"
              disabled={isDeleting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Organization
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmModal
