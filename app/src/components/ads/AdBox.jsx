import React, { useEffect } from 'react';
import { adsConfig } from '../../config/adsConfig';

const AdBox = ({
    type = 'horizontal',
    label = 'Advertisement',
    marginTop = '24px',
    marginBottom = '24px',
    adClient = 'ca-pub-XXXXXXXXXXXXXXXX', // Placeholder ID
    adSlot = null // Slot ID (required for live ads)
}) => {
    // Global toggle to hide ads
    if (!adsConfig.SHOW_ADS) {
        return null;
    }
    const styles = {
        horizontal: { display: 'block', width: '100%', height: '90px' },
        square: { display: 'block', width: '300px', height: '250px' },
        rectangle: { display: 'block', width: '336px', height: '280px' },
        skyscraper: { display: 'block', width: '300px', height: '600px' },
        sidebar: { display: 'block', width: '100%', minHeight: '250px' },
        inline: { display: 'block', width: '100%', height: 'auto' }
    };

    useEffect(() => {
        try {
            if (adSlot) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense push error:", e);
        }
    }, [adSlot]);

    // Development/Placeholder View (when no Slot ID is provided)
    if (!adSlot) {
        return (
            <div
                className="ad-container"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: `${marginTop} auto ${marginBottom} auto`,
                    width: '100%',
                    maxWidth: styles[type]?.maxWidth || '100%'
                }}
            >
                {label && (
                    <span style={{ fontSize: '10px', color: '#cbd5e1', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.08em', fontWeight: '600' }}>
                        {label}
                    </span>
                )}
                <div style={{
                    ...styles[type],
                    background: 'rgba(241, 245, 249, 0.4)',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    fontSize: '11px',
                    fontWeight: '500'
                }}>
                    Google Ad: {type} (Slot Missing)
                </div>
            </div>
        );
    }

    // Live AdSense View
    return (
        <div style={{ margin: `${marginTop} auto ${marginBottom} auto`, textAlign: 'center', overflow: 'hidden' }}>
            {label && <div style={{ fontSize: '10px', color: '#cbd5e1', marginBottom: '4px', textTransform: 'uppercase' }}>{label}</div>}
            <ins className="adsbygoogle"
                style={styles[type] || { display: 'block' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format={type === 'horizontal' ? 'auto' : undefined}
                data-full-width-responsive="true">
            </ins>
        </div>
    );
};

export default AdBox;
