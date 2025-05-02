"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Modal from "@/components/ui/modal"
import { useState, useEffect } from "react"
import { Loader2, User, Mail, Shield, X, Save, ArrowLeft } from "lucide-react"

export default function EditUserModal({ isOpen, onClose, onSubmit, user, isLoading }) {
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    role: "",
  })

  useEffect(() => {
    if (user) {
      setUserData({
        userName: user.userName || "",
        userEmail: user.userEmail || "",
        role: user.role || "",
      })
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  // Get the role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "org_admin":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "instructor":
        return "bg-green-100 text-green-800 border-green-200"
      case "student":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="max-w-2xl mx-auto">
        {/* Header with gradient background */}
        <div className="relative mb-6 rounded-t-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-90"></div>
          <div className="relative p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Edit User</h2>
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
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(userData)
            }}
            className="space-y-6"
          >
            {/* User avatar and current role */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="h-16 w-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                {userData.userName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-gray-500 mb-1">Profile update</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-800">{userData.userName}</h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(userData.role)}`}
                  >
                    {userData.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="h-4 w-4 mr-2 text-orange-500" />
                    Username
                  </label>
                </div>
                <Input
                  type="text"
                  name="userName"
                  value={userData.userName}
                  onChange={handleInputChange}
                  className="w-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-lg"
                  disabled={isLoading}
                  placeholder="Enter the username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-orange-500" />
                    Email
                  </label>
                </div>
                <Input
                  type="email"
                  name="userEmail"
                  value={userData.userEmail}
                  onChange={handleInputChange}
                  className="w-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-lg"
                  disabled={isLoading}
                  placeholder="Enter the email address"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-orange-500" />
                    Role
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="role"
                    value={userData.role}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 pl-3 pr-10 py-2 appearance-none bg-white"
                    disabled={isLoading}
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="org_admin">Org Admin</option>
                    <option value="instructor">Instructor</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-gray-200 hover:bg-gray-50 flex items-center"
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
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
          </form>
        </div>
      </div>
    </Modal>
  )
}
