import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ExpertisesPublierContent } from '@/components/expertises-publier-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Proposer une Expertise · Unitalk',
  description:
    'Consultants, agences, formateurs et intégrateurs : proposez une Expertise sur Unitalk et intervenez sur les Missions qui correspondent à votre savoir-faire.',
  alternates: { canonical: '/expertises/publier' },
}

export default function ExpertisesPublierPage() {
  return (
    <>
      <Navbar />
      <ExpertisesPublierContent />
      <SiteFooter />
    </>
  )
}
