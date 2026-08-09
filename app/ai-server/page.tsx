import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ComingSoonContent } from '@/components/coming-soon-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'AI server',
  description:
    'L’infrastructure qui héberge vos Collaborateurs IA et garde votre savoir-faire dans votre entreprise. La page AI server arrive prochainement.',
}

export default function AiServerPage() {
  return (
    <>
      <Navbar />
      <ComingSoonContent
        title={{ fr: 'AI server', en: 'AI server' }}
        description={{
          fr: 'L’infrastructure qui héberge vos Collaborateurs IA et garde votre savoir-faire dans votre entreprise.',
          en: 'The infrastructure that hosts your AI Collaborators and keeps your know-how inside your company.',
        }}
      />
      <SiteFooter />
    </>
  )
}
