import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { PartnersContent } from '@/components/partners-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Partenaires · Unitalk',
  description:
    "Rejoignez l'écosystème Unitalk. Développeurs, hébergeurs, intégrateurs, formateurs et partenaires technologiques construisent ensemble les entreprises IA-native de demain.",
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
