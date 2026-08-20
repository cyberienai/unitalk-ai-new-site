import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { HermesContent } from '@/components/hermes-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Hermes opéré pour vos Collaborateurs IA | Unitalk',
  description: 'Unitalk déploie, sécurise et maintient l’environnement Hermes de vos Collaborateurs IA, selon l’hébergement et le niveau de service choisis.',
  alternates: { canonical: '/hermes' },
  openGraph: { type: 'website', url: 'https://unitalk.ai/hermes', title: 'Hermes fonctionne. Votre équipe travaille. | Unitalk', description: 'Déployez Hermes avec une exploitation suivie et gardez le contrôle des données, accès, modèles et actions.' },
}

export default function HermesPage() {
  return <><Navbar/><HermesContent/><SiteFooter/></>
}
