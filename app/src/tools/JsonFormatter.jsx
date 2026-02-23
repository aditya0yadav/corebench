import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Copy, Trash2, Download, Check, AlertCircle, FileJson,
    Upload, Settings2, Zap, Monitor, Moon, Sun,
    Maximize2, Play, AlignLeft, FileText, Hash
} from 'lucide-react';
import AdBox from '../components/ads/AdBox';

const JsonFormatter = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [stats, setStats] = useState({ size: 0, lines: 0 });
    const [autoFormat, setAutoFormat] = useState(true);

    const fileInputRef = useRef(null);

    // Auto-format effect
    useEffect(() => {
        if (autoFormat && input.trim()) {
            try {
                const parsed = JSON.parse(input);
                const formatted = JSON.stringify(parsed, null, 2);
                setOutput(formatted);
                setError(null);
                updateStats(formatted);
            } catch {
                // Silent fail on auto-format while typing
                updateStats(input);
            }
        } else {
            updateStats(input);
        }
    }, [input, autoFormat]);

    const updateStats = (text) => {
        setStats({
            size: new Blob([text]).size,
            lines: text.split('\n').length
        });
    };

    const handleFormat = useCallback(() => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
            setError(null);
            updateStats(formatted);
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    }, [input]);

    const handleMinify = useCallback(() => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setError(null);
            updateStats(minified);
        } catch (err) {
            setError(err.message);
        }
    }, [input]);

    const handleCopy = useCallback(() => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [output]);

    const handleClear = useCallback(() => {
        setInput('');
        setOutput('');
        setError(null);
        setStats({ size: 0, lines: 0 });
    }, []);

    const handleDownload = useCallback(() => {
        if (!output) return;
        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [output]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => setInput(event.target.result);
        reader.readAsText(file);
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={`base64-redesign ${isDarkMode ? 'dark-mode-tool' : ''}`} style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '600px'
        }}>
            {/* Sticky Navbar */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--border)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)'
                    }}>
                        <FileJson size={20} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1.2, margin: 0 }}>JSON Pro</h2>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Formatter & Validator</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={handleFormat}
                        className="btn-primary"
                        style={{
                            padding: '8px 16px',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        <AlignLeft size={16} /> Format
                    </button>
                    <button
                        onClick={handleMinify}
                        className="btn-outline"
                        style={{
                            padding: '8px 16px',
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontWeight: 600,
                            display: 'flex', alignItems: 'center', gap: '6px',
                            cursor: 'pointer',
                            color: 'var(--text-main)'
                        }}
                    >
                        <Maximize2 size={16} /> Minify
                    </button>

                    <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 8px' }} />

                    <button onClick={handleCopy} className="icon-btn" title="Copy Output">
                        {copied ? <Check size={18} color="var(--success)" /> : <Copy size={18} />}
                    </button>
                    <button onClick={handleDownload} className="icon-btn" title="Download JSON">
                        <Download size={18} />
                    </button>
                    <button onClick={handleClear} className="icon-btn" title="Clear All">
                        <Trash2 size={18} />
                    </button>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="icon-btn" title="Toggle Theme">
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </div>

            {/* Workspace */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, minHeight: 0 }}>
                {/* Input Panel */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid var(--border)',
                    background: isDarkMode ? '#1e293b' : '#ffffff'
                }}>
                    <div style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: isDarkMode ? 'rgba(0,0,0,0.2)' : '#f8fafc'
                    }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FileText size={14} /> INPUT
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                                <input type="checkbox" checked={autoFormat} onChange={() => setAutoFormat(!autoFormat)} />
                                Auto-format
                            </label>
                            <button onClick={() => fileInputRef.current?.click()} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Upload size={12} /> Load File
                            </button>
                            <input ref={fileInputRef} type="file" hidden accept=".json" onChange={handleFileUpload} />
                        </div>
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your JSON here..."
                        spellCheck="false"
                        style={{
                            flex: 1,
                            width: '100%',
                            padding: '16px',
                            resize: 'none',
                            border: 'none',
                            outline: 'none',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            background: 'transparent',
                            color: isDarkMode ? '#e2e8f0' : '#334155'
                        }}
                    />
                </div>

                {/* Output Panel */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: isDarkMode ? '#0f172a' : '#f8fafc'
                }}>
                    <div style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(241, 245, 249, 0.5)'
                    }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Monitor size={14} /> OUTPUT
                        </span>
                        {error && (
                            <span style={{ fontSize: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <AlertCircle size={12} /> Invalid JSON
                            </span>
                        )}
                    </div>

                    <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
                        {output ? (
                            <pre style={{
                                margin: 0,
                                fontFamily: 'monospace',
                                fontSize: '14px',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-all',
                                color: isDarkMode ? '#a5b4fc' : '#2563eb'
                            }}>
                                {output}
                            </pre>
                        ) : (
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-muted)',
                                opacity: 0.5
                            }}>
                                <Zap size={48} />
                                <p style={{ marginTop: '16px', fontSize: '0.9rem' }}>Result will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Stats */}
            <div style={{
                background: isDarkMode ? '#1e293b' : 'white',
                borderTop: '1px solid var(--border)',
                padding: '8px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: 'var(--text-muted)'
            }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Hash size={12} /> {stats.lines} lines</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FileJson size={12} /> {formatSize(stats.size)}</span>
                </div>
                <div>
                    {input.length > 0 && !error && <span style={{ color: 'var(--success)' }}>Valid JSON</span>}
                </div>
            </div>

            <style>{`
                .base64-redesign .icon-btn {
                    padding: 8px;
                    border-radius: 8px;
                    color: var(--text-muted);
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .base64-redesign .icon-btn:hover {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                }
                .dark-mode-tool {
                    --bg-card: #1e293b;
                    --text-main: #f8fafc;
                    --text-muted: #94a3b8;
                    --border: #334155;
                    color: white;
                }
                @media (max-width: 768px) {
                    .base64-redesign > div:nth-child(2) {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default JsonFormatter;