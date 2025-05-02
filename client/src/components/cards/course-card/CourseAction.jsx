import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const CourseAction = ({ courseId }) => (
  <Link
    to={`/course/details/${courseId}`}
    className="block text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition-colors"
  >
    Voir le cours
  </Link>
)

CourseAction.propTypes = {
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default CourseAction 