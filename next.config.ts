import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: "/ticket",
  assetPrefix: "/ticket",
  trailingSlash: true,
};

export default nextConfig;
