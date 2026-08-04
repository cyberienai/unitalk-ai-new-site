import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ExpertisesContent } from '@/components/expertises-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Accompagnement par un expert IA · Unitalk',
  description:
    'Un accompagnement humain, facultatif, pour vos missions les plus exigeantes : cadrage, intégration, configuration et supervision de votre Collaborateur IA.',
  alternates: { canonical: '/expertises' },
}

export default function ExpertisesPage() {
  return (
    <>
      <Navbar />
      <ExpertisesContent />
      <SiteFooter />
    </>
  )
}
