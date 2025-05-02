"use client"
import { ChevronLeftIcon } from "@heroicons/react/24/outline"

const CourseHeader = ({ title, activeTab, onTabChange, onBack, isSuccess }) => {
  const tabs = [
    { id: 1, name: "Course Details" },
    { id: 2, name: "Modules" },
    { id: 3, name: "Sections" },
    { id: 4, name: "Quizzes" },
  ]

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Go back"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 truncate max-w-xl">{title || "Create New Course"}</h1>
          </div>
          {!isSuccess && (
            <div className="hidden sm:block">
              <span className="text-sm text-gray-500">{activeTab === 5 ? "Complete" : `Step ${activeTab} of 4`}</span>
            </div>
          )}
        </div>

        {!isSuccess && (
          <div className="py-6">
            <div className="relative">
              {/* Progress line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
              {/* Active progress line */}
              <div 
                className="absolute top-1/2 left-0 h-0.5 bg-orange-500 -translate-y-1/2 transition-all duration-300"
                style={{ 
                  width: `${(activeTab - 1) * (100 / (tabs.length - 1))}%` 
                }}
              ></div>
              
              <div className="relative flex justify-between">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className="flex flex-col items-center focus:outline-none"
                    data-tab={tab.id}
                  >
                    {/* Number circle */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2
                      ${
                        activeTab === tab.id
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : activeTab > tab.id
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-white border-gray-300 text-gray-500'
                      }
                      transition-colors duration-300
                    `}>
                      {tab.id}
                    </div>
                    {/* Tab name */}
                    <span className={`
                      text-xs font-medium
                      ${
                        activeTab === tab.id
                          ? 'text-orange-600'
                          : activeTab > tab.id
                            ? 'text-green-600'
                            : 'text-gray-500'
                      }
                    `}>
                      {tab.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseHeader