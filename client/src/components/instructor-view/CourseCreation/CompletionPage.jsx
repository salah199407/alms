"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCourseCreation } from "@/context/course-context/CourseCreationContext";
import { CheckCircleIcon } from "@heroicons/react/24/outline"

const CompletionPage = () => {
  const navigate = useNavigate()
  const { state, success } = useCourseCreation()
  const { courseId, courseDetails } = state

  useEffect(() => {
    // If we somehow got here without success, redirect back to the first step
    if (!success && !courseId) {
      const tabButton = document.querySelector('[data-tab="1"]')
      if (tabButton) tabButton.click()
    }
  }, [success, courseId])

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Course Created Successfully</h2>
        <p className="text-gray-600 mt-1">Your course has been created and is now pending approval.</p>
      </div>

      <div className="p-6">
        <div className="text-center py-8">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">Course Created Successfully!</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your course "{courseDetails.title}" has been created and is now pending approval.
          </p>
        </div>

        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-md font-medium text-gray-900 mb-2">What happens next?</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
              <span>Your course will be reviewed by our team.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
              <span>You'll receive an email notification once your course is approved.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
              <span>You can make changes to your course at any time from your instructor dashboard.</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/instructor/edit-course/${courseId}`)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Edit Course
          </button>
          <button
            type="button"
            onClick={() => navigate("/instructor")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompletionPage
