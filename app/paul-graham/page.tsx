import { PaulGrahamNavbar } from '@/components/paul-graham/paul-graham-navbar'
import { PaulGrahamHero } from '@/components/paul-graham/paul-graham-hero'
import { PaulGrahamFooter } from '@/components/paul-graham/paul-graham-footer'

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Votre savoir-faire devrait travailler sans vous',
  description: 'Transformez votre savoir-faire en mission contrôlée pour un Collaborateur IA.',
  url: 'https://unitalk.ai/paul-graham',
  inLanguage: 'fr-FR',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Unitalk',
    url: 'https://unitalk.ai',
  },
}

export default function PaulGrahamPage() {
  return (
    <div className="graham-root">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <PaulGrahamNavbar />
      <PaulGrahamHero />
      <PaulGrahamFooter />
    </div>
  )
}
