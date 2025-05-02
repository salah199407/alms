import { useCourseCreation } from "@/context/course-context/CourseCreationContext";

const ProgressIndicator = () => {
  const { step } = useCourseCreation()

  return (
    <div className="progress-indicator mb-8">
      <div className="flex items-center justify-between">
        <div
          className={`step-indicator flex h-8 w-8 items-center justify-center rounded-full ${
            step >= 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          1
        </div>
        <div className={`h-1 flex-1 ${step >= 2 ? "bg-orange-500" : "bg-gray-200"}`}></div>
        <div
          className={`step-indicator flex h-8 w-8 items-center justify-center rounded-full ${
            step >= 2 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          2
        </div>
        <div className={`h-1 flex-1 ${step >= 3 ? "bg-orange-500" : "bg-gray-200"}`}></div>
        <div
          className={`step-indicator flex h-8 w-8 items-center justify-center rounded-full ${
            step >= 3 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          3
        </div>
        <div className={`h-1 flex-1 ${step >= 4 ? "bg-orange-500" : "bg-gray-200"}`}></div>
        <div
          className={`step-indicator flex h-8 w-8 items-center justify-center rounded-full ${
            step >= 4 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          4
        </div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className={step >= 1 ? "text-orange-500" : "text-gray-500"}>Course Details</span>
        <span className={step >= 2 ? "text-orange-500" : "text-gray-500"}>Modules</span>
        <span className={step >= 3 ? "text-orange-500" : "text-gray-500"}>Sections</span>
        <span className={step >= 4 ? "text-orange-500" : "text-gray-500"}>Quizzes</span>
      </div>
    </div>
  )
}

export default ProgressIndicator
