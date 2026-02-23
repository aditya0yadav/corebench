import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowLeft, Wrench } from 'lucide-react';
import { blogs } from '../data/blogs';
import AdBox from '../components/ads/AdBox';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { useLanguage } from '../context/LanguageContext';
// Simple markdown parser for the content (replace with robust lib if needed)
import ReactMarkdown from 'react-markdown';

const BlogPostPage = () => {
    const { slug } = useParams();
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        return <Navigate to={`/${locale}/blog`} replace />;
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.summary,
        "author": { "@type": "Organization", "name": blog.author },
        "datePublished": blog.date,
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://corebench.app/blog/${blog.slug}` }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-page, #fafafa)' }}>
            <Helmet>
                <title>{blog.title} - Corebench Blog</title>
                <meta name="description" content={blog.summary} />
                <link rel="canonical" href={`https://corebench.eu/${locale}/blog/${blog.slug}`} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.summary} />
                <meta property="og:type" content="article" />
            </Helmet>
            <SchemaMarkup data={schemaData} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                <AdBox type="horizontal" label="Advertisement" marginBottom="3rem" />

                {/* Main Content */}
                <article style={{ minWidth: 0 }}>
                    <Link to={`/${locale}/blog`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: '500' }}>
                        <ArrowLeft size={16} /> {t('backToBlog')}
                    </Link>

                    <header style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                            <span style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', color: 'var(--primary)' }}>
                                {blog.tags[0]}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={14} /> {new Date(blog.date).toLocaleDateString()}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <User size={14} /> {blog.author}
                            </div>
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', color: 'var(--text-main)' }}>
                            {blog.title}
                        </h1>
                    </header>

                    <div className="blog-content" style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#334155' }}>
                        {/* Manual markdown rendering or dangerouslySet if fully trusted content */}
                        {/* Since we wrote the content ourselves in blogs.js, we can trust it. Ideally use ReactMarkdown */}
                        <div dangerouslySetInnerHTML={{
                            __html: blog.content
                                .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.5rem; font-weight: 700; margin: 2rem 0 1rem; color: #1e293b">$1</h3>')
                                .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.8rem; font-weight: 700; margin: 2.5rem 0 1.5rem; color: #1e293b">$1</h2>')
                                .replace(/^\- (.*$)/gim, '<li style="margin-bottom: 0.5rem; margin-left: 1.5rem">$1</li>')
                                .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" style="color: var(--primary); text-decoration: underline; font-weight: 600">$1</a>')
                                .replace(/\n/gim, '<br />')
                        }} />
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <AdBox type="horizontal" label="Advertisement" />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogPostPage;
