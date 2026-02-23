import React, { useState, useEffect } from 'react';
import { Copy, Key } from 'lucide-react';

const HmacGenerator = () => {
    const [input, setInput] = useState('');
    const [secret, setSecret] = useState('my-secret-key');
    const [hashes, setHashes] = useState({
        'SHA-1': '',
        'SHA-256': '',
        'SHA-512': ''
    });

    const generateHmac = async () => {
        if (!input || !secret) {
            setHashes({ 'SHA-1': '', 'SHA-256': '', 'SHA-512': '' });
            return;
        }

        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const msgData = encoder.encode(input);

        const generate = async (algo) => {
            try {
                const key = await crypto.subtle.importKey(
                    'raw', keyData, { name: 'HMAC', hash: algo }, false, ['sign']
                );
                const signature = await crypto.subtle.sign('HMAC', key, msgData);
                return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
            } catch (e) {
                return 'Error';
            }
        };

        const sha1 = await generate('SHA-1');
        const sha256 = await generate('SHA-256');
        const sha512 = await generate('SHA-512');

        setHashes({ 'SHA-1': sha1, 'SHA-256': sha256, 'SHA-512': sha512 });
    };

    useEffect(() => {
        generateHmac();
    }, [input, secret]);

    const copyHash = (hash) => {
        navigator.clipboard.writeText(hash);
    };

    return (
        <div className="tool-workspace" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '0', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div className="tool-header" style={{ padding: '12px 16px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', fontWeight: '600', color: 'var(--text-muted)' }}>
                    Input Message
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter message..."
                    style={{
                        width: '100%', minHeight: '100px', padding: '16px', border: 'none', resize: 'vertical',
                        fontFamily: 'monospace', fontSize: '14px', outline: 'none'
                    }}
                />
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div className="tool-header" style={{ padding: '12px 16px', background: '#ecfdf5', borderBottom: '1px solid #d1fae5', fontWeight: '600', color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Key size={16} /> Secret Key
                </div>
                <input
                    type="text"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="Enter secret key..."
                    style={{
                        width: '100%', padding: '16px', border: 'none',
                        fontFamily: 'monospace', fontSize: '14px', outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
                {Object.entries(hashes).map(([algo, hash]) => (
                    <div key={algo} className="card" style={{ padding: '0', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <div className="tool-header" style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>HMAC-{algo}</span>
                            <button onClick={() => copyHash(hash)} className="icon-btn" title="Copy">
                                <Copy size={16} />
                            </button>
                        </div>
                        <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '13px', color: 'var(--text-main)', wordBreak: 'break-all', background: 'white' }}>
                            {hash || <span style={{ color: '#cbd5e1' }}>Waiting for input...</span>}
                        </div>
                    </div>
                ))}
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

export default HmacGenerator;
