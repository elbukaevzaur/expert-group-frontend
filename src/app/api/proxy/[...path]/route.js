import { NextResponse } from 'next/server';

export async function GET(request) { return handleRequest(request); }
export async function POST(request) { return handleRequest(request); }
export async function PUT(request) { return handleRequest(request); }
export async function DELETE(request) { return handleRequest(request); }
export async function OPTIONS(request) { 
    // Handle CORS preflight requests
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
            'Access-Control-Max-Age': '86400',
        },
    });
}

async function handleRequest(request) {
    const { pathname, searchParams } = new URL(request.url);
    const pathSegments = pathname.split('/').slice(3);
    const targetPath = pathSegments.join('/');

    const apiKey = process.env.API_PROEG_KEY;
    const externalApiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiKey) {
        console.error('Server Error: API key is missing on the server.');
        return NextResponse.json(
            { error: 'API key is missing on the server.' },
            { status: 500 }
        );
    }

    if (!externalApiBaseUrl) {
        console.error('Server Error: NEXT_PUBLIC_API_URL is missing on the server.');
        return NextResponse.json(
            { error: 'API URL is missing on the server.' },
            { status: 500 }
        );
    }

    try {
        let fullExternalUrl = `${externalApiBaseUrl}/${targetPath}`;

        if (searchParams.toString()) {
            fullExternalUrl += `?${searchParams.toString()}`;
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('X-API-Key', apiKey);
        requestHeaders.set('Host', new URL(externalApiBaseUrl).host);
        requestHeaders.set('Referer', externalApiBaseUrl);

        requestHeaders.delete('cookie');
        requestHeaders.delete('host');
        requestHeaders.delete('accept-encoding');
        requestHeaders.delete('connection');

        let requestBody = undefined;
        const contentLength = request.headers.get('content-length');
        const hasBody = contentLength && parseInt(contentLength, 10) > 0;
        const contentType = request.headers.get('content-type') || '';

        if (request.method !== 'GET' && request.method !== 'HEAD' && hasBody) {
            try {
                if (contentType.includes('application/json')) {
                    requestBody = await request.json();
                    requestBody = JSON.stringify(requestBody);
                } else if (contentType.includes('multipart/form-data')) {
                    requestBody = await request.formData();
                    requestHeaders.delete('content-type');
                    requestHeaders.delete('content-length');
                } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('text/plain')) {
                    requestBody = await request.text();
                }
            } catch (e) {
                console.warn(`Could not parse request body with Content-Type "${contentType}":`, e);
                requestBody = undefined;
            }
        }

        const response = await fetch(fullExternalUrl, {
            method: request.method,
            headers: requestHeaders,
            body: requestBody,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`External API error: ${response.status} - ${errorText}`);
            
            const responseHeaders = new Headers();
            const contentType = response.headers.get('content-type') || 'application/json';
            responseHeaders.set('Content-Type', contentType);
            responseHeaders.set('Access-Control-Allow-Origin', '*');

            let finalBody = errorText;
            // Если текст пустой, но статус 400, создаем тело ошибки вручную
            if (!errorText && response.status === 400) {
                finalBody = JSON.stringify({ message: "Неверный запрос или данные" });
            }

            return new NextResponse(finalBody, { 
                status: response.status,
                headers: responseHeaders
            });
        }

        if (response.status === 204 || response.status === 205) {
            // Возвращаем пустой ответ с оригинальным статусом и заголовками
            const responseHeaders = new Headers(response.headers);
            // Add CORS headers
            responseHeaders.set('Access-Control-Allow-Origin', '*');
            responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
            // Удалите заголовки, которые могут конфликтовать с пустым телом
            responseHeaders.delete('content-length');
            responseHeaders.delete('content-type');

            return new NextResponse(null, {
                status: response.status,
                headers: responseHeaders
            });
        }

        const responseContentType = response.headers.get('content-type') || '';
        const responseHeaders = new Headers(response.headers);

        // Add CORS headers
        responseHeaders.set('Access-Control-Allow-Origin', '*');
        responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
        
        responseHeaders.delete('transfer-encoding');
        responseHeaders.delete('connection');

        if (
            responseContentType.startsWith('video/') ||
            responseContentType.startsWith('image/') ||
            responseContentType.includes('octet-stream')
        ) {
            // Бинарные данные (видео, изображение, файл)
            return new NextResponse(response.body, {
                status: response.status,
                headers: responseHeaders,
            });
        }

// Попробуем безопасно определить JSON
        if (responseContentType.includes('application/json')) {
            const json = await response.json();
            return NextResponse.json(json, {
                status: response.status,
                headers: responseHeaders,
            });
        }

// Всё остальное считаем текстом
        const text = await response.text();
        return new NextResponse(text, {
            status: response.status,
            headers: responseHeaders,
        });

    } catch (error) {
        console.error('Proxy request failed:', error);
        return NextResponse.json(
            { error: 'Failed to proxy request to external API.' },
            { status: 500 }
        );
    }
}