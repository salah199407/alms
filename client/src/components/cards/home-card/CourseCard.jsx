import PropTypes from "prop-types"
import { Clock, Star, User } from "lucide-react"
import { Link } from "react-router-dom"

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden h-48">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {course.level}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <User className="h-4 w-4 mr-1" />
          <span>{course.instructor}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-orange-500 text-orange-500 mr-1" />
            <span className="font-medium">{course.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm ml-2">({course.students} étudiants)</span>
          </div>
        </div>
        <Link
          to={`/course-details/${course.id}`}
          className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-colors"
        >
          Voir le cours
        </Link>
      </div>
    </div>
  )
}

// ✅ Ajout des PropTypes
CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    instructor: PropTypes.string,
    level: PropTypes.string,
    duration: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number,
    students: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}
