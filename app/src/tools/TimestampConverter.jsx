import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, Calendar } from 'lucide-react';

const TimestampConverter = () => {
    const [unix, setUnix] = useState(Math.floor(Date.now() / 1000));
    const [human, setHuman] = useState(new Date().toISOString());
    const [mode, setMode] = useState('unix-to-human'); // or 'human-to-unix'

    useEffect(() => {
        // Auto-update human when unix changes, if typing unix
        if (mode === 'unix-to-human') {
            try {
                const date = new Date(unix * 1000);
                if (!isNaN(date.getTime())) {
                    setHuman(date.toISOString());
                }
            } catch (e) { }
        }
    }, [unix, mode]);

    const handleHumanChange = (val) => {
        setHuman(val);
        setMode('human-to-unix');
        try {
            const date = new Date(val);
            if (!isNaN(date.getTime())) {
                setUnix(Math.floor(date.getTime() / 1000));
            }
        } catch (e) { }
    };

    const handleUnixChange = (val) => {
        setUnix(val);
        setMode('unix-to-human');
    };

    const setNow = () => {
        const now = new Date();
        setUnix(Math.floor(now.getTime() / 1000));
        setHuman(now.toISOString());
    };

    return (
        <div className="tool-workspace" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {/* Unix Column */}
            <div className="card" style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: 'var(--primary)' }}>
                    <Clock size={24} />
                    <h3 style={{ margin: 0, fontWeight: '700' }}>Unix Timestamp</h3>
                </div>
                <input
                    type="number"
                    value={unix}
                    onChange={(e) => handleUnixChange(e.target.value)}
                    className="custom-input"
                    style={{
                        width: '100%', padding: '16px', fontSize: '1.5rem', fontWeight: 'bold',
                        fontFamily: 'monospace', textAlign: 'center', borderRadius: '12px',
                        border: '2px solid var(--border)'
                    }}
                />
                <p style={{ textAlign: 'center', marginTop: '12px', color: 'var(--text-muted)' }}>Seconds since Jan 01 1970</p>

                <button onClick={setNow} style={{ width: '100%', marginTop: '24px', padding: '12px', background: 'var(--bg-main)', border: 'none', borderRadius: '8px', fontWeight: '600', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <RefreshCw size={16} /> Reset to Now
                </button>
            </div>

            {/* Human Column */}
            <div className="card" style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', color: '#ec4899' }}>
                    <Calendar size={24} />
                    <h3 style={{ margin: 0, fontWeight: '700' }}>Human Date (ISO 8601)</h3>
                </div>
                <input
                    type="text"
                    value={human}
                    onChange={(e) => handleHumanChange(e.target.value)}
                    className="custom-input"
                    style={{
                        width: '100%', padding: '16px', fontSize: '1.1rem', fontWeight: '500',
                        fontFamily: 'monospace', textAlign: 'center', borderRadius: '12px',
                        border: '2px solid var(--border)'
                    }}
                />
                <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                        <span style={{ color: '#64748b' }}>Local:</span>
                        <span style={{ fontWeight: '600' }}>{new Date(unix * 1000).toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span style={{ color: '#64748b' }}>UTC:</span>
                        <span style={{ fontWeight: '600' }}>{new Date(unix * 1000).toUTCString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimestampConverter;
