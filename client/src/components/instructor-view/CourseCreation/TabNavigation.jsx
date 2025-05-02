"use client"

const TabNavigation = ({ activeTab, onTabChange, loading }) => {
  const tabs = [
    { id: 1, name: "Course Details" },
    { id: 2, name: "Modules" },
    { id: 3, name: "Sections" },
    { id: 4, name: "Quizzes" },
  ]

  return (
    <div className="tab-navigation border-b border-gray-200">
      <div className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !loading && onTabChange(tab.id)}
            disabled={loading}
            className={`inline-block py-4 px-4 text-sm font-medium ${
              activeTab === tab.id
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
            } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-gray-100 text-xs">
                {tab.id}
              </div>
              {tab.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabNavigation
