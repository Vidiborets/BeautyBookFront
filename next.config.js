/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const target =
      process.env.NEXT_PUBLIC_API_PROXY_TARGET || "http://localhost:3002";

    return [
      {
        source: "/api/:path*",
        destination: `${target}/:path*`,
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
