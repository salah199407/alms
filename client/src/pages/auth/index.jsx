import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "@/context/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, BookOpen, Users, Layers, Eye, EyeOff, CheckCircle, AlertCircle, X } from "lucide-react"
import logo from "../../../public/logo.png"

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [formError, setFormError] = useState("")
  const [emailError, setEmailError] = useState("")

  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
    showSuccessModal,
    closeSuccessModal,
    registrationError,
    setRegistrationError,
  } = useContext(AuthContext)

  function handleTabChange(value) {
    setActiveTab(value)
    // Clear errors when switching tabs
    setRegistrationError("")
    setFormError("")
  }

  function checkIfSignInFormIsValid() {
    return signInFormData?.userEmail?.trim() && signInFormData?.password?.trim()
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData?.userName?.trim() &&
      signUpFormData?.userEmail?.trim() &&
      !emailError &&
      signUpFormData?.password?.trim() &&
      !passwordError
    )
  }

  // Handle name change - clear error immediately
  const handleNameChange = (e) => {
    setRegistrationError("") // Clear error immediately
    setSignUpFormData({ ...signUpFormData, userName: e.target.value })
  }

  // Handle email change - clear error immediately
  const handleEmailChange = (e) => {
    const email = e.target.value
    setRegistrationError("") // Clear error immediately
    setSignUpFormData({ ...signUpFormData, userEmail: email })
    
    // Validation de l'email avec regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
      setEmailError("Invalid email address")
    } else {
      setEmailError("")
    }
  }

  // Handle password change - clear error immediately
  const handlePasswordChange = (e) => {
    setRegistrationError("") // Clear error immediately
    setSignUpFormData({ ...signUpFormData, password: e.target.value })
  }

  // Check if all fields are filled
  useEffect(() => {
    if (!signUpFormData?.userName?.trim() || !signUpFormData?.userEmail?.trim() || !signUpFormData?.password?.trim()) {
      setFormError("Please fill in all fields: Full Name, Email, and Password.")
    } else {
      setFormError("")
    }
  }, [signUpFormData?.userName, signUpFormData?.userEmail, signUpFormData?.password])



  // Password validation with regex
  useEffect(() => {
    if (signUpFormData?.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

      if (!passwordRegex.test(signUpFormData.password)) {
        setPasswordError(
          "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
        )
      } else {
        setPasswordError("")
      }
    } else {
      setPasswordError("")
    }
  }, [signUpFormData?.password])

  const handleLoginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google"
  }

  // Custom submit handler to validate before submitting
  const handleSubmitSignUp = (event) => {
    event.preventDefault()

    if (!checkIfSignUpFormIsValid()) {
      setFormError("Please fill in all fields: Full Name, Email, and Password.")
      return
    }

    handleRegisterUser(event)
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-gradient-to-br from-orange-100 via-white to-orange-100 overflow-hidden">
      {/* Background elements restent les mêmes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-orange-500/20 to-orange-600/10" />
        <div className="absolute top-[20%] left-[10%] w-[20%] h-[20%] rounded-full bg-gradient-to-br from-orange-400/20 to-orange-500/10" />
        <div className="absolute bottom-[20%] right-[10%] w-[15%] h-[15%] rounded-full bg-gradient-to-tr from-orange-400/20 to-orange-500/10" />
      </div>

      {/* Header fixe pour mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 shadow-sm">
        <div className="flex items-center">
          <img src={logo || "/placeholder.svg"} alt="ODC Learning Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold ml-3 text-orange-500">ODC Learning</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 z-10">
        {/* Section formulaire - Maintenant en premier sur mobile */}
        <div className="w-full md:w-1/2 max-w-[480px] mt-16 md:mt-0 order-1 md:order-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-orange-100 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

            <div className="p-6 sm:p-8 md:p-10">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-2 mb-6 sm:mb-8 p-1 bg-orange-50 rounded-lg">
                  <TabsTrigger
                    value="signin"
                    className="py-2 sm:py-3 text-sm sm:text-base font-medium data-[state=active]:bg-white data-[state=active]:text-orange-600"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="py-2 sm:py-3 text-sm sm:text-base font-medium data-[state=active]:bg-white data-[state=active]:text-orange-600"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Sign In Form Content */}
                <TabsContent value="signin" className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
                    <p className="text-gray-600 mt-2">Sign in to continue your learning journey</p>
                  </div>

                  {/* Google Sign In Button */}
                  <button
                    type="button"
                    onClick={handleLoginWithGoogle}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-base font-medium text-gray-700">
                      Continue with Google
                    </span>
                  </button>

                  <div className="relative flex items-center gap-2 my-6">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="text-sm text-gray-500 bg-white px-2">or with email</span>
                    <div className="flex-grow h-px bg-gray-200" />
                  </div>

                  {/* Sign In Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        className="h-9 w-full rounded-md border border-input px-3 py-2 text-sm"
                        value={signInFormData.userEmail}
                        onChange={(e) => setSignInFormData({ ...signInFormData, userEmail: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="h-9 w-full rounded-md border border-input px-3 py-2 text-sm pr-10"
                          value={signInFormData.password}
                          onChange={(e) => setSignInFormData({ ...signInFormData, password: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-md font-medium transition-all text-sm"
                      onClick={handleLoginUser}
                      disabled={!checkIfSignInFormIsValid()}
                    >
                      Sign In
                    </button>
                  </div>

                  <div className="text-center mt-3">
                    <Link to="/forgot-password" className="text-orange-500 hover:text-orange-600 text-xs">
                      Forgot password?
                    </Link>
                  </div>
                </TabsContent>

                {/* Sign Up Form Content */}
                <TabsContent value="signup" className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join our learning community</p>
                  </div>

                  {/* Form Error Messages */}
                  {formError && !registrationError && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded-md flex items-start text-xs">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Registration Error Message */}
                  {registrationError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md flex items-start text-xs">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{registrationError}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        className="h-9 w-full rounded-md border border-input px-3 py-2 text-sm"
                        value={signUpFormData.userName}
                        onChange={handleNameChange}
                        onFocus={() => setRegistrationError("")}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        className={`h-9 w-full rounded-md border ${
                          emailError && signUpFormData?.userEmail ? "border-red-300" : "border-input"
                        } px-3 py-2 text-sm`}
                        value={signUpFormData.userEmail}
                        onChange={handleEmailChange}
                        onFocus={() => {
                          setRegistrationError("")
                          setEmailError("")
                        }}
                      />
                      {emailError && signUpFormData?.userEmail && (
                        <p className="text-xs text-red-600 mt-1">{emailError}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`h-9 w-full rounded-md border ${passwordError && signUpFormData?.password ? "border-red-300" : "border-input"} px-3 py-2 text-sm pr-10`}
                          value={signUpFormData.password}
                          onChange={handlePasswordChange}
                          onFocus={() => setRegistrationError("")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {passwordError && signUpFormData?.password && (
                        <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters and include uppercase, lowercase, number and special
                        character.
                      </p>
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      onClick={handleSubmitSignUp}
                      disabled={!checkIfSignUpFormIsValid()}
                    >
                      Create Account
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-gray-600 mt-3">
                    By signing up, you agree to our <span className="text-orange-600">Terms of Service</span> and{" "}
                    <span className="text-orange-600">Privacy Policy</span>
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Section marketing - En second sur mobile */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center mt-8 md:mt-0 md:pr-12 order-2 md:order-1">
          {/* Logo et branding - Caché sur mobile car déjà dans le header */}
          <div className="hidden md:flex items-center mb-12">
            <img src={logo || "/placeholder.svg"} alt="ODC Learning Logo" className="w-16 h-16 md:w-20 md:h-20" />
            <h1
              className="text-3xl md:text-4xl font-bold ml-8 text-orange-500"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              ODC Learning
            </h1>
          </div>

          {/* Le reste du contenu marketing reste le même */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mt-8 mb-6 text-center md:text-left leading-tight">
            Elevate Your <span className="text-orange-500">Skills</span> Today
          </h2>

          <p className="text-xl text-gray-600 mb-8 text-center md:text-left max-w-xl">
            Join thousands of learners on their journey to mastery. Our platform provides the tools, resources, and
            community you need to succeed.
          </p>

          {/* Features grid reste le même */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-xl">
            {[
              { icon: Sparkles, title: "Personalized Learning", text: "Tailored paths designed for your goals" },
              { icon: BookOpen, title: "Expert Instructors", text: "Learn from industry professionals" },
              { icon: Layers, title: "Interactive Content", text: "Engage with dynamic learning materials" },
              { icon: Users, title: "Global Network", text: "Join a thriving worldwide community" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 p-4 rounded-xl shadow-sm border border-orange-100 flex items-start"
              >
                <item.icon className="text-orange-500 mr-3 h-6 w-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 relative">
            <button onClick={closeSuccessModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Account Created Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your account has been created. You can now sign in with your credentials.
              </p>
              <button
                onClick={() => {
                  closeSuccessModal()
                  setActiveTab("signin")
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-md font-medium transition-all"
              >
                Sign In Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthPage

