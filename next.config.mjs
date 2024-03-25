/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    MONGODB_URI: process.env.DATABASE,
  },
};

export default nextConfig;
