import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["lh3.googleusercontent.com",'gravatar.com']
  }
};

export default nextConfig;
