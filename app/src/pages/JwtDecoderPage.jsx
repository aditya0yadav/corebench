import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Fingerprint } from 'lucide-react';
import JwtDecoder from '../tools/JwtDecoder';
import AuthorBio from '../components/AuthorBio';
import AdBox from '../components/ads/AdBox';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { keywords } from '../data/keywords';

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lumivoc JWT Decoder",
    "description": "Decode JSON Web Tokens (JWT) instantly directly in your browser. View header and payload data securely.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0" }
};

const JwtDecoderPage = () => {
    const { t, locale } = useLanguage();
    const toolKeywords = (keywords[locale]?.jwtDecoder || keywords.en.jwtDecoder).join(', ');

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-page, #fafafa)' }}>
            <Helmet>
                <title>{t('jwtDecoderTitle') || "JWT Decoder & Verifier"} - Lumivoc</title>
                <meta name="description" content={t('jwtDecoderDesc') || "Decode and verify JSON Web Tokens (JWT) instantly directly in your browser. View header and payload data securely."} />
                <meta name="keywords" content={toolKeywords} />
                <link rel="canonical" href={`https://lumivoc.com/${locale}/dev-tools/jwt-decoder`} />
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
                            <div style={{ width: '48px', height: '48px', background: '#e0e7ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                                <Shield size={24} />
                            </div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: 0 }}>JWT Decoder</h1>
                        </div>
                        <JwtDecoder />
                    </div>

                    <div style={{ marginBottom: '4rem' }}>
                        <AdBox type="horizontal" label="Advertisement" />
                    </div>

                    <article>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>Understanding JSON Web Tokens</h2>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            JSON Web Tokens (JWT) are an open, industry standard RFC 7519 method for representing claims securely between two parties.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '3rem' }}>
                            <div className="feature-card" style={{ padding: '24px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px' }}>
                                <Lock className="accent-color" size={24} style={{ marginBottom: '16px' }} />
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>Secure Transmission</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Information is verified and trusted because it is digitally signed.</p>
                            </div>
                            <div className="feature-card" style={{ padding: '24px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px' }}>
                                <Fingerprint className="accent-color" size={24} style={{ marginBottom: '16px' }} />
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px' }}>Self-contained</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>The payload contains all the required information about the user.</p>
                            </div>
                        </div>

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

export default JwtDecoderPage;
