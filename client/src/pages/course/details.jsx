import { useTranslation } from 'react-i18next';

function CourseDetailsPage() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto p-4">
      <div className="course-header">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <div className="course-meta">
          <span>{t(course.level)}</span>
          <span>{t('Langue')}: {t(course.primaryLanguage)}</span>
          <span>{t('Instructeur')}: {course.instructor}</span>
        </div>
      </div>

      <div className="course-content">
        <h2>{t('Description')}</h2>
        <p>{course.description}</p>

        <h2>{t('Objectifs')}</h2>
        <ul>
          {course.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>

        <div className="enrollment-section">
          <div className="price">{t('Prix')}: {course.pricing}</div>
          <Button onClick={handleEnroll}>
            {t("S'inscrire au cours")}
          </Button>
        </div>
      </div>
    </div>
  );
} 