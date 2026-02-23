import React, { useState } from 'react';
import { Copy, Trash2, Zap, FileCode } from 'lucide-react';

const CssMinifier = () => {
    const [input, setInput] = useState('/* Example CSS */\nbody {\n    color: #333;\n    background: #fff;\n}\n\n.container {\n    display: flex;\n}');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ original: 0, minified: 0, savings: 0 });

    const minifyCss = () => {
        let minified = input
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Collapse whitespace
            .replace(/\s*([{:;,}])\s*/g, '$1') // Remove space around chars
            .replace(/;}/g, '}') // Remove last semicolon
            .trim();

        setOutput(minified);

        const originalSize = new Blob([input]).size;
        const minifiedSize = new Blob([minified]).size;
        setStats({
            original: originalSize,
            minified: minifiedSize,
            savings: originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : 0
        });
    };

    const copyOutput = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="tool-workspace" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                {/* Input */}
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                    <div className="tool-header" style={{ padding: '12px 16px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Input CSS</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => setInput('')} className="icon-btn" title="Clear">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your CSS here..."
                        style={{
                            minHeight: '200px', padding: '16px', border: 'none', resize: 'vertical',
                            fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.5', outline: 'none'
                        }}
                    />
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={minifyCss} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}>
                        <Zap size={18} /> Minify CSS
                    </button>
                </div>

                {/* Output */}
                {output && (
                    <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
                        <div className="tool-header" style={{ padding: '12px 16px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Minified Output</span>
                            <button onClick={copyOutput} className="icon-btn" title="Copy">
                                <Copy size={16} />
                            </button>
                        </div>
                        <textarea
                            readOnly
                            value={output}
                            style={{
                                minHeight: '150px', padding: '16px', border: 'none', resize: 'vertical',
                                fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.5', outline: 'none',
                                background: 'transparent', color: 'var(--text-main)', wordBreak: 'break-all'
                            }}
                        />
                        <div style={{ padding: '8px 16px', background: '#f0fdf4', borderTop: '1px solid #dcfce7', fontSize: '0.85rem', color: '#15803d', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Original: {stats.original} B</span>
                            <span>Minified: {stats.minified} B</span>
                            <strong>Saved: {stats.savings}%</strong>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                .icon-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: var(--text-muted);
                    padding: 6px;
                    border-radius: 4px;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .icon-btn:hover {
                    background: rgba(0,0,0,0.05);
                    color: var(--primary);
                }
            `}</style>
        </div>
    );
};

export default CssMinifier;
