import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ComingSoonContent } from '@/components/coming-soon-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Les nouveautés et améliorations d’Unitalk, mission après mission. Le changelog arrive prochainement.',
}

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <ComingSoonContent
        title={{ fr: 'Changelog', en: 'Changelog' }}
        description={{
          fr: 'Les nouveautés et améliorations d’Unitalk, mission après mission.',
          en: 'Unitalk updates and improvements, mission after mission.',
        }}
      />
      <SiteFooter />
    </>
  )
}
