import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { ComingSoonContent } from '@/components/coming-soon-content'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'AI Gateway',
  description:
    'Le meilleur modèle autorisé pour chaque tâche, sans dépendre d’un seul fournisseur. La page AI Gateway arrive prochainement.',
  alternates: { canonical: '/ai-gateway' },
}

export default function AiGatewayPage() {
  return (
    <>
      <Navbar />
      <ComingSoonContent
        title={{ fr: 'AI Gateway', en: 'AI Gateway' }}
        description={{
          fr: 'Le meilleur modèle autorisé pour chaque tâche, sans dépendre d’un seul fournisseur.',
          en: 'The best authorized model for each task, without depending on a single provider.',
        }}
      />
      <SiteFooter />
    </>
  )
}
