import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aikeruiclean.com",
      },
    ],
  },
};

export default nextConfig;
