import React, { useState, useMemo } from 'react';
import { Play, Flag, Trash2 } from 'lucide-react';

const RegexTester = () => {
    const [regex, setRegex] = useState('([A-Z])\\w+');
    const [flags, setFlags] = useState('gm');
    const [text, setText] = useState('Hello World. This is a Regex Tester.');

    const matchHtml = useMemo(() => {
        if (!regex) return text;
        try {
            const re = new RegExp(regex, flags);
            let html = '';
            let lastIndex = 0;
            let match;

            // Prevent infinite loops with zero-width matches
            if (!re.global) {
                const m = re.exec(text);
                if (m) {
                    html += text.substring(0, m.index);
                    html += `<span class="highlight">${m[0]}</span>`;
                    html += text.substring(m.index + m[0].length);
                    return html;
                }
                return text;
            }

            while ((match = re.exec(text)) !== null) {
                html += text.substring(lastIndex, match.index);
                html += `<span class="highlight">${match[0]}</span>`;
                lastIndex = match.index + match[0].length;
                if (match[0].length === 0) re.lastIndex++; // Avoid infinite loop
            }
            html += text.substring(lastIndex);
            return html;
        } catch (e) {
            return text; // Invalid regex
        }
    }, [regex, flags, text]);

    return (
        <div className="tool-workspace">
            {/* Controls */}
            <div className="card" style={{ padding: '24px', marginBottom: '24px', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 3fr) 1fr', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8', fontSize: '1.2rem' }}>/</span>
                        <input
                            type="text"
                            value={regex}
                            onChange={(e) => setRegex(e.target.value)}
                            className="custom-input"
                            style={{ width: '100%', paddingLeft: '28px', fontFamily: 'monospace', fontSize: '1.1rem' }}
                            placeholder="Regular Expression"
                        />
                        <span style={{ position: 'absolute', right: '12px', top: '12px', color: '#94a3b8', fontSize: '1.2rem' }}>/</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <Flag size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#94a3b8' }} />
                        <input
                            type="text"
                            value={flags}
                            onChange={(e) => setFlags(e.target.value)}
                            className="custom-input"
                            style={{ width: '100%', paddingLeft: '36px', fontFamily: 'monospace', fontSize: '1.1rem' }}
                            placeholder="Flags (g, i, m)"
                        />
                    </div>
                </div>
            </div>

            {/* Editor Area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', position: 'relative' }}>
                    <div className="tool-header" style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid var(--border)', fontWeight: '600', color: '#64748b' }}>
                        Test String
                    </div>

                    <div style={{ position: 'relative', minHeight: '300px' }}>
                        {/* Backdrop for highlights */}
                        <div
                            dangerouslySetInnerHTML={{ __html: matchHtml }}
                            style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                padding: '24px',
                                fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6',
                                color: 'transparent',
                                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                zIndex: 1, pointerEvents: 'none'
                            }}
                        />

                        {/* Foreground Input */}
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{
                                position: 'relative', zIndex: 2,
                                width: '100%', height: '100%', minHeight: '300px',
                                padding: '24px',
                                fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6',
                                background: 'transparent', color: 'var(--text-main)',
                                border: 'none', resize: 'vertical', outline: 'none',
                                whiteSpace: 'pre-wrap', wordBreak: 'break-word'
                            }}
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .highlight {
                    background-color: rgba(99, 102, 241, 0.2);
                    border-bottom: 2px solid #6366f1;
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
};

export default RegexTester;
