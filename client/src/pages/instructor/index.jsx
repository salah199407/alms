import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { PlusCircle, BookOpen, Users, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/instructor-view/Header";
import Sidebar from "@/components/instructor-view/Sidebar";

function InstructorDashboardpage() {
  const { auth, resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } = useContext(InstructorContext);
  const navigate = useNavigate();
  const [recentCourses, setRecentCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) {
      setInstructorCoursesList(response?.data);
      
      // Get 4 most recent courses
      const sortedCourses = [...response.data].sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentCourses(sortedCourses.slice(0, 4));
      
      // Calculate total students
      const studentsCount = response.data.reduce((acc, course) => acc + course.students.length, 0);
      setTotalStudents(studentsCount);
      
      // Calculate completion rate (mock data - replace with actual logic)
      const rate = response.data.length > 0 ? 
        Math.min(100, Math.round(Math.random() * 100)) : 0;
      setCompletionRate(rate);
    }
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 pl-0 md:pl-20 lg:pl-64 transition-all duration-300 pt-4">
          <section className="container py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                    <PlusCircle className="h-6 w-6 text-orange-500" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold">Create New Course</h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Start creating a new course for your students
                  </p>
                  <Button asChild className="bg-orange-500 hover:bg-orange-600">
                    <Link to="/instructor/create-new-course">Add New Course</Link>
                  </Button>
                </div>
                
                <div className="rounded-lg border p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <BookOpen className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">My Courses</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your existing courses</p>
                  <div className="text-2xl font-bold">{instructorCoursesList?.length || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Courses created</p>
                </div>
                
                <div className="rounded-lg border p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Users className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Students</h3>
                  <p className="text-sm text-muted-foreground mb-4">Track your students</p>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <p className="text-xs text-muted-foreground mt-1">Enrolled students</p>
                </div>
                
                <div className="rounded-lg border p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <BarChart className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Statistics</h3>
                  <p className="text-sm text-muted-foreground mb-4">Analyze your course performance</p>
                  <div className="text-2xl font-bold">{completionRate}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Average completion rate</p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Recent Courses</h2>
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  {recentCourses.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {recentCourses.map((course) => (
                        <div key={course._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-3">
                            {course.image ? (
                              <img 
                                src={course.image} 
                                alt={course.title}
                                className="h-12 w-12 rounded-md object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-medium line-clamp-1">{course.title}</h3>
                              <p className="text-xs text-muted-foreground">
                                {new Date(course.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              {course.students.length} students
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              course.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {course.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">You haven't created any courses yet.</p>
                      <Button asChild className="mt-4 bg-orange-500 hover:bg-orange-600">
                        <Link to="/instructor/create-new-course">Create your first course</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      <footer className="border-t py-6 bg-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ODC Learning. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InstructorDashboardpage;