import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lhiahzuspsaubdpkugvb.supabase.co",
      },
    ],
  },
};

export default nextConfig;
