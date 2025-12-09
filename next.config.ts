import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_PROXY_TARGET}/:path*`,
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      // все *.svg обрабатываем через @svgr/webpack
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
