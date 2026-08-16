import type { Metadata } from 'next'
import { MarketplaceCategoryExplainer } from '@/components/marketplace-category-explainer'

export const metadata: Metadata = {
  title: 'Applications open source et métier pour Collaborateurs IA',
  description: 'Explorez les applications open source vérifiées et les modèles d’applications métier vibecodés pour vos Collaborateurs IA.',
  alternates: { canonical: '/collaborateurs-ia/applications' },
}

export default function ApplicationsPage() {
  return <MarketplaceCategoryExplainer categoryId="applications" eyebrow={{fr:'Marketplace · Applications',en:'Marketplace · Applications'}} title={{fr:'Les applications donnent au Collaborateur IA les moyens d’agir.',en:'Applications give the AI Collaborator the means to act.'}} lead={{fr:'Connecteurs, logiciels open source et applications métier restent séparés des droits : installer un outil ne lui accorde aucun accès automatiquement.',en:'Connectors, open-source software and business applications remain separate from permissions: installing a tool grants no automatic access.'}} principles={[{title:{fr:'Un outil identifié',en:'An identified tool'},body:{fr:'Chaque application indique son éditeur, ses usages et les données concernées.',en:'Each application states its publisher, uses and affected data.'}},{title:{fr:'Des droits séparés',en:'Separate permissions'},body:{fr:'Les accès sont accordés par mission et par Collaborateur IA.',en:'Access is granted per mission and per AI Collaborator.'}},{title:{fr:'Une intégration gouvernée',en:'Governed integration'},body:{fr:'API, MCP, navigateur ou connecteur sont configurés selon les règles de l’entreprise.',en:'APIs, MCP, browser or connectors are configured under company rules.'}}]} />
}
