import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Key } from 'lucide-react';
import HmacGenerator from '../tools/HmacGenerator';
import AuthorBio from '../components/AuthorBio';
import AdBox from '../components/ads/AdBox';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lumivoc HMAC Generator",
    "description": "Calculate HMAC (Hash-based Message Authentication Code) using SHA algorithms.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0" }
};

const HmacGeneratorPage = () => {
    const { t, locale } = useLanguage();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-page, #fafafa)' }}>
            <Helmet>
                <title>HMAC Generator - Lumivoc</title>
                <meta name="description" content="Calculate HMAC (Hash-based Message Authentication Code) using SHA algorithms." />
                <link rel="canonical" href={`https://lumivoc.com/${locale}/dev-tools/hmac-generator`} />
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
                            <div style={{ width: '48px', height: '48px', background: '#d1fae5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                                <Key size={24} />
                            </div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>HMAC Generator</h1>
                        </div>
                        <HmacGenerator />
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <AdBox type="horizontal" label="Advertisement" />
                    </div>

                    <article>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>Understanding HMAC</h2>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            HMAC involves a cryptographic hash function and a secret cryptographic key. It detects changes to the message content and verifies the authenticity of the source.
                        </p>
                        <AuthorBio />
                    </article>

                    <div style={{ marginTop: '4rem' }}>
                        <AdBox type="horizontal" label="Advertisement" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HmacGeneratorPage;
