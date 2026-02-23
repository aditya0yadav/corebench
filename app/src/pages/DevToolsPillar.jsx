import React from 'react';
import { Link } from 'react-router-dom';
import {
    Brackets,
    Terminal,
    ShieldCheck,
    Database,
    Spline,
    Fingerprint,
    Clock,
    Link as LinkIcon,
    FileCode,
    Wand2,
    Hash,
    Key,
    Lock,
    ArrowLeft,
    ChevronRight
} from 'lucide-react';
import AdBox from '../components/ads/AdBox';
import { useLanguage } from '../context/LanguageContext';

const DevToolsPillar = () => {
    const { t, locale } = useLanguage();

    const tools = [
        {
            id: 'json-formatter',
            name: 'JSON Formatter',
            icon: <Brackets size={24} />,
            path: `/${locale}/dev-tools/json-formatter`,
            desc: 'Professional grade JSON prettifier and validator.'
        },
        {
            id: 'base64',
            name: 'Base64 Decoder',
            icon: <Terminal size={24} />,
            path: `/${locale}/dev-tools/base64`,
            desc: 'Encode and decode Base64 strings with ease.'
        },
        {
            id: 'jwt-decoder',
            name: 'JWT Decoder',
            icon: <ShieldCheck size={24} />,
            path: `/${locale}/dev-tools/jwt-decoder`,
            desc: 'Decode JSON Web Tokens securely in your browser.'
        },
        {
            id: 'sql-formatter',
            name: 'SQL Formatter',
            icon: <Database size={24} />,
            path: `/${locale}/dev-tools/sql-formatter`,
            desc: 'Prettify and standardise SQL queries.'
        },
        {
            id: 'regex-tester',
            name: 'Regex Tester',
            icon: <Spline size={24} />,
            path: `/${locale}/dev-tools/regex-tester`,
            desc: 'Real-time regular expression testing and debugging.'
        },
        {
            id: 'uuid-generator',
            name: 'UUID Generator',
            icon: <Fingerprint size={24} />,
            path: `/${locale}/dev-tools/uuid-generator`,
            desc: 'Bulk generate version 4 UUIDs instantly.'
        },
        {
            id: 'timestamp-converter',
            name: 'Timestamp Converter',
            icon: <Clock size={24} />,
            path: `/${locale}/dev-tools/timestamp-converter`,
            desc: 'Convert between Unix timestamps and human dates.'
        },
        {
            id: 'url-encoder',
            name: 'URL Encoder',
            icon: <LinkIcon size={24} />,
            path: `/${locale}/dev-tools/url-encoder`,
            desc: 'Encode and decode URL-safe strings.'
        },
        {
            id: 'html-minifier',
            name: 'HTML Minifier',
            icon: <FileCode size={24} />,
            path: `/${locale}/dev-tools/html-minifier`,
            desc: 'Compress HTML by removing whitespace and comments.'
        },
        {
            id: 'css-minifier',
            name: 'CSS Minifier',
            icon: <Wand2 size={24} />,
            path: `/${locale}/dev-tools/css-minifier`,
            desc: 'Minify CSS files for production.'
        },
        {
            id: 'hash-generator',
            name: 'Hash Generator',
            icon: <Hash size={24} />,
            path: `/${locale}/dev-tools/hash-generator`,
            desc: 'Calculate MD5, SHA-1, SHA-256 hashes.'
        },
        {
            id: 'hmac-generator',
            name: 'HMAC Generator',
            icon: <Key size={24} />,
            path: `/${locale}/dev-tools/hmac-generator`,
            desc: 'Generate message authentication codes.'
        },
        {
            id: 'password-generator',
            name: 'Password Generator',
            icon: <Lock size={24} />,
            path: `/${locale}/dev-tools/password-generator`,
            desc: 'Create secure, random strong passwords.'
        }
    ];

    return (
        <div className="pillar-page animate-fade-in">
            <div style={{ marginBottom: '24px' }}>
                <AdBox type="horizontal" label="Sponsored Tool" marginTop="0" marginBottom="24px" />
            </div>

            <div className="breadcrumb" style={{ marginBottom: '32px' }}>
                <Link to={`/${locale}`} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={16} /> {t('home')}
                </Link>
            </div>

            <header style={{ marginBottom: '64px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <div className="logo-icon" style={{ width: '56px', height: '56px', borderRadius: '12px' }}>
                        <Terminal size={28} />
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{t('categories.devTools')}</h1>
                </div>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: '1.6' }}>
                    Essential utilities for modern developers. Optimized for speed, security, and developer experience. Explore our high-performance cluster of dev utilities.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
                {tools.map(tool => (
                    <Link key={tool.id} to={tool.path} style={{ textDecoration: 'none' }}>
                        <div className="premium-card" style={{ padding: '32px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', height: '100%', background: 'white' }}>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--primary)', padding: '14px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '16px' }}>{tool.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '800', letterSpacing: '-0.02em' }}>{tool.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>{tool.desc}</p>
                                    {tool.soon ? (
                                        <span className="coming-soon">{t('comingSoon')}</span>
                                    ) : (
                                        <span style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            Open Tool <ChevronRight size={18} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <AdBox type="square" label="Recommended Service" />
                </div>
            </div>

            <div style={{ marginTop: '48px' }}>
                <AdBox type="horizontal" />
            </div>

            <section style={{ marginTop: '64px', borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '24px' }}>Why use our Developer Tools?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    <div>
                        <h4 style={{ marginBottom: '12px' }}>🔒 Privacy First</h4>
                        <p style={{ color: 'var(--text-muted)' }}>All processing happens locally in your browser. Your data never leaves your device.</p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '12px' }}>⚡ Hyper Fast</h4>
                        <p style={{ color: 'var(--text-muted)' }}>Built on Vite and optimized for 2026 Core Web Vitals. Instant loads, zero latency.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DevToolsPillar;
