import type { Metadata } from 'next'
import { MarketplaceCategoryExplainer } from '@/components/marketplace-category-explainer'

const SITE_URL = 'https://unitalk.ai'

export const metadata: Metadata = {
  title: 'Profils métier IA : trouvez le bon Collaborateur IA',
  description:
    'Explorez 29 profils métier IA prêts à adapter : commercial, support client, direction, marketing, finance, RH et opérations. Alma vous aide à choisir.',
  keywords: [
    'profil métier IA',
    'Collaborateur IA par métier',
    'rôle IA en entreprise',
    'assistant de direction IA',
    'commercial IA',
    'support client IA',
  ],
  alternates: { canonical: '/collaborateurs-ia/profils-metier' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/collaborateurs-ia/profils-metier`,
    title: '29 profils métier pour Collaborateurs IA | Unitalk',
    description:
      'Trouvez une responsabilité prête à adapter et confiez une première mission au bon Collaborateur IA.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Profils métier pour Collaborateurs IA | Unitalk', description: 'Ajoutez de nouvelles responsabilités à votre Collaborateur IA sans recréer son identité.' },
}

export default function ProfilsMetierPage() {
  return <MarketplaceCategoryExplainer categoryId="metiers" eyebrow={{fr:'Marketplace · Métiers',en:'Marketplace · Professions'}} title={{fr:'Un métier définit la responsabilité. Le profil métier la rend installable.',en:'A profession defines the responsibility. A job profile makes it installable.'}} lead={{fr:'Chaque métier de la connaissance possède un profil de référence : périmètre, résultats attendus, méthodes, accès et décisions qui restent humaines.',en:'Each knowledge-work profession has a reference profile: scope, expected outcomes, methods, access and decisions that remain human.'}} principles={[{title:{fr:'Une responsabilité claire',en:'A clear responsibility'},body:{fr:'Le métier indique ce dont le Collaborateur IA répond dans l’entreprise.',en:'The profession states what the AI Collaborator is accountable for.'}},{title:{fr:'Un profil structuré',en:'A structured profile'},body:{fr:'Le profil métier décrit les missions, compétences, outils et limites associés.',en:'The job profile describes associated missions, skills, tools and limits.'}},{title:{fr:'Une base adaptable',en:'An adaptable foundation'},body:{fr:'L’entreprise adapte ensuite ce profil à son secteur, ses règles et son vocabulaire.',en:'The organization then adapts the profile to its sector, rules and vocabulary.'}}]} />
}
