// const User = require("../../../models/User")
// const bcrypt = require("bcryptjs")

// export default async function handler(req, res) {
//   // GET request - fetch all users
//   if (req.method === "GET") {
//     try {
//       const users = await User.find({}, "userName userEmail role")
//       return res.status(200).json({
//         success: true,
//         data: users,
//       })
//     } catch (error) {
//       console.error("Error fetching users:", error)
//       return res.status(500).json({
//         success: false,
//         message: "Error fetching users",
//       })
//     }
//   }

//   // POST request - create a new user
//   if (req.method === "POST") {
//     try {
//       const { userName, userEmail, password, role } = req.body

//       // Validate required fields
//       if (!userName || !userEmail || !password || !role) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide all required fields",
//         })
//       }

//       // Check if user with this email already exists
//       const existingUser = await User.findOne({ userEmail })
//       if (existingUser) {
//         return res.status(400).json({
//           success: false,
//           message: "User with this email already exists",
//         })
//       }

//       // Hash the password
//       const salt = await bcrypt.genSalt(10)
//       const hashedPassword = await bcrypt.hash(password, salt)

//       // Create new user
//       const newUser = new User({
//         userName,
//         userEmail,
//         password: hashedPassword,
//         role,
//       })

//       await newUser.save()

//       // Return the user without the password
//       const userResponse = {
//         _id: newUser._id,
//         userName: newUser.userName,
//         userEmail: newUser.userEmail,
//         role: newUser.role,
//       }

//       return res.status(201).json({
//         success: true,
//         message: "User created successfully",
//         data: userResponse,
//       })
//     } catch (error) {
//       console.error("Error creating user:", error)
//       return res.status(500).json({
//         success: false,
//         message: "Error creating user",
//       })
//     }
//   }

//   // Return 405 for other methods
//   return res.status(405).json({
//     success: false,
//     message: "Method not allowed",
//   })
// }

"use client"

import { useEffect, useState } from "react"
import { getAllOrganizations, getAllUsers, getAllCourses, updateUserRole, deleteUserService } from "@/services"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import Modal from "@/components/ui/modal"
import { Building, User, BookOpen, Plus, Edit, Trash2, Eye, ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import AddUserForm from "@/components/add-user-form"

function SuperAdminDashboard({ tab }) {
  const [organizations, setOrganizations] = useState([])
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [adminFormData, setAdminFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  async function fetchData() {
    if (tab === "organizations") {
      const orgsResponse = await getAllOrganizations()
      if (orgsResponse.success) setOrganizations(orgsResponse.data)
    } else if (tab === "users") {
      const usersResponse = await getAllUsers()
      if (usersResponse.success) setUsers(usersResponse.data)
    } else if (tab === "courses") {
      const coursesResponse = await getAllCourses()
      if (coursesResponse.success) setCourses(coursesResponse.data)
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setAdminFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleCreateAdmin(orgId) {
    setShowModal(true)
  }

  function handleSubmitAdmin() {
    console.log("Admin data submitted:", adminFormData)
    setShowModal(false)
  }

  function handleAddUser() {
    setShowAddUserModal(true)
  }

  function handleUserAdded(newUser) {
    setUsers((prevUsers) => [...prevUsers, newUser])
  }

  async function handleRoleChange(userId, newRole) {
    try {
      const response = await updateUserRole(userId, newRole)
      if (response.success) {
        setUsers((prevUsers) => prevUsers.map((user) => (user._id === userId ? { ...user, role: newRole } : user)))
        console.log("Role updated successfully")
      }
    } catch (error) {
      console.error("Error updating role:", error)
    }
  }

  function handleEditUser(userId) {
    console.log("Edit user:", userId)
    // Implement edit functionality here
  }

  async function handleDeleteUser(userId) {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return
    }

    try {
      const response = await deleteUserService(userId)
      if (response.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
        console.log("User deleted successfully")
      } else {
        console.error("Failed to delete user:", response.message)
      }
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  function handleViewUserDetails(user) {
    setSelectedUser(user)
    setShowModal(true)
  }

  // Filter data based on search term
  const filteredData = () => {
    if (tab === "organizations") {
      return organizations.filter((org) => org.name.toLowerCase().includes(searchTerm.toLowerCase()))
    } else if (tab === "users") {
      return users.filter(
        (user) =>
          user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    } else if (tab === "courses") {
      return courses.filter(
        (course) =>
          course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructorName?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return []
  }

  useEffect(() => {
    fetchData()
  }, [tab])

  // Get the icon based on the current tab
  const getTabIcon = () => {
    if (tab === "organizations") return <Building className="h-6 w-6 text-orange-500" />
    if (tab === "users") return <User className="h-6 w-6 text-orange-500" />
    if (tab === "courses") return <BookOpen className="h-6 w-6 text-orange-500" />
    return null
  }

  // Get the title based on the current tab
  const getTabTitle = () => {
    if (tab === "organizations") return "Organizations"
    if (tab === "users") return "Users"
    if (tab === "courses") return "Courses"
    return ""
  }

  // Get the button text based on the current tab
  const getActionButtonText = () => {
    if (tab === "organizations") return "Create Organization"
    if (tab === "users") return "Add User"
    if (tab === "courses") return "Add Course"
    return ""
  }

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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          {getTabIcon()}
          <h2 className="text-2xl font-bold ml-2 text-gray-800">
            <span className="border-b-2 border-orange-500 pb-1">{getTabTitle()}</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder={`Search ${getTabTitle()}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-64 border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            />
          </div>

          {tab !== "courses" && (
            <Button
              onClick={
                tab === "organizations"
                  ? () => navigate("/super-admin/create-organization")
                  : tab === "users"
                    ? handleAddUser
                    : () => {}
              }
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              {getActionButtonText()}
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {tab === "organizations" && (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Admins</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData().map((org) => (
                <TableRow key={org.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
                      {org.admins.length} Admins
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleCreateAdmin(org.id)}
                      variant="outline"
                      size="sm"
                      className="text-orange-600 border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Create Admin
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {tab === "users" && (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Email</TableHead>
                <TableHead className="font-semibold text-gray-700">Role</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData().map((user) => (
                <TableRow key={user._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.userName}</TableCell>
                  <TableCell>{user.userEmail}</TableCell>
                  <TableCell>
                    <div className="relative inline-block">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className={`appearance-none ${getRoleBadgeColor(user.role)} border rounded-full px-3 py-1 pr-8 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-300`}
                      >
                        <option value="super_admin">Super Admin</option>
                        <option value="org_admin">Org Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="student">Student</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 pointer-events-none" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleViewUserDetails(user)}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 p-1 h-8 w-8"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleEditUser(user._id)}
                        variant="outline"
                        size="sm"
                        className="text-orange-600 border-orange-200 hover:bg-orange-50 p-1 h-8 w-8"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteUser(user._id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 p-1 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {tab === "courses" && (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Title</TableHead>
                <TableHead className="font-semibold text-gray-700">Instructor</TableHead>
                <TableHead className="font-semibold text-gray-700">Students</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData().map((course) => (
                <TableRow key={course.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.instructorName}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-800 border border-green-200">
                      {course.students.length} Students
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 p-1 h-8 w-8"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Modal for creating admin */}
      {showModal && !selectedUser && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-orange-500 rounded-sm mr-2"></div>
              <h2 className="text-xl font-bold text-gray-800">Create Admin</h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Username</label>
                <Input
                  type="text"
                  name="username"
                  value={adminFormData.username}
                  onChange={handleInputChange}
                  className="w-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={adminFormData.email}
                  onChange={handleInputChange}
                  className="w-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={adminFormData.password}
                  onChange={handleInputChange}
                  className="w-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setShowModal(false)} variant="outline" className="mr-2 border-gray-200">
                  Cancel
                </Button>
                <Button onClick={handleSubmitAdmin} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Create Admin
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Modal for adding a new user */}
      {showAddUserModal && (
        <Modal onClose={() => setShowAddUserModal(false)}>
          <AddUserForm onClose={() => setShowAddUserModal(false)} onUserAdded={handleUserAdded} />
        </Modal>
      )}

      {/* Modal for displaying user details */}
      {showModal && selectedUser && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-orange-500 rounded-sm mr-2"></div>
              <h2 className="text-xl font-bold text-gray-800">User Details</h2>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xl font-bold">
                  {selectedUser.userName?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>

              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">{selectedUser.userName}</h3>
                <p className="text-gray-500">{selectedUser.userEmail}</p>
              </div>

              <div className="flex justify-center">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(selectedUser.role)}`}
                >
                  {selectedUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-500">User ID</span>
                <span className="text-gray-800">{selectedUser._id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-500">Created At</span>
                <span className="text-gray-800">{selectedUser.createdAt || "N/A"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-500">Last Login</span>
                <span className="text-gray-800">{selectedUser.lastLogin || "N/A"}</span>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={() => setShowModal(false)} className="bg-orange-500 hover:bg-orange-600 text-white">
                Fermer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default SuperAdminDashboard

