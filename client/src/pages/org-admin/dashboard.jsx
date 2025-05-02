// src/pages/org-admin/dashboard.jsx

import { useAuth } from "@/context/auth-context"; 
import OrgAdminNavbar from "@/components/org-admin-view/OrgAdminNavbar";
import OrgAdminSidebar from "@/components/org-admin-view/OrgAdminSidebar";

function OrgAdminDashboardPage() {
  const { auth } = useAuth();
  const user = auth.user;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar en haut */}
      <OrgAdminNavbar />

      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar à gauche */}
        <OrgAdminSidebar />

        {/* Contenu principal */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Welcome, Admin 👋
            </h1>
            <p className="text-gray-600 text-lg">
              This is your dashboard to manage your organization, instructors, and students.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrgAdminDashboardPage;
