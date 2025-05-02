// Importer les dépendances nécessaires
import { AuthContext } from "@/context/auth-context"
import { ChevronDown, MonitorPlayIcon as TvMinimalPlay, Menu, X, BookOpen, User, Settings, LogOut, LogIn, Home } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch } from "react-icons/fa"
import axiosInstance from "@/api/axiosInstance"

// Styles réutilisables avec hauteur augmentée
const headerStyles = {
  container:
    "flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-black text-white shadow-xl sticky top-0 z-40 h-16",
  hoverEffect: "transition-all duration-300 hover:text-orange-400",
  dropdownItem: "px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200",
}

// Liste des catégories de cours
const courseCategories = [
  { id: "web-development", label: "Web Development" },
  { id: "backend-development", label: "Backend Development" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
  { id: "cloud-computing", label: "Cloud Computing" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "mobile-development", label: "Mobile Development" },
  { id: "game-development", label: "Game Development" },
  { id: "software-engineering", label: "Software Engineering" },
  { id: "devops-engineering", label: "DevOps Engineering" },
]

// Composant Logo
function Logo() {
  return (
    <Link to="/home" className="flex items-center hover:opacity-90 transition-opacity">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-3" />
        <span className="font-bold text-lg text-orange-500">ODC Learning</span>
      </div>
    </Link>
  )
}

// Menu Explorer avec dropdown style Coursera mais couleurs Orange
function ExploreMenu() {
  const navigate = useNavigate()
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  // Fonction pour naviguer vers la page des cours avec la catégorie sélectionnée
  const handleCategoryClick = (categoryId) => {
    // Rediriger vers la page des cours avec la catégorie comme paramètre
    navigate(`/courses?category=${categoryId}`)
    setIsExploreOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 text-white font-medium px-4 py-[3px] rounded-md bg-orange-500 hover:bg-orange-600 transition-colors text-xs min-w-[80px] h-7"
        onClick={() => setIsExploreOpen(!isExploreOpen)}
      >
        Explorer
        <ChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isExploreOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-gray-100 bg-orange-50">
              <h3 className="font-semibold text-lg text-orange-600">Catégories de cours</h3>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {courseCategories.map((category) => (
                <li
                  key={category.name}
                  className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-700 transition-colors text-base"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Composant Mes Cours avec effet au hover
function MyCourses() {
  const navigate = useNavigate()

  return (
    <motion.div
      onClick={() => navigate("/student-courses")}
      className="hidden md:flex cursor-pointer items-center gap-2 text-white hover:text-orange-400 transition-colors"
      whileHover={{ scale: 1.05 }}
    >
      <span className="font-medium">My Courses</span>
      <TvMinimalPlay className="w-5 h-5" />
    </motion.div>
  )
}

// Profil utilisateur
function UserProfile({ auth, handleLogout }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="relative">
      <motion.div
        className="flex items-center space-x-2 cursor-pointer"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-base font-medium text-white hidden md:inline">{auth.user?.userName}</span>
        <motion.img
          src={
            auth.user?.profileImage ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-orange-400"
        />
      </motion.div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <ul>
              <motion.li
                className={`${headerStyles.dropdownItem} text-white hover:bg-gray-700`}
                onClick={() => navigate("/profile")}
                whileHover={{ x: 5 }}
              >
                Profile
              </motion.li>
              <motion.li
                className={`${headerStyles.dropdownItem} text-white hover:bg-gray-700`}
                onClick={() => navigate("/settings")}
                whileHover={{ x: 5 }}
              >
                Settings
              </motion.li>
              <motion.li
                className={`${headerStyles.dropdownItem} text-white hover:bg-orange-500 hover:text-white`}
                onClick={handleLogout}
                whileHover={{ x: 5 }}
              >
                Logout
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Menu mobile amélioré
function MobileMenu({ auth, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'My Courses', path: '/my-courses', icon: BookOpen },
    { label: 'Settings', path: '/settings', icon: Settings },
    // ... autres items
  ]

  return (
    <div className="md:hidden">
      {/* Hamburger button avec design orange */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 flex flex-col justify-center items-center"
      >
        <span className={`
          block w-6 h-0.5 bg-orange-500 transition-all duration-300 ease-out
          ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}
        `} />
        <span className={`
          block w-6 h-0.5 bg-orange-500 transition-all duration-300 ease-out
          ${isOpen ? 'opacity-0' : 'opacity-100'}
        `} />
        <span className={`
          block w-6 h-0.5 bg-orange-500 transition-all duration-300 ease-out
          ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}
        `} />
      </button>

      {/* Menu overlay amélioré */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-gray-900 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {auth.authenticate && (
                <div className="mb-8">
                  <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                    <img
                      src={auth.user?.profileImage || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-orange-500"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-white">{auth.user?.userName}</h3>
                      <p className="text-sm text-gray-400">{auth.user?.userEmail}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="space-y-6">
                <div className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                  Navigation
                </div>
                
                <div className="space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        navigate(item.path)
                        setIsOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 text-white hover:text-orange-500 py-3 relative group"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Composant principal
function StudentViewCommonHeader() {
  const { auth, resetCredentials } = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    resetCredentials()
    navigate("/auth")
  }

  const handleSearchChange = async (e) => {
    const query = e.target.value
    setSearchQuery(query)
    setNoResults(false)

    if (query.trim()) {
      setIsSearching(true)
      try {
        const response = await axiosInstance.get(`/api/courses/search?title=${query}`)
        setSearchResults(response.data || [])
        setNoResults(response.data.length === 0)
      } catch (error) {
        console.error("Error searching courses:", error)
        setSearchResults([])
      }
      setIsSearching(false)
    } else {
      setSearchResults([])
    }
  }

  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/courses?query=${encodeURIComponent(searchQuery)}`)
      setSearchResults([])
    }
  }

  const handleIconClick = () => {
    if (searchQuery.trim()) {
      navigate(`/courses?query=${encodeURIComponent(searchQuery)}`)
      setSearchResults([])
    }
  }

  const handleSelectResult = (course) => {
    navigate(`/courses?query=${encodeURIComponent(course.title)}`)
    setSearchResults([])
    setSearchQuery("what do you want to learn")
  }

  return (
    <>
      <header className={headerStyles.container}>
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            <ExploreMenu />

            {/* Barre de recherche - version desktop */}
            <div className="flex-1 w-[600px] mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchEnter}
                  className="w-full pl-6 pr-12 py-2 rounded-full border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                />
                <button
                  onClick={handleIconClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Icône de recherche mobile - fond transparent */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-orange-500 hover:text-orange-600 bg-transparent p-1.5"
          >
            <FaSearch className="w-4 h-4" />
          </button>

          {auth.authenticate ? (
            <>
              <div className="hidden md:flex items-center gap-4">
                <MyCourses />
                <UserProfile auth={auth} handleLogout={handleLogout} />
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center">
              <Button
                onClick={() => navigate("/auth")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-[3px] text-xs transition-colors min-w-[80px] h-7"
              >
                Sign in
              </Button>
            </div>
          )}
          <MobileMenu auth={auth} handleLogout={handleLogout} />
        </div>
      </header>

      {/* Barre de recherche mobile expandable */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden w-full bg-black border-b border-gray-800 overflow-hidden"
          >
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchEnter}
                  className="w-full pl-6 pr-12 py-2.5 rounded-full border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
                  autoFocus
                />
                <button
                  onClick={handleIconClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default StudentViewCommonHeader
