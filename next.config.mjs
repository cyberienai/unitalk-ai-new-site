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
      { source: '/missions/organiser-la-faq', destination: '/missions/construire-ma-faq', permanent: true },
      { source: '/missions/animer-mes-reseaux', destination: '/missions/animer-mes-reseaux-sociaux', permanent: true },
      { source: '/missions/preparer-mon-reporting', destination: '/missions/preparer-mon-reporting-financier', permanent: true },
      { source: '/missions/corriger-des-bugs', destination: '/missions/corriger-un-lot-de-bugs', permanent: true },

      // Retired the /collaborateurs-ia 5-tab sub-nav. The page is now one continuous
      // narration; former tabs redirect to the surviving surface (permanent 301).
      { source: '/collaborateurs-ia/comment-ca-fonctionne', destination: '/collaborateurs-ia#demonstration', permanent: true },
      { source: '/collaborateurs-ia/roles', destination: '/collaborateurs-ia/profils-metier', permanent: true },
      { source: '/collaborateurs-ia/comparatif', destination: '/collaborateurs-ia', permanent: true },

      // The Store was merged into the Collaborateurs IA hub. Preserve every old
      // link with permanent 301s: catalog roots, then detail pages by type + slug.
      { source: '/store', destination: '/collaborateurs-ia', permanent: true },
      { source: '/store/profils-metier', destination: '/collaborateurs-ia/profils-metier', permanent: true },
      { source: '/store/competences', destination: '/collaborateurs-ia/competences', permanent: true },
      { source: '/store/applications', destination: '/collaborateurs-ia/applications', permanent: true },
      { source: '/store/profils-metier/:slug', destination: '/collaborateurs-ia/profils-metier/:slug', permanent: true },
      { source: '/store/competences/:slug', destination: '/collaborateurs-ia/competences/:slug', permanent: true },
      { source: '/store/applications/:slug', destination: '/collaborateurs-ia/applications/:slug', permanent: true },
    ]
  },
}

export default nextConfig
