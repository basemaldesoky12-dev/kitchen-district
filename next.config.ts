import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // CSP must whitelist everything the site legitimately loads: Next's inline
  // bootstrap scripts, the Material-Symbols CSS from Google Fonts, Unsplash
  // imagery, and the Vercel Analytics script (+ eval/websockets in dev only).
  async headers() {
    const dev = process.env.NODE_ENV === "development";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${dev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.unsplash.com",
      `connect-src 'self'${dev ? " ws:" : ""}`,
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  // The site must exist on exactly one host or Google splits ranking signals
  // across duplicates. Everything funnels into the apex domain.
  async redirects() {
    const duplicateHosts = ["www.kitchendistricts.com", "kitchen-district.vercel.app"];
    return duplicateHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://kitchendistricts.com/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
