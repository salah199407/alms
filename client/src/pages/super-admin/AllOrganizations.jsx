import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllOrganizations,
  deleteOrganizationById,
} from "@/services";
import {
  Plus,
  Search,
  Building,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import DeleteConfirmModal from "@/components/super-admin-view/organisations/DeleteConfirmModal";
import EditOrganizationModal from "@/components/super-admin-view/organisations/EditOrganizationModal";
import CreateOrganizationModal from "@/components/super-admin-view/organisations/CreateOrganizationModal";

import Header from "@/components/super-admin-view/common/Header";
import Sidebar from "@/components/super-admin-view/Sidebar";
import { OrganizationCard } from "@/components/super-admin-view/organisations/OrganizationCard";

const COLORS = {
  orange: "rgb(246, 115, 22)",
  orangeLight: "rgba(246, 115, 22, 0.08)",
};

const ITEMS_PER_PAGE = 9;

const AllOrganizations = () => {
  const [orgs, setOrgs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [selectedOrg, setSelectedOrg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getAllOrganizations();
    if (res.success) setOrgs(res.data);
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    const res = await deleteOrganizationById(id);
    if (res.success) {
      setOrgs((prev) => prev.filter((org) => org._id !== id));
      setShowDeleteModal(false);
    } else {
      alert("❌ Failed to delete organization.");
    }
  };

  const handleEdit = (org) => {
    setSelectedOrg(org);
    setShowEditModal(true);
  };

  const confirmDelete = (org) => {
    setSelectedOrg(org);
    setShowDeleteModal(true);
  };

  const handleUpdateSuccess = (updatedOrg) => {
    setOrgs((prev) =>
      prev.map((org) => (org._id === updatedOrg._id ? updatedOrg : org))
    );
    setShowEditModal(false);
  };

  const handleCreateSuccess = (newOrg) => {
    setOrgs((prev) => [...prev, newOrg]);
  };

  const filteredOrgs = orgs.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrgs.length / ITEMS_PER_PAGE);
  const paginatedOrgs = filteredOrgs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-gray-100">
        <Sidebar />

        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div
            className="p-6 rounded-2xl shadow-xl border"
            style={{
              background: COLORS.orangeLight,
              borderColor: COLORS.orangeLight,
            }}
          >
            {/* Header + Title */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: COLORS.orange }}
                >
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-3xl font-bold text-gray-800">Organizations</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your organizations efficiently
                  </p>
                </div>
              </div>
            </div>

            {/* Search + Add */}
            <div className="mb-8 bg-white p-5 rounded-xl shadow-xl border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex flex-col w-full max-w-md">
                  <label className="text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search organizations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full border-gray-200 focus:ring-orange-300 rounded-lg py-3 text-base"
                    />
                  </div>
                </div>

                <div className="flex justify-end w-full md:w-auto">
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center rounded-lg py-3 px-5 shadow-lg transition-transform hover:-translate-y-0.5"
                    onClick={() => setShowCreateModal(true)}
                  >
                    <Plus className="h-5 w-5 mr-2" /> Add Organization
                  </Button>
                </div>
              </div>
            </div>

            {/* Organizations List */}
            {isLoading ? (
              <div className="text-center text-gray-500">Loading organizations...</div>
            ) : paginatedOrgs.length === 0 ? (
              <div className="text-center text-gray-500">
                <Building className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                <p>No organizations found.</p>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  layout
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {paginatedOrgs.map((org) => (
                    <OrganizationCard
                      key={org._id}
                      org={org}
                      onDelete={() => confirmDelete(org)}
                      onEdit={handleEdit}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-xl shadow border border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrgs.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredOrgs.length}</span> results
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                      key={index + 1}
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(index + 1)}
                      className={
                        currentPage === index + 1
                          ? "bg-orange-500 text-white hover:bg-orange-600 font-semibold"
                          : ""
                      }
                    >
                      {index + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(selectedOrg._id)}
        organization={selectedOrg}
      />

      <EditOrganizationModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        organization={selectedOrg}
        onSuccess={handleUpdateSuccess}
      />

      <CreateOrganizationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default AllOrganizations;
