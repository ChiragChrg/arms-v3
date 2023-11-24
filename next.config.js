/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
})

const nextConfig = withPWA({
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: 'https',
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: 'https',
                hostname: "gravatar.com",
            },
        ],
    }
})

module.exports = nextConfig
