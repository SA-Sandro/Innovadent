/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.extensions.push(".ts", ".tsx");
  },
};

export default nextConfig;
