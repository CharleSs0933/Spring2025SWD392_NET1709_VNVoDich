import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "4mlgzdj164.ufs.sh"],
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
