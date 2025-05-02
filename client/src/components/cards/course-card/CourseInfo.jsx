import PropTypes from "prop-types"

const CourseInfo = ({ title, description }) => (
  <div className="p-6">
    <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description || "Aucune description disponible"}</p>
  </div>
)

CourseInfo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

export default CourseInfo 