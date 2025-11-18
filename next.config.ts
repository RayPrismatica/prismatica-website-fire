import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/consulting',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/solutions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
