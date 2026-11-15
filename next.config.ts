import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // 404 unique pour toutes les URL inconnues (le root layout est sous [lang]).
    globalNotFound: true,
  },
  images: {
    // Miniatures YouTube utilisées comme couvertures de projets.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  async redirects() {
    // "/" → langue par défaut (defaultLocale dans lib/i18n.ts).
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
};

export default nextConfig;
