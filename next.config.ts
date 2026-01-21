import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/imgproxy/:path*",
        destination: "http://imgproxy:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
