"use client"

import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CourseCreationProvider, useCourseCreation } from "../../context/course-context/CourseCreationContext"
import CourseDetailsForm from "../../components/instructor-view/CourseCreation/CourseDetailsForm"
import ModulesForm from "../../components/instructor-view/CourseCreation/ModulesForm"
import SectionsForm from "../../components/instructor-view/CourseCreation/SectionsForm"
import QuizzesForm from "../../components/instructor-view/CourseCreation/QuizzesForm"
import CompletionPage from "../../components/instructor-view/CourseCreation/CompletionPage"
import { fetchInstructorCourseDetailsService } from "../../services"
import { transformBackendDataToState } from "../../services/courseService"
import CourseHeader from "../../components/instructor-view/CourseCreation/CourseHeader"
import { AuthContext } from "@/context/auth-context"
import { InstructorContext } from "@/context/instructor-context"
import { fetchInstructorCourseListService } from "@/services"
import { BarChart, Book, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import InstructorCourses from "@/components/instructor-view/courses"
import InstructorDashboard from "@/components/instructor-view/dashboard"
import Header from "@/components/instructor-view/Header"
import Sidebar from "@/components/instructor-view/Sidebar"

const CourseCreationContent = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { state, dispatch, setLoading, setError, editMode, success } = useCourseCreation()
  const [activeTab, setActiveTab] = useState(1)
  const [courseTitle, setCourseTitle] = useState("")
  const { resetCredentials } = useContext(AuthContext)
  const { instructorCoursesList, setInstructorCoursesList } = useContext(InstructorContext)

  useEffect(() => {
    if (courseId) {
      loadCourseData(courseId)
    } else {
      dispatch({ type: "RESET_STATE" })
    }
  }, [courseId])

  useEffect(() => {
    setCourseTitle(state.courseDetails.title || (editMode ? "Edit Course" : "Create New Course"))
  }, [state.courseDetails.title, editMode])

  const loadCourseData = async (id) => {
    setLoading(true)
    try {
      const response = await fetchInstructorCourseDetailsService(id)
      if (response.success) {
        const transformedData = transformBackendDataToState(response.data)
        dispatch({ type: "LOAD_COURSE_DATA", payload: transformedData })
        setCourseTitle(response.data.title || "Edit Course")
      } else {
        setError("Failed to load course data")
        navigate("/instructor")
      }
    } catch (err) {
      console.error("Error loading course:", err)
      setError("An error occurred while loading the course")
      navigate("/instructor")
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <CourseDetailsForm />
      case 2:
        return <ModulesForm />
      case 3:
        return <SectionsForm />
      case 4:
        return <QuizzesForm />
      case 5:
        return <CompletionPage />
      default:
        return <CourseDetailsForm />
    }
  }

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService()
    if (response?.success) setInstructorCoursesList(response?.data)
  }

  useEffect(() => {
    fetchAllCourses()
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 ml-0 md:ml-20 lg:ml-64 transition-all duration-300">
          <CourseHeader
            title={courseTitle}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onBack={() => navigate("/instructor")}
            isSuccess={success}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

const CourseCreationPage = () => {
  return (
    <CourseCreationProvider>
      <CourseCreationContent />
    </CourseCreationProvider>
  )
}

export default CourseCreationPage