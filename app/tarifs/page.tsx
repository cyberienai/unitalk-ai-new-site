import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { TarifsContent } from '@/components/tarifs-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Tarif · Unitalk',
  description:
    'Un prix clair, sans surprise. Solo pour vous lancer, Team pour équiper vos collaborateurs, Business pour votre infrastructure IA privée. Gratuit pour démarrer, sans carte bancaire.',
}

export default function TarifsPage() {
  return (
    <>
      <Navbar />
      <TarifsContent />
      <SiteFooter />
    </>
  )
}
