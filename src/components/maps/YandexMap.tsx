import React from 'react';

const YandexMap: React.FC = () => {
    const iframeSrc =
        'https://yandex.ru/map-widget/v1/?ll=45.690885%2C43.337706&mode=map&ol=geo&z=16.78&pt=45.690885,43.337706,pm2grm';
    const mapWrapperStyle: React.CSSProperties = {
        position: 'relative',
        overflow: 'hidden',
    };

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