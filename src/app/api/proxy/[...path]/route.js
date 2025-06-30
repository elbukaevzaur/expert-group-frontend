// app/api/proxy/[...path]/route.js

// Импортируем Next.js Response (аналог res.json() / res.send())
import { NextResponse } from 'next/server';

export async function GET(request) { return handleRequest(request); }
export async function POST(request) { return handleRequest(request); }
export async function PUT(request) { return handleRequest(request); }
export async function DELETE(request) { return handleRequest(request); }
export async function OPTIONS(request) { return handleRequest(request); }
// ... добавьте другие методы, если ваш API их использует (PATCH и т.д.)

async function handleRequest(request) {
    const { pathname, searchParams } = new URL(request.url);
    // Получаем сегменты пути после /api/proxy
    // Например, для /api/proxy/basket/order/items/save, pathSegments будет ['basket', 'order', 'items', 'save']
    const pathSegments = pathname.split('/').slice(3); // Удаляем 'api', 'proxy' и пустой первый элемент
    const targetPath = pathSegments.join('/'); // Собираем обратно: 'basket/order/items/save'

    // Ваш секретный ключ API. Убедитесь, что он НЕ НАЧИНАЕТСЯ с NEXT_PUBLIC_
    const apiKey = process.env.API_PROEG_KEY;

    // Базовый URL вашего реального (внешнего) API
    const externalApiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiKey) {
        console.error('Server Error: API_PROEG_KEY is not set in environment variables.');
        return NextResponse.json(
            { error: 'API key is missing on the server.' },
            { status: 500 }
        );
    }

    try {
        let fullExternalUrl = `${externalApiBaseUrl}/${targetPath}`;

        // Добавляем параметры запроса (query parameters)
        if (searchParams.toString()) {
            fullExternalUrl += `?${searchParams.toString()}`;
        }

        // Подготовка заголовков для запроса к внешнему API
        const requestHeaders = new Headers(request.headers); // Копируем заголовки из оригинального запроса клиента
        requestHeaders.set('X-API-Key', apiKey); // <<< Добавляем ваш секретный API-ключ здесь!
        requestHeaders.set('Host', new URL(externalApiBaseUrl).host); // Устанавливаем корректный Host
        requestHeaders.set('Referer', externalApiBaseUrl); // Может быть полезно для логирования

        // Удаляем заголовки, которые не должны быть переданы на внешний API
        requestHeaders.delete('cookie'); // Не передавайте куки вашего Next.js приложения
        requestHeaders.delete('host'); // Host будет установлен выше
        requestHeaders.delete('accept-encoding'); // Чтобы избежать проблем с компрессией
        requestHeaders.delete('connection'); // Nginx управляет этим
        requestHeaders.delete('content-length'); // Fetch API сам установит для исходящего запроса


        // Получаем тело запроса, если оно есть
        let requestBody = undefined;
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            // req.json() или req.text() зависят от Content-Type
            // Для большинства API это будет JSON
            try {
                requestBody = await request.json();
                // Важно: перевести обратно в строку для fetch body
                requestBody = JSON.stringify(requestBody);
            } catch (e) {
                // Если не JSON, возможно, это текст или другая форма
                console.warn('Could not parse request body as JSON:', e);
                requestBody = await request.text();
            }
        }

        // Выполняем запрос к внешнему API
        const response = await fetch(fullExternalUrl, {
            method: request.method, // Используем тот же HTTP-метод
            headers: requestHeaders,
            body: requestBody,
            // cache: 'no-store' - если не хотите кэшировать запросы на сервере Next.js
        });

        // Если ответ от внешнего API не OK, пробрасываем его статус и текст обратно клиенту
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`External API error: ${response.status} - ${errorText}`);
            return new NextResponse(errorText, { status: response.status });
        }

        // Копируем заголовки ответа от внешнего API обратно клиенту
        const responseHeaders = new Headers(response.headers);
        // Удаляем специфические заголовки, которые могут быть добавлены Nginx или не нужны на клиенте
        responseHeaders.delete('access-control-allow-origin'); // Nginx добавит CORS
        responseHeaders.delete('transfer-encoding');
        responseHeaders.delete('connection');

        // Отправляем данные ответа обратно клиенту
        // .json() или .text() в зависимости от Content-Type ответа
        const responseContentType = response.headers.get('content-type') || '';
        let responseBody;
        if (responseContentType.includes('application/json')) {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }

        return NextResponse.json(responseBody, {
            status: response.status,
            headers: responseHeaders, // Передаем скопированные заголовки
        });

    } catch (error) {
        console.error('Proxy request failed:', error);
        return NextResponse.json(
            { error: 'Failed to proxy request to external API.' },
            { status: 500 }
        );
    }
}