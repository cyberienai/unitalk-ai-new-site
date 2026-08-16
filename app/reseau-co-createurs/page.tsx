import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CocreatorNetworkContent } from '@/components/cocreator-network-content'

export const metadata: Metadata = {
  title: 'Réseau des Co-créateurs IA Unitalk',
  description: 'Rejoignez le programme pilote des Co-créateurs Unitalk : formation, méthode, agrément qualité et déploiement de Collaborateurs IA à partir de missions réelles.',
  alternates: { canonical: '/reseau-co-createurs' },
  openGraph: {
    title: 'Réseau des Co-créateurs IA Unitalk',
    description: 'Une activité indépendante fondée sur des missions réelles, des créations testées et un agrément progressif.',
    url: 'https://unitalk.ai/reseau-co-createurs',
    type: 'website',
  },
}

const networkJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOccupationalProgram',
  name: 'Programme pilote du réseau des Co-créateurs IA Unitalk',
  description: 'Parcours progressif pour apprendre à créer, tester et déployer des Collaborateurs IA à partir de missions réelles.',
  provider: { '@type': 'Organization', name: 'Unitalk', url: 'https://unitalk.ai' },
  url: 'https://unitalk.ai/reseau-co-createurs',
  occupationalCategory: 'Co-créateur IA',
}

export default function CocreatorNetworkPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(networkJsonLd) }} /><Navbar/><CocreatorNetworkContent/><SiteFooter/></>
}
