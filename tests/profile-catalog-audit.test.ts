import { describe, expect, it } from 'vitest'
import { STORE_ITEMS } from '@/lib/store-catalog'

const departments = [
  ['Direction et stratégie', ['coordinatrice-missions', 'conseiller-transformation-ia', 'assistante-de-direction', 'responsable-projet', 'chef-projet-digital', 'directeur-general', 'responsable-strategie-veille', 'directeur-commercial']],
  ['Administration', ['gestionnaire-administratif', 'responsable-services-generaux', 'gestionnaire-documentaire', 'charge-appels-offres']],
  ['Ventes et avant-vente', ['commercial', 'charge-prospection', 'responsable-comptes-cles', 'ingenieur-affaires', 'responsable-administration-ventes', 'consultant-avant-vente', 'commercial-terrain']],
  ['Relation et réussite client', ['support-client', 'agent-telephonique', 'responsable-relation-client', 'responsable-reussite-client', 'gestionnaire-reclamations', 'responsable-experience-client']],
  ['Marketing et communication', ['content-strategist', 'responsable-marketing', 'analyste-etudes-qualitatives', 'charge-relations-presse', 'responsable-influence', 'consultant-strategie-digitale', 'responsable-seo', 'gestionnaire-campagnes-publicitaires', 'responsable-acquisition', 'responsable-editorial', 'redacteur-web', 'community-manager', 'responsable-crm', 'analyste-etudes-marche', 'chef-produit-marketing', 'charge-communication']],
  ['Finance et comptabilité', ['analyste-financier', 'directeur-administratif-financier', 'comptable', 'controleur-gestion', 'tresorier-entreprise', 'gestionnaire-facturation-recouvrement', 'auditeur-interne']],
  ['Ressources humaines', ['charge-de-recrutement', 'responsable-ressources-humaines', 'gestionnaire-administration-personnel', 'responsable-developpement-rh', 'charge-relations-sociales', 'responsable-qualite-vie-travail']],
  ['Juridique et conformité', ['juriste-contrats', 'responsable-conformite', 'delegue-protection-donnees', 'charge-veille-reglementaire', 'responsable-responsabilite-societale']],
  ['Achats, logistique et qualité', ['coordinateur-operations', 'responsable-achats', 'acheteur', 'approvisionneur', 'responsable-logistique', 'responsable-qualite']],
  ['Produit', ['responsable-produit', 'concepteur-experience-utilisateur']],
  ['Données', ['analyste-donnees', 'responsable-informatique-decisionnelle', 'analyste-web']],
  ['Informatique et développement', ['developpeur', 'integrateur-no-code-automatisation', 'webmaster']],
  ['Cybersécurité et qualité logicielle', ['responsable-cybersecurite', 'ingenieur-qualite-logicielle']],
  ['Formation et transformation', ['conseillere-adoption-ia', 'charge-formation', 'formateur-entreprise', 'responsable-conduite-changement', 'responsable-amelioration-processus']],
] as const

describe('profile catalog audit', () => {
  it('reports profile totals and category coverage', () => {
    const profiles = STORE_ITEMS.filter(item => item.type === 'profil')
    const assigned = departments.flatMap(([, slugs]) => slugs)
    console.log(JSON.stringify({ total: profiles.length, unique: new Set(profiles.map(item => item.slug)).size, assigned: assigned.length, categories: Object.fromEntries(departments.map(([label, slugs]) => [label, slugs.length])), unassigned: profiles.map(item => item.slug).filter(slug => !assigned.includes(slug as never)), unknown: assigned.filter(slug => !profiles.some(item => item.slug === slug)) }, null, 2))
    expect(new Set(assigned).size).toBe(assigned.length)
  })
})
