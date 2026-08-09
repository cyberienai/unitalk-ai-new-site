import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { PartnersContent } from '@/components/partners-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Partenaires · Unitalk',
  description:
    "Le carrefour de l'écosystème Unitalk. Déployez des Collaborateurs IA chez vos clients, construisez sur notre infrastructure, connectez vos solutions, contribuez à Hermes ou transmettez votre expertise.",
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
