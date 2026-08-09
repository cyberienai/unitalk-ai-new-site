import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ComingSoonContent } from '@/components/coming-soon-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Les idées et les méthodes qui redéfinissent le travail avec des Collaborateurs IA. Le blog Unitalk arrive prochainement.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <ComingSoonContent
        title={{ fr: 'Le blog Unitalk', en: 'The Unitalk blog' }}
        description={{
          fr: 'Les idées et les méthodes qui redéfinissent le travail avec des Collaborateurs IA.',
          en: 'The ideas and methods redefining how work gets done with AI Collaborators.',
        }}
      />
      <SiteFooter />
    </>
  )
}
