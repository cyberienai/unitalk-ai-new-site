import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { HermesContent } from '@/components/hermes-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Infrastructure Hermes opérée pour l’entreprise',
  description: 'Une instance Hermes et un serveur par Collaborateur IA, avec hébergement, mises à jour, sauvegardes, sécurité, supervision et services Unitalk.',
  alternates: { canonical: '/hermes' },
  openGraph: { type: 'website', url: 'https://unitalk.ai/hermes', title: 'Hermes pour l’entreprise | Unitalk', description: 'Déployez Hermes avec une infrastructure opérée et les services nécessaires au travail en entreprise.' },
}

export default function HermesPage() {
  return <><Navbar/><HermesContent/><SiteFooter/></>
}
