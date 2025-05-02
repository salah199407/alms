import { createContext, useState, useEffect } from "react"
import { fetchStudentViewCourseListService } from "@/services"
import { courseCategories } from "@/config"

export const HomeContext = createContext(null)

export default function HomeProvider({ children }) {
  const [publicCourses, setPublicCourses] = useState([])
  const [categories, setCategories] = useState(courseCategories || [])
  const [homeLoading, setHomeLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      setHomeLoading(true)
      try {
        // ✅ Passe une chaîne vide si pas de query spécifique
        const response = await fetchStudentViewCourseListService("")
        if (response.success) {
          setPublicCourses(response.data)
        } else {
          throw new Error("Erreur lors du chargement des cours")
        }
      } catch (err) {
        console.error("Erreur fetch public courses:", err)
        setError("Impossible de charger les cours.")
      } finally {
        setHomeLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <HomeContext.Provider
      value={{
        publicCourses,
        categories,
        homeLoading,
        error,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
