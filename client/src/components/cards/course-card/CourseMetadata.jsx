import PropTypes from "prop-types"
import { Clock, User } from "lucide-react"

const CourseMetadata = ({ instructor, duration }) => (
  <div className="flex items-center text-sm text-gray-500 mb-4">
    <User className="h-4 w-4 mr-1" />
    <span>{instructor || "Instructeur non spécifié"}</span>
    <span className="mx-2">•</span>
    <Clock className="h-4 w-4 mr-1" />
    <span>{duration || "Durée non spécifiée"}</span>
  </div>
)

CourseMetadata.propTypes = {
  instructor: PropTypes.string,
  duration: PropTypes.string,
}

export default CourseMetadata 