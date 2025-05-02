import { useTranslation } from 'react-i18next';

function FeaturedCourses() {
  const { t } = useTranslation();

  return (
    <section className="featured-courses">
      <h2 className="text-2xl font-bold mb-6">{t('Featured Courses')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCourses.map((course) => (
          <div key={course._id} className="course-card">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {t('Instructor')}: {course.instructor}
                </span>
                <button 
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  {t('Start Learning')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 