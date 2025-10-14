/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // ✅ Tell Next.js to treat /src as the root
  srcDir: 'src',
};

export default nextConfig;
