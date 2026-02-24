import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Info, Code2, AlertTriangle, FileJson, Brackets, Terminal, Zap } from 'lucide-react';
import JsonFormatter from '../tools/JsonFormatter';
import AuthorBio from '../components/AuthorBio';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { Helmet } from 'react-helmet-async';
import AdBox from '../components/ads/AdBox';
import { useLanguage } from '../context/LanguageContext';
import { keywords } from '../data/keywords';

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lumivoc JSON Formatter",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": "A high-performance JSON prettifier, validator, and minifier optimized for 2026 developers.",
    "offers": {
        "@type": "Offer",
        "price": "0"
    }
};

const commonErrors = [
    {
        title: 'Trailing Commas',
        example: '[1, 2, 3, ]',
        desc: 'Invalid in standard JSON, though allowed in JS.',
        color: '#ef4444'
    },
    {
        title: 'Single Quotes',
        example: "{'key': 'val'}",
        desc: 'JSON requires double quotes for keys/strings.',
        color: '#f59e0b'
    },
    {
        title: 'Missing Quotes',
        example: '{key: "val"}',
        desc: 'Keys must be wrapped in double quotes.',
        color: '#6366f1'
    }
];

const JsonFormatterPage = () => {
    const { t, locale } = useLanguage();
    const toolKeywords = (keywords[locale]?.jsonFormatter || keywords.en.jsonFormatter).join(', ');

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-page, #fafafa)'
        }}>
            <Helmet>
                <title>{t('jsonFormatterTitle') || "JSON Formatter & Validator"} - Lumivoc</title>
                <meta name="description" content={t('jsonFormatterDesc') || "Free online JSON Formatter and Validator. Beautify, minify, and debug your JSON data securely in your browser."} />
                <meta name="keywords" content={toolKeywords} />
                <link rel="canonical" href={`https://lumivoc.com/${locale}/dev-tools/json-formatter`} />
            </Helmet>
            <SchemaMarkup data={schemaData} />

            {/* Main Container */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '1rem 1.5rem'
            }}>

                {/* Navigation */}
                <nav style={{ marginBottom: '2rem' }}>
                    <Link
                        to={`/${locale}/dev-tools`}
                        className="footer-link"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.625rem 1rem',
                            background: 'white',
                            border: '1px solid var(--border)',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <ArrowLeft size={16} />
                        <span>{t('categories.devTools')}</span>
                    </Link>
                </nav>

                {/* Layout Grid - Main Content + Sidebar */}
                {/* Layout Grid - Main Content */}
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <AdBox type="horizontal" label="Advertisement" marginBottom="4rem" />

                    {/* Main Content Column */}
                    <div style={{ minWidth: 0 }}>
                        {/* Tool Section */}
                        <div style={{ marginBottom: '4rem' }}>
                            <JsonFormatter />
                        </div>

                        {/* Ad Placement #2 - Below Tool */}
                        <section style={{ marginBottom: '4rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', background: 'white' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Layers size={20} className="accent-color" /> {t('nav.explore')}
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                        {[
                                            { name: 'JSON Formatter', path: `/${locale}/dev-tools/json-formatter`, color: '#6366f1' },
                                            { name: 'Base64 Decoder', path: `/${locale}/dev-tools/base64`, color: '#ec4899' },
                                            { name: 'URL Encoder', path: '#', color: '#10b981', soon: true },
                                            { name: 'Diff Checker', path: '#', color: '#f59e0b', soon: true }
                                        ].map((tool, i) => (
                                            tool.soon ? (
                                                <div
                                                    key={i}
                                                    style={{
                                                        padding: '16px', borderRadius: '12px', background: 'var(--bg-main)',
                                                        border: '1px solid var(--border)', opacity: 0.7,
                                                        display: 'flex', alignItems: 'center', gap: '12px'
                                                    }}
                                                >
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: tool.color }} />
                                                    <span style={{ fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{tool.name}</span>
                                                    <span style={{ fontSize: '10px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>{t('comingSoon')}</span>
                                                </div>
                                            ) : (
                                                <Link
                                                    key={i}
                                                    to={tool.path}
                                                    style={{
                                                        padding: '16px', borderRadius: '12px', background: 'var(--bg-main)',
                                                        border: '1px solid var(--border)', textDecoration: 'none',
                                                        display: 'flex', alignItems: 'center', gap: '12px',
                                                        transition: 'all 0.2s',
                                                        color: 'inherit'
                                                    }}
                                                    className="tool-link-box"
                                                >
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: tool.color }} />
                                                    <span style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>{tool.name}</span>
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <AdBox
                                        type="rectangle"
                                        label="Advertisement"
                                        marginTop="0"
                                        marginBottom="0"
                                    // adSlot="YOUR_AD_SLOT_ID"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Content Section */}
                        <article>
                            <header style={{
                                marginBottom: '3rem',
                                paddingBottom: '2rem',
                                borderBottom: '1px solid var(--border)'
                            }}>
                                <h2
                                    className="text-gradient"
                                    style={{
                                        fontSize: '2.25rem',
                                        fontWeight: '800',
                                        lineHeight: '1.2',
                                        marginBottom: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                >
                                    <BookOpen size={36} className="accent-color" />
                                    <span>Complete Guide to JSON Formatting</span>
                                </h2>

                                {/* Tip Callout */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                    borderLeft: '4px solid var(--primary)',
                                    borderRadius: '0.75rem',
                                    padding: '1.5rem',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <div style={{
                                            flexShrink: 0,
                                            width: '2.5rem',
                                            height: '2.5rem',
                                            background: 'var(--primary)',
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}>
                                            <Info size={20} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                marginBottom: '0.5rem',
                                                color: 'var(--primary)'
                                            }}>
                                                Did you know?
                                            </h3>
                                            <p style={{
                                                fontSize: '0.9375rem',
                                                lineHeight: '1.6',
                                                color: 'var(--text-muted)',
                                                margin: 0
                                            }}>
                                                Validating your JSON structure early blocks runtime errors in API integrations. Our tool parses recursively to find even the deepest syntax errors.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* Content */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                <section>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Brackets size={24} className="accent-color" /> JSON vs Minification
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--text-muted)' }}>
                                        Raw JSON is often "minified" to save bandwidth, stripping all whitespace. While efficient for machines, it's unreadable for humans. A formatter reconstructs the hierarchical structure.
                                    </p>
                                </section>

                                <section>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <AlertTriangle size={24} className="accent-color" /> Common Mistakes
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                                        {commonErrors.map((err, index) => (
                                            <div key={index} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                                                <div style={{ color: err.color, marginBottom: '12px' }}><AlertTriangle size={20} /></div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>{err.title}</h4>
                                                <div style={{ background: 'var(--bg-main)', padding: '8px', borderRadius: '6px', fontSize: '12px', fontFamily: 'monospace', marginBottom: '8px', border: '1px solid var(--border)' }}>
                                                    {err.example}
                                                </div>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{err.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Ad Placement #4 - Bottom Banner */}
                            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                                <AdBox
                                    type="horizontal"
                                    label="Advertisement"
                                // adSlot="YOUR_AD_SLOT_ID"
                                />
                            </div>

                            {/* Author Bio */}
                            <div style={{ marginTop: '4rem' }}>
                                <AuthorBio />
                            </div>

                            {/* SEO Keywords Footer (Visually Subtle) */}
                            <div style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '2' }}>
                                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-main)' }}>Related Search Terms</h4>
                                {toolKeywords}
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            {/* Responsive Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 1024px) {
                    .spoke-page > div > div:first-of-type {
                        grid-template-columns: 1fr !important;
                    }
                    aside {
                        position: static !important;
                        flex-direction: row !important;
                        overflow-x: auto !important;
                    }
                }
            ` }} />
        </div>
    );
};

export default JsonFormatterPage;
