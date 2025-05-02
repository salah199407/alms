import { User, Mail, Clock, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// 🎨 Couleurs personnalisées
const COLORS = {
  orange: "rgb(246, 115, 22)",
  orangeLight: "rgba(246, 115, 22, 0.1)",
}

// 📌 Badge de rôle
const getRoleBadgeColor = (role) => {
  switch (role) {
    case "super_admin":
      return "bg-purple-100 text-purple-800 border border-purple-200"
    case "org_admin":
      return "bg-blue-100 text-blue-800 border border-blue-200"
    case "instructor":
      return "bg-green-100 text-green-800 border border-green-200"
    case "student":
      return "bg-orange-100 text-orange-800 border border-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200"
  }
}

// 🕒 Format de date
const formatDate = (dateString) => {
  if (!dateString || dateString === "null") return "N/A"
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "N/A"
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return "N/A"
  }
}

export default function UserDetailModal({ user, onClose, onEdit, onDelete }) {
  return (
    <div className="max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
        <div className="flex items-center">
          <div className="w-1 h-10 rounded-sm mr-3" style={{ background: COLORS.orange }}></div>
          <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="rounded-full h-8 w-8 p-0 flex items-center justify-center"
        >
          ✕
        </Button>
      </div>

      {/* Corps du modal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Colonne Avatar & Info */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 flex flex-col items-center shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div
              className="h-24 w-24 rounded-full text-white flex items-center justify-center text-3xl font-bold shadow-xl ring-4 ring-white mb-4"
              style={{ background: COLORS.orange }}
            >
              {user.userName?.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{user.userName}</h3>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-sm mt-2 ${getRoleBadgeColor(user.role)}`}
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* Colonne Infos */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-orange-500" />
              Personal Information
            </h4>

            <div className="space-y-4">
              {/* ID */}
              <div className="flex flex-col space-y-1 bg-gray-50 p-3 rounded-lg">
                <span className="text-xs font-medium text-gray-500">User ID</span>
                <code className="text-sm font-mono bg-white px-3 py-1.5 rounded border border-gray-200 text-gray-800 overflow-x-auto whitespace-nowrap">
                  {user._id}
                </code>
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1 bg-gray-50 p-3 rounded-lg">
                <span className="text-xs font-medium text-gray-500">Email</span>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-800">{user.userEmail}</span>
                </div>
              </div>

              {/* Date de création */}
              <div className="flex flex-col space-y-1 bg-gray-50 p-3 rounded-lg">
                <span className="text-xs font-medium text-gray-500">Created on</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-800">{formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Quick Actions</h4>
              <div className="flex space-x-2">
                <Button
                  onClick={onEdit}
                  variant="outline"
                  size="sm"
                  className="rounded-lg transition-transform hover:-translate-y-1"
                  style={{ color: COLORS.orange, borderColor: COLORS.orangeLight }}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  onClick={onDelete}
                  variant="outline"
                  size="sm"
                  className="rounded-lg text-red-600 border-red-200 hover:bg-red-50 transition-transform hover:-translate-y-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
