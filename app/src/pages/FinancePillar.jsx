import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator, PieChart, Landmark, Percent, TrendingUp, IndianRupee, ChevronRight } from 'lucide-react';
import AdBox from '../components/ads/AdBox';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { useLanguage } from '../context/LanguageContext';

const FinancePillar = () => {
    const { t, locale } = useLanguage();

    const featuredTools = [
        {
            id: 'loan-calculator',
            name: 'Loan Calculator',
            icon: <PieChart size={28} />,
            path: `/${locale}/finance/loan-calculator`,
            desc: 'Calculate EMI, Total Interest, and Amortization for Home, Car, and Personal Loans.',
            color: '#6366f1'
        },
        {
            id: 'gst-calculator',
            name: 'GST Calculator',
            icon: <Landmark size={32} />,
            path: '#',
            desc: 'Quickly add or remove Goods and Service Tax for various slabs.',
            color: '#ec4899',
            soon: true
        },
        {
            id: 'sip-calculator',
            name: 'SIP Calculator',
            icon: <TrendingUp size={32} />,
            path: '#',
            desc: 'Estimate returns on your Systematic Investment Plans over time.',
            color: '#10b981',
            soon: true
        }
    ];

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Corebench Finance Tools",
        "description": "Professional financial calculators for developers and freelancers. EMI, GST, SIP, and more.",
        "url": "https://devsuite.app/finance"
    };

    return (
        <div className="pillar-page animate-fade-in">
            <SchemaMarkup data={schemaData} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 1.5rem' }}>
                <nav className="breadcrumb" style={{ marginBottom: '2rem' }}>
                    <Link to={`/${locale}`} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={16} /> {t('nav.backToHome')}
                    </Link>
                </nav>

                <AdBox type="horizontal" label="Finance Sponsor" marginBottom="48px" />

                <header style={{ marginBottom: '64px', textAlign: 'center' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                        <Calculator size={48} className="accent-color" /> {t('categories.finance')}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                        Precision calculators for your financial planning. Whether it's managing loans, estimating taxes, or planning investments, we've got you covered.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '80px' }}>
                    {featuredTools.map(tool => (
                        <Link
                            key={tool.id}
                            to={tool.path}
                            style={{ textDecoration: 'none', color: 'inherit', cursor: tool.soon ? 'default' : 'pointer' }}
                            onClick={e => tool.soon && e.preventDefault()}
                        >
                            <div className="premium-card" style={{
                                height: '100%',
                                padding: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                background: 'white',
                                borderRadius: '16px'
                            }}>
                                <div style={{
                                    width: '56px', height: '56px', borderRadius: '14px',
                                    background: 'rgba(99, 102, 241, 0.08)', color: 'var(--primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '24px'
                                }}>
                                    {tool.icon}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>{tool.name}</h3>
                                    {tool.soon && <span className="coming-soon">{t('comingSoon')}</span>}
                                </div>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem', marginBottom: '24px' }}>{tool.desc}</p>
                                {!tool.soon && (
                                    <div style={{ marginTop: 'auto', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        Open Calculator <ChevronRight size={18} />
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AdBox type="square" label="Offer" />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <AdBox type="horizontal" label="Partner" />
                </div>
            </div>
        </div>
    );
};

export default FinancePillar;
