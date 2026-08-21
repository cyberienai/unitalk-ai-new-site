import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { STORE_ITEMS } from '@/lib/store-catalog'

const page = readFileSync(new URL('../app/marketplace/profils-metier/page.tsx', import.meta.url), 'utf8')
const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
const catalog = readFileSync(new URL('../lib/store-catalog.ts', import.meta.url), 'utf8')
const skillsCatalog = readFileSync(new URL('../lib/mustad-skills.ts', import.meta.url), 'utf8')
const canonicalProfiles = readFileSync(new URL('../lib/canonical-job-profiles.ts', import.meta.url), 'utf8')

describe('Profils métier marketplace SEO', () => {
  it('publishes an indexable canonical Store category', () => {
    expect(page).toContain("canonical: '/marketplace/profils-metier'")
    expect(page).toContain('Profils métier IA pour Collaborateurs IA')
    expect(page).toContain('<UnitalkStoreHub initialCategoryId="profils-metier" />')
    expect(sitemap).toContain("'/marketplace/profils-metier'")
  })

  it('publishes catalog and breadcrumb structured data', () => {
    expect(page).toContain("'@type': 'ItemList'")
    expect(page).toContain("'@type': 'BreadcrumbList'")
    expect(page).toContain('STORE_ITEMS.filter')
    expect(hub).toContain('initialCategoryId?: string')
  })

  it('uses a department-led catalog with decision-ready profile cards', () => {
    expect(hub).toContain('const PROFILE_DEPARTMENTS = [')
    for (const department of ['Direction et stratégie', 'Administration', 'Ventes et avant-vente', 'Relation et réussite client', 'Marketing et communication', 'Finance et comptabilité', 'Ressources humaines', 'Juridique et conformité', 'Achats, logistique et qualité', 'Produit, données et cybersécurité', 'Formation et transformation']) expect(hub).toContain(department)
    expect(hub).toContain("heroTitle: { fr: 'Ajoutez le bon profil métier à votre Collaborateur IA.'")
    expect(hub).toContain("profileHeroProofs: ['Profils métier gratuits', 'Plusieurs profils par Collaborateur']")
    expect(hub).toContain("const usesFeaturedHero = isCollaboratorsLanding || ['profils-metier', 'competences', 'applications', 'modeles-ia'].includes(activeCategory.id)")
    expect(hub).toContain('<ProfilesMarketplaceCatalog')
    expect(hub).toContain('sticky top-[164px]')
    expect(hub).toContain('id="profile-department"')
    expect(hub).toContain('<ProfileMarketplaceCard')
    expect(hub).toContain('group-focus-visible:bg-[#C80B5B]')
    expect(hub).toContain("starterMission: storeType === 'profil' ? item.exampleMissions?.[0]?.[lang]")
    expect(hub).toContain("href=\"/co-createur-ia\"")
    expect(hub).toMatch(/const PROFILE_DEMAND_ORDER = \[\s*'charge-prospection',\s*'commercial'/)
  })

  it('includes the requested job profiles in French without internal codes', () => {
    for (const profile of ['Analyste en études qualitatives', 'Chargé de relations presse', 'Responsable influence']) expect(catalog).toContain(profile)
    expect(catalog).not.toMatch(/'A\d+ · /)
    expect(catalog).not.toContain('Hans Mustad')
    expect(catalog).toContain("name:{fr:'Commercial SDR',en:'Sales Development Representative'}")
    expect(catalog).toContain("name: { fr: 'Agent téléphonique', en: 'Phone agent' }")
    expect(catalog).toContain("['charge-relations-presse', 'Chargé de relations presse'")
    expect(catalog).toContain("['responsable-influence', 'Responsable influence'")
    expect(catalog).toContain("['analyste-etudes-qualitatives', 'Analyste en études qualitatives'")
    expect(skillsCatalog).not.toMatch(/'operations-relations-presse'|'operations-influence'|'synthese-qualitative'/)
  })

  it('publishes 80 canonical professions instead of task-based profiles', () => {
    expect(STORE_ITEMS.filter(item => item.type === 'profil')).toHaveLength(80)
    expect(new Set(STORE_ITEMS.filter(item => item.type === 'profil').map(item => item.slug)).size).toBe(80)
    expect(catalog).toContain('...CANONICAL_JOB_PROFILES')
    expect(canonicalProfiles).toContain("['directeur-general', 'Directeur général'")
    expect(canonicalProfiles).toContain("['responsable-produit', 'Responsable produit'")
    expect(canonicalProfiles).toContain("['responsable-cybersecurite', 'Responsable de la cybersécurité'")
    for (const obsolete of ['Découverte du profil client idéal', 'Enrichissement des données', 'Production de contenu', 'Tri et routage des réponses', 'Reporting et synthèse hebdomadaire', 'Test de créations publicitaires']) expect(catalog).not.toContain(obsolete)
  })

  it('assigns every profession to exactly one explicit marketplace category', () => {
    const departmentBlock = hub.slice(hub.indexOf('const PROFILE_DEPARTMENTS = ['), hub.indexOf('const COLLABORATOR_PROFILE_EXAMPLES'))
    for (const profile of STORE_ITEMS.filter(item => item.type === 'profil')) {
      expect(departmentBlock.split(`'${profile.slug}'`).length - 1).toBe(1)
    }
    expect(departmentBlock).toContain("profiles: ['developpeur', 'webmaster', 'analyste-web', 'integrateur-no-code-automatisation', 'responsable-produit', 'concepteur-experience-utilisateur', 'analyste-donnees', 'responsable-informatique-decisionnelle', 'responsable-cybersecurite', 'ingenieur-qualite-logicielle']")
  })

  it('uses explicit domains for product, data, development and cybersecurity profiles', () => {
    for (const domain of ['Produit', 'Données', 'Informatique et développement', 'Cybersécurité et qualité logicielle']) expect(catalog).toContain(domain)
    const profiles = new Map(STORE_ITEMS.filter(item => item.type === 'profil').map(item => [item.slug, item.facet]))
    expect(profiles.get('responsable-produit')).toBe('produit')
    expect(profiles.get('concepteur-experience-utilisateur')).toBe('produit')
    expect(profiles.get('analyste-donnees')).toBe('donnees')
    expect(profiles.get('responsable-informatique-decisionnelle')).toBe('donnees')
    expect(profiles.get('developpeur')).toBe('informatique-developpement')
    expect(profiles.get('integrateur-no-code-automatisation')).toBe('informatique-developpement')
    expect(profiles.get('responsable-cybersecurite')).toBe('cybersecurite-qualite-logicielle')
    expect(profiles.get('ingenieur-qualite-logicielle')).toBe('cybersecurite-qualite-logicielle')
  })
})
