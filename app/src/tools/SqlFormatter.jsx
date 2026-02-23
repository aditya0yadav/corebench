import React, { useState } from 'react';
import { Copy, Code2, Play, Trash2 } from 'lucide-react';

const SqlFormatter = () => {
    const [input, setInput] = useState('SELECT * FROM users WHERE id = 1');
    const [output, setOutput] = useState('');

    const formatSql = () => {
        let sql = input.trim();
        // Basic keywords list
        const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'DROP TABLE', 'ALTER TABLE'];

        // Uppercase keywords
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'gi');
            sql = sql.replace(regex, kw.toUpperCase());
        });

        // Basic indentation (NewLine for major keywords)
        const newLines = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'VALUES', 'SET'];
        newLines.forEach(kw => {
            sql = sql.replace(new RegExp(`\\b${kw}\\b`, 'g'), `\n${kw}`);
        });

        // Fix logic to avoid initial newline if starts with keyword
        if (sql.startsWith('\n')) sql = sql.substring(1);

        setOutput(sql);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output || input);
    };

    return (
        <div className="tool-workspace">
            <div className="sticky-nav" style={{
                position: 'sticky', top: '0', zIndex: 10,
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                borderBottom: '1px solid var(--border)', padding: '12px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={formatSql} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
                        <Play size={16} /> Format SQL
                    </button>
                    <button onClick={() => setInput('')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}>
                        <Trash2 size={16} /> Clear
                    </button>
                </div>
                <button onClick={copyToClipboard} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer' }}>
                    <Copy size={16} /> Copy
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', padding: '24px' }}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your SQL query here..."
                    style={{
                        width: '100%', minHeight: '300px', padding: '16px',
                        border: '1px solid var(--border)', borderRadius: '12px',
                        fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5',
                        resize: 'vertical', outline: 'none'
                    }}
                />

                {output && (
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-12px', left: '16px', background: 'white', padding: '0 8px', fontSize: '12px', fontWeight: '600', color: 'var(--primary)' }}>
                            Formatted Output
                        </div>
                        <pre style={{
                            margin: 0, padding: '24px', background: '#1e293b', color: '#e2e8f0',
                            borderRadius: '12px', overflowX: 'auto', fontFamily: 'monospace', fontSize: '14px'
                        }}>
                            {output}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SqlFormatter;
