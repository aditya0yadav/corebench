import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import {
  Home,
  Menu,
  X,
  ChevronRight,
  Github,
  Layout,
  Info,
  Shield,
  Database,
  Code2,
  Zap,
  Lock,
  FileJson,
  Hash,
  Fingerprint,
  Link as LinkIcon,
  Clock,
  Settings
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const DevToolsPillar = lazy(() => import('./pages/DevToolsPillar'));
const JsonFormatterPage = lazy(() => import('./pages/JsonFormatterPage'));
const Base64Page = lazy(() => import('./pages/Base64Page'));
const FinancePillar = lazy(() => import('./pages/FinancePillar'));
const LoanCalculatorPage = lazy(() => import('./pages/LoanCalculatorPage'));
const JwtDecoderPage = lazy(() => import('./pages/JwtDecoderPage'));
const SqlFormatterPage = lazy(() => import('./pages/SqlFormatterPage'));
const RegexTesterPage = lazy(() => import('./pages/RegexTesterPage'));
const UuidGeneratorPage = lazy(() => import('./pages/UuidGeneratorPage'));
const TimestampConverterPage = lazy(() => import('./pages/TimestampConverterPage'));
const UrlEncoderPage = lazy(() => import('./pages/UrlEncoderPage'));
const HtmlMinifierPage = lazy(() => import('./pages/HtmlMinifierPage'));
const CssMinifierPage = lazy(() => import('./pages/CssMinifierPage'));
const HashGeneratorPage = lazy(() => import('./pages/HashGeneratorPage'));
const HmacGeneratorPage = lazy(() => import('./pages/HmacGeneratorPage'));
const PasswordGeneratorPage = lazy(() => import('./pages/PasswordGeneratorPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { t, locale } = useLanguage();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(x => x && x !== locale);
    return [
      { name: t('home'), path: `/${locale}`, icon: <Home size={14} /> },
      ...paths.map((p, i) => ({
        name: p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' '),
        path: `/${locale}/` + paths.slice(0, i + 1).join('/')
      }))
    ];
  };

  return (
    <div className="app-container">
      <Helmet>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')} />
        <link rel="canonical" href={`https://lumivoc.com/${locale}${location.pathname.replace(`/${locale}`, '')}`} />
      </Helmet>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link to={`/${locale}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="logo">
              <img src="/logo.png" alt="Lumivoc" style={{ width: '32px', height: '32px' }} />
              <span className="logo-text">Lumivoc</span>
            </div>
          </Link>
          <button className="sidebar-toggle-mobile" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">{t('nav.explore')}</div>
          <Link to={`/${locale}/dev-tools`} className={`nav-item ${location.pathname.includes('/dev-tools') ? 'active' : ''}`}>
            <span>{t('categories.devTools')}</span>
          </Link>
          <Link to={`/${locale}/finance`} className={`nav-item ${location.pathname.includes('/finance') ? 'active' : ''}`}>
            <span>{t('categories.finance')}</span>
          </Link>
          <div className="nav-section" style={{ marginTop: '16px' }}>{t('nav.resources')}</div>
          <Link to={`/${locale}/blog`} className={`nav-item ${location.pathname.includes('/blog') ? 'active' : ''}`}>
            <span>{t('categories.blog')}</span>
          </Link>
        </nav>

        <LanguageSwitcher />

        <div className="sidebar-footer">
          <a href="https://github.com/aditya0yadav" target="_blank" rel="noreferrer" className="footer-link">
            <Github size={18} />
            <span>{t('nav.openSource')}</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar glass-effect">
          <div className="max-container" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <div className="breadcrumb">
              {getBreadcrumbs().map((crumb, i) => (
                <React.Fragment key={crumb.path}>
                  {i > 0 && <span className="separator"><ChevronRight size={14} /></span>}
                  <Link
                    to={crumb.path}
                    className={i === getBreadcrumbs().length - 1 ? 'current' : ''}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {crumb.icon} {crumb.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </header>

        <section className="tool-container">
          <div className="max-container">
            <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading resources...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dev-tools" element={<DevToolsPillar />} />
                <Route path="/dev-tools/json-formatter" element={<JsonFormatterPage />} />
                <Route path="/dev-tools/base64" element={<Base64Page />} />
                <Route path="/finance" element={<FinancePillar />} />
                <Route path="/finance/loan-calculator" element={<LoanCalculatorPage />} />
                <Route path="/dev-tools/jwt-decoder" element={<JwtDecoderPage />} />
                <Route path="/dev-tools/sql-formatter" element={<SqlFormatterPage />} />
                <Route path="/dev-tools/regex-tester" element={<RegexTesterPage />} />
                <Route path="/dev-tools/uuid-generator" element={<UuidGeneratorPage />} />
                <Route path="/dev-tools/timestamp-converter" element={<TimestampConverterPage />} />
                <Route path="/dev-tools/url-encoder" element={<UrlEncoderPage />} />
                <Route path="/dev-tools/html-minifier" element={<HtmlMinifierPage />} />
                <Route path="/dev-tools/css-minifier" element={<CssMinifierPage />} />
                <Route path="/dev-tools/hash-generator" element={<HashGeneratorPage />} />
                <Route path="/dev-tools/hmac-generator" element={<HmacGeneratorPage />} />
                <Route path="/dev-tools/password-generator" element={<PasswordGeneratorPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
              </Routes>
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/:lang/*" element={<LanguageProvider><AppContent /></LanguageProvider>} />
      <Route path="*" element={<LanguageProvider><AppContent /></LanguageProvider>} />
    </Routes>
  </Router>
);

export default App;
