import React, { useState, useEffect } from 'react';
import { PieChart, IndianRupee, Calendar, Percent, Landmark, Table, Download, Info } from 'lucide-react';
import AdBox from '../components/ads/AdBox';

const LoanCalculator = () => {
    const [principal, setPrincipal] = useState(500000);
    const [rate, setRate] = useState(10.5);
    const [tenure, setTenure] = useState(5); // Years
    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [chartData, setChartData] = useState({ principal: 100, interest: 0 });

    useEffect(() => {
        calculateLoan();
    }, [principal, rate, tenure]);

    const calculateLoan = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 12 / 100;
        const n = parseFloat(tenure) * 12;

        if (p > 0 && r > 0 && n > 0) {
            const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const totalPayable = emiValue * n;
            const interest = totalPayable - p;

            setEmi(Math.round(emiValue));
            setTotalInterest(Math.round(interest));
            setTotalAmount(Math.round(totalPayable));

            // Chart Data Percentages
            const total = p + interest;
            setChartData({
                principal: ((p / total) * 100).toFixed(1),
                interest: ((interest / total) * 100).toFixed(1)
            });
        }
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="loan-calculator-tool" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 350px',
            gap: '32px',
            alignItems: 'start'
        }}>
            {/* Input & Chart Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div className="premium-card" style={{ padding: '40px', background: 'white' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '-0.02em' }}>
                        <Landmark className="accent-color" /> Loan Details
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                        {/* Principal Input */}
                        <div className="input-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <IndianRupee size={16} /> Principal Amount
                            </label>
                            <div className="input-wrapper" style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    className="custom-input"
                                    style={{
                                        width: '100%', padding: '14px 18px', borderRadius: '14px',
                                        border: '1px solid var(--border)', fontSize: '1.2rem', fontWeight: '800',
                                        background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                />
                            </div>
                            <input
                                type="range" min="10000" max="10000000" step="5000"
                                value={principal} onChange={(e) => setPrincipal(e.target.value)}
                                style={{ width: '100%', marginTop: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Rate Input */}
                        <div className="input-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <Percent size={16} /> Interest Rate (%)
                            </label>
                            <input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="custom-input"
                                style={{
                                    width: '100%', padding: '14px 18px', borderRadius: '14px',
                                    border: '1px solid var(--border)', fontSize: '1.2rem', fontWeight: '800',
                                    background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none'
                                }}
                            />
                            <input
                                type="range" min="1" max="30" step="0.1"
                                value={rate} onChange={(e) => setRate(e.target.value)}
                                style={{ width: '100%', marginTop: '16px', accentColor: '#ec4899', cursor: 'pointer' }}
                            />
                        </div>

                        {/* Tenure Input */}
                        <div className="input-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <Calendar size={16} /> Tenure (Years)
                            </label>
                            <input
                                type="number"
                                value={tenure}
                                onChange={(e) => setTenure(e.target.value)}
                                className="custom-input"
                                style={{
                                    width: '100%', padding: '14px 18px', borderRadius: '14px',
                                    border: '1px solid var(--border)', fontSize: '1.2rem', fontWeight: '800',
                                    background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none'
                                }}
                            />
                            <input
                                type="range" min="1" max="30" step="1"
                                value={tenure} onChange={(e) => setTenure(e.target.value)}
                                style={{ width: '100%', marginTop: '16px', accentColor: '#10b981', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="premium-card" style={{ padding: '40px', background: 'white' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '-0.02em' }}>
                        <Table className="accent-color" /> Amortization Schedule
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '1rem' }}>Detailed monthly breakdown available in full version.</p>
                    <AdBox type="horizontal" label="Finance Ad" />
                </div>
            </div>

            {/* Results Sidebar */}
            <div style={{ position: 'sticky', top: '24px' }}>
                <div className="premium-card" style={{
                    padding: '40px',
                    background: 'white',
                    border: '1px solid var(--border)'
                }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '32px', color: 'var(--text-main)', textAlign: 'center', letterSpacing: '-0.01em' }}>
                        Loan Summary
                    </h2>

                    {/* CSS Pie Chart */}
                    <div className="pie-chart-container" style={{
                        width: '210px', height: '210px', margin: '0 auto 40px auto',
                        borderRadius: '50%',
                        background: `conic-gradient(
                            #6366f1 0% ${chartData.principal}%, 
                            #ec4899 ${chartData.principal}% 100%
                        )`,
                        position: 'relative',
                        boxShadow: 'var(--shadow-lg)'
                    }}>
                        <div style={{
                            position: 'absolute', inset: '40px', background: 'white', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>EMI</span>
                            <span style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.02em' }}>{formatCurrency(emi)}</span>
                        </div>
                    </div>

                    <div className="summary-details" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#6366f1' }} /> Principal
                            </span>
                            <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{formatCurrency(principal)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#ec4899' }} /> Interest
                            </span>
                            <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{formatCurrency(totalInterest)}</span>
                        </div>
                        <div style={{ height: '1px', background: 'var(--border)', margin: '12px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800' }}>
                            <span style={{ color: 'var(--text-main)' }}>Total Amount</span>
                            <span style={{ color: 'var(--primary)' }}>{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '32px' }}>
                        <AdBox type="square" label="Loan Offer" />
                    </div>
                </div>

                <style>{`
                @media (max-width: 1024px) {
                    .loan-calculator-tool {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
            </div>
        </div>
    );
};

export default LoanCalculator;
