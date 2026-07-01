import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SegmentContent } from '@/components/segment-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Teams · Unitalk AI',
  description:
    'Donnez à chaque collaborateur son propre agent, avec une mémoire d’entreprise partagée. Vos process, vos données et votre savoir-faire circulent sans jamais se perdre.',
}

export default function TeamsPage() {
  return (
    <>
      <Navbar />
      <SegmentContent segment="teams" />
      <SiteFooter />
    </>
  )
}
