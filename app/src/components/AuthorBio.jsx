import React from 'react';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AuthorBio = () => {
    const { t } = useLanguage();
    return (
        <section className="author-bio glass-effect animate-fade-in" style={{ marginTop: '48px', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: 'white',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    AD
                </div>
                <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontWeight: '700' }}>{t('authorTitle')}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
                        {t('authorBio')}
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <a href="#" className="footer-link"><Github size={20} /></a>
                        <a href="#" className="footer-link"><Linkedin size={20} /></a>
                        <a href="#" className="footer-link"><Twitter size={20} /></a>
                        <a href="#" className="footer-link"><Globe size={20} /></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthorBio;
