import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    resources: {
      fr: {
        translation: {
          // Homepage Hero Section
          "Learning that empowers you": "L'apprentissage qui vous donne du pouvoir",
          "with skills for today and the future": "avec des compétences pour aujourd'hui et pour l'avenir",
          "Get started with Orange Digital Centers": "Commencez avec Orange Digital Centers",
          "What do you want to learn about ?": "Que voulez-vous apprendre ?",
          "Explore a vast array of categories": "Explorez une vaste gamme de catégories, de la technologie aux arts. Que vous souhaitiez faire progresser votre carrière ou poursuivre une nouvelle passion, découvrez un monde de possibilités et adaptez votre parcours d'apprentissage à vos aspirations.",

          // Course Categories
          "Course Categories": "Catégories de cours",
          "Web Development": "Développement Web",
          "Backend Development": "Développement Backend",
          "Data Science": "Science des Données",
          "Machine Learning": "Apprentissage Automatique",
          "Artificial Intelligence": "Intelligence Artificielle",
          "Cloud Computing": "Cloud Computing",
          "Cyber Security": "Cybersécurité",
          "Mobile Development": "Développement Mobile",
          "Game Development": "Développement de Jeux",
          "Software Engineering": "Génie Logiciel",
          "DevOps Engineering": "Ingénierie DevOps",

          // Featured Courses Section
          "Featured Courses": "Cours en Vedette",
          "View Course": "Voir le cours",
          "Start Learning": "Commencer à apprendre",
          "Instructor": "Instructeur",

          // Navigation
          "Explorer": "Explorer",
          "Mes Cours": "Mes Cours",
          "Que souhaitez-vous apprendre ?": "Que souhaitez-vous apprendre ?",
          "signin": "Se connecter",
          "Signup": "S'inscrire",

          // Header & Navigation
          "Catégories de cours": "Catégories de cours",
          "Rechercher": "Rechercher",
          "Rechercher": "Rechercher",
          "signin": "Se connecter",
          "Signup": "S'inscrire",

          // Course Levels
          "Beginner": "Débutant",
          "Intermediate": "Intermédiaire",
          "Advanced": "Avancé",

          // Course Details
          "Tous les cours": "Tous les cours",
          "Résultats pour": "Résultats pour",
          "Aucun cours trouvé": "Aucun cours trouvé",
          "Description": "Description",
          "Objectifs": "Objectifs",
          "Prix": "Prix",
          "Langue": "Langue",
          "Niveau": "Niveau",
          "Instructeur": "Instructeur",
          "S'inscrire au cours": "S'inscrire au cours",

          // User Dashboard
          "Tableau de bord": "Tableau de bord",
          "Profil": "Profil",
          "Paramètres": "Paramètres",
          "Déconnexion": "Déconnexion",
          "Mes cours en cours": "Mes cours en cours",
          "Cours terminés": "Cours terminés",

          // Forms
          "Nom d'utilisateur": "Nom d'utilisateur",
          "Mot de passe": "Mot de passe",
          "Email": "Email",
          "Confirmer le mot de passe": "Confirmer le mot de passe",
          "Se souvenir de moi": "Se souvenir de moi",
          "Mot de passe oublié ?": "Mot de passe oublié ?",

          // Messages
          "Bienvenue": "Bienvenue",
          "Erreur": "Erreur",
          "Succès": "Succès",
          "Chargement": "Chargement",
        }
      },
      en: {
        translation: {
          // Homepage Hero Section
          "Learning that empowers you": "Learning that empowers you",
          "with skills for today and the future": "with skills for today and the future",
          "Get started with Orange Digital Centers": "Get started with Orange Digital Centers",
          "What do you want to learn about ?": "What do you want to learn about?",
          "Explore a vast array of categories": "Explore a vast array of categories, from technology to the arts. Whether advancing your career or pursuing a new passion, discover a world of possibilities and tailor your learning journey to your aspirations.",

          // Course Categories
          "Course Categories": "Course Categories",
          "Web Development": "Web Development",
          "Backend Development": "Backend Development",
          "Data Science": "Data Science",
          "Machine Learning": "Machine Learning",
          "Artificial Intelligence": "Artificial Intelligence",
          "Cloud Computing": "Cloud Computing",
          "Cyber Security": "Cyber Security",
          "Mobile Development": "Mobile Development",
          "Game Development": "Game Development",
          "Software Engineering": "Software Engineering",
          "DevOps Engineering": "DevOps Engineering",

          // Featured Courses Section
          "Featured Courses": "Featured Courses",
          "View Course": "View Course",
          "Start Learning": "Start Learning",
          "Instructor": "Instructor",

          // Navigation
          "Explorer": "Explore",
          "Mes Cours": "My Courses",
          "Que souhaitez-vous apprendre ?": "What do you want to learn?",
          "signin": "Sign in",
          "Signup": "Sign up",

          // Header & Navigation
          "Catégories de cours": "Course Categories",
          "Rechercher": "Search",
          "signin": "Sign in",
          "Signup": "Sign up",

          // Course Levels
          "Beginner": "Beginner",
          "Intermediate": "Intermediate",
          "Advanced": "Advanced",

          // Course Details
          "Tous les cours": "All Courses",
          "Résultats pour": "Results for",
          "Aucun cours trouvé": "No courses found",
          "Description": "Description",
          "Objectifs": "Objectives",
          "Prix": "Price",
          "Langue": "Language",
          "Niveau": "Level",
          "Instructeur": "Instructor",
          "S'inscrire au cours": "Enroll in Course",

          // User Dashboard
          "Tableau de bord": "Dashboard",
          "Profil": "Profile",
          "Paramètres": "Settings",
          "Déconnexion": "Logout",
          "Mes cours en cours": "My Ongoing Courses",
          "Cours terminés": "Completed Courses",

          // Forms
          "Nom d'utilisateur": "Username",
          "Mot de passe": "Password",
          "Email": "Email",
          "Confirmer le mot de passe": "Confirm Password",
          "Se souvenir de moi": "Remember me",
          "Mot de passe oublié ?": "Forgot Password?",

          // Messages
          "Bienvenue": "Welcome",
          "Erreur": "Error",
          "Succès": "Success",
          "Chargement": "Loading",
        }
      },
      ar: {
        translation: {
          // Homepage Hero Section
          "Learning that empowers you": "تعلم يمنحك القوة",
          "with skills for today and the future": "بمهارات لليوم والمستقبل",
          "Get started with Orange Digital Centers": "ابدأ مع مراكز أورانج الرقمية!",
          "What do you want to learn about ?": "ماذا تريد أن تتعلم؟",
          "Explore a vast array of categories": "استكشف مجموعة واسعة من الفئات، من التكنولوجيا إلى الفنون. سواء كنت تريد التقدم في حياتك المهنية أو التفريط في عمل جديد، اكتشف عالم الفرص وضبط رحلتك التعليمية حسب تطلعاتك.",

          // Course Categories
          "Course Categories": "فئات الدورات",
          "Web Development": "تطوير الويب",
          "Backend Development": "تطوير الخلفية",
          "Data Science": "علوم البيانات",
          "Machine Learning": "تعلم آلي",
          "Artificial Intelligence": "ذكاء اصطناعي",
          "Cloud Computing": "الكمبيوتر السحابي",
          "Cyber Security": "الأمن الإلكتروني",
          "Mobile Development": "تطوير الجوال",
          "Game Development": "تطوير الألعاب",
          "Software Engineering": "هندسة البرمجيات",
          "DevOps Engineering": "هندسة DevOps",

          // Featured Courses Section
          "Featured Courses": "الدورات المميزة",
          "View Course": "مشاهدة الدورة",
          "Start Learning": "ابدأ التعلم",
          "Instructor": "المعلم",

          // Navigation
          "Explorer": "استكشف",
          "Mes Cours": "دوراتي",
          "Que souhaitez-vous apprendre ?": "ماذا تريد أن تتعلم؟",
          "signin": "تسجيل الدخول",
          "Signup": "التسجيل",

          // Header & Navigation
          "Catégories de cours": "فئات الدورات",
          "Rechercher": "بحث",
          "Rechercher": "بحث",
          "signin": "تسجيل الدخول",
          "Signup": "التسجيل",

          // Course Levels
          "Beginner": "مبتدئ",
          "Intermediate": "متوسط",
          "Advanced": "متقدم",

          // Course Details
          "Tous les cours": "جميع الدورات",
          "Résultats pour": "نتائج لـ",
          "Aucun cours trouvé": "لم يتم العثور على دورات",
          "Description": "الوصف",
          "Objectifs": "الأهداف",
          "Prix": "السعر",
          "Langue": "اللغة",
          "Niveau": "المستوى",
          "Instructeur": "المعلم",
          "S'inscrire au cours": "إنضم إلى الدورة",

          // User Dashboard
          "Tableau de bord": "لوحة التحكم",
          "Profil": "الملف الشخصي",
          "Paramètres": "الإعدادات",
          "Déconnexion": "تسجيل خروج",
          "Mes cours en cours": "دوراتي المستمرة",
          "Cours terminés": "الدورات المكتملة",

          // Forms
          "Nom d'utilisateur": "اسم المستخدم",
          "Mot de passe": "كلمة المرور",
          "Email": "البريد الإلكتروني",
          "Confirmer le mot de passe": "تأكيد كلمة المرور",
          "Se souvenir de moi": "تذكرني",
          "Mot de passe oublié ?": "هل نسيت كلمة المرور؟",

          // Messages
          "Bienvenue": "مرحبا",
          "Erreur": "خطأ",
          "Succès": "نجاح",
          "Chargement": "تحميل",
        }
      },
      es: {
        translation: {
          // Homepage Hero Section
          "Learning that empowers you": "Aprendizaje que te empodera",
          "with skills for today and the future": "con habilidades para hoy y el futuro",
          "Get started with Orange Digital Centers": "¡Comienza con Orange Digital Centers!",
          "What do you want to learn about ?": "¿Qué quieres aprender?",
          "Explore a vast array of categories": "Explora una amplia gama de categorías, desde tecnología hasta artes. Ya sea para avanzar en tu carrera o perseguir una nueva pasión, descubre un mundo de posibilidades y adapta tu viaje de aprendizaje a tus aspiraciones.",

          // Course Categories
          "Course Categories": "Categorías de Cursos",
          "Web Development": "Desarrollo Web",
          "Backend Development": "Desarrollo Backend",
          "Data Science": "Ciencia de Datos",
          "Machine Learning": "Aprendizaje Automático",
          "Artificial Intelligence": "Inteligencia Artificial",
          "Cloud Computing": "Computación en la Nube",
          "Cyber Security": "Ciberseguridad",
          "Mobile Development": "Desarrollo Móvil",
          "Game Development": "Desarrollo de Juegos",
          "Software Engineering": "Ingeniería de Software",
          "DevOps Engineering": "Ingeniería DevOps",

          // Featured Courses Section
          "Featured Courses": "Cursos Destacados",
          "View Course": "Ver Curso",
          "Start Learning": "Empezar a Aprender",
          "Instructor": "Instructor",

          // Navigation
          "Explorer": "Explorar",
          "Mes Cours": "Mis Cursos",
          "Que souhaitez-vous apprendre ?": "¿Qué quieres aprender?",
          "signin": "Iniciar sesión",
          "Signup": "Registrarse",

          // Header & Navigation
          "Catégories de cours": "Categorías de Cursos",
          "Rechercher": "Buscar",
          "signin": "Iniciar sesión",
          "Signup": "Registrarse",

          // Course Levels
          "Beginner": "Principiante",
          "Intermediate": "Intermedio",
          "Advanced": "Avanzado",

          // Course Details
          "Tous les cours": "Todos los cursos",
          "Résultats pour": "Resultados para",
          "Aucun cours trouvé": "No se encontraron cursos",
          "Description": "Descripción",
          "Objectifs": "Objetivos",
          "Prix": "Precio",
          "Langue": "Idioma",
          "Niveau": "Nivel",
          "Instructeur": "Instructor",
          "S'inscrire au cours": "Inscribirse en el curso",

          // User Dashboard
          "Tableau de bord": "Tablero de control",
          "Profil": "Perfil",
          "Paramètres": "Configuración",
          "Déconnexion": "Cerrar sesión",
          "Mes cours en cours": "Mis Cursos en Curso",
          "Cours terminés": "Cursos Completados",

          // Forms
          "Nom d'utilisateur": "Nombre de usuario",
          "Mot de passe": "Contraseña",
          "Email": "Correo electrónico",
          "Confirmer le mot de passe": "Confirmar contraseña",
          "Se souvenir de moi": "Recordarme",
          "Mot de passe oublié ?": "¿Olvidó su contraseña?",

          // Messages
          "Bienvenue": "Bienvenido",
          "Erreur": "Error",
          "Succès": "Éxito",
          "Chargement": "Cargando",
        }
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 