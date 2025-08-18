import { NextResponse } from 'next/server';

export async function GET(request) { return handleRequest(request); }
export async function POST(request) { return handleRequest(request); }
export async function PUT(request) { return handleRequest(request); }
export async function DELETE(request) { return handleRequest(request); }
export async function OPTIONS(request) { return handleRequest(request); }

async function handleRequest(request) {
    const { pathname, searchParams } = new URL(request.url);
    const pathSegments = pathname.split('/').slice(3);
    const targetPath = pathSegments.join('/');

    const apiKey = process.env.API_PROEG_KEY;
    const externalApiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiKey) {
        console.error('Server Error: API_PROEG_KEY is missing on the server.');
        return NextResponse.json(
            { error: 'API key is missing on the server.' },
            { status: 500 }
        );
    }
    if (!externalApiBaseUrl) {
        console.error('Server Error: NEXT_PUBLIC_API_URL is missing.');
        return NextResponse.json(
            { error: 'External API base URL is missing.' },
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
                    requestBody = JSON.stringify(await request.json());
                } else if (contentType.includes('multipart/form-data')) {
                    requestBody = await request.formData();
                    requestHeaders.delete('content-type');
                    requestHeaders.delete('content-length');
                } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('text/plain')) {
                    requestBody = await request.text();
                } else {
                    requestBody = request.body;
                }
            } catch (e) {
                console.warn(`Could not parse request body for Content-Type "${contentType}":`, e);
                requestBody = undefined;
            }
        }

        const response = await fetch(fullExternalUrl, {
            method: request.method,
            headers: requestHeaders,
            body: requestBody,
            duplex: request.body ? 'half' : undefined,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`External API error: ${response.status} - ${errorText}`);
            return new NextResponse(errorText, { status: response.status, headers: response.headers });
        }

        const responseHeaders = new Headers(response.headers);
        responseHeaders.delete('access-control-allow-origin');
        responseHeaders.delete('transfer-encoding');
        responseHeaders.delete('connection');

        const responseContentType = response.headers.get('content-type') || 'application/octet-stream';

        if (responseContentType.includes('image/') || responseContentType.includes('video/') || responseContentType.includes('audio/') || responseContentType.includes('application/pdf')) {
            return new NextResponse(response.body, {
                status: response.status,
                headers: responseHeaders,
            });
        } else if (responseContentType.includes('application/json')) {
            const jsonResponse = await response.json();
            return NextResponse.json(jsonResponse, {
                status: response.status,
                headers: responseHeaders,
            });
        } else {
            const textResponse = await response.text();
            return new NextResponse(textResponse, {
                status: response.status,
                headers: responseHeaders,
            });
        }

    } catch (error) {
        console.error('Proxy request failed:', error);
        return NextResponse.json(
            { error: 'Failed to proxy request to external API.' },
            { status: 500 }
        );
    }
}