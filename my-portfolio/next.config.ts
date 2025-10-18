/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // This tells Next.js to export static HTML
  images: { unoptimized: true }, // Required for static exports
};

export default nextConfig;
