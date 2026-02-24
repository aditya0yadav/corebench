import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Info, CheckCircle2 } from 'lucide-react';
import LoanCalculator from '../tools/LoanCalculator';
import AuthorBio from '../components/AuthorBio';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import AdBox from '../components/ads/AdBox';
import { useLanguage } from '../context/LanguageContext';

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lumivoc Loan Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "description": "Calculate EMI, total interest, and amortization schedule for home, car, and personal loans.",
    "offers": {
        "@type": "Offer",
        "price": "0"
    }
};

const LoanCalculatorPage = () => {
    const { t, locale } = useLanguage();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-page, #fafafa)'
        }}>
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
                        to={`/${locale}/finance`}
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
                        <span>{t('categories.finance')}</span>
                    </Link>
                </nav>

                {/* Layout Grid - Main Content + Sidebar */}
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <AdBox type="horizontal" label="Advertisement" marginBottom="4rem" />

                    {/* Main Content Column */}
                    <div style={{ minWidth: 0 }}>
                        {/* Tool Section */}
                        <div style={{ marginBottom: '4rem' }}>
                            <div className="premium-card" style={{ padding: '0', background: 'transparent', boxShadow: 'none' }}>
                                <LoanCalculator />
                            </div>
                        </div>

                        {/* Ad Placement #2 - Between Tool & Extra Features */}
                        <div style={{ marginBottom: '4rem' }}>
                            <AdBox type="horizontal" label="Advertisement" />
                        </div>

                        <section style={{ marginBottom: '4rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="premium-card" style={{ padding: '40px', background: 'white' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '-0.02em' }}>
                                        <Layers size={24} className="accent-color" /> {t('nav.explore')}
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                                        {[
                                            { name: 'Loan Calculator', path: `/${locale}/finance/loan-calculator`, color: '#6366f1' },
                                            { name: 'GST Calculator', path: '#', color: '#ec4899', soon: true },
                                            { name: 'SIP Calculator', path: '#', color: '#10b981', soon: true },
                                            { name: 'Income Tax', path: '#', color: '#f59e0b', soon: true }
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
                                    <span>Understanding Your Loan EMI</span>
                                </h2>

                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                    borderLeft: '4px solid var(--primary)',
                                    borderRadius: '0.75rem',
                                    padding: '1.5rem',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div style={{
                                            flexShrink: 0, width: '2.5rem', height: '2.5rem',
                                            background: 'var(--primary)', borderRadius: '0.5rem',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                                        }}>
                                            <Info size={20} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary)'
                                            }}>
                                                How EMI is Calculated
                                            </h3>
                                            <p style={{
                                                fontSize: '0.9375rem', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0
                                            }}>
                                                EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is tenure in months.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                <section>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <CheckCircle2 size={24} className="accent-color" /> Benefits of Using an EMI Calculator
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                                        {['Accurate Financial Planning', 'Comparison of Loan Offers', 'Time-saving instant calculations', 'Breakdown of Principle vs Interest'].map((item, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', color: 'var(--text-muted)' }}>
                                                <CheckCircle2 size={18} className="text-green-500" style={{ color: '#10b981' }} /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>
                                <AdBox
                                    type="horizontal"
                                    label="Finance Offer"
                                // adSlot="YOUR_AD_SLOT_ID"
                                />
                            </div>

                            <div style={{ marginTop: '4rem' }}>
                                <AuthorBio />
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
                }
            ` }} />

        </div>
    );
};

export default LoanCalculatorPage;
