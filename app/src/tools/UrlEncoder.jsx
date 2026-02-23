import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Trash2, Link as LinkIcon } from 'lucide-react';

const UrlEncoder = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

    const process = () => {
        try {
            if (mode === 'encode') {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (e) {
            setOutput('Error: Invalid input for decoding');
        }
    };

    // Auto-process on input/mode change
    React.useEffect(() => {
        process();
    }, [input, mode]);

    const copyOutput = () => {
        navigator.clipboard.writeText(output);
    };

    return (
        <div className="tool-workspace" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {/* Controls */}
            <div className="card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <button
                        onClick={() => setMode('encode')}
                        style={{
                            padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                            background: mode === 'encode' ? 'white' : 'transparent',
                            color: mode === 'encode' ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '600', boxShadow: mode === 'encode' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        style={{
                            padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                            background: mode === 'decode' ? 'white' : 'transparent',
                            color: mode === 'decode' ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '600', boxShadow: mode === 'decode' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        Decode
                    </button>
                </div>

                <div style={{ flex: 1 }}></div>

                <button onClick={() => { setInput(''); setOutput(''); }} className="icon-btn" title="Clear">
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Input/Output Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
                    <div className="tool-header" style={{ padding: '12px 16px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', fontWeight: '600', color: 'var(--text-muted)' }}>
                        Input
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL encoded text to decode...'}
                        style={{
                            flex: 1, minHeight: '200px', padding: '16px', border: 'none', resize: 'none',
                            fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', outline: 'none'
                        }}
                    />
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
                    <div className="tool-header" style={{ padding: '12px 16px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Output</span>
                        <button onClick={copyOutput} className="icon-btn" title="Copy">
                            <Copy size={16} />
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        style={{
                            flex: 1, minHeight: '200px', padding: '16px', border: 'none', resize: 'none',
                            fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', outline: 'none',
                            background: 'transparent', color: 'var(--text-main)'
                        }}
                    />
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
            `}</style>
        </div>
    );
};

export default UrlEncoder;
