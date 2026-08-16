import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { PartnersContent } from '@/components/partners-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Devenir partenaire Unitalk · Créer, recommander ou déployer',
  description:
    "Partez d'une mission réelle, créez des Collaborateurs IA puis choisissez votre modèle : Co-créateur, Affilié ou Partenaire de déploiement Unitalk.",
  alternates: { canonical: '/partenaires' },
}

export default function PartenairesPage() {
  return (
    <>
      <Navbar />
      <PartnersContent />
      <SiteFooter />
    </>
  )
}
