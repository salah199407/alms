import { useState } from 'react';

function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState('en');

  const changeLanguage = (lang) => {
    document.documentElement.lang = lang;
    setCurrentLang(lang);
    alert(`Langue changée vers : ${lang.toUpperCase()}. Chrome peut proposer de traduire.`);
  };

  return (
    <div className="flex items-center gap-2 ml-4">
      <button
        onClick={() => changeLanguage('en')}
        className={`text-xs px-2 py-1 rounded text-white ${currentLang === 'en' ? 'bg-orange-500' : 'bg-gray-700 hover:bg-orange-500'}`}
      >
        🇬🇧
      </button>
      <button
        onClick={() => changeLanguage('fr')}
        className={`text-xs px-2 py-1 rounded text-white ${currentLang === 'fr' ? 'bg-orange-500' : 'bg-gray-700 hover:bg-orange-500'}`}
      >
        🇫🇷
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`text-xs px-2 py-1 rounded text-white ${currentLang === 'ar' ? 'bg-orange-500' : 'bg-gray-700 hover:bg-orange-500'}`}
      >
        🇸🇦
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`text-xs px-2 py-1 rounded text-white ${currentLang === 'es' ? 'bg-orange-500' : 'bg-gray-700 hover:bg-orange-500'}`}
      >
        🇪🇸
      </button>
    </div>
  );
}

export default LanguageSelector;
