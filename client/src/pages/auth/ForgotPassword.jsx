"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../../public/logo.png"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (response.ok) {
        setMessage("A password reset email has been sent.")
      } else {
        setError(data.message || "An error occurred.")
      }
    } catch (err) {
      setError("Server connection error.")
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
                <h1 className="text-2xl font-bold text-orange-500 text-center">Forgot Password?</h1>
                <p className="text-gray-600 text-center mt-2">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {message && <div className="mb-4 p-2 bg-green-50 text-green-600 rounded text-center">{message}</div>}
              {error && <div className="mb-4 p-2 bg-red-50 text-red-600 rounded text-center">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded font-medium transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
                  disabled={!email}
                >
                  Send Reset Link
                </button>
              </form>

              <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                <p className="text-gray-500 mb-4">OR</p>
                <Link to="/auth" className="block text-orange-500 hover:text-orange-600 mb-2">
                  Create Account
                </Link>
                <Link to="/auth" className="block text-gray-500 hover:text-gray-600">
                  Back to Sign In
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

export default ForgotPassword

