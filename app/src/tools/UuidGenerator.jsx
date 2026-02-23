import React, { useState } from 'react';
import { Copy, RefreshCw, Layers } from 'lucide-react';

const UuidGenerator = () => {
    const [count, setCount] = useState(5);
    const [version, setVersion] = useState('v4'); // 'v4' or 'v7'
    const [uuids, setUuids] = useState([]);

    const generateUuidV4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const generateUuidV7 = () => {
        const now = Date.now();
        const timestampHex = now.toString(16).padStart(12, '0');
        const randomHex = () => Math.floor(Math.random() * 16).toString(16);

        // 48 bits timestamp
        let uuid = timestampHex.substring(0, 8) + '-' + timestampHex.substring(8, 12);

        // 12 bits version (0111) + 4 bits random
        uuid += '-7' + randomHex() + randomHex() + randomHex();

        // 2 bits variant (10) + 62 bits random
        const variant = (8 | (Math.floor(Math.random() * 4))).toString(16);
        uuid += '-' + variant + randomHex() + randomHex() + randomHex();

        // 48 bits random (Node)
        let node = '';
        for (let i = 0; i < 12; i++) node += randomHex();
        uuid += '-' + node;

        return uuid;
    };

    const generate = () => {
        const genFunc = version === 'v7' ? generateUuidV7 : generateUuidV4;
        const newUuids = Array.from({ length: count }, () => genFunc());
        setUuids(newUuids);
    };

    // Initial generation
    React.useEffect(() => {
        generate();
    }, [count, version]);

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
    };

    return (
        <div className="tool-workspace">
            <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <label style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Version:</label>
                            <div style={{ display: 'flex', background: 'var(--bg-main)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                {['v4', 'v7'].map(ver => (
                                    <button
                                        key={ver}
                                        onClick={() => setVersion(ver)}
                                        style={{
                                            padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                            background: version === ver ? 'white' : 'transparent',
                                            color: version === ver ? 'var(--primary)' : 'var(--text-muted)',
                                            fontWeight: '600', boxShadow: version === ver ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {ver.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <label style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Quantity:</label>
                            {[1, 5, 10, 50].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setCount(num)}
                                    className={count === num ? 'btn-primary' : 'btn-secondary'}
                                    style={{
                                        padding: '6px 16px', borderRadius: '8px', cursor: 'pointer',
                                        border: count === num ? 'none' : '1px solid var(--border)',
                                        background: count === num ? 'var(--primary)' : 'white',
                                        color: count === num ? 'white' : 'var(--text-main)',
                                        fontWeight: '600'
                                    }}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={generate} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', fontWeight: '600' }}>
                            <RefreshCw size={18} /> Regenerate
                        </button>
                        <button onClick={copyAll} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: '600' }}>
                            <Copy size={18} /> Copy All
                        </button>
                    </div>
                </div>
            </div>

            <div className="card" style={{ border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                {uuids.map((id, index) => (
                    <div key={index} style={{
                        padding: '16px 24px', borderBottom: index === uuids.length - 1 ? 'none' : '1px solid #f1f5f9',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        fontFamily: 'monospace', fontSize: '1.1rem', color: '#334155'
                    }}>
                        {id}
                        <button
                            onClick={() => navigator.clipboard.writeText(id)}
                            title="Copy ID"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '4px' }}
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UuidGenerator;
