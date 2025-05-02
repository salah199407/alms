import React, { useEffect, useState } from "react"
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUserService,
  updateUserRole,
} from "@/services"

import {
  Search,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Building,
  GraduationCap,
  Filter,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table"

import DeleteConfirmationModal from "@/components/super-admin-view/delete-confirmation-modal"
import EditUserModal from "@/components/super-admin-view/edit-user-modal"
import AddUserModal from "@/components/super-admin-view/add-user-modal"
import Modal from "@/components/ui/modal"
import Header from "@/components/super-admin-view/common/Header";
import Sidebar from "@/components/super-admin-view/Sidebar"
import UserDetailModal from "@/components/super-admin-view/UserDetailModal"

const COLORS = {
  orange: "rgb(246, 115, 22)",
  orangeLight: "rgba(246, 115, 22, 0.1)",
  blue: "rgb(59, 130, 246)",
  green: "rgb(120, 210, 160)",
}

const USERS_PER_PAGE = 5

const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    const res = await getAllUsers()
    if (res.success) setUsers(res.data)
    setIsLoading(false)
  }

  const filteredUsers = users
    .filter((user) =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => activeFilter === "all" || user.role === activeFilter)

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  )

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const getStatistics = () => [
    {
      title: "Total Users",
      icon: <Users className="text-white" />,
      count: users.length,
      bg: COLORS.orange,
    },
    {
      title: "Org Admins",
      icon: <Building className="text-white" />,
      count: users.filter((u) => u.role === "org_admin").length,
      bg: COLORS.blue,
    },
    {
      title: "Instructors",
      icon: <GraduationCap className="text-white" />,
      count: users.filter((u) => u.role === "instructor").length,
      bg: COLORS.green,
    },
  ]

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setEditMode(true)
    setShowModal(true)
  }

  const handleDeleteUser = async () => {
    const res = await deleteUserService(selectedUser._id)
    if (res.success) {
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id))
      setDeleteConfirmOpen(false)
      setSelectedUser(null)
    }
  }

  const handleAddUser = async (userData) => {
    const res = await createUser(userData)
    if (res.success) {
      await fetchUsers() // Reload the user list from the backend
      setShowAddUserModal(false)
    }
  }

  const handleEditSubmit = async (updatedUser) => {
    const res = await updateUser(selectedUser._id, updatedUser)
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id ? { ...u, ...updatedUser } : u
        )
      )
      setShowModal(false)
      setEditMode(false)
      setSelectedUser(null)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    const res = await updateUserRole(userId, newRole)
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      )
    }
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-800 border border-purple-300"
      case "org_admin":
        return "bg-blue-100 text-blue-800 border border-blue-300"
      case "instructor":
        return "bg-green-100 text-green-800 border border-green-300"
      case "student":
        return "bg-orange-100 text-orange-800 border border-orange-300"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <div
            className="p-6 rounded-2xl shadow-xl border"
            style={{
              background: COLORS.orangeLight,
              borderColor: COLORS.orangeLight,
            }}
          >
            {/* Header Title */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: COLORS.orange }}
                >
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-3xl font-bold text-gray-800">Users</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage your users efficiently</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {getStatistics().map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  style={{ background: stat.bg }}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20 mr-3">
                      {stat.icon}
                    </div>
                    <div className="text-white">
                      <p className="text-sm opacity-80">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search + Filter */}
            <div className="mb-8 bg-white p-5 rounded-xl shadow-xl border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 w-full border-gray-200 focus:ring focus:ring-opacity-50 rounded-lg py-3 text-base"
                    style={{ borderColor: COLORS.orangeLight }}
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="border-gray-200 text-gray-700 rounded-lg py-6 px-4 hover:border-orange-300"
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                      style={{ borderColor: COLORS.orangeLight }}
                    >
                      <Filter className="h-5 w-5 mr-2" style={{ color: COLORS.orange }} />
                      Filter by role
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                    {showFilterMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-10 border border-gray-100 overflow-hidden">
                        <div className="py-2">
                          {["all", "super_admin", "org_admin", "instructor", "student"].map((role) => (
                            <button
                              key={role}
                              className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:text-orange-700 transition-colors"
                              onClick={() => {
                                setActiveFilter(role)
                                setShowFilterMenu(false)
                              }}
                            >
                              {role === "all" ? "All roles" : role.replace("_", " ")}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center rounded-lg py-6 px-5 shadow-lg transform transition-transform hover:-translate-y-1"
                    onClick={() => setShowAddUserModal(true)}
                  >
                    <Plus className="h-5 w-5 mr-2" /> Add User
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
              <Table>
                <TableHeader className="bg-orange-50">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user._id} className="hover:bg-orange-50 transition-all duration-200">
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.userEmail}</TableCell>
                      <TableCell>
                        <div className="relative inline-block">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            className={`appearance-none ${getRoleBadgeColor(user.role)} border rounded-full px-4 py-1.5 pr-8 text-xs font-medium focus:outline-none focus:ring-2 shadow-sm`}
                            style={{ boxShadow: `0 0 0 2px ${COLORS.orangeLight}` }}
                          >
                            <option value="super_admin">Super Admin</option>
                            <option value="org_admin">Org Admin</option>
                            <option value="instructor">Instructor</option>
                            <option value="student">Student</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 pointer-events-none text-gray-500" />
                        </div>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white border-blue-200 hover:bg-blue-50 p-1 h-9 w-9 rounded-lg shadow-sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setShowModal(true)
                          }}
                          title="View details"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white border-orange-200 hover:bg-orange-50 p-1 h-9 w-9 rounded-lg shadow-sm"
                          onClick={() => handleEditUser(user)}
                          title="Edit user"
                        >
                          <Edit className="h-4 w-4 text-orange-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white border-red-200 hover:bg-red-50 p-1 h-9 w-9 rounded-lg shadow-sm"
                          onClick={() => {
                            setSelectedUser(user)
                            setDeleteConfirmOpen(true)
                          }}
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {!isLoading && filteredUsers.length > 0 && (
              <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{(currentPage - 1) * USERS_PER_PAGE + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredUsers.length}</span> results
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(i + 1)}
                      className={
                        currentPage === i + 1
                          ? "bg-orange-100 text-orange-700 font-bold"
                          : ""
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Modals */}
          {showModal && selectedUser && !editMode && (
            <Modal onClose={() => setShowModal(false)}>
              <UserDetailModal
                user={selectedUser}
                onClose={() => setShowModal(false)}
                onEdit={() => handleEditUser(selectedUser)}
                onDelete={() => {
                  setShowModal(false)
                  setDeleteConfirmOpen(true)
                }}
              />
            </Modal>
          )}

          {editMode && selectedUser && (
            <EditUserModal
              isOpen={editMode}
              onClose={() => {
                setShowModal(false)
                setEditMode(false)
                setSelectedUser(null)
              }}
              onSubmit={handleEditSubmit}
              user={selectedUser}
              isLoading={isLoading}
            />
          )}

          {showAddUserModal && (
            <AddUserModal
              isOpen={showAddUserModal}
              onClose={() => setShowAddUserModal(false)}
              onSubmit={handleAddUser}
              isLoading={isLoading}
            />
          )}

          {deleteConfirmOpen && selectedUser && (
            <DeleteConfirmationModal
              isOpen={true}
              onClose={() => {
                setDeleteConfirmOpen(false)
                setSelectedUser(null)
              }}
              onConfirm={handleDeleteUser}
              N={selectedUser.N}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default AllUsers
