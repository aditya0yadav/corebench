import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lightbulb, Info, Layers, Code2, Mail, Lock, FileJson, Image as ImageIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Base64Tool from '../tools/Base64Tool';
import AdBox from '../components/ads/AdBox';
import AuthorBio from '../components/AuthorBio';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { useLanguage } from '../context/LanguageContext';
import { keywords } from '../data/keywords';

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Corebench Base64 Encoder/Decoder",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "description": "Professional Base64 encoding and decoding tool with UTF-8 support for developers.",
    "offers": {
        "@type": "Offer",
        "price": "0"
    }
};

const useCases = [
    {
        icon: ImageIcon,
        title: 'Data URIs',
        description: 'Embed small images directly in CSS or HTML',
        color: '#6366f1'
    },
    {
        icon: Lock,
        title: 'Auth Headers',
        description: 'Securely pass credentials in HTTP Basic Auth',
        color: '#ec4899'
    },
    {
        icon: FileJson,
        title: 'API Payloads',
        description: 'Wrap binary files in JSON for transmission',
        color: '#10b981'
    },
    {
        icon: Mail,
        title: 'Email Attachments',
        description: 'Standard way to handle non-text files in MIME',
        color: '#f59e0b'
    }
];

const Base64Page = () => {
    const { t, locale } = useLanguage();
    const toolKeywords = (keywords[locale]?.base64 || keywords.en.base64).join(', ');

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-page, #fafafa)'
        }}>
            <Helmet>
                <title>{t('base64Title') || "Base64 Encoder & Decoder"} - Corebench</title>
                <meta name="description" content={t('base64Desc') || "Free online Base64 Encoder and Decoder. Convert text and files to Base64 securely in your browser."} />
                <meta name="keywords" content={toolKeywords} />
                <link rel="canonical" href={`https://corebench.eu/${locale}/dev-tools/base64`} />
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
                            <Base64Tool />
                        </div>

                        {/* Ad Placement #2 - Below Tool */}
                        <div style={{ marginBottom: '4rem' }}>
                            <AdBox type="horizontal" label="Advertisement" />
                        </div>

                        {/* Extra Features */}
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
                            </div>
                        </section>

                        {/* Content Section */}
                        <article>
                            {/* FAQ / Content - Already provided by user, keeping it */}
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
                                    <span>Complete Guide to Base64 Encoding</span>
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
                                            <Lightbulb size={20} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                marginBottom: '0.5rem',
                                                color: 'var(--primary)'
                                            }}>
                                                Expert Tip
                                            </h3>
                                            <p style={{
                                                fontSize: '0.9375rem',
                                                lineHeight: '1.6',
                                                color: 'var(--text-muted)',
                                                margin: 0
                                            }}>
                                                Properly encoded Base64 is essential for embedding binary data in text formats like JSON, XML, or CSS. Always ensure your decoder supports UTF-8 to prevent character corruption in non-ASCII strings.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* ... Content ... */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {/* What is Base64 Section (Simplified to save space) */}
                                <section>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Info size={24} className="accent-color" /> What is Base64 Encoding?
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--text-muted)' }}>
                                        Base64 is an encoding scheme used to represent binary data in an ASCII string format by translating it into a radix-64 representation. This is crucial for transmitting data over media that are designed to handle text.
                                    </p>
                                </section>

                                {/* Use Cases Section */}
                                <section>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Code2 size={24} className="accent-color" /> Real-world Use Cases
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                                        {useCases.map((useCase, index) => {
                                            const Icon = useCase.icon;
                                            return (
                                                <div key={index} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                                                    <div style={{ color: useCase.color, marginBottom: '12px' }}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>{useCase.title}</h4>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{useCase.description}</p>
                                                </div>
                                            );
                                        })}
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

                            {/* SEO Keywords Footer */}
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

export default Base64Page;