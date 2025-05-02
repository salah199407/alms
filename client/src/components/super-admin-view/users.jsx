import Header from "@/components/common-form/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth-context";
import { getAllUsers } from "@/services";
import { Book, Building, LogOut, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getAllUsers();
        console.log("Response from getAllUsers:", response);
        if (response.success) {
          setUsers(response.data);
        } else {
          alert("Error fetching users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Error fetching users");
      }
    }
    fetchUsers();
  }, []);

  const menuItems = [
    { icon: Building, label: "Organizations", value: "organizations" },
    { icon: Users, label: "Users", value: "users" },
    { icon: Book, label: "Courses", value: "courses" },
    { icon: LogOut, label: "Logout", value: "logout" },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex h-full bg-gray-100 flex-1">
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Super Admin</h2>
            <nav>
              {menuItems.map((menuItem) => (
                <Button
                  key={menuItem.value}
                  className="w-full justify-start mb-2"
                  variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                  onClick={menuItem.value === "logout" ? handleLogout : () => setActiveTab(menuItem.value)}
                >
                  <menuItem.icon className="mr-2 h-4 w-4" />
                  {menuItem.label}
                </Button>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="mb-4">
              <Label>Search Users</Label>
              <Input placeholder="Search by name or email" />
            </div>
            <div className="mb-4">
              <ul>
                {users.map(user => (
                  <li key={user._id} className="mb-2">
                    {user.userName} ({user.userEmail})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UsersPage;
