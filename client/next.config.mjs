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

};

export default nextConfig;
