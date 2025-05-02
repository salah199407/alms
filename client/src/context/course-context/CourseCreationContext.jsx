"use client"

import { createContext, useContext, useReducer, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addNewCourseService, updateCourseByIdService, mediaUploadService } from "../../services"
import { transformCourseDataForBackend } from "../../services/courseService"

// Initial state for the course creation process
const initialState = {
  courseDetails: {
    title: "",
    category: "",
    level: "",
    primaryLanguage: "",
    subtitle: "",
    description: "",
    objectives: "",
    welcomeMessage: "",
    image: "",
    duration: 0,
    difficulty: "beginner",
    prerequisites: [],
    targetAudience: [],
    learningOutcomes: [],
    resources: [],
    tags: [],
    instructorId: "",
    instructorName: "",
  },
  customCategories: [],
  modules: [
    {
      id: "module-1",
      title: "",
      description: "",
      order: 0,
      learningObjectives: [],
      
      prerequisites: [],
      estimatedDuration: 0,
      sections: [
        {
          id: "section-module-1-1",
          title: "",
          type: "text",
          content: "",
          videoUrl: "",
          imageUrl: "",
          public_id: "",
          order: 0,
          freePreview: false,
        },
      ],
    },
  ],
  quizzes: {
    moduleQuizzes: {},
    finalQuiz: {
      title: "Final Course Assessment",
      description: "Comprehensive assessment of all course material",
      questions: [
        {
          id: "fq-1",
          text: "",
          type: "multiple-choice",
          options: [
            { id: "fo-1-1", text: "", isCorrect: false },
            { id: "fo-1-2", text: "", isCorrect: false },
            { id: "fo-1-3", text: "", isCorrect: false },
            { id: "fo-1-4", text: "", isCorrect: false },
          ],
          explanation: "",
        },
      ],
    },
  },
  activeModule: "module-1",
  activeQuizTab: "modules",
  courseId: null,
  editMode: false,
}

// Reducer function to handle state updates
function courseCreationReducer(state, action) {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload }
    case "UPDATE_COURSE_DETAILS":
      return { ...state, courseDetails: { ...state.courseDetails, ...action.payload } }
    case "SET_COURSE_IMAGE":
      return { ...state, courseDetails: { ...state.courseDetails, image: action.payload } }
    case "ADD_PREREQUISITE":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          prerequisites: [...state.courseDetails.prerequisites, action.payload],
        },
      }
    case "REMOVE_PREREQUISITE":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          prerequisites: state.courseDetails.prerequisites.filter((_, i) => i !== action.payload),
        },
      }
    case "ADD_TARGET_AUDIENCE":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          targetAudience: [...state.courseDetails.targetAudience, action.payload],
        },
      }
    case "REMOVE_TARGET_AUDIENCE":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          targetAudience: state.courseDetails.targetAudience.filter((_, i) => i !== action.payload),
        },
      }
    case "ADD_LEARNING_OUTCOME":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          learningOutcomes: [...state.courseDetails.learningOutcomes, action.payload],
        },
      }
    case "REMOVE_LEARNING_OUTCOME":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          learningOutcomes: state.courseDetails.learningOutcomes.filter((_, i) => i !== action.payload),
        },
      }
    case "ADD_RESOURCE":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          resources: [...state.courseDetails.resources, action.payload],
        },
      }
    case "REMOVE_RESOURCE":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          resources: state.courseDetails.resources.filter((_, i) => i !== action.payload),
        },
      }
    case "ADD_TAG":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          tags: [...state.courseDetails.tags, action.payload],
        },
      }
    case "ADD_CUSTOM_CATEGORY":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          category: action.payload.id,
        },
        customCategories: [...state.customCategories, action.payload],
      }
    case "REMOVE_TAG":
      return {
        ...state,
        courseDetails: {
          ...state.courseDetails,
          tags: state.courseDetails.tags.filter((_, i) => i !== action.payload),
        },
      }
    case "ADD_MODULE":
      const newModuleId = `module-${state.modules.length + 1}`
      const newModule = {
        id: newModuleId,
        title: "",
        description: "",
        order: state.modules.length,
        learningObjectives: [],
        prerequisites: [],
        estimatedDuration: 0,
        sections: [
          {
            id: `section-${newModuleId}-1`,
            title: "",
            type: "text",
            content: "",
            videoUrl: "",
            imageUrl: "",
            public_id: "",
            order: 0,
            freePreview: false,
          },
        ],
      }
      return { ...state, modules: [...state.modules, newModule] }
    case "REMOVE_MODULE":
      return {
        ...state,
        modules: state.modules.filter((module) => module.id !== action.payload),
        activeModule: state.activeModule === action.payload ? state.modules[0]?.id : state.activeModule,
      }
    case "UPDATE_MODULE":
      return {
        ...state,
        modules: state.modules.map((module) =>
          module.id === action.payload.id ? { ...module, ...action.payload.data } : module,
        ),
      }
    case "ADD_MODULE_LEARNING_OBJECTIVE":
      return {
        ...state,
        modules: state.modules.map((module) =>
          module.id === action.payload.moduleId
            ? {
                ...module,
                learningObjectives: [...module.learningObjectives, action.payload.objective],
              }
            : module,
        ),
      }
    case "REMOVE_MODULE_LEARNING_OBJECTIVE":
      return {
        ...state,
        modules: state.modules.map((module) =>
          module.id === action.payload.moduleId
            ? {
                ...module,
                learningObjectives: module.learningObjectives.filter((_, i) => i !== action.payload.index),
              }
            : module,
        ),
      }
    case "ADD_MODULE_PREREQUISITE":
      return {
        ...state,
        modules: state.modules.map((module) =>
          module.id === action.payload.moduleId
            ? {
                ...module,
                prerequisites: [...module.prerequisites, action.payload.prerequisite],
              }
            : module,
        ),
      }
    case "REMOVE_MODULE_PREREQUISITE":
      return {
        ...state,
        modules: state.modules.map((module) =>
          module.id === action.payload.moduleId
            ? {
                ...module,
                prerequisites: module.prerequisites.filter((_, i) => i !== action.payload.index),
              }
            : module,
        ),
      }
    case "SET_ACTIVE_MODULE":
      return { ...state, activeModule: action.payload }
    case "ADD_SECTION":
      return {
        ...state,
        modules: state.modules.map((module) => {
          if (module.id === action.payload) {
            const newSectionId = `section-${module.id}-${module.sections.length + 1}`
            return {
              ...module,
              sections: [
                ...module.sections,
                {
                  id: newSectionId,
                  title: "",
                  type: "text",
                  content: "",
                  videoUrl: "",
                  imageUrl: "",
                  public_id: "",
                  order: module.sections.length,
                  freePreview: false,
                },
              ],
            }
          }
          return module
        }),
      }
    case "REMOVE_SECTION":
      return {
        ...state,
        modules: state.modules.map((module) => {
          if (module.id === action.payload.moduleId) {
            return {
              ...module,
              sections: module.sections.filter((section) => section.id !== action.payload.sectionId),
            }
          }
          return module
        }),
      }
    case "UPDATE_SECTION":
      return {
        ...state,
        modules: state.modules.map((module) => {
          if (module.id === action.payload.moduleId) {
            return {
              ...module,
              sections: module.sections.map((section) =>
                section.id === action.payload.sectionId
                  ? { ...section, [action.payload.field]: action.payload.value }
                  : section,
              ),
            }
          }
          return module
        }),
      }
    case "UPDATE_SECTION_TYPE":
      return {
        ...state,
        modules: state.modules.map((module) => {
          if (module.id === action.payload.moduleId) {
            return {
              ...module,
              sections: module.sections.map((section) =>
                section.id === action.payload.sectionId ? { ...section, type: action.payload.type } : section,
              ),
            }
          }
          return module
        }),
      }
    case "INITIALIZE_MODULE_QUIZ":
      const moduleId = action.payload
      const module = state.modules.find((m) => m.id === moduleId)
      if (!state.quizzes.moduleQuizzes[moduleId]) {
        return {
          ...state,
          quizzes: {
            ...state.quizzes,
            moduleQuizzes: {
              ...state.quizzes.moduleQuizzes,
              [moduleId]: {
                title: `Quiz for Module: ${module?.title || "Untitled"}`,
                description: `Test your understanding of ${module?.title || "this module"}`,
                questions: [
                  {
                    id: `q-${moduleId}-1`,
                    text: "",
                    type: "multiple-choice",
                    options: [
                      { id: `o-${moduleId}-1-1`, text: "", isCorrect: false },
                      { id: `o-${moduleId}-1-2`, text: "", isCorrect: false },
                      { id: `o-${moduleId}-1-3`, text: "", isCorrect: false },
                      { id: `o-${moduleId}-1-4`, text: "", isCorrect: false },
                    ],
                    explanation: "",
                  },
                ],
              },
            },
          },
        }
      }
      return state
    case "SET_ACTIVE_QUIZ_TAB":
      return { ...state, activeQuizTab: action.payload }
    case "ADD_MODULE_QUESTION":
      const quiz = state.quizzes.moduleQuizzes[action.payload]
      if (!quiz) return state

      const newQuestionId = `q-${action.payload}-${quiz.questions.length + 1}`
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          moduleQuizzes: {
            ...state.quizzes.moduleQuizzes,
            [action.payload]: {
              ...quiz,
              questions: [
                ...quiz.questions,
                {
                  id: newQuestionId,
                  text: "",
                  type: "multiple-choice",
                  options: [
                    { id: `o-${newQuestionId}-1`, text: "", isCorrect: false },
                    { id: `o-${newQuestionId}-2`, text: "", isCorrect: false },
                    { id: `o-${newQuestionId}-3`, text: "", isCorrect: false },
                    { id: `o-${newQuestionId}-4`, text: "", isCorrect: false },
                  ],
                  explanation: "",
                },
              ],
            },
          },
        },
      }
    case "REMOVE_MODULE_QUESTION":
      const moduleQuiz = state.quizzes.moduleQuizzes[action.payload.moduleId]
      if (!moduleQuiz || moduleQuiz.questions.length <= 1) return state

      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          moduleQuizzes: {
            ...state.quizzes.moduleQuizzes,
            [action.payload.moduleId]: {
              ...moduleQuiz,
              questions: moduleQuiz.questions.filter((q) => q.id !== action.payload.questionId),
            },
          },
        },
      }
    case "UPDATE_MODULE_QUIZ_FIELD":
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          moduleQuizzes: {
            ...state.quizzes.moduleQuizzes,
            [action.payload.moduleId]: {
              ...state.quizzes.moduleQuizzes[action.payload.moduleId],
              [action.payload.field]: action.payload.value,
            },
          },
        },
      }
    case "UPDATE_MODULE_QUESTION":
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          moduleQuizzes: {
            ...state.quizzes.moduleQuizzes,
            [action.payload.moduleId]: {
              ...state.quizzes.moduleQuizzes[action.payload.moduleId],
              questions: state.quizzes.moduleQuizzes[action.payload.moduleId].questions.map((question) =>
                question.id === action.payload.questionId
                  ? { ...question, [action.payload.field]: action.payload.value }
                  : question,
              ),
            },
          },
        },
      }
    case "UPDATE_MODULE_OPTION":
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          moduleQuizzes: {
            ...state.quizzes.moduleQuizzes,
            [action.payload.moduleId]: {
              ...state.quizzes.moduleQuizzes[action.payload.moduleId],
              questions: state.quizzes.moduleQuizzes[action.payload.moduleId].questions.map((question) => {
                if (question.id === action.payload.questionId) {
                  return {
                    ...question,
                    options: question.options.map((option) =>
                      option.id === action.payload.optionId
                        ? { ...option, [action.payload.field]: action.payload.value }
                        : option,
                    ),
                  }
                }
                return question
              }),
            },
          },
        },
      }
    case "ADD_FINAL_QUESTION":
      const newFinalQuestionId = `fq-${state.quizzes.finalQuiz.questions.length + 1}`
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          finalQuiz: {
            ...state.quizzes.finalQuiz,
            questions: [
              ...state.quizzes.finalQuiz.questions,
              {
                id: newFinalQuestionId,
                text: "",
                type: "multiple-choice",
                options: [
                  { id: `fo-${newFinalQuestionId}-1`, text: "", isCorrect: false },
                  { id: `fo-${newFinalQuestionId}-2`, text: "", isCorrect: false },
                  { id: `fo-${newFinalQuestionId}-3`, text: "", isCorrect: false },
                  { id: `fo-${newFinalQuestionId}-4`, text: "", isCorrect: false },
                ],
                explanation: "",
              },
            ],
          },
        },
      }
    case "REMOVE_FINAL_QUESTION":
      if (state.quizzes.finalQuiz.questions.length <= 1) return state
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          finalQuiz: {
            ...state.quizzes.finalQuiz,
            questions: state.quizzes.finalQuiz.questions.filter((q) => q.id !== action.payload),
          },
        },
      }
    case "UPDATE_FINAL_QUIZ_FIELD":
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          finalQuiz: {
            ...state.quizzes.finalQuiz,
            [action.payload.field]: action.payload.value,
          },
        },
      }
    case "UPDATE_FINAL_QUESTION":
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          finalQuiz: {
            ...state.quizzes.finalQuiz,
            questions: state.quizzes.finalQuiz.questions.map((question) =>
              question.id === action.payload.questionId
                ? { ...question, [action.payload.field]: action.payload.value }
                : question,
            ),
          },
        },
      }
    case "UPDATE_FINAL_OPTION":
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          finalQuiz: {
            ...state.quizzes.finalQuiz,
            questions: state.quizzes.finalQuiz.questions.map((question) => {
              if (question.id === action.payload.questionId) {
                return {
                  ...question,
                  options: question.options.map((option) =>
                    option.id === action.payload.optionId
                      ? { ...option, [action.payload.field]: action.payload.value }
                      : option,
                  ),
                }
              }
              return question
            }),
          },
        },
      }
    case "SET_COURSE_ID":
      return { ...state, courseId: action.payload }
    case "SET_EDIT_MODE":
      return { ...state, editMode: action.payload }
    case "LOAD_COURSE_DATA":
      return {
        ...state,
        courseDetails: action.payload.courseDetails,
        customCategories: action.payload.customCategories || [],
        modules: action.payload.modules,
        quizzes: action.payload.quizzes,
        courseId: action.payload.courseId,
        editMode: true,
      }
    case "RESET_STATE":
      return { ...initialState }
    default:
      return state
  }
}

// Create the context
const CourseCreationContext = createContext()

// Custom hook to use the context
export const useCourseCreation = () => {
  const context = useContext(CourseCreationContext)
  if (!context) {
    throw new Error("useCourseCreation must be used within a CourseCreationProvider")
  }
  return context
}

// Provider component
export const CourseCreationProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(courseCreationReducer, initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Set instructor info from sessionStorage
  // Load instructor info on mount
  useEffect(() => {
    const loadInstructor = () => {
      try {
        const authData = JSON.parse(sessionStorage.getItem("auth"));
        if (authData?.user?._id) {
          dispatch({
            type: "UPDATE_COURSE_DETAILS",
            payload: {
              instructorId: authData.user._id,
              instructorName: authData.user.userName
            }
          });
        } else {
          console.warn("No instructor data found in auth storage");
        }
      } catch (error) {
        console.error("Error loading instructor:", error);
      }
    };

    loadInstructor();
  }, []);

  // Save course data
  const saveCourse = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    setSuccessMessage("");
  
    try {
      const authData = JSON.parse(sessionStorage.getItem("auth"));
      if (!authData?.authenticate || !authData?.user?._id) {
        throw new Error("Authentication required");
      }
  
      // Transformation des données
      const courseData = transformCourseDataForBackend({
        ...state,
        courseDetails: {
          ...state.courseDetails,
          instructorId: authData.user._id,
          instructorName: authData.user.userName
        }
      });
  
      console.log("Prepared course data:", courseData);
  
      // Envoi au backend
      const response = state.courseId
        ? await updateCourseByIdService(state.courseId, courseData)
        : await addNewCourseService(courseData);
  
      if (response.success) {
        setSuccess(true);
        setSuccessMessage(state.courseId 
          ? "Course updated successfully!" 
          : "Course created successfully!");
        
        if (!state.courseId) {
          dispatch({ type: "SET_COURSE_ID", payload: response.data._id });
        }
        return response.data;
      } else {
        throw new Error(response.message || "Failed to save course");
      }
    } catch (error) {
      console.error("Save course error:", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Upload media
  const uploadMedia = async (file, onProgress) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await mediaUploadService(formData, onProgress)

      if (response.success) {
        return {
          success: true,
          url: response.data.secure_url,
          public_id: response.data.public_id,
        }
      } else {
        setError("Failed to upload media")
        return { success: false }
      }
    } catch (err) {
      console.error("Error uploading media:", err)
      setError("An error occurred while uploading media")
      return { success: false }
    }
  }

  // Initialize course creation
  const initCourseCreation = (id) => {
    if (id) {
      dispatch({ type: "SET_EDIT_MODE", payload: true })
      dispatch({ type: "SET_COURSE_ID", payload: id })
    } else {
      dispatch({ type: "RESET_STATE" })
      setSuccess(false)
    }
  }

  // Value to be provided to consumers
  const value = {
    state,
    dispatch,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    successMessage,
    setSuccessMessage,
    saveCourse,
    uploadMedia,
    initCourseCreation,
    editMode: state.editMode,
  }

  return (
    <CourseCreationContext.Provider value={value}>
      {children}
    </CourseCreationContext.Provider>
  );
}
