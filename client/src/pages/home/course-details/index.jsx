import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import {
  Calendar,
  CheckCircle,
  Star,
  Award,
  Users,
  Globe,
  FileText,
  MessageSquare,
  Download,
  BookOpen,
  Clock,
  GraduationCap,
  Shield,
  Briefcase,
  ChevronLeft,
  BadgeIcon as Certificate,
} from "lucide-react"

// Configuration de l'URL de base de l'API
const API_BASE_URL = "http://localhost:5000/api/courses"

// Composants UI personnalisés
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CourseDetail() {
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!params?.id) {
        setError("Course ID not specified")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/${params.id}`)

        if (!response.ok) {
          throw new Error("Error fetching course data")
        }

        const data = await response.json()
        if (data.success) {
          // Calculate course statistics
          const courseData = {
            ...data.data,
            rating: data.data.reviews?.length > 0 
              ? data.data.reviews.reduce((acc, review) => acc + review.rating, 0) / data.data.reviews.length 
              : 0,
            reviewCount: data.data.reviews?.length || 0,
            enrollments: data.data.students?.length || 0,
            lastUpdated: new Date(data.data.date).toLocaleDateString("en-US"),
            videoHours: data.data.curriculum?.reduce((acc, module) => 
              acc + module.sections?.reduce((sectionAcc, section) => 
                sectionAcc + (section.duration || 0), 0), 0) || 0,
            articles: data.data.curriculum?.reduce((acc, module) => 
              acc + module.sections?.filter(section => section.sectionType === "text").length, 0) || 0,
            resources: data.data.resources?.length || 0,
            moduleCount: data.data.curriculum?.length || 0,
            lectureCount: data.data.curriculum?.reduce((acc, module) => 
              acc + (module.sections?.length || 0), 0) || 0,
            program: data.data.curriculum?.map(module => ({
              title: module.moduleTitle,
              duration: `${module.estimatedDuration} hours`,
              topics: module.sections?.map(section => section.sectionTitle) || []
            })) || [],
            prerequisites: data.data.prerequisites || [],
            learningOutcomes: data.data.learningOutcomes || [],
            targetAudience: data.data.targetAudience || [],
            reviews: data.data.reviews?.map(review => ({
              name: review.userName,
              date: new Date(review.date).toLocaleDateString("en-US"),
              rating: review.rating,
              comment: review.comment
            })) || [],
            duration: `${data.data.duration} hours`,
            primaryLanguage: data.data.primaryLanguage || "English"
          }
          setCourse(courseData)
        } else {
          setError("Error fetching course data")
        }
      } catch (error) {
        console.error("Error fetching course details:", error)
        setError("Error fetching course details")
      } finally {
        setLoading(false)
      }
    }

    fetchCourseDetails()
  }, [params?.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#ff7900]"></div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-6">Error</h1>
        <p className="text-muted-foreground mb-8">{error || "Course not found"}</p>
        <Button asChild className="bg-[#ff7900] hover:bg-[#ff7900]/90 px-8 py-6 text-lg font-medium rounded-xl">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
    
      <div className="bg-gradient-to-b from-[#ff7900]/10 to-white border-b">
        <div className="container mx-auto px-6 py-10">
      

          <div className="grid md:grid-cols-12 gap-10">
            {/* Contenu principal à gauche */}
            <div className="md:col-span-7 lg:col-span-8 space-y-6">
              <Badge className="bg-[#ff7900] hover:bg-[#ff7900]/90 px-4 py-1 text-base rounded-full">
                {course.category?.name || 'Uncategorized'}
              </Badge>
              <h1 className="text-4xl font-bold">{course.title}</h1>
              <p className="text-xl text-muted-foreground">{course.subtitle || course.description}</p>

              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.round(course.rating) ? "fill-[#ff7900] text-[#ff7900]" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-lg">{course.rating}</span>
                <span className="text-muted-foreground">({course.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt={course.instructorName} />
                  <AvatarFallback>
                    {course.instructorName
                      ? course.instructorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : "IN"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-base">
                  Created by <span className="font-medium">{course.instructorName}</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-6 text-base">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#ff7900]" />
                  <span>Last updated: {course.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#ff7900]" />
                  <span>{course.primaryLanguage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#ff7900]" />
                  <span>{course.enrollments}+ enrolled</span>
                </div>
              </div>

              <Tabs defaultValue="contenu" className="w-full mt-8">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger
                    value="contenu"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#ff7900] data-[state=active]:shadow-md rounded-lg py-3 text-base font-medium"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger
                    value="certif"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#ff7900] data-[state=active]:shadow-md rounded-lg py-3 text-base font-medium"
                  >
                    Certification
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructeur"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#ff7900] data-[state=active]:shadow-md rounded-lg py-3 text-base font-medium"
                  >
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger
                    value="avis"
                    className="data-[state=active]:bg-white data-[state=active]:text-[#ff7900] data-[state=active]:shadow-md rounded-lg py-3 text-base font-medium"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="contenu" className="mt-8 space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">What you'll learn</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {course.learningOutcomes.map((outcome, index) => (
                        <div
                          key={index}
                          className="flex gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                          <CheckCircle className="h-6 w-6 text-[#ff7900] flex-shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-200 h-0.5" />

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Course Program</h2>
                      <div className="text-base text-muted-foreground">
                        {course.moduleCount} modules • {course.lectureCount} lessons • {course.duration} total
                      </div>
                    </div>

                    <div className="space-y-6">
                      {course.program.map((module, index) => (
                        <details
                          key={index}
                          className="border-2 rounded-xl group shadow-sm hover:shadow-md transition-shadow"
                          open={index === 0}
                        >
                          <summary className="flex justify-between items-center p-5 cursor-pointer list-none bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-xl">
                            <div className="font-medium text-lg">
                              Module {index + 1}: {module.title}
                            </div>
                            <div className="text-base text-muted-foreground">
                              {module.duration} • {module.topics.length} lessons
                            </div>
                          </summary>
                          <div className="p-5 pt-3 border-t">
                            <ul className="space-y-3">
                              {module.topics.map((topic, topicIndex) => (
                                <li
                                  key={topicIndex}
                                  className="flex items-center gap-4 py-3 hover:bg-gray-50 px-3 rounded-lg transition-colors"
                                >
                                  <BookOpen className="h-6 w-6 text-[#ff7900]" />
                                  <span className="text-base">{topic}</span>
                                  <span className="ml-auto text-base text-muted-foreground">10:00</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-200 h-0.5" />

                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Prerequisites</h2>
                    <ul className="list-disc pl-6 space-y-3">
                      {course.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="text-base">
                          {prerequisite}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="bg-gray-200 h-0.5" />

                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Description</h2>
                    <div className="prose max-w-none text-base">
                      <p>
                        This course is designed for {course.targetAudience?.join(', ') || 'professionals'} who want to deepen their knowledge and skills in {course.category?.name?.toLowerCase() || 'this field'}. You will learn through concrete examples and practical exercises.
                      </p>
                      <p>
                        By the end of this course, you will be able to implement the learned concepts in your professional environment and bring real added value to your organization.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 h-0.5" />

                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Who is this course for?</h2>
                    <ul className="space-y-3">
                      {course.targetAudience.map((audience, index) => (
                        <li
                          key={index}
                          className="flex gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                          <CheckCircle className="h-6 w-6 text-[#ff7900] flex-shrink-0" />
                          <span className="text-base">{audience}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="certif" className="mt-8 space-y-8">
                  <div className="bg-white border-2 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-10 text-center border-b bg-gradient-to-r from-[#ff7900]/5 to-[#ff7900]/10">
                      <Certificate className="h-20 w-20 mx-auto mb-6 text-[#ff7900]" />
                      <h2 className="text-3xl font-bold mb-3">Certification of Success</h2>
                      <p className="text-muted-foreground text-lg">
                        Get an official Orange Learning certificate after completing this course
                      </p>
                    </div>

                    <div className="p-8">
                      {/* CERTIFICATE PREVIEW WITH BACKGROUND IMAGE */}
                      <div
                        className="relative border-2 rounded-xl mb-8 bg-cover bg-center bg-no-repeat "
                        style={{
                          backgroundImage: "url('/certif.png')",
                          height: "600px",
                          width: "100%",
                        }}
                      >
                        
                        <div className="absolute inset-0 bg-white/70 rounded-xl p-8 flex flex-col justify-between">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                              Completion Certificate
                            </div>
                            <h3 className="text-2xl font-bold">{course.title}</h3>
                            <div className="mt-3 text-base">Issued by Orange Learning</div>
                          </div>

                          <div className="flex justify-between items-center mt-8">
                            <div className="text-base">
                              <div className="font-medium">Participant's Name</div>
                              <div className="text-muted-foreground italic">Your Name Here</div>
                            </div>
                            <div className="text-base text-right">
                              <div className="font-medium">Issue Date</div>
                              <div className="text-muted-foreground italic">MM/DD/YYYY</div>
                            </div>
                          </div>

                          <div className="flex justify-center mt-6">
                            <div className="h-12 w-32 bg-[#ff7900]/20 rounded-lg flex items-center justify-center text-[#ff7900] font-medium">
                              Signature
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BENEFITS SECTION */}
                      <h3 className="text-xl font-bold mb-6">Benefits of This Certification</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4 p-6 border-2 rounded-xl hover:shadow-md transition-shadow bg-white">
                          <Briefcase className="h-8 w-8 text-[#ff7900] flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-lg mb-1">Professional Enhancement</h4>
                            <p className="text-base text-muted-foreground">Enrich your CV and LinkedIn profile</p>
                          </div>
                        </div>

                        <div className="flex gap-4 p-6 border-2 rounded-xl hover:shadow-md transition-shadow bg-white">
                          <Shield className="h-8 w-8 text-[#ff7900] flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-lg mb-1">Official Recognition</h4>
                            <p className="text-base text-muted-foreground">Certification recognized by Orange</p>
                          </div>
                        </div>

                        <div className="flex gap-4 p-6 border-2 rounded-xl hover:shadow-md transition-shadow bg-white">
                          <GraduationCap className="h-8 w-8 text-[#ff7900] flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-lg mb-1">Skill Development</h4>
                            <p className="text-base text-muted-foreground">Attestation of your new skills</p>
                          </div>
                        </div>

                        <div className="flex gap-4 p-6 border-2 rounded-xl hover:shadow-md transition-shadow bg-white">
                          <Users className="h-8 w-8 text-[#ff7900] flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-lg mb-1">Professional Network</h4>
                            <p className="text-base text-muted-foreground">Join the community of certified</p>
                          </div>
                        </div>
                      </div>

                      {/* HOW TO GET CERTIFICATION */}
                      <div className="mt-8 p-6 bg-[#ff7900]/5 rounded-xl border-2 border-[#ff7900]/20">
                        <h4 className="font-medium text-lg flex items-center gap-3 mb-4">
                          <Clock className="h-6 w-6 text-[#ff7900]" />
                          How to get your certificate
                        </h4>
                        <ol className="list-decimal pl-6 space-y-2 text-base">
                          <li>Complete all course modules</li>
                          <li>Complete practical exercises and quizzes</li>
                          <li>Get a minimum score of 70% on final assessments</li>
                          <li>Download your certificate from your personal space</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </TabsContent>



                <TabsContent value="instructeur" className="mt-8 space-y-8">
                  <div className="flex items-start gap-6 bg-white p-8 rounded-xl border-2 shadow-md">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" alt={course.instructorName} />
                      <AvatarFallback>
                        {course.instructorName
                          ? course.instructorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "IN"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{course.instructorName}</h2>
                      <p className="text-muted-foreground text-lg">{course.instructorTitle}</p>

                      <div className="flex flex-wrap gap-6 mt-4 text-base">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-[#ff7900]" />
                          <span>{course.instructorRating} Average Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-[#ff7900]" />
                          <span>{course.instructorReviews} reviews</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-[#ff7900]" />
                          <span>{course.instructorStudents} participants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-[#ff7900]" />
                          <span>{course.instructorCourses} courses</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none bg-white p-8 rounded-xl border-2 shadow-md">
                    <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
                    <p className="text-base">{course.instructorBio}</p>
                    <p className="text-base">
                      With a solid experience in the field, {course.instructorName} shares their expertise through practical and accessible trainings. Their pedagogical approach is based on concrete examples and real cases, allowing learners to quickly acquire applicable skills in their professional context.
                    </p>
                    <p className="text-base">
                      Passionate about knowledge transmission, {course.instructorName} has developed a unique methodology that has already allowed thousands of learners to progress efficiently.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-xl border-2 shadow-md">
                    <h3 className="text-xl font-bold mb-6">Other trainings from this instructor</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {[1, 2].map((item) => (
                        <div
                          key={item}
                          className="border-2 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-video relative bg-gray-100">
                            <img
                              src="/placeholder.svg?height=120&width=240"
                              alt={`Training ${item}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium text-lg mb-2">Supplementary Training {item}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Star className="h-4 w-4 fill-[#ff7900] text-[#ff7900]" />
                              <span className="text-base">4.7</span>
                              <span className="text-base text-muted-foreground">(120 reviews)</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="avis" className="mt-8 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-72 space-y-6 bg-white p-8 rounded-xl border-2 shadow-md">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-[#ff7900]">{course.rating}</div>
                        <div className="flex justify-center my-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-6 w-6 ${
                                star <= Math.round(course.rating) ? "fill-[#ff7900] text-[#ff7900]" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-base text-muted-foreground">Course Rating</div>
                        <div className="text-base font-medium">{course.reviewCount} reviews</div>
                      </div>

                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="w-1/6 text-base text-right">{rating}</div>
                            <div className="w-4/6">
                              <Progress
                                value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 0 : 0}
                                className="h-3 rounded-full bg-gray-200"
                              />
                            </div>
                            <div className="w-1/6 text-base text-muted-foreground">
                              {rating === 5
                                ? "75%"
                                : rating === 4
                                  ? "20%"
                                  : rating === 3
                                    ? "5%"
                                    : rating === 2
                                      ? "0%"
                                      : "0%"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 space-y-6">
                      {course.reviews.map((review, index) => (
                        <div key={index} className="border-2 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="/placeholder.svg" alt={review.name} />
                              <AvatarFallback>
                                {review.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-lg">{review.name}</div>
                              <div className="text-base text-muted-foreground">{review.date}</div>
                            </div>
                          </div>

                          <div className="flex my-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= review.rating ? "fill-[#ff7900] text-[#ff7900]" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          <p className="text-base">{review.comment}</p>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        className="w-full hover:border-[#ff7900] hover:text-[#ff7900] transition-colors py-3 text-lg font-medium border-2 rounded-xl"
                      >
                        See all reviews
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Image et inscription à droite */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="bg-white border-2 rounded-xl shadow-lg overflow-hidden sticky top-28">
                <div className="aspect-video relative bg-gray-100">
                  <img
                    src={course.image || "/placeholder.svg?height=200&width=400"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-white font-bold text-xl">{course.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-base font-medium text-center border border-green-200">
                    Course 100% free
                  </div>

                  <Button className="w-full bg-[#ff7900] hover:bg-[#ff7900]/90 py-6 text-xl font-medium shadow-lg hover:shadow-xl transition-all rounded-xl">
                    Enroll now
                  </Button>

                  <div className="space-y-4 pt-4 border-t-2">
                    <h3 className="font-medium text-lg">This course includes:</h3>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <BookOpen className="h-6 w-6 text-[#ff7900] flex-shrink-0" />
                        <span className="text-base">{course.moduleCount} training modules</span>
                      </li>
                      <li className="flex gap-3">
                        <FileText className="h-6 w-6 text-[#ff7900] flex-shrink-0" />
                        <span className="text-base">{course.articles} articles and resources</span>
                      </li>
                      <li className="flex gap-3">
                        <Download className="h-6 w-6 text-[#ff7900] flex-shrink-0" />
                        <span className="text-base">{course.resources} downloadable resources</span>
                      </li>
                      <li className="flex gap-3">
                        <MessageSquare className="h-6 w-6 text-[#ff7900] flex-shrink-0" />
                        <span className="text-base">Discussion forum</span>
                      </li>
                      <li className="flex gap-3">
                        <Award className="h-6 w-6 text-[#ff7900] flex-shrink-0" />
                        <span className="text-base">Completion certificate</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      variant="outline"
                      className="hover:border-[#ff7900] hover:text-[#ff7900] transition-colors px-6 py-2 border-2 rounded-xl"
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:border-[#ff7900] hover:text-[#ff7900] transition-colors px-6 py-2 border-2 rounded-xl"
                    >
                      Add to favorites
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}
// Fonction pour générer un programme par défaut à partir du curriculum
function getDefaultProgram(curriculum) {
  if (!curriculum || curriculum.length === 0) {
    return [
      {
        title: "Introduction to the course",
        duration: "8 hours",
        topics: [
          "Introduction to basic concepts",
          "Presentation of necessary tools",
          "First practical steps",
          "Application exercises",
        ],
      },
      {
        title: "Deepening",
        duration: "10 hours",
        topics: ["Advanced concepts", "Practical case studies", "Specialized techniques", "Tutorials"],
      },
      {
        title: "Putting into practice",
        duration: "8 hours",
        topics: [
          "Applying knowledge",
          "Concrete projects",
          "Problem solving",
          "Skill evaluation",
        ],
      },
    ]
  }

  // Créer des modules à partir du curriculum
  const modules = []
  const chunkSize = Math.ceil(curriculum.length / 3) // Diviser le curriculum en 3 modules environ

  for (let i = 0; i < curriculum.length; i += chunkSize) {
    const chunk = curriculum.slice(i, i + chunkSize)
    const moduleTitle =
      i === 0 ? "Introduction" : i + chunkSize >= curriculum.length ? "Putting into practice" : "Deepening"

    modules.push({
      title: moduleTitle,
      duration: `${chunk.length * 2} hours`,
      topics: chunk.map((item) => item.title || "Lesson without title"),
    })
  }

  return modules
}

// Fonction pour générer des avis par défaut
function getDefaultReviews() {
  return [
    {
      name: "Jean Dupont",
      date: "2 weeks ago",
      rating: 5,
      comment:
        "Exceptional training! The content is very well structured and the instructor explains complex concepts clearly. I was able to apply these knowledge immediately in my daily work.",
    },
    {
      name: "Marie Lambert",
      date: "1 month ago",
      rating: 4,
      comment:
        "Very good training with concrete examples. I would have liked more practical exercises, but overall, it's an excellent resource to deepen your knowledge.",
    },
    {
      name: "Thomas Bernard",
      date: "2 months ago",
      rating: 5,
      comment:
        "I highly recommend this training to anyone who wants to perfect in this field. The instructor is very competent and the provided resources are of high quality.",
    },
  ]
}

// Fonction pour simuler la récupération des données du cours
function getMockCourseData(id) {
  // Données statiques pour le cours
  return {
    _id: id,
    title: "Advanced Web Development",
    subtitle: "Master modern frameworks and best practices in web development",
    description:
      "This complete advanced web development course will allow you to master the frameworks and technologies used by professionals in the sector.",
    category: "Development",
    level: "Advanced",
    primaryLanguage: "English",
    instructorName: "Marie Dupont",
    instructorTitle: "Lead Developer at Orange",
    instructorBio:
      "Marie Dupont is a senior web developer with over 10 years of experience in developing large-scale web applications. She worked for several large technology companies before joining Orange as a Lead Developer.",
    instructorRating: 4.9,
    instructorReviews: 1240,
    instructorStudents: 15600,
    instructorCourses: 5,
    rating: 4.8,
    reviewCount: 342,
    enrollments: 2450,
    lastUpdated: "March 2025",
    duration: "35 hours",
    videoHours: 35,
    articles: 15,
    resources: 25,
    moduleCount: 5,
    lectureCount: 42,
    image: "/placeholder.svg?height=400&width=800",
    program: [
      {
        title: "Modern JavaScript Frameworks",
        duration: "8 hours",
        topics: [
          "Introduction to modern frameworks",
          "React and its ecosystem",
          "Vue.js for reactive interfaces",
          "Angular for enterprise applications",
          "Framework comparison and choice",
        ],
      },
      {
        title: "Architecture and performance",
        duration: "10 hours",
        topics: [
          "Advanced front-end architecture patterns",
          "Advanced state management",
          "Performance optimization",
          "Automated tests",
          "CI/CD for web applications",
        ],
      },
      {
        title: "Backend and API",
        duration: "8 hours",
        topics: [
          "API RESTful design",
          "GraphQL for flexible queries",
          "Authentication and authorization",
          "Web application security",
          "Error handling and logging",
        ],
      },
    ],
    prerequisites: [
      "Basic knowledge of HTML, CSS and JavaScript",
      "Web development experience",
      "Familiarity with Git and development tools",
      "Understanding of basic API concepts",
    ],
    learningOutcomes: [
      "Master modern JavaScript frameworks (React, Vue, Angular)",
      "Design scalable and maintainable front-end architectures",
      "Implement effective RESTful and GraphQL APIs",
      "Optimize web application performance",
      "Set up CI/CD pipelines for continuous deployment",
      "Secure your web applications against common vulnerabilities",
      "Deploy applications on different cloud platforms",
      "Implement automated tests to ensure code quality",
    ],
    targetAudience: [
      "Web developers wanting to deepen their skills",
      "IT professionals looking to specialize in modern web development",
      "Technical project managers wanting to better understand web development issues",
      "Entrepreneurs wanting to acquire technical skills for their projects",
    ],
    reviews: getDefaultReviews(),
  }
}

