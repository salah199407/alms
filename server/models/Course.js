const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  video: {
    url: String,
    public_id: String,
    description: String,
    duration: Number
  },
  text: {
    content: String,
    format: { type: String, default: "markdown" }
  },
  image: {
    url: String,
    public_id: String,
    caption: String,
    description: String
  },
  interactive: {
    type: { type: String, default: "code-editor" },
    content: String,
    resources: [String],
    instructions: String,
    solution: String,
    hints: [String],
    settings: {
      language: { type: String, default: "javascript" },
      theme: { type: String, default: "light" },
      readOnly: { type: Boolean, default: false }
    }
  },
  quiz: {
    questions: [{
      question: String,
      type: String,
      options: [String],
      correctAnswer: String,
      explanation: String
    }],
    passingScore: { type: Number, default: 70 },
    timeLimit: { type: Number, default: 30 },
    retryAttempts: { type: Number, default: 3 },
    feedback: {
      correct: String,
      incorrect: String
    }
  }
});

const SectionSchema = new mongoose.Schema({
  sectionTitle: String,
  sectionDescription: String,
  sectionType: { type: String, default: "video" },
  order: { type: Number, default: 0 },
  content: ContentSchema,
  freePreview: { type: Boolean, default: false },
  duration: { type: Number, default: 0 },
  difficulty: { type: String, default: "beginner" },
  tags: [String],
  resources: [String],
  notes: String
});

const ModuleSchema = new mongoose.Schema({
  moduleTitle: String,
  moduleDescription: String,
  learningObjectives: [String],
  prerequisites: [String],
  estimatedDuration: { type: Number, default: 0 },
  sections: [SectionSchema],
  order: { type: Number, default: 0 },
  completionCriteria: {
    type: { type: String, default: "all" },
    value: { type: Number, default: 100 }
  }
});

const CourseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  date: { type: Date, default: Date.now },
  title: String,
  category: {
    name: String,
    isCustom: Boolean
  },
 
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  image: String,
  welcomeMessage: String,
  objectives: String,
  pricing: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  difficulty: { type: String, default: "beginner" },
  prerequisites: [String],
  targetAudience: [String],
  learningOutcomes: [String],
  resources: [String],
  tags: [String],
  students: [{
    studentId: String,
    studentName: String,
    studentEmail: String,
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
  }],
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  instructorRating: { type: Number, default: 0 },
  instructorReviews: { type: Number, default: 0 },
  instructorStudents: { type: Number, default: 0 },
  instructorCourses: { type: Number, default: 0 },
  curriculum: [{
    moduleTitle: { type: String, required: true },
    moduleDescription: String,
    learningObjectives: [{ type: String }],
    prerequisites: [{ type: String }],
    estimatedDuration: Number,
    order: Number,
    sections: [{
      sectionTitle: { type: String, required: true },
      sectionType: { 
        type: String, 
        enum: ["text", "video", "image", "quiz", "interactive"],
        default: "text"
      },
      order: Number,
      freePreview: Boolean,
      duration: Number,
      difficulty: String,
      content: {
        type: {
          video: {
            url: String,
            public_id: String,
            description: String,
            duration: Number
          },
          text: {
            content: String,
            format: { type: String, default: "markdown" }
          },
          image: {
            url: String,
            public_id: String,
            caption: String,
            description: String
          },
          quiz: {
            questions: [{
              question: String,
              type: String,
              options: [String],
              correctAnswer: String,
              explanation: String
            }],
            passingScore: Number,
            timeLimit: Number
          }
        },
        required: true
      }
    }]
  }],
  isPublished: { type: Boolean, default: false },
  approvalStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  rejectionReason: String,
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approvalDate: Date

  
});

module.exports = mongoose.model("Course", CourseSchema);
