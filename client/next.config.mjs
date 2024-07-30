/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: 'img.ophim.live',
            }
        ]
    },

};

export default nextConfig;
