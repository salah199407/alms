import PropTypes from "prop-types"

const CourseHeader = ({ image, title, level }) => (
  <div className="relative overflow-hidden h-48">
    <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
      {level || "Beginner"}
    </div>
  </div>
)

CourseHeader.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  level: PropTypes.string,
}

export default CourseHeader 