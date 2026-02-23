import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import TimestampConverter from '../tools/TimestampConverter';
import AuthorBio from '../components/AuthorBio';
import AdBox from '../components/ads/AdBox';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Corebench Timestamp Converter",
    "description": "Convert Unix Timestamps to Human Readable Dates and vice versa.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0" }
};

const TimestampConverterPage = () => {
    const { t, locale } = useLanguage();

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-page, #fafafa)' }}>
            <Helmet>
                <title>Unix Timestamp Converter - Corebench</title>
                <meta name="description" content="Convert Unix Timestamps to Human Readable Dates and vice versa." />
                <link rel="canonical" href={`https://corebench.eu/${locale}/dev-tools/timestamp-converter`} />
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
                            <div style={{ width: '48px', height: '48px', background: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                                <Clock size={24} />
                            </div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>Timestamp Converter</h1>
                        </div>
                        <TimestampConverter />
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <AdBox type="horizontal" label="Advertisement" />
                    </div>

                    <article>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>What is a Unix Timestamp?</h2>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            A Unix timestamp is a way to track time as a running total of seconds. This count starts at the Unix Epoch on January 1st, 1970 at UTC. Therefore, the Unix timestamp is merely the number of seconds between a particular date and the Unix Epoch.
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

export default TimestampConverterPage;
