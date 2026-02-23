import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { blogs } from '../data/blogs';
import AdBox from '../components/ads/AdBox';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { useLanguage } from '../context/LanguageContext';

const BlogListPage = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Corebench Blog",
        "description": "Tutorials, guides, and insights for developers and financial planners.",
        "url": "https://corebench.app/blog",
        "blogPost": blogs.map(blog => ({
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": blog.summary,
            "datePublished": blog.date,
            "author": { "@type": "Organization", "name": "Corebench Team" }
        }))
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-page, #fafafa)' }}>
            <Helmet>
                <title>Corebench Blog - Developer & Finance Guides</title>
                <meta name="description" content="Tutorials, guides, and insights for developers and financial planners. Learn about JSON, JWT, Base64, and more." />
                <link rel="canonical" href={`https://corebench.eu/${locale}/blog`} />
            </Helmet>
            <SchemaMarkup data={schemaData} />
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>

                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 1.5rem auto' }}>
                        <BookOpen size={32} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, #1e293b, #334155)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {t('categories.blog')}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        Insights, tutorials, and deep dives into development tools and financial planning.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                    {blogs.map(blog => (
                        <article key={blog.id} className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', border: '1px solid var(--border)', overflow: 'hidden' }}>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    <Calendar size={14} />
                                    <time>{new Date(blog.date).toLocaleDateString('en-US', { long: 'medium' })}</time>
                                    <span style={{ margin: '0 4px' }}>•</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{blog.tags[0]}</span>
                                </div>

                                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', lineHeight: '1.3' }}>
                                    <Link to={`/${locale}/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {blog.title}
                                    </Link>
                                </h2>

                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', flex: 1, marginBottom: '24px' }}>
                                    {blog.summary}
                                </p>

                                <Link to={`/${locale}/blog/${blog.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--primary)', fontWeight: '600', width: 'fit-content' }}>
                                    {t('readMore')} <ArrowRight size={16} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <AdBox type="horizontal" label="Supported by" />
                </div>
            </div>

            <style>{`
                .card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default BlogListPage;
