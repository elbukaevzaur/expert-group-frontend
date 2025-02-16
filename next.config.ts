import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/images/**',
            },
            {
                protocol: 'http',
                hostname: 'api.expertgroupholding.ru',
                port: '8080',
                pathname: '/images/**',
            },
        ]
    },
    output: 'standalone'
};

export default nextConfig;