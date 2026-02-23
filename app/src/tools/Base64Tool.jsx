import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Copy, Trash2, Download, Check, AlertCircle, FileText,
    Upload, Settings2, Zap, ArrowLeftRight, Monitor,
    Moon, Sun, Hash, FileCode, Play, RotateCcw
} from 'lucide-react';

const Base64Tool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [autoProcess, setAutoProcess] = useState(true);
    const [charCount, setCharCount] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const fileInputRef = useRef(null);

    const processBase64 = useCallback((val, currentMode) => {
        if (!val.trim()) {
            setOutput('');
            setError(null);
            setPreviewImage(null);
            return;
        }

        try {
            if (currentMode === 'encode') {
                const bytes = new TextEncoder().encode(val);
                const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
                const result = btoa(binString);
                setOutput(result);
                // Check if result could be a data URI for preview (rare for encoding text but possible)
                setPreviewImage(null);
            } else {
                const binString = atob(val.trim().replace(/^data:image\/[a-z]+;base64,/, ''));
                const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
                const result = new TextDecoder().decode(bytes);
                setOutput(result);

                // Detection for image preview
                if (val.trim().startsWith('data:image/')) {
                    setPreviewImage(val.trim());
                } else if (/^[A-Za-z0-9+/=]+$/.test(val.trim()) && val.length > 100) {
                    // Attempt to treat as raw base64 image if it looks like one
                    setPreviewImage(`data:image/png;base64,${val.trim()}`);
                } else {
                    setPreviewImage(null);
                }
            }
            setError(null);
        } catch (err) {
            setError(currentMode === 'decode' ? 'Invalid Base64 string' : err.message);
            setOutput('');
            setPreviewImage(null);
        }
    }, []);

    useEffect(() => {
        setCharCount(input.length);
        if (autoProcess && input.trim()) {
            processBase64(input, mode);
        } else if (!input.trim()) {
            setOutput('');
            setError(null);
            setPreviewImage(null);
        }
    }, [input, mode, autoProcess, processBase64]);

    const handleCopy = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError(null);
        setPreviewImage(null);
    };

    const handleDownload = () => {
        if (!output) return;
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setInput(event.target.result);
        };
        reader.readAsText(file);
    };

    const toggleMode = () => {
        setMode(prev => prev === 'encode' ? 'decode' : 'encode');
        if (output) {
            setInput(output);
        }
    };

    return (
        <div className={`base64-redesign ${isDarkMode ? 'dark-mode-tool' : ''}`} style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
        }}>
            {/* 1️⃣ Top Navigation Bar (Sticky) */}
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: 'var(--bg-card)',
                borderBottom: '1px solid var(--border)',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backdropFilter: 'blur(8px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="logo-icon" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={20} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>Base64 Tool</h2>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fast & Secure Encoding / Decoding</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <button
                            onClick={() => setMode('encode')}
                            className={mode === 'encode' ? 'toggle-active' : 'toggle-inactive'}
                            style={{
                                padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', border: 'none',
                                background: mode === 'encode' ? 'var(--bg-card)' : 'transparent',
                                color: mode === 'encode' ? 'var(--primary)' : 'var(--text-muted)',
                                boxShadow: mode === 'encode' ? 'var(--shadow-sm)' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Encode
                        </button>
                        <button
                            onClick={() => setMode('decode')}
                            className={mode === 'decode' ? 'toggle-active' : 'toggle-inactive'}
                            style={{
                                padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', border: 'none',
                                background: mode === 'decode' ? 'var(--bg-card)' : 'transparent',
                                color: mode === 'decode' ? 'var(--primary)' : 'var(--text-muted)',
                                boxShadow: mode === 'decode' ? 'var(--shadow-sm)' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Decode
                        </button>
                    </div>
                    <button className="icon-btn" onClick={() => handleCopy(output)} title="Copy All"><Copy size={18} /></button>
                    <button className="icon-btn" onClick={handleClear} title="Clear"><RotateCcw size={18} /></button>
                    <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </nav>

            {/* 2️⃣ Main Workspace (Two-Panel Layout) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', minHeight: '500px' }}>
                {/* Left Panel - Input */}
                <div style={{ background: 'var(--bg-card)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            Input: {mode === 'encode' ? 'Plain Text' : 'Base64'}
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="icon-btn" onClick={() => fileInputRef.current.click()} title="Upload file">
                                <Upload size={14} />
                            </button>
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? 'Paste your text here...' : 'Paste Base64 string here...'}
                        style={{
                            flex: 1, border: 'none', resize: 'none', background: 'transparent',
                            fontSize: '14px', lineHeight: '1.6', fontFamily: 'var(--font-mono)', outline: 'none'
                        }}
                    />
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Hash size={12} /> {charCount} characters</span>
                        </div>
                        <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" /> Auto-detect type
                        </label>
                    </div>
                </div>

                {/* Right Panel - Output */}
                <div style={{ background: 'var(--bg-main)', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            Output: {mode === 'encode' ? 'Base64' : 'Plain Text'}
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="icon-btn" onClick={() => handleCopy(output)} title="Copy">
                                {copied ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                            </button>
                            <button className="icon-btn" onClick={handleDownload} title="Download">
                                <Download size={14} />
                            </button>
                        </div>
                    </div>

                    <div style={{ flex: 1, position: 'relative' }}>
                        {output ? (
                            <div style={{ height: '100%', overflowY: 'auto' }}>
                                <code style={{
                                    display: 'block', fontSize: '14px', lineHeight: '1.6',
                                    wordBreak: 'break-all', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)'
                                }}>
                                    {output}
                                </code>

                                {mode === 'decode' && previewImage && (
                                    <div style={{ marginTop: '24px', borderTop: '1px dashed var(--border)', paddingTop: '24px' }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>Image Preview:</span>
                                        <img src={previewImage} alt="Decoded preview" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', opacity: 0.5 }}>
                                <Zap size={48} style={{ marginBottom: '16px' }} />
                                <p style={{ fontSize: '0.9rem' }}>Output will appear here instantly</p>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="error-msg" style={{ marginTop: '12px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                        <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={autoProcess} onChange={() => setAutoProcess(!autoProcess)} /> Auto-convert
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <FileCode size={12} /> Plain Theme
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3️⃣ Action Buttons (Centered Between Panels - Absolute Position Overlay) */}
            <div style={{
                position: 'absolute',
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                zIndex: 5
            }}>
                <button
                    onClick={toggleMode}
                    style={{
                        width: '44px', height: '44px', borderRadius: '50%', background: 'white',
                        border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', boxShadow: 'var(--shadow-md)', cursor: 'pointer',
                        color: 'var(--primary)'
                    }}
                    title="Swap Input/Output"
                >
                    <ArrowLeftRight size={20} />
                </button>
            </div>

            {/* Bottom Controls for Manual Processing */}
            {!autoProcess && (
                <div style={{ padding: '20px', background: 'var(--bg-main)', display: 'flex', justifyContent: 'center', gap: '16px', borderTop: '1px solid var(--border)' }}>
                    <button className="btn btn-primary" onClick={() => processBase64(input, mode)} style={{ padding: '10px 32px' }}>
                        <Play size={16} /> {mode === 'encode' ? 'Encode Now' : 'Decode Now'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Base64Tool;
