import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
  // experimental: {
  //   optimizeCss: true,
  // },
};

export default nextConfig;
