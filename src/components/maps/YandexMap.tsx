import React from 'react';

interface Props {
    latitude?: number;
    longitude?: number;
}

const YandexMap: React.FC<Props> = ({ latitude, longitude }) => {
    // Default coordinates if none provided
    const lat = latitude || 43.337706;
    const lon = longitude || 45.690885;
    
    const iframeSrc = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&mode=map&ol=geo&z=16.78&pt=${lon},${lat},pm2grm`;
    
    const mapIframeStyle: React.CSSProperties = {
        position: 'relative',
    };

    return (
        <iframe
            src={iframeSrc}
            width="100%"
            height="100%"
            style={mapIframeStyle}
        ></iframe>
    );
};

export default YandexMap;