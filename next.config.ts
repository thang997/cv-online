import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cần khi import trực tiếp các module con của three (vd: three/examples/...)
  transpilePackages: ["three"],
};

export default nextConfig;
