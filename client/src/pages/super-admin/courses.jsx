
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/auth-context";
import { getAllCourses } from "@/services";
import { Book, Building, LogOut, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/super-admin-view/common/Header";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("courses");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await getAllCourses();
        console.log("Response from getAllCourses:", response);
        if (response.success) {
          setCourses(response.data);
        } else {
          alert("Error fetching courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Error fetching courses");
      }
    }
    fetchCourses();
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
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            <div className="mb-4">
              <Label>Search Courses</Label>
              <Input placeholder="Search by course name" />
            </div>
            <div className="mb-4">
              <ul>
                {courses.map(course => (
                  <li key={course._id} className="mb-2">
                    {course.name}
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

export default CoursesPage;
