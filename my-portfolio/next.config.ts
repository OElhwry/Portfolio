import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  outputFileTracingRoot: path.resolve(__dirname),
  trailingSlash: true,
};
export default nextConfig;
