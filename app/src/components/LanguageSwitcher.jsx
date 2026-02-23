import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' }
];

const LanguageSwitcher = () => {
    const location = useLocation();
    const { locale } = useLanguage();

    // Function to get the path for a specific language
    const getPathForLanguage = (langCode) => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0 && languages.some(l => l.code === pathSegments[0])) {
            // Replace the first segment (current locale) with the new one
            return `/${langCode}/${pathSegments.slice(1).join('/')}`;
        }
        // Fallback or root handling
        return `/${langCode}${location.pathname}`;
    };

    return (
        <div className="language-switcher" style={{ marginTop: '20px', padding: '0 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Globe size={14} />
                <span>Select Language</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {languages.map((lang) => (
                    <Link
                        key={lang.code}
                        to={getPathForLanguage(lang.code)}
                        className={`lang-link ${locale === lang.code ? 'active' : ''}`}
                        title={lang.name}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: locale === lang.code ? 'var(--primary)' : 'var(--text-main)',
                            background: locale === lang.code ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                            fontSize: '13px',
                            border: locale === lang.code ? '1px solid var(--primary)' : '1px solid transparent',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        <span>{lang.flag}</span>
                        <span style={{ fontWeight: locale === lang.code ? '700' : '500' }}>{lang.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
