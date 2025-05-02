"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createUserService } from "@/services"
import { ChevronDown } from "lucide-react"

export default function AddUserForm({ onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
    role: "student",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (e) => {
    setFormData((prev) => ({ ...prev, role: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await createUserService(formData)

      if (response.success) {
        onUserAdded(response.data)
        onClose()
      } else {
        setError(response.message || "Une erreur est survenue lors de la création de l'utilisateur")
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error)
      setError("Une erreur est survenue lors de la création de l'utilisateur")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <div className="w-1 h-8 bg-orange-500 rounded-sm mr-2"></div>
        <h2 className="text-xl font-bold text-gray-800">Ajouter un utilisateur</h2>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Nom d'utilisateur</label>
          <Input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="w-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
          <Input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleInputChange}
            className="w-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Mot de passe</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Rôle</label>
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleRoleChange}
              className="w-full appearance-none border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              required
            >
              <option value="super_admin">Super Admin</option>
              <option value="org_admin">Org Admin</option>
              <option value="instructor">Instructor</option>
              <option value="student">Student</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="button" onClick={onClose} variant="outline" className="mr-2 border-gray-200">
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600 text-white">
            {isSubmitting ? "Création en cours..." : "Créer l'utilisateur"}
          </Button>
        </div>
      </form>
    </div>
  )
}

