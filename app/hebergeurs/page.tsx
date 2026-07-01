import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { HebergeursContent } from '@/components/hebergeurs-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Hébergeurs souverains · Unitalk',
  description:
    'Vos données hébergées exclusivement chez des fournisseurs cloud souverains européens : OVHcloud, Scaleway, IONOS, Infomaniak et plus. Sous protection du droit européen, jamais soumises au Cloud Act.',
}

export default function HebergeursPage() {
  return (
    <>
      <Navbar />
      <HebergeursContent />
      <SiteFooter />
    </>
  )
}
