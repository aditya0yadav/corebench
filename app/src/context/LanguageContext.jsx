import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { lang } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentLang, setCurrentLang] = useState(lang || 'en');

    useEffect(() => {
        if (!lang) {
            // Default to English if no lang parameter
            const defaultLang = 'en';
            const newPath = `/${defaultLang}${location.pathname === '/' ? '' : location.pathname}`;
            navigate(newPath, { replace: true });
        } else if (translations[lang]) {
            setCurrentLang(lang);
            document.documentElement.lang = lang;
        } else {
            // Redirect to EN if invalid lang
            navigate('/en', { replace: true });
        }
    }, [lang, navigate, location.pathname]);

    const t = (path) => {
        const keys = path.split('.');
        let result = translations[currentLang] || translations.en;
        for (const key of keys) {
            result = result?.[key];
        }
        return result || path;
    };

    return (
        <LanguageContext.Provider value={{ t, locale: currentLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
