import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Force browsers to download the CV file instead of opening inline
        source: '/CV.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="CV.pdf"',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
