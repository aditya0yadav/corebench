import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Terminal,
    Zap,
    ChevronRight,
    Code2,
    ShieldCheck,
    Cpu,
    Globe,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import AdBox from '../components/ads/AdBox';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
    const { t, locale } = useLanguage();

    const categories = [
        {
            id: 'dev-tools',
            name: t('categories.devTools'),
            icon: <Terminal size={32} />,
            path: `/${locale}/dev-tools`,
            desc: 'Powerful JSON Formatters, Base64 Decoders, JWT Verifiers, and specialized code utilities for modern developers.',
            color: 'var(--primary)',
            bg: 'rgba(99, 102, 241, 0.05)'
        },
        {
            id: 'finance',
            name: t('categories.finance'),
            icon: <Zap size={32} />,
            path: `/${locale}/finance`,
            desc: 'Accurate Loan Calculators, GST analysis, and investment planning tools designed for clarity and precision.',
            color: '#f59e0b',
            bg: 'rgba(245, 158, 11, 0.05)'
        }
    ];

    return (
        <div className="home-page animate-fade-in" style={{ paddingBottom: '100px' }}>
            <Helmet>
                <title>{t('title')}</title>
                <meta name="description" content={t('description')} />
                <link rel="canonical" href={`https://lumivoc.com/${locale}/`} />
            </Helmet>

            <AdBox type="horizontal" label="Top Sponsor" marginTop="0" marginBottom="60px" />

            {/* Hero Section */}
            <header style={{
                textAlign: 'center',
                marginBottom: '100px',
                marginTop: '40px',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '400px',
                    background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                    zIndex: -1,
                    opacity: 0.3
                }} />

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', background: 'rgba(99, 102, 241, 0.08)', color: 'var(--primary)', fontSize: '14px', fontWeight: '600', marginBottom: '32px' }}>
                    <Sparkles size={16} />
                    <span>Empowering 2026 Developers</span>
                </div>

                <h1 className="text-gradient" style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 900,
                    marginBottom: '24px',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    maxWidth: '900px',
                    margin: '0 auto 24px auto'
                }}>
                    {t('homeTitle')}
                </h1>

                <p style={{
                    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                    color: 'var(--text-muted)',
                    maxWidth: '680px',
                    margin: '0 auto',
                    lineHeight: '1.7',
                    fontWeight: '400'
                }}>
                    {t('homeSubtitle')}
                </p>

                <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <Link to={`/${locale}/dev-tools`} style={{ textDecoration: 'none' }}>
                        <button className="btn-premium">
                            Browse Dev Tools <ArrowRight size={18} />
                        </button>
                    </Link>
                </div>
            </header>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '40px' }}>
                {categories.map(cat => (
                    <Link key={cat.id} to={cat.path} style={{ textDecoration: 'none' }}>
                        <div className="premium-card" style={{
                            padding: '48px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            background: `linear-gradient(180deg, ${cat.bg} 0%, white 100%)`
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: cat.color,
                                marginBottom: '32px',
                                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.05)',
                                border: '1px solid var(--border)'
                            }}>
                                {cat.icon}
                            </div>

                            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: 'var(--text-main)', fontWeight: '800', letterSpacing: '-0.02em' }}>
                                {cat.name}
                            </h2>

                            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', flex: 1, fontSize: '1.0625rem', lineHeight: '1.6' }}>
                                {cat.desc}
                            </p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: 'var(--primary)',
                                fontWeight: 700,
                                fontSize: '1rem'
                            }}>
                                <span>{t('exploreTools')}</span>
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Ad Placement */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AdBox type="rectangle" label="Advertisement" />
                </div>
            </div>

            {/* Secondary Grid / Features */}
            <div style={{
                marginTop: '120px',
                padding: '60px',
                background: 'white',
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '40px',
                textAlign: 'center'
            }}>
                <div>
                    <div style={{ color: 'var(--primary)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Cpu size={32} /></div>
                    <h3 style={{ fontWeight: '700', marginBottom: '8px' }}>High Performance</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Optimized for 2026 workflows and speed.</p>
                </div>
                <div>
                    <div style={{ color: '#ec4899', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><ShieldCheck size={32} /></div>
                    <h3 style={{ fontWeight: '700', marginBottom: '8px' }}>Browser-Based</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Secure client-side processing. Your data never leaves.</p>
                </div>
                <div>
                    <div style={{ color: 'var(--accent)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Globe size={32} /></div>
                    <h3 style={{ fontWeight: '700', marginBottom: '8px' }}>Global Support</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Localized keywords and tools across 10+ languages.</p>
                </div>
            </div>

            <div style={{ marginTop: '100px' }}>
                <AdBox type="horizontal" label="Partner Ad" />
            </div>
        </div >
    );
};

export default HomePage;
