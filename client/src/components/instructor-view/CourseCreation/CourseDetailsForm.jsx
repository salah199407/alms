"use client"

import { useState } from "react"
import { useCourseCreation } from "@/context/course-context/CourseCreationContext";
import { courseCategories, courseLevelOptions, languageOptions, difficultyLevels } from "@/config"
import { PlusIcon, XMarkIcon, PhotoIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { TagInput } from "../../ui/TagInput"

const CourseDetailsForm = () => {
  const { state, dispatch, uploadMedia } = useCourseCreation()
  const { courseDetails } = state
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [newPrerequisite, setNewPrerequisite] = useState("")
  const [newTargetAudience, setNewTargetAudience] = useState("")
  const [newLearningOutcome, setNewLearningOutcome] = useState("")
  const [newResource, setNewResource] = useState("")
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: "UPDATE_COURSE_DETAILS",
      payload: { [name]: value },
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const result = await uploadMedia(file, (progress) => {
        setUploadProgress(progress)
      })

      if (result.success) {
        dispatch({
          type: "SET_COURSE_IMAGE",
          payload: result.url,
        })
      }
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddPrerequisite = (e) => {
    e.preventDefault()
    if (newPrerequisite.trim()) {
      dispatch({ type: "ADD_PREREQUISITE", payload: newPrerequisite.trim() })
      setNewPrerequisite("")
    }
  }

  const handleRemovePrerequisite = (index) => {
    dispatch({ type: "REMOVE_PREREQUISITE", payload: index })
  }

  const handleAddTargetAudience = (e) => {
    e.preventDefault()
    if (newTargetAudience.trim()) {
      dispatch({ type: "ADD_TARGET_AUDIENCE", payload: newTargetAudience.trim() })
      setNewTargetAudience("")
    }
  }

  const handleRemoveTargetAudience = (index) => {
    dispatch({ type: "REMOVE_TARGET_AUDIENCE", payload: index })
  }

  const handleAddLearningOutcome = (e) => {
    e.preventDefault()
    if (newLearningOutcome.trim()) {
      dispatch({ type: "ADD_LEARNING_OUTCOME", payload: newLearningOutcome.trim() })
      setNewLearningOutcome("")
    }
  }

  const handleRemoveLearningOutcome = (index) => {
    dispatch({ type: "REMOVE_LEARNING_OUTCOME", payload: index })
  }

  const handleAddResource = (e) => {
    e.preventDefault()
    if (newResource.trim()) {
      dispatch({ type: "ADD_RESOURCE", payload: newResource.trim() })
      setNewResource("")
    }
  }

  const handleRemoveResource = (index) => {
    dispatch({ type: "REMOVE_RESOURCE", payload: index })
  }

  const handleTagsChange = (tags) => {
    dispatch({
      type: "UPDATE_COURSE_DETAILS",
      payload: { tags },
    })
  }

  const handleAddCustomCategory = () => {
    if (newCategory.trim()) {
      const newId = `custom-${Date.now()}`
      dispatch({
        type: "ADD_CUSTOM_CATEGORY",
        payload: {
          id: newId,
          label: newCategory.trim()
        }
      })
      dispatch({
        type: "UPDATE_COURSE_DETAILS",
        payload: { category: newId }
      })
      setIsAddingCategory(false)
      setNewCategory("")
    }
  }

  const handleNext = () => {
    if (
      !courseDetails.title ||
      !courseDetails.subtitle ||
      !courseDetails.description ||
      !courseDetails.welcomeMessage ||
      !courseDetails.objectives ||
      !courseDetails.category ||
      !courseDetails.level ||
      !courseDetails.primaryLanguage ||
      !courseDetails.difficulty ||
      !courseDetails.duration
    ) {
      alert("Please fill all required fields before proceeding")
      return
    }
    
    const tabButton = document.querySelector('[data-tab="2"]')
    if (tabButton) tabButton.click()
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Course Details</h2>
        <p className="text-gray-600 mt-1">
          Provide the basic information about your course to help students find and understand it.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6 md:col-span-1">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={courseDetails.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., Complete Web Development Bootcamp"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                    Subtitle *
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={courseDetails.subtitle}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., Learn HTML, CSS, JavaScript, React, Node.js and more!"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={courseDetails.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Provide a detailed description of your course"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700">
                    Welcome Message *
                  </label>
                  <textarea
                    id="welcomeMessage"
                    name="welcomeMessage"
                    value={courseDetails.welcomeMessage}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Welcome message for students joining your course"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">
                    Course Objectives *
                  </label>
                  <textarea
                    id="objectives"
                    name="objectives"
                    value={courseDetails.objectives}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="What will students achieve by taking this course?"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Course Classification */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Course Classification</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  {!isAddingCategory ? (
                    <div className="flex gap-2">
                      <select
                        id="category"
                        name="category"
                        value={courseDetails.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        required
                      >
                        <option value="">Select a category</option>
                        {courseCategories.map((category) => (
                          <option key={category.name} value={category.name}>
                            {category.label}
                          </option>
                        ))}
                        {state.customCategories?.map((category) => (
                          <option key={category.name} value={category.name}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setIsAddingCategory(true)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                      >
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        placeholder="Enter new category name"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomCategory}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-green-50 text-green-500 hover:bg-green-100"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCategory(false)
                          setNewCategory("")
                        }}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-red-50 text-red-500 hover:bg-red-100"
                      >
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {isAddingCategory
                      ? "Enter the name of your new category"
                      : "Can't find your category? Add a new one"}
                  </p>
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Level *
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={courseDetails.level}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select a level</option>
                    {courseLevelOptions.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="primaryLanguage" className="block text-sm font-medium text-gray-700">
                    Primary Language *
                  </label>
                  <select
                    id="primaryLanguage"
                    name="primaryLanguage"
                    value={courseDetails.primaryLanguage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select a language</option>
                    {languageOptions.map((language) => (
                      <option key={language.id} value={language.id}>
                        {language.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                    Difficulty *
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={courseDetails.difficulty}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select difficulty</option>
                    {difficultyLevels.map((difficulty) => (
                      <option key={difficulty.id} value={difficulty.id}>
                        {difficulty.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (hours) *
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={courseDetails.duration}
                    onChange={handleInputChange}
                    min="0"
                    step="0.5"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Tags
                </label>
                <TagInput
                  id="tags"
                  placeholder="Add tags and press Enter"
                  tags={courseDetails.tags}
                  setTags={handleTagsChange}
                />
                <p className="mt-1 text-sm text-gray-500">Add relevant tags to help students find your course</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:col-span-1">
            {/* Course Image */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Course Image</h3>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {courseDetails.image ? (
                  <div className="space-y-2 text-center">
                    <img
                      src={courseDetails.image || "/placeholder.svg"}
                      alt="Course thumbnail"
                      className="mx-auto h-40 w-auto object-cover rounded-md"
                    />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                      >
                        <span>Change image</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
              {isUploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Uploading: {uploadProgress}%</p>
                </div>
              )}
            </div>

            {/* Prerequisites */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Prerequisites</h3>
              <div>
                <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">
                  Course Prerequisites
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="prerequisites"
                    value={newPrerequisite}
                    onChange={(e) => setNewPrerequisite(e.target.value)}
                    className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., Basic HTML knowledge"
                  />
                  <button
                    type="button"
                    onClick={handleAddPrerequisite}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {courseDetails.prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                      <span className="text-sm text-gray-700">{prerequisite}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePrerequisite(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h3>
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
                  Who is this course for?
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="targetAudience"
                    value={newTargetAudience}
                    onChange={(e) => setNewTargetAudience(e.target.value)}
                    className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., Beginner web developers"
                  />
                  <button
                    type="button"
                    onClick={handleAddTargetAudience}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {courseDetails.targetAudience.map((audience, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                      <span className="text-sm text-gray-700">{audience}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTargetAudience(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Outcomes</h3>
              <div>
                <label htmlFor="learningOutcomes" className="block text-sm font-medium text-gray-700">
                  What will students learn?
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="learningOutcomes"
                    value={newLearningOutcome}
                    onChange={(e) => setNewLearningOutcome(e.target.value)}
                    className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., Build responsive websites"
                  />
                  <button
                    type="button"
                    onClick={handleAddLearningOutcome}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {courseDetails.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                      <span className="text-sm text-gray-700">{outcome}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLearningOutcome(index)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resources</h3>
              <div>
                <label htmlFor="resources" className="block text-sm font-medium text-gray-700">
                  Additional Resources
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="resources"
                    value={newResource}
                    onChange={(e) => setNewResource(e.target.value)}
                    className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., https://example.com/resource"
                  />
                  <button
                    type="button"
                    onClick={handleAddResource}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {courseDetails.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                      <span className="text-sm text-gray-700">{resource}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResource(index)}
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

export default CourseDetailsForm