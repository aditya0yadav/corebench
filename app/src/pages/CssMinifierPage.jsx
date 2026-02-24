import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileCode, Wand2 } from 'lucide-react';
import CssMinifier from '../tools/CssMinifier';
import AuthorBio from '../components/AuthorBio';
import AdBox from '../components/ads/AdBox';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lumivoc CSS Minifier",
    "description": "Compress CSS code to reduce file size. Automatically removes whitespace and comments.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0" }
};

const CssMinifierPage = () => {
    const { t, locale } = useLanguage();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-page, #fafafa)' }}>
            <Helmet>
                <title>CSS Minifier & Compressor - Lumivoc</title>
                <meta name="description" content="Compress CSS code to reduce file size. Automatically removes whitespace and comments." />
                <link rel="canonical" href={`https://lumivoc.com/${locale}/dev-tools/css-minifier`} />
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
                            <div style={{ width: '48px', height: '48px', background: '#dbeafe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                                <Wand2 size={24} />
                            </div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>CSS Minifier</h1>
                        </div>
                        <CssMinifier />
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <AdBox type="horizontal" label="Advertisement" />
                    </div>

                    <article>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>Optimizing Stylesheets</h2>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Minifying CSS is a standard practice in web development to improve load times. By removing unnecessary characters, the browser can download and parse the stylesheet faster.
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

export default CssMinifierPage;
