import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PublishProfileContent } from '@/components/collaborateurs-ia/profils/publish-profile-content'

export const metadata: Metadata = {
  title: 'Publier un profil métier IA : vérification et visibilité',
  description: 'Préparez la vérification d’un profil métier IA déjà créé, choisissez sa visibilité et soumettez son périmètre, ses compétences, ses missions et ses droits.',
  alternates: { canonical: '/collaborateurs-ia/profils-metier/publier' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/collaborateurs-ia/profils-metier/publier',
    title: 'Publier un profil métier IA | Unitalk',
    description: 'Faites vérifier un profil métier existant avant sa publication privée, organisationnelle ou publique.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function PublierProfilMetierPage() {
  return <><Navbar/><PublishProfileContent/><SiteFooter/></>
}
