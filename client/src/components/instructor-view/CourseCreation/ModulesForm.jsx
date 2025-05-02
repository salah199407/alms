"use client"
import { useState } from "react"
import { useCourseCreation } from "@/context/course-context/CourseCreationContext";
import { PlusIcon, XMarkIcon, TrashIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

const ModulesForm = () => {
  const { state, dispatch } = useCourseCreation()
  const { modules } = state
  const [newLearningObjective, setNewLearningObjective] = useState("")
  const [newPrerequisite, setNewPrerequisite] = useState("")
  const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id || "")

  const handleModuleChange = (moduleId, field, value) => {
    dispatch({
      type: "UPDATE_MODULE",
      payload: {
        id: moduleId,
        data: { [field]: value },
      },
    })
  }

  const addModule = () => {
    dispatch({ type: "ADD_MODULE" })
  }

  const removeModule = (moduleId) => {
    if (modules.length <= 1) {
      alert("You must have at least one module")
      return
    }
    dispatch({ type: "REMOVE_MODULE", payload: moduleId })
  }

  const handleAddLearningObjective = (e, moduleId) => {
    e.preventDefault()
    if (newLearningObjective.trim()) {
      dispatch({
        type: "ADD_MODULE_LEARNING_OBJECTIVE",
        payload: {
          moduleId,
          objective: newLearningObjective.trim(),
        },
      })
      setNewLearningObjective("")
    }
  }

  const handleRemoveLearningObjective = (moduleId, index) => {
    dispatch({
      type: "REMOVE_MODULE_LEARNING_OBJECTIVE",
      payload: { moduleId, index },
    })
  }

  const handleAddPrerequisite = (e, moduleId) => {
    e.preventDefault()
    if (newPrerequisite.trim()) {
      dispatch({
        type: "ADD_MODULE_PREREQUISITE",
        payload: {
          moduleId,
          prerequisite: newPrerequisite.trim(),
        },
      })
      setNewPrerequisite("")
    }
  }

  const handleRemovePrerequisite = (moduleId, index) => {
    dispatch({
      type: "REMOVE_MODULE_PREREQUISITE",
      payload: { moduleId, index },
    })
  }

  const handleNext = () => {
    // Valider que chaque module a un titre et une description
    const hasInvalidModules = modules.some(
      module => !module.title || !module.description
    )
    
    if (hasInvalidModules) {
      alert("Please fill all required fields (title and description) for each module before proceeding")
      return
    }
    
    // Passer à l'onglet suivant
    const tabButton = document.querySelector('[data-tab="3"]')
    if (tabButton) tabButton.click()
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Course Modules</h2>
        <p className="text-gray-600 mt-1">
          Organize your course content into modules. Each module can contain multiple sections.
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={`border rounded-lg overflow-hidden ${
                activeModuleId === module.id ? "border-orange-500 shadow-md" : "border-gray-200"
              }`}
            >
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  activeModuleId === module.id ? "bg-orange-50" : "bg-gray-50"
                }`}
                onClick={() => setActiveModuleId(activeModuleId === module.id ? "" : module.id)}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{module.title || `Module ${index + 1}`}</h3>
                </div>
                <div className="flex items-center">
                  {modules.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeModule(module.id)
                      }}
                      className="ml-2 text-gray-400 hover:text-red-500"
                      aria-label="Remove module"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveModuleId(activeModuleId === module.id ? "" : module.id)
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className={`h-5 w-5 transform transition-transform ${
                        activeModuleId === module.id ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {activeModuleId === module.id && (
                <div className="p-4 border-t border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`module-title-${module.id}`} className="block text-sm font-medium text-gray-700">
                        Module Title *
                      </label>
                      <input
                        type="text"
                        id={`module-title-${module.id}`}
                        value={module.title}
                        onChange={(e) => handleModuleChange(module.id, "title", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="e.g., Introduction to Web Development"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`module-description-${module.id}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Module Description *
                      </label>
                      <textarea
                        id={`module-description-${module.id}`}
                        value={module.description}
                        onChange={(e) => handleModuleChange(module.id, "description", e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="Describe what this module covers"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`module-duration-${module.id}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Estimated Duration (minutes)
                      </label>
                      <input
                        type="number"
                        id={`module-duration-${module.id}`}
                        value={module.estimatedDuration}
                        onChange={(e) => handleModuleChange(module.id, "estimatedDuration", Number(e.target.value))}
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="e.g., 60"
                      />
                    </div>

                    {/* Learning Objectives */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Learning Objectives</label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          value={newLearningObjective}
                          onChange={(e) => setNewLearningObjective(e.target.value)}
                          className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          placeholder="e.g., Understand HTML basics"
                        />
                        <button
                          type="button"
                          onClick={(e) => handleAddLearningObjective(e, module.id)}
                          className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                        >
                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-2 space-y-2">
                        {module.learningObjectives.map((objective, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                            <span className="text-sm text-gray-700">{objective}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveLearningObjective(module.id, idx)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prerequisites */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Module Prerequisites</label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          value={newPrerequisite}
                          onChange={(e) => setNewPrerequisite(e.target.value)}
                          className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          placeholder="e.g., Complete Module 1"
                        />
                        <button
                          type="button"
                          onClick={(e) => handleAddPrerequisite(e, module.id)}
                          className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                        >
                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-2 space-y-2">
                        {module.prerequisites.map((prerequisite, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                            <span className="text-sm text-gray-700">{prerequisite}</span>
                            <button
                              type="button"
                              onClick={() => handleRemovePrerequisite(module.id, idx)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addModule}
            className="w-full py-3 border-2 border-dashed border-orange-300 rounded-lg text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Another Module
          </button>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="ml-3 inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Next
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModulesForm