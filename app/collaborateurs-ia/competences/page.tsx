import type { Metadata } from 'next'
import { MarketplaceCategoryExplainer } from '@/components/marketplace-category-explainer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Compétences réutilisables pour Collaborateurs IA',
  description: 'Explorez des méthodes structurées que vos Collaborateurs IA peuvent appliquer d’une mission à l’autre, selon leurs droits et vos règles de validation.',
  alternates: { canonical: '/collaborateurs-ia/competences' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/competences`,
    title: 'Compétences réutilisables pour Collaborateurs IA | Unitalk',
    description: 'Des savoir-faire structurés, testés et prêts à adapter aux méthodes de votre entreprise.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
}

export default function CompetencesPage() {
  return <MarketplaceCategoryExplainer categoryId="competences" eyebrow={{fr:'Marketplace · Compétences',en:'Marketplace · Skills'}} title={{fr:'Une compétence est une méthode que le Collaborateur IA peut appliquer.',en:'A skill is a method the AI Collaborator can apply.'}} lead={{fr:'Les compétences transforment le savoir-faire en méthodes testées, versionnées et réutilisables d’une mission à l’autre.',en:'Skills turn know-how into tested, versioned methods reusable across missions.'}} principles={[{title:{fr:'Précise',en:'Precise'},body:{fr:'Une compétence produit un résultat identifiable dans un contexte défini.',en:'A skill produces an identifiable result in a defined context.'}},{title:{fr:'Testée',en:'Tested'},body:{fr:'Ses étapes, limites et validations sont vérifiées sur des cas contrôlés.',en:'Its steps, limits and approvals are verified on controlled cases.'}},{title:{fr:'Versionnée',en:'Versioned'},body:{fr:'La méthode peut évoluer sans perdre son historique ni ses preuves.',en:'The method can evolve without losing its history or evidence.'}}]} />
}
