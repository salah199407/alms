import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Course services
export const courseService = {
  // Create a new course
  createCourse: async (courseData) => {
    try {
      // Validation des données avant l'envoi
      if (!courseData || typeof courseData !== 'object') {
        throw new Error('Invalid course data');
      }

      // Vérification des champs obligatoires
      const requiredFields = ['title', 'category', 'level', 'description', 'instructorId', 'instructorName'];
      const missingFields = requiredFields.filter(field => !courseData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Vérification des modules
      if (!courseData.modules || !Array.isArray(courseData.modules) || courseData.modules.length === 0) {
        throw new Error('At least one module is required');
      }

      console.log("Sending course data to backend:", courseData);
      const response = await api.post("/api/instructor/course/add", courseData);
      
      if (!response.data) {
        throw new Error('No response data received from server');
      }

      console.log("Backend response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });

      // Gestion des erreurs spécifiques
      if (error.response) {
        // Erreur du serveur
        if (error.response.status === 500) {
          throw new Error('Server error: Please try again later');
        }
        // Erreur d'authentification
        if (error.response.status === 401) {
          throw new Error('Authentication error: Please login again');
        }
        // Erreur de validation
        if (error.response.status === 400) {
          throw new Error(error.response.data.message || 'Invalid course data');
        }
      }

      throw error;
    }
  },

  // Get course details by ID
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/api/instructor/course/get/details/${courseId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching course details:", error)
      throw error
    }
  },
  

  // Update course by ID
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(`/api/instructor/course/update/${courseId}`, courseData)
      return response.data
    } catch (error) {
      console.error("Error updating course:", error)
      throw error
    }
  },

  // Get all instructor courses
  getInstructorCourses: async () => {
    try {
      const response = await api.get("/api/instructor/course/get")
      return response.data
    } catch (error) {
      console.error("Error fetching instructor courses:", error)
      throw error
    }
  },
}

// Media services
export const mediaService = {
  // Upload media file
  uploadMedia: async (file, onProgress) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await api.post("/api/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          if (onProgress) {
            onProgress(percentCompleted)
          }
        },
      })
      return response.data
    } catch (error) {
      console.error("Error uploading media:", error)
      throw error
    }
  },

  // Delete media file
  deleteMedia: async (publicId) => {
    try {
      const response = await api.delete(`/api/media/delete/${publicId}`)
      return response.data
    } catch (error) {
      console.error("Error deleting media:", error)
      throw error
    }
  },
}

// Transform course data from state format to backend format
export const transformCourseDataForBackend = (state) => {
  const { courseDetails, modules, quizzes, customCategories = [] } = state;

  // Transformation des données de base
  const baseCourseData = {
    title: courseDetails.title.trim(),
    category: {
      id: courseDetails.category,
      name: courseDetails.category,
      isCustom: customCategories.some(cat => cat.id === courseDetails.category)
    },
    level: courseDetails.level.trim(),
    primaryLanguage: courseDetails.primaryLanguage?.trim() || "english",
    subtitle: courseDetails.subtitle?.trim() || "",
    description: courseDetails.description.trim(),
    objectives: courseDetails.objectives?.trim() || "",
    welcomeMessage: courseDetails.welcomeMessage?.trim() || "",
    image: courseDetails.image || "",
    duration: Number(courseDetails.duration) || 0,
    difficulty: courseDetails.difficulty || "beginner",
    prerequisites: courseDetails.prerequisites?.filter(p => p?.trim()).map(p => p.trim()) || [],
    targetAudience: courseDetails.targetAudience?.filter(a => a?.trim()).map(a => a.trim()) || [],
    learningOutcomes: courseDetails.learningOutcomes?.filter(o => o?.trim()).map(o => o.trim()) || [],
    resources: courseDetails.resources?.filter(r => r?.trim()).map(r => r.trim()) || [],
    tags: courseDetails.tags?.filter(t => t?.trim()).map(t => t.trim()) || [],
    instructorId: courseDetails.instructorId,
    instructorName: courseDetails.instructorName,
    customCategories: customCategories.map(cat => ({
      id: cat.id,
      label: cat.label
    }))
  };

  // Transformation des modules
  const transformedCurriculum = modules.map(module => ({
    moduleTitle: module.title.trim(),
    moduleDescription: module.description?.trim() || "",
    learningObjectives: module.learningObjectives?.filter(lo => lo?.trim()).map(lo => lo.trim()) || [],
    prerequisites: module.prerequisites?.filter(p => p?.trim()).map(p => p.trim()) || [],
    estimatedDuration: Number(module.estimatedDuration) || 0,
    order: Number(module.order) || 0,
    sections: module.sections.map(section => {
      const baseSection = {
        sectionTitle: section.title.trim(),
        sectionType: section.type,
        order: Number(section.order) || 0,
        freePreview: Boolean(section.freePreview),
        duration: 0,
        difficulty: "beginner"
      };

      // Contenu spécifique au type
      let content = {};
      switch(section.type) {
        case 'text':
          content = {
            text: {
              content: section.content?.trim() || "",
              format: "markdown"
            }
          };
          break;
        case 'video':
          content = {
            video: {
              url: section.videoUrl || "",
              public_id: section.public_id || "",
              description: section.content?.trim() || "",
              duration: 0
            }
          };
          break;
        case 'image':
          content = {
            image: {
              url: section.imageUrl || "",
              public_id: section.public_id || "",
              caption: section.content?.trim() || "",
              description: ""
            }
          };
          break;
        default:
          content = { [section.type]: {} };
      }

      return {
        ...baseSection,
        content
      };
    })
  }));

  // Transformation des quizzes
  const transformedQuizzes = {
    moduleQuizzes: {},
    finalQuiz: null
  };

  if (quizzes?.moduleQuizzes) {
    Object.entries(quizzes.moduleQuizzes).forEach(([moduleId, quiz]) => {
      if (quiz?.questions) {
        transformedQuizzes.moduleQuizzes[moduleId] = {
          title: quiz.title?.trim() || `Quiz for Module ${moduleId}`,
          description: quiz.description?.trim() || "",
          questions: quiz.questions.map(question => ({
            question: question.text?.trim() || "",
            type: question.type || "multiple-choice",
            options: question.options?.map(opt => opt.text?.trim() || "") || [],
            correctAnswer: question.options?.find(opt => opt.isCorrect)?.text?.trim() || "",
            explanation: question.explanation?.trim() || ""
          }))
        };
      }
    });
  }

  if (quizzes?.finalQuiz) {
    transformedQuizzes.finalQuiz = {
      title: quizzes.finalQuiz.title?.trim() || "Final Assessment",
      description: quizzes.finalQuiz.description?.trim() || "",
      questions: quizzes.finalQuiz.questions?.map(question => ({
        question: question.text?.trim() || "",
        type: question.type || "multiple-choice",
        options: question.options?.map(opt => opt.text?.trim() || "") || [],
        correctAnswer: question.options?.find(opt => opt.isCorrect)?.text?.trim() || "",
        explanation: question.explanation?.trim() || ""
      })) || []
    };
  }

  return {
    ...baseCourseData,
    curriculum: transformedCurriculum,
    quizzes: transformedQuizzes
  };
};

// Transform backend data to state format
export const transformBackendDataToState = (courseData) => {
  const courseDetails = {
    title: courseData.title || "",
    category: courseData.category || "",
    level: courseData.level || "",
    primaryLanguage: courseData.primaryLanguage || "",
    subtitle: courseData.subtitle || "",
    description: courseData.description || "",
    objectives: courseData.objectives || "",
    welcomeMessage: courseData.welcomeMessage || "",
    image: courseData.image || "",
    duration: courseData.duration || 0,
    difficulty: courseData.difficulty || "beginner",
    prerequisites: courseData.prerequisites || [],
    targetAudience: courseData.targetAudience || [],
    learningOutcomes: courseData.learningOutcomes || [],
    resources: courseData.resources || [],
    tags: courseData.tags || [],
    instructorId: courseData.instructorId || "",
    instructorName: courseData.instructorName || "",
  }

  // Transform curriculum to modules and sections
  const modules = []
  const moduleQuizzes = {}

  if (courseData.curriculum && courseData.curriculum.length > 0) {
    courseData.curriculum.forEach((module, moduleIndex) => {
      const moduleId = `module-${moduleIndex + 1}`
      const sections = []
      let hasFinalQuiz = false

      // Process sections
      if (module.sections && module.sections.length > 0) {
        module.sections.forEach((section, sectionIndex) => {
          if (section.sectionType === "quiz" && module.moduleTitle.includes("Final")) {
            hasFinalQuiz = true
            return // Skip this section as it will be handled separately
          }

          const sectionId = `section-${moduleId}-${sectionIndex + 1}`
          const sectionData = {
            id: sectionId,
            title: section.sectionTitle || "",
            type: section.sectionType || "text",
            content: "",
            videoUrl: "",
            imageUrl: "",
            public_id: "",
            order: section.order || sectionIndex,
            freePreview: section.freePreview || false,
          }

          // Extract content based on section type
          if (section.sectionType === "text" && section.content?.text) {
            sectionData.content = section.content.text.content || ""
          } else if (section.sectionType === "video" && section.content?.video) {
            sectionData.videoUrl = section.content.video.url || ""
            sectionData.public_id = section.content.video.public_id || ""
            sectionData.content = section.content.video.description || ""
          } else if (section.sectionType === "image" && section.content?.image) {
            sectionData.imageUrl = section.content.image.url || ""
            sectionData.public_id = section.content.image.public_id || ""
            sectionData.content = section.content.image.caption || ""
          } else if (section.sectionType === "quiz" && section.content?.quiz) {
            // Handle module quiz
            const quizQuestions = section.content.quiz.questions.map((q, qIndex) => {
              const questionId = `q-${moduleId}-${qIndex + 1}`
              let options = []

              if (q.type === "true-false") {
                options = [
                  { id: "true", text: "True", isCorrect: q.correctAnswer === "True" },
                  { id: "false", text: "False", isCorrect: q.correctAnswer === "False" },
                ]
              } else {
                options = q.options.map((opt, optIndex) => {
                  const optionId = `o-${questionId}-${optIndex + 1}`
                  let isCorrect = false

                  if (q.type === "multiple-choice") {
                    isCorrect = Array.isArray(q.correctAnswer) && q.correctAnswer.includes(opt)
                  } else {
                    isCorrect = q.correctAnswer === opt
                  }

                  return {
                    id: optionId,
                    text: opt,
                    isCorrect,
                  }
                })
              }

              return {
                id: questionId,
                text: q.question,
                type: q.type,
                options,
                explanation: q.explanation || "",
              }
            })

            moduleQuizzes[moduleId] = {
              title: section.sectionTitle || `Quiz for Module: ${module.moduleTitle}`,
              description: section.content.quiz.description || `Test your understanding of ${module.moduleTitle}`,
              questions: quizQuestions,
            }

            // Skip adding this section as it's handled in moduleQuizzes
            return
          }

          sections.push(sectionData)
        })
      }

      // Only add the module if it's not the final quiz module
      if (!hasFinalQuiz) {
        modules.push({
          id: moduleId,
          title: module.moduleTitle || "",
          description: module.moduleDescription || "",
          learningObjectives: module.learningObjectives || [],
          prerequisites: module.prerequisites || [],
          estimatedDuration: module.estimatedDuration || 0,
          order: module.order || moduleIndex,
          sections,
        })
      }
    })
  }

  // Extract final quiz if it exists
  let finalQuiz = {
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
  }

  // Look for a final quiz module
  const finalQuizModule = courseData.curriculum?.find(
    (m) => m.moduleTitle.includes("Final") || m.moduleTitle.includes("Assessment"),
  )

  if (finalQuizModule && finalQuizModule.sections) {
    const quizSection = finalQuizModule.sections.find((s) => s.sectionType === "quiz")

    if (quizSection && quizSection.content?.quiz) {
      const quizQuestions = quizSection.content.quiz.questions.map((q, qIndex) => {
        const questionId = `fq-${qIndex + 1}`
        let options = []

        if (q.type === "true-false") {
          options = [
            { id: "true", text: "True", isCorrect: q.correctAnswer === "True" },
            { id: "false", text: "False", isCorrect: q.correctAnswer === "False" },
          ]
        } else {
          options = q.options.map((opt, optIndex) => {
            const optionId = `fo-${questionId}-${optIndex + 1}`
            let isCorrect = false

            if (q.type === "multiple-choice") {
              isCorrect = Array.isArray(q.correctAnswer) && q.correctAnswer.includes(opt)
            } else {
              isCorrect = q.correctAnswer === opt
            }

            return {
              id: optionId,
              text: opt,
              isCorrect,
            }
          })
        }

        return {
          id: questionId,
          text: q.question,
          type: q.type,
          options,
          explanation: q.explanation || "",
        }
      })

      finalQuiz = {
        title: finalQuizModule.moduleTitle || "Final Course Assessment",
        description: finalQuizModule.moduleDescription || "Comprehensive assessment of all course material",
        questions: quizQuestions.length > 0 ? quizQuestions : finalQuiz.questions,
      }
    }
  }

  return {
    courseDetails,
    modules,
    quizzes: {
      moduleQuizzes,
      finalQuiz,
    },
    courseId: courseData._id,
  }
}
