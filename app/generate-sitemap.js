import { blogs } from './src/data/blogs.js';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://corebench.app';

const staticPages = [
    '/',
    '/dev-tools',
    '/finance',
    '/dev-tools/json-formatter',
    '/dev-tools/base64',
    '/dev-tools/jwt-decoder',
    '/dev-tools/sql-formatter',
    '/dev-tools/regex-tester',
    '/dev-tools/uuid-generator',
    '/dev-tools/timestamp-converter',
    '/dev-tools/url-encoder',
    '/dev-tools/html-minifier',
    '/dev-tools/css-minifier',
    '/dev-tools/hash-generator',
    '/dev-tools/hmac-generator',
    '/dev-tools/password-generator',
    '/finance/loan-calculator',
    '/blog'
];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages.map(page => `
    <url>
        <loc>${baseUrl}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>
    `).join('')}
    ${blogs.map(blog => `
    <url>
        <loc>${baseUrl}/blog/${blog.slug}</loc>
        <lastmod>${blog.date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    `).join('')}
</urlset>`;

    fs.writeFileSync(path.resolve('public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
};

generateSitemap();
