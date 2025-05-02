import PropTypes from "prop-types"
import { Star } from "lucide-react"

const CourseStats = ({ rating, students }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <Star className="h-4 w-4 fill-orange-500 text-orange-500 mr-1" />
      <span className="font-medium">{(rating || 0).toFixed(1)}</span>
      <span className="text-gray-500 text-sm ml-2">({students || 0} étudiants)</span>
    </div>
  </div>
)

CourseStats.propTypes = {
  rating: PropTypes.number,
  students: PropTypes.number,
}

export default CourseStats 