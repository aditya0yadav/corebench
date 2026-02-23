import React, { useState, useEffect } from 'react';
import { Copy, Trash2, Shield, AlertTriangle } from 'lucide-react';

const JwtDecoder = () => {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState(null);
    const [payload, setPayload] = useState(null);
    const [error, setError] = useState(null);
    const [secret, setSecret] = useState('');
    const [verificationStatus, setVerificationStatus] = useState(null); // 'success', 'error', null

    useEffect(() => {
        if (!token) {
            setHeader(null);
            setPayload(null);
            setError(null);
            setVerificationStatus(null);
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT structure (must have 3 parts)');
            }

            const decode = (str) => {
                try {
                    return JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
                } catch (e) {
                    throw new Error('Invalid Base64 encoding');
                }
            };

            const headerObj = decode(parts[0]);
            setHeader(headerObj);
            setPayload(decode(parts[1]));
            setError(null);

            // Auto-verify if secret is present
            if (secret && headerObj && headerObj.alg === 'HS256') {
                verify(parts[0], parts[1], parts[2], secret);
            } else {
                setVerificationStatus(null);
            }

        } catch (err) {
            setError(err.message);
            setHeader(null);
            setPayload(null);
            setVerificationStatus(null);
        }
    }, [token, secret]);

    const verify = async (head, body, sign, sec) => {
        try {
            const encoder = new TextEncoder();
            const keyData = encoder.encode(sec);
            const msgData = encoder.encode(`${head}.${body}`);

            const key = await crypto.subtle.importKey(
                'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
            );
            const signature = await crypto.subtle.sign('HMAC', key, msgData);

            // Convert to Base64Url
            const base64String = btoa(String.fromCharCode(...new Uint8Array(signature)));
            const base64Url = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

            if (base64Url === sign) {
                setVerificationStatus('success');
            } else {
                setVerificationStatus('error');
            }
        } catch (e) {
            setVerificationStatus('error');
        }
    };

    return (
        <div className="tool-workspace" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {/* Input Section */}
            <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px' }}>
                <div className="tool-header" style={{ padding: '12px 24px', background: 'var(--bg-main)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Encoded Token</span>
                    <button onClick={() => { setToken(''); setSecret(''); }} className="icon-btn" title="Clear">
                        <Trash2 size={16} />
                    </button>
                </div>
                <textarea
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste your JWT here (header.payload.signature)..."
                    style={{
                        width: '100%',
                        height: '120px',
                        padding: '16px 24px',
                        border: 'none',
                        resize: 'vertical',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        outline: 'none',
                        background: 'white'
                    }}
                />
            </div>

            {/* Error Message */}
            {error && token && (
                <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <AlertTriangle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {/* Decoded Output */}
            {(header || payload) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        {/* Header */}
                        <div className="card" style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid var(--border)', fontWeight: '600', color: '#64748b' }}>
                                Header
                            </div>
                            <pre style={{ margin: 0, padding: '16px', overflowX: 'auto', fontSize: '0.85rem', color: '#ef4444' }}>
                                {JSON.stringify(header, null, 2)}
                            </pre>
                        </div>

                        {/* Payload */}
                        <div className="card" style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid var(--border)', fontWeight: '600', color: '#64748b' }}>
                                Payload
                            </div>
                            <pre style={{ margin: 0, padding: '16px', overflowX: 'auto', fontSize: '0.85rem', color: '#a855f7' }}>
                                {JSON.stringify(payload, null, 2)}
                            </pre>
                        </div>
                    </div>

                    {/* Signature Verification */}
                    <div className="card" style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                        <div style={{ padding: '12px 16px', background: '#f0fdf4', borderBottom: '1px solid #dcfce7', fontWeight: '600', color: '#15803d', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Shield size={16} /> Verify Signature (HS256)
                        </div>
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input
                                type="text"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                placeholder="Enter secret key to verify signature..."
                                style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', outline: 'none', fontFamily: 'monospace' }}
                            />
                            {secret && (
                                <div style={{
                                    padding: '8px 12px', borderRadius: '6px',
                                    background: verificationStatus === 'success' ? '#dcfce7' : '#fee2e2',
                                    color: verificationStatus === 'success' ? '#166534' : '#991b1b',
                                    fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px'
                                }}>
                                    {verificationStatus === 'success' ? 'Signature Verified' : 'Invalid Signature'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .icon-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: var(--text-muted);
                    padding: 4px;
                    border-radius: 4px;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .icon-btn:hover {
                    background: var(--bg-hover);
                    color: var(--primary);
                }
            `}</style>
        </div>
    );
};

export default JwtDecoder;
