export const signUpFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: "User Email",
    placeholder: "Enter your user email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};

export const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "chinese", label: "Chinese" },
  { id: "japanese", label: "Japanese" },
  { id: "korean", label: "Korean" },
  { id: "portuguese", label: "Portuguese" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
];

export const courseLevelOptions = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export const courseCategories = [
  { id: "web-development", label: "Web Development" },
  { id: "mobile-development", label: "Mobile Development" },
  { id: "data-science", label: "Data Science" },
  { id: "cyber-security", label: "Cyber Security" }, // Machine Learning remplacé ici
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "backend-development", label: "Backend Development" },
  { id: "game-development", label: "Game Development" },
  { id: "software-engineering", label: "Software Engineering" },
  { id: "devops-engineering", label: "Devops Engineering" },
];

export const contentTypes = [
  { id: "video", label: "Video Lecture" },
  { id: "text", label: "Text Content" },
  { id: "image", label: "Image Gallery" },
  { id: "interactive", label: "Interactive Content" },
  { id: "quiz", label: "Quiz" },
  { id: "assessment", label: "Assessment" },
  { id: "project", label: "Project" },
  { id: "lab", label: "Lab Exercise" },
]

export const interactiveContentTypes = [
  { id: "code-editor", label: "Code Editor" },
  { id: "simulation", label: "Simulation" },
  { id: "game", label: "Educational Game" },
  { id: "virtual-lab", label: "Virtual Lab" },
]

export const assessmentTypes = [
  { id: "project", label: "Project" },
  { id: "case-study", label: "Case Study" },
  { id: "lab", label: "Lab Exercise" },
  { id: "presentation", label: "Presentation" },
]

export const completionCriteriaTypes = [
  { id: "all", label: "Complete All Sections" },
  { id: "percentage", label: "Complete Percentage" },
  { id: "points", label: "Earn Points" },
]

export const quizQuestionTypes = [
  { id: "multiple-choice", label: "Multiple Choice" },
  { id: "true-false", label: "True/False" },
  { id: "short-answer", label: "Short Answer" },
  { id: "essay", label: "Essay" },
  { id: "code", label: "Code Question" },
  { id: "matching", label: "Matching" },
  { id: "fill-blank", label: "Fill in the Blank" },
  { id: "drag-drop", label: "Drag and Drop" },
]

export const difficultyLevels = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
]

export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  {
    name: "primaryLanguage",
    label: "Primary Language",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: languageOptions,
  },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",
    componentType: "input",
    type: "number",
    placeholder: "Enter course pricing",
  },
  {
    name: "objectives",
    label: "Objectives",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course objectives",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "Welcome message for students",
  },
];

export const courseLandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
  },
];

export const sortOptions = [
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  primaryLanguage: languageOptions,
};
