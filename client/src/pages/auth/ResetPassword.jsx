"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import logo from "../../../public/logo.png"

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [token, setToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tokenFromUrl = params.get("token")
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
    } else {
      setError("Lien invalide ou expiré.")
    }
  }, [location.search])

  useEffect(() => {
    if (newPassword) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!passwordRegex.test(newPassword)) {
        setPasswordError(
          "Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
        )
      } else {
        setPasswordError("")
      }
    } else {
      setPasswordError("")
    }
  }, [newPassword])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (passwordError) {
      setError(passwordError)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await response.json()
      if (response.ok) {
        setMessage("Mot de passe réinitialisé avec succès.")
        setTimeout(() => navigate("/auth"), 3000)
      } else {
        setError(data.message || "Une erreur s'est produite.")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.")
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-gradient-to-br from-orange-100 via-white to-orange-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-orange-500/20 to-orange-600/10"></div>
        <div className="absolute top-[20%] left-[10%] w-[20%] h-[20%] rounded-full bg-gradient-to-br from-orange-400/20 to-orange-500/10"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[15%] h-[15%] rounded-full bg-gradient-to-tr from-orange-400/20 to-orange-500/10"></div>
      </div>

      {/* Logo and branding in top left - Updated to match auth page with darker orange */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
        <Link to="/" className="flex items-center">
          <img src={logo || "/placeholder.svg"} alt="ODC Learning Logo" className="w-12 h-12 md:w-16 md:h-16" />
          <h1
            className="text-2xl md:text-3xl font-bold ml-8 text-orange-600"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            ODC Learning
          </h1>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-md mt-16 md:mt-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-orange-100 overflow-hidden">
            {/* Colorful top border */}
            <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>

            <div className="p-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-orange-500"
                  >
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-orange-500 text-center">Reset Password</h1>
                <p className="text-gray-600 text-center mt-2">Enter a new secure password.</p>
              </div>

              {message && <div className="mb-4 p-2 bg-green-50 text-green-600 rounded text-center">{message}</div>}
              {error && <div className="mb-4 p-2 bg-red-50 text-red-600 rounded text-center">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full p-3 border ${
                        passwordError ? "border-red-300" : "border-gray-300"
                      } rounded focus:outline-none focus:ring-1 focus:ring-orange-500`}
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters and include uppercase, lowercase, number and special character.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 pr-10"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded font-medium transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
                  disabled={!newPassword || !confirmPassword}
                >
                  Reset Password
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/auth" className="text-orange-500 hover:text-orange-600">
                  Sign in with new password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-600 text-sm z-10 border-t border-orange-200 bg-white/50 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} ODC Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default ResetPassword

