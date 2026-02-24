import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Fingerprint, RefreshCw } from 'lucide-react';
import UuidGenerator from '../tools/UuidGenerator';
import AuthorBio from '../components/AuthorBio';
import AdBox from '../components/ads/AdBox';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { keywords } from '../data/keywords';

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lumivoc UUID Generator",
    "description": "Generate Version 4 UUIDs (Universally Unique Identifiers) in bulk securely in your browser.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0" }
};

const UuidGeneratorPage = () => {
    const { t, locale } = useLanguage();
    const toolKeywords = (keywords[locale]?.uuidGenerator || keywords.en.uuidGenerator).join(', ');

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-page, #fafafa)' }}>
            <Helmet>
                <title>{t('uuidGeneratorTitle') || "UUID Generator (v4)"} - Lumivoc</title>
                <meta name="description" content={t('uuidGeneratorDesc') || "Generate Version 4 UUIDs (Universally Unique Identifiers) in bulk securely in your browser."} />
                <meta name="keywords" content={toolKeywords} />
                <link rel="canonical" href={`https://lumivoc.com/${locale}/dev-tools/uuid-generator`} />
            </Helmet>
            <SchemaMarkup data={schemaData} />
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 1.5rem' }}>
                <nav style={{ marginBottom: '2rem' }}>
                    <Link to={`/${locale}/dev-tools`} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1rem', background: 'white', border: '1px solid var(--border)', borderRadius: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                        <ArrowLeft size={16} /> <span>{t('categories.devTools')}</span>
                    </Link>
                </nav>

                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <AdBox type="horizontal" label="Advertisement" />

                    <div style={{ marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ width: '48px', height: '48px', background: '#dcfce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d' }}>
                                <Fingerprint size={24} />
                            </div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>UUID Generator</h1>
                        </div>
                        <UuidGenerator />
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <AdBox type="horizontal" label="Advertisement" />
                    </div>

                    <article>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>About UUID Version 4</h2>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. Version 4 UUIDs are generated using random numbers, providing an extremely low probability of collision.
                        </p>
                        <AuthorBio />
                        {/* SEO Keywords Footer */}
                        <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '2' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-main)' }}>Related Search Terms</h4>
                            {toolKeywords}
                        </div>
                    </article>

                    <div style={{ marginTop: '4rem' }}>
                        <AdBox type="horizontal" label="Advertisement" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UuidGeneratorPage;
