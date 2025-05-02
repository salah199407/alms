import { useTranslation } from 'react-i18next';

function CourseCategories() {
  const { t } = useTranslation();

  return (
    <div className="course-categories">
      <h2 className="text-2xl font-bold mb-6">{t('Course Categories')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryOptions.map((category) => (
          <div
            key={category.name}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
            onClick={() => handleCategoryClick(category.name)}
          >
            <h3 className="text-lg font-semibold">{t(category.name)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
} 