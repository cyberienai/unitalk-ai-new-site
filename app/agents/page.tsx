import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { AgentsGallery } from '@/components/agents-gallery'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Trouver des agents · Unitalk',
  description:
    "Découvrez les profils d'agents prêts à l'emploi : commercial, support, assistant de direction, marketing, comptabilité, RH… Activez celui dont vous avez besoin ou laissez Alma en créer un sur mesure.",
}

export default function AgentsPage() {
  return (
    <>
      <Navbar />
      <AgentsGallery />
      <SiteFooter />
    </>
  )
}
