import Header from "@/components/super-admin-view/common/Header";
import Sidebar from "@/components/super-admin-view/Sidebar";

function SuperAdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Header commun */}
      <div className="flex flex-1 bg-gray-100">
        <Sidebar /> {/* Sidebar réutilisable */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome, Super Admin 👋</h1>
            <p className="text-gray-600 text-lg">
              This is your main dashboard where you can manage your platform's organizations, users, and courses.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
