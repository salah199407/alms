import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentEnrolledCoursesService } from "@/services"; // 🔄 UPDATED SERVICE
import { Watch } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const { studentEnrolledCoursesList, setStudentEnrolledCoursesList } =
    useContext(StudentContext);
  const navigate = useNavigate();

  async function fetchStudentEnrolledCourses() {
    const response = await fetchStudentEnrolledCoursesService(auth?.user?._id);
    if (response?.success) {
      setStudentEnrolledCoursesList(response?.data);
    }
    console.log(response);
  }

  useEffect(() => {
    fetchStudentEnrolledCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">My Enrolled Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentEnrolledCoursesList && studentEnrolledCoursesList.length > 0 ? (
          studentEnrolledCoursesList.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{course?.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {course?.instructorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseId}`)
                  }
                  className="flex-1"
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Enrolled Courses Found</h1>
        )}
      </div>
    </div>
  );
}

export default StudentCoursesPage;
