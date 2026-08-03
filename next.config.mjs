/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    // Old Mission slugs -> new SEO-friendly slugs (permanent 301).
    return [
      { source: '/missions/trouver-des-clients', destination: '/missions/trouver-de-nouveaux-clients', permanent: true },
      { source: '/missions/repondre-aux-clients', destination: '/missions/repondre-a-mes-clients', permanent: true },
      { source: '/missions/preparer-mes-reunions', destination: '/missions/preparer-et-suivre-mes-reunions', permanent: true },
    ]
  },
}

export default nextConfig
