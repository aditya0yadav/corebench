import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, ShieldCheck, Settings } from 'lucide-react';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [strength, setStrength] = useState('Weak');

    const generatePassword = () => {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
        };

        let chars = '';
        if (options.uppercase) chars += charset.uppercase;
        if (options.lowercase) chars += charset.lowercase;
        if (options.numbers) chars += charset.numbers;
        if (options.symbols) chars += charset.symbols;

        if (chars.length === 0) {
            setPassword('');
            setStrength('Empty');
            return;
        }

        let generated = '';
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            generated += chars[randomValues[i] % chars.length];
        }

        setPassword(generated);
        calculateStrength(generated);
    };

    const calculateStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 12) score++;
        if (pwd.length >= 16) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        if (score < 3) setStrength('Weak');
        else if (score < 5) setStrength('Medium');
        else setStrength('Strong');
    };

    useEffect(() => {
        generatePassword();
    }, [length, options]);

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
    };

    const toggleOption = (key) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const strengthColor = {
        'Weak': '#ef4444',
        'Medium': '#f59e0b',
        'Strong': '#10b981',
        'Empty': '#cbd5e1'
    };

    return (
        <div className="tool-workspace" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {/* Display */}
            <div className="card" style={{ padding: '32px', textAlign: 'center', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '2rem', fontFamily: 'monospace', fontWeight: '700', wordBreak: 'break-all', color: 'var(--text-main)' }}>
                    {password || 'Select options'}
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={generatePassword} className="icon-btn" title="Refresh">
                        <RefreshCw size={24} />
                    </button>
                    <button onClick={copyPassword} className="icon-btn" title="Copy">
                        <Copy size={24} />
                    </button>
                </div>
                <div style={{ padding: '4px 12px', borderRadius: '12px', background: `${strengthColor[strength]}20`, color: strengthColor[strength], fontWeight: '600', fontSize: '0.9rem' }}>
                    {strength}
                </div>
            </div>

            {/* Controls */}
            <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '16px' }}>
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <label style={{ fontWeight: '600' }}>Password Length</label>
                        <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{length}</span>
                    </div>
                    <input
                        type="range"
                        min="8"
                        max="64"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {Object.entries(options).map(([key, value]) => (
                        <div key={key} onClick={() => toggleOption(key)} style={{
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
                            background: value ? 'var(--bg-main)' : 'transparent',
                            border: value ? '1px solid var(--primary)' : '1px solid var(--border)',
                            borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
                        }}>
                            <div style={{
                                width: '20px', height: '20px', borderRadius: '4px',
                                border: value ? 'none' : '2px solid #cbd5e1',
                                background: value ? 'var(--primary)' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {value && <ShieldCheck size={14} color="white" />}
                            </div>
                            <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>Include {key}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .icon-btn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: var(--text-muted);
                    padding: 8px;
                    border-radius: 8px;
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

export default PasswordGenerator;
