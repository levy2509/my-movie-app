/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                hostname: 'img.ophim.live',
            }
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
