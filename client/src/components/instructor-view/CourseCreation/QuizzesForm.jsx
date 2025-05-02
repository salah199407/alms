"use client"

import React from "react"
import { useCourseCreation } from "@/context/course-context/CourseCreationContext";
import { quizQuestionTypes } from "@/config";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

const QuizzesForm = () => {
  const { state, dispatch, saveCourse, setSuccess } = useCourseCreation()
  const { modules, activeModule, quizzes, activeQuizTab } = state
  const [activeQuestionId, setActiveQuestionId] = React.useState("")

  // Initialize quiz for active module if it doesn't exist
  React.useEffect(() => {
    dispatch({ type: "INITIALIZE_MODULE_QUIZ", payload: activeModule })
  }, [activeModule, dispatch])

  const handleModuleChange = (e) => {
    dispatch({ type: "SET_ACTIVE_MODULE", payload: e.target.value })
  }

  const handleTabChange = (tab) => {
    dispatch({ type: "SET_ACTIVE_QUIZ_TAB", payload: tab })
  }

  const activeModuleQuiz = quizzes.moduleQuizzes[activeModule]

  // Module quiz handlers
  const addModuleQuestion = () => {
    dispatch({ type: "ADD_MODULE_QUESTION", payload: activeModule })
  }

  const removeModuleQuestion = (questionId) => {
    if (activeModuleQuiz?.questions.length <= 1) {
      alert("You must have at least one question per quiz")
      return
    }
    dispatch({
      type: "REMOVE_MODULE_QUESTION",
      payload: { moduleId: activeModule, questionId },
    })
  }

  const updateModuleQuizField = (field, value) => {
    dispatch({
      type: "UPDATE_MODULE_QUIZ_FIELD",
      payload: { moduleId: activeModule, field, value },
    })
  }

  const updateModuleQuestion = (questionId, field, value) => {
    dispatch({
      type: "UPDATE_MODULE_QUESTION",
      payload: { moduleId: activeModule, questionId, field, value },
    })
  }

  const updateModuleOption = (questionId, optionId, field, value) => {
    dispatch({
      type: "UPDATE_MODULE_OPTION",
      payload: { moduleId: activeModule, questionId, optionId, field, value },
    })
  }

  // Final quiz handlers
  const addFinalQuestion = () => {
    dispatch({ type: "ADD_FINAL_QUESTION" })
  }

  const removeFinalQuestion = (questionId) => {
    if (quizzes.finalQuiz.questions.length <= 1) {
      alert("You must have at least one question in the final quiz")
      return
    }
    dispatch({ type: "REMOVE_FINAL_QUESTION", payload: questionId })
  }

  const updateFinalQuizField = (field, value) => {
    dispatch({
      type: "UPDATE_FINAL_QUIZ_FIELD",
      payload: { field, value },
    })
  }

  const updateFinalQuestion = (questionId, field, value) => {
    dispatch({
      type: "UPDATE_FINAL_QUESTION",
      payload: { questionId, field, value },
    })
  }

  const updateFinalOption = (questionId, optionId, field, value) => {
    dispatch({
      type: "UPDATE_FINAL_OPTION",
      payload: { questionId, optionId, field, value },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await saveCourse()
    if (result) {
      setSuccess(true)
      // Move to completion page
      const tabButton = document.querySelector('[data-tab="5"]')
      if (tabButton) tabButton.click()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Create Quizzes</h2>
        <p className="text-gray-600 mt-1">
          Create quizzes for each module and a final assessment for the entire course.
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              className={`py-2 px-4 font-medium ${
                activeQuizTab === "modules"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabChange("modules")}
            >
              Module Quizzes
            </button>
            <button
              type="button"
              className={`py-2 px-4 font-medium ${
                activeQuizTab === "final"
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabChange("final")}
            >
              Final Assessment
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {activeQuizTab === "modules" && (
            <div className="module-quiz">
              <div className="mb-6">
                <label htmlFor="quiz-module-select" className="block text-sm font-medium text-gray-700">
                  Select Module
                </label>
                <select
                  id="quiz-module-select"
                  value={activeModule}
                  onChange={handleModuleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.title || `Module ${module.id.split("-")[1]}`}
                    </option>
                  ))}
                </select>
              </div>

              {activeModuleQuiz && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="mb-4">
                    <label htmlFor="quiz-title" className="block text-sm font-medium text-gray-700">
                      Quiz Title *
                    </label>
                    <input
                      type="text"
                      id="quiz-title"
                      value={activeModuleQuiz.title}
                      onChange={(e) => updateModuleQuizField("title", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      placeholder="e.g., Module 1 Assessment"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="quiz-description" className="block text-sm font-medium text-gray-700">
                      Quiz Description *
                    </label>
                    <textarea
                      id="quiz-description"
                      value={activeModuleQuiz.description}
                      onChange={(e) => updateModuleQuizField("description", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Describe what this quiz will assess"
                      rows={2}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {activeModuleQuiz?.questions.map((question, qIndex) => (
                  <div
                    key={question.id}
                    className={`border rounded-lg overflow-hidden ${
                      activeQuestionId === question.id ? "border-orange-500 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`p-4 flex justify-between items-center cursor-pointer ${
                        activeQuestionId === question.id ? "bg-orange-50" : "bg-gray-50"
                      }`}
                      onClick={() => setActiveQuestionId(activeQuestionId === question.id ? "" : question.id)}
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 mr-3">
                          {qIndex + 1}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {question.text
                            ? question.text.substring(0, 50) + (question.text.length > 50 ? "..." : "")
                            : `Question ${qIndex + 1}`}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        {activeModuleQuiz.questions.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeModuleQuestion(question.id)
                            }}
                            className="ml-2 text-gray-400 hover:text-red-500"
                            aria-label="Remove question"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveQuestionId(activeQuestionId === question.id ? "" : question.id)
                          }}
                          className="ml-2 text-gray-400 hover:text-gray-500"
                        >
                          <svg
                            className={`h-5 w-5 transform transition-transform ${
                              activeQuestionId === question.id ? "rotate-180" : ""
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

                    {activeQuestionId === question.id && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor={`question-text-${question.id}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Question *
                            </label>
                            <textarea
                              id={`question-text-${question.id}`}
                              value={question.text}
                              onChange={(e) => updateModuleQuestion(question.id, "text", e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                              placeholder="Enter your question here"
                              rows={2}
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`question-type-${question.id}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Question Type
                            </label>
                            <select
                              id={`question-type-${question.id}`}
                              value={question.type}
                              onChange={(e) => updateModuleQuestion(question.id, "type", e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            >
                              {quizQuestionTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="block text-sm font-medium text-gray-700">Answer Options</label>
                              <span className="text-xs text-gray-500">
                                {question.type === "multiple-choice"
                                  ? "Select all correct answers"
                                  : question.type === "single-choice"
                                    ? "Select the correct answer"
                                    : "Select True or False"}
                              </span>
                            </div>

                            {question.type === "true-false" ? (
                              <div className="space-y-2 p-2 border border-gray-200 rounded-md bg-white">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`true-${question.id}`}
                                    name={`tf-${question.id}`}
                                    checked={question.options.find((o) => o.isCorrect)?.id === "true"}
                                    onChange={() => {
                                      question.options.forEach((option) => {
                                        updateModuleOption(question.id, option.id, "isCorrect", option.id === "true")
                                      })
                                    }}
                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                  />
                                  <label htmlFor={`true-${question.id}`} className="ml-2 block text-sm text-gray-700">
                                    True
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`false-${question.id}`}
                                    name={`tf-${question.id}`}
                                    checked={question.options.find((o) => o.isCorrect)?.id === "false"}
                                    onChange={() => {
                                      question.options.forEach((option) => {
                                        updateModuleOption(question.id, option.id, "isCorrect", option.id === "false")
                                      })
                                    }}
                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                  />
                                  <label htmlFor={`false-${question.id}`} className="ml-2 block text-sm text-gray-700">
                                    False
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {question.options.map((option, oIndex) => (
                                  <div
                                    key={option.id}
                                    className="flex items-start space-x-2 p-2 border border-gray-200 rounded-md bg-white"
                                  >
                                    {question.type === "single-choice" ? (
                                      <input
                                        type="radio"
                                        id={`option-${option.id}`}
                                        name={`question-${question.id}`}
                                        checked={option.isCorrect}
                                        onChange={() => {
                                          question.options.forEach((opt) => {
                                            updateModuleOption(question.id, opt.id, "isCorrect", opt.id === option.id)
                                          })
                                        }}
                                        className="mt-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                      />
                                    ) : (
                                      <input
                                        type="checkbox"
                                        id={`option-${option.id}`}
                                        checked={option.isCorrect}
                                        onChange={(e) =>
                                          updateModuleOption(question.id, option.id, "isCorrect", e.target.checked)
                                        }
                                        className="mt-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                      />
                                    )}
                                    <div className="flex-1">
                                      <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) =>
                                          updateModuleOption(question.id, option.id, "text", e.target.value)
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        placeholder={`Option ${oIndex + 1}`}
                                        required
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor={`explanation-${question.id}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Explanation (Optional)
                            </label>
                            <textarea
                              id={`explanation-${question.id}`}
                              value={question.explanation}
                              onChange={(e) => updateModuleQuestion(question.id, "explanation", e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                              placeholder="Explain the correct answer"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addModuleQuestion}
                  className="w-full py-3 border-2 border-dashed border-orange-300 rounded-lg text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Another Question
                </button>
              </div>
            </div>
          )}

          {activeQuizTab === "final" && (
            <div className="final-quiz">
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="mb-4">
                  <label htmlFor="final-quiz-title" className="block text-sm font-medium text-gray-700">
                    Assessment Title *
                  </label>
                  <input
                    type="text"
                    id="final-quiz-title"
                    value={quizzes.finalQuiz.title}
                    onChange={(e) => updateFinalQuizField("title", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="e.g., Final Course Assessment"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="final-quiz-description" className="block text-sm font-medium text-gray-700">
                    Assessment Description *
                  </label>
                  <textarea
                    id="final-quiz-description"
                    value={quizzes.finalQuiz.description}
                    onChange={(e) => updateFinalQuizField("description", e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Describe what this assessment will evaluate"
                    rows={2}
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                {quizzes.finalQuiz.questions.map((question, qIndex) => (
                  <div
                    key={question.id}
                    className={`border rounded-lg overflow-hidden ${
                      activeQuestionId === question.id ? "border-orange-500 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <div
                      className={`p-4 flex justify-between items-center cursor-pointer ${
                        activeQuestionId === question.id ? "bg-orange-50" : "bg-gray-50"
                      }`}
                      onClick={() => setActiveQuestionId(activeQuestionId === question.id ? "" : question.id)}
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 mr-3">
                          {qIndex + 1}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {question.text
                            ? question.text.substring(0, 50) + (question.text.length > 50 ? "..." : "")
                            : `Question ${qIndex + 1}`}
                        </h3>
                      </div>
                      <div className="flex items-center">
                        {quizzes.finalQuiz.questions.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFinalQuestion(question.id)
                            }}
                            className="ml-2 text-gray-400 hover:text-red-500"
                            aria-label="Remove question"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveQuestionId(activeQuestionId === question.id ? "" : question.id)
                          }}
                          className="ml-2 text-gray-400 hover:text-gray-500"
                        >
                          <svg
                            className={`h-5 w-5 transform transition-transform ${
                              activeQuestionId === question.id ? "rotate-180" : ""
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

                    {activeQuestionId === question.id && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor={`final-question-text-${question.id}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Question *
                            </label>
                            <textarea
                              id={`final-question-text-${question.id}`}
                              value={question.text}
                              onChange={(e) => updateFinalQuestion(question.id, "text", e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                              placeholder="Enter your question here"
                              rows={2}
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`final-question-type-${question.id}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Question Type
                            </label>
                            <select
                              id={`final-question-type-${question.id}`}
                              value={question.type}
                              onChange={(e) => updateFinalQuestion(question.id, "type", e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            >
                              {quizQuestionTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="block text-sm font-medium text-gray-700">Answer Options</label>
                              <span className="text-xs text-gray-500">
                                {question.type === "multiple-choice"
                                  ? "Select all correct answers"
                                  : question.type === "single-choice"
                                    ? "Select the correct answer"
                                    : "Select True or False"}
                              </span>
                            </div>

                            {question.type === "true-false" ? (
                              <div className="space-y-2 p-2 border border-gray-200 rounded-md bg-white">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`final-true-${question.id}`}
                                    name={`final-tf-${question.id}`}
                                    checked={question.options.find((o) => o.isCorrect)?.id === "true"}
                                    onChange={() => {
                                      question.options.forEach((option) => {
                                        updateFinalOption(question.id, option.id, "isCorrect", option.id === "true")
                                      })
                                    }}
                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                  />
                                  <label
                                    htmlFor={`final-true-${question.id}`}
                                    className="ml-2 block text-sm text-gray-700"
                                  >
                                    True
                                  </label>
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`final-false-${question.id}`}
                                    name={`final-tf-${question.id}`}
                                    checked={question.options.find((o) => o.isCorrect)?.id === "false"}
                                    onChange={() => {
                                      question.options.forEach((option) => {
                                        updateFinalOption(question.id, option.id, "isCorrect", option.id === "false")
                                      })
                                    }}
                                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                  />
                                  <label
                                    htmlFor={`final-false-${question.id}`}
                                    className="ml-2 block text-sm text-gray-700"
                                  >
                                    False
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {question.options.map((option, oIndex) => (
                                  <div
                                    key={option.id}
                                    className="flex items-start space-x-2 p-2 border border-gray-200 rounded-md bg-white"
                                  >
                                    {question.type === "single-choice" ? (
                                      <input
                                        type="radio"
                                        id={`final-option-${option.id}`}
                                        name={`final-question-${question.id}`}
                                        checked={option.isCorrect}
                                        onChange={() => {
                                          question.options.forEach((opt) => {
                                            updateFinalOption(question.id, opt.id, "isCorrect", opt.id === option.id)
                                          })
                                        }}
                                        className="mt-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                                      />
                                    ) : (
                                      <input
                                        type="checkbox"
                                        id={`final-option-${option.id}`}
                                        checked={option.isCorrect}
                                        onChange={(e) =>
                                          updateFinalOption(question.id, option.id, "isCorrect", e.target.checked)
                                        }
                                        className="mt-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                      />
                                    )}
                                    <div className="flex-1">
                                      <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) =>
                                          updateFinalOption(question.id, option.id, "text", e.target.value)
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                                        placeholder={`Option ${oIndex + 1}`}
                                        required
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor={`final-explanation-${question.id}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Explanation (Optional)
                            </label>
                            <textarea
                              id={`final-explanation-${question.id}`}
                              value={question.explanation}
                              onChange={(e) => updateFinalQuestion(question.id, "explanation", e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                              placeholder="Explain the correct answer"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addFinalQuestion}
                  className="w-full py-3 border-2 border-dashed border-orange-300 rounded-lg text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Another Question
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 pt-5 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Complete Course Creation
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuizzesForm
