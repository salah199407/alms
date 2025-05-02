

"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import axiosInstance from "@/api/axiosInstance"

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  // CORRECTION: Extraire le bon paramètre de recherche de l'URL
  const searchQuery =
    new URLSearchParams(location.search).get("query") || new URLSearchParams(location.search).get("q") || ""

  useEffect(() => {
    if (!searchQuery) {
      setLoading(false)
      return
    }

    const fetchSearchResults = async () => {
      setLoading(true)
      try {
        console.log("Recherche sur la page de résultats pour:", searchQuery)
        // CORRECTION: Utiliser le bon paramètre de requête
        const response = await axiosInstance.get(`/courses/search?query=${encodeURIComponent(searchQuery)}`)
        console.log("Réponse de recherche:", response.data)

        if (response.data && response.data.success) {
          setSearchResults(response.data.data || [])
        } else {
          setSearchResults([])
        }
        setError(null)
      } catch (error) {
        console.error("Erreur lors de la recherche:", error)
        setError("Une erreur est survenue lors de la recherche")
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [searchQuery])

  const handleCourseClick = (courseId) => {
    navigate(`/course/details/${courseId}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Résultats de recherche pour "{searchQuery}"</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <h2 className="text-2xl text-red-500 mb-2">Erreur</h2>
          <p>{error}</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((course) => (
            <Card
              key={course._id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCourseClick(course._id)}
            >
              <CardContent className="flex gap-4 p-4">
                <div className="w-48 h-32 flex-shrink-0">
                  <img
                    src={course.image || "/placeholder.jpg"}
                    className="w-full h-full object-cover rounded-md"
                    alt={course.title}
                  />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <p className="font-bold">{course.category}</p>
                  <p className="text-sm">
                    {course.level} - {course.primaryLanguage}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Aucun cours trouvé</h2>
          <p className="text-gray-600">Aucun cours ne correspond à votre recherche "{searchQuery}".</p>
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
