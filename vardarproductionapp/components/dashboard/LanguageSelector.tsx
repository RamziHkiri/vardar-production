import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';

interface Language {
  name: string;
  code: string;
}

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Français');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const languages: Language[] = [
    { name: 'English', code: 'US' },
    { name: 'Français', code: 'FR' },
    { name: 'Spanish', code: 'ES' },
    { name: 'German', code: 'DE' },
  ];

  const currentLanguage = languages.find(lang => lang.name === selectedLanguage);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language.name);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-gray-700 text-sm font-semibold hover:bg-gray-50 focus:outline-none focus:ring-1 focus:bg-white"
      >
        {currentLanguage && (
          <ReactCountryFlag
            countryCode={currentLanguage.code}
            svg
            style={{ width: '1.5em', height: '1.5em' }}
          />
        )}
        <span className="ml-2">{selectedLanguage}</span>
        <FaChevronDown className="ml-2 h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1">
            {languages.map((language) => (
              <li
                key={language.name}
                onClick={() => handleLanguageChange(language)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <ReactCountryFlag
                  countryCode={language.code}
                  svg
                  style={{ width: '1.5em', height: '1.5em' }}
                  className="mr-2"
                />
                {language.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
