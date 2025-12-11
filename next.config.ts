import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

  turbopack: {
    // корень монорепы: /Users/.../Project/BeautyBook
    root: path.join(__dirname, ".."),
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
