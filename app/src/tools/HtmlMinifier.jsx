import React, { useState } from 'react';
import { Copy, Trash2, FileCode, Zap } from 'lucide-react';

const HtmlMinifier = () => {
    const [input, setInput] = useState('<!-- Example -->\n<div class=" container ">\n    <h1>  Hello World  </h1>\n</div>');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ original: 0, minified: 0, savings: 0 });

    const minifyHtml = () => {
        let minified = input
            .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
            .replace(/>\s+</g, '><') // Remove whitespace between tags
            .replace(/\s{2,}/g, ' ') // Collapse multiple spaces
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
                {/* Input */}
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', height: '500px' }}>
                    <div className="tool-header" style={{ padding: '12px 16px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Input HTML</span>
                        <button onClick={() => setInput('')} className="icon-btn" title="Clear">
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your HTML here..."
                        style={{
                            flex: 1, padding: '16px', border: 'none', resize: 'none',
                            fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.5', outline: 'none'
                        }}
                    />
                </div>

                {/* Output */}
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', height: '500px', background: '#f8fafc' }}>
                    <div className="tool-header" style={{ padding: '12px 16px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Minified</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={minifyHtml} className="action-btn" style={{ fontSize: '0.8rem', padding: '4px 8px' }}>
                                <Zap size={14} style={{ marginRight: '4px' }} /> Minify
                            </button>
                            <button onClick={copyOutput} className="icon-btn" title="Copy">
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        style={{
                            flex: 1, padding: '16px', border: 'none', resize: 'none',
                            fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.5', outline: 'none',
                            background: 'transparent', color: 'var(--text-main)', wordBreak: 'break-all'
                        }}
                    />
                    {output && (
                        <div style={{ padding: '8px 16px', background: '#f0fdf4', borderTop: '1px solid #dcfce7', fontSize: '0.85rem', color: '#15803d', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Original: {stats.original} B</span>
                            <span>Minified: {stats.minified} B</span>
                            <strong>Saved: {stats.savings}%</strong>
                        </div>
                    )}
                </div>
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
                 .action-btn {
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    transition: opacity 0.2s;
                }
                .action-btn:hover {
                    opacity: 0.9;
                }
                 @media (max-width: 768px) {
                    .tool-workspace > div {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default HtmlMinifier;
