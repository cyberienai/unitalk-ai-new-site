import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { MISSIONS } from '@/lib/missions-catalog'

const page = readFileSync(new URL('../app/marketplace/collaborateurs-ia/page.tsx', import.meta.url), 'utf8')
const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const missions = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')

describe('Collaborateurs IA marketplace', () => {
  it('publishes the twelve reference identities', () => {
    expect(MARKETPLACE_COLLABORATOR_SLUGS).toEqual(['emma', 'camille', 'lea', 'hugo', 'ines', 'arthur', 'nadia', 'chloe', 'iris', 'lucas', 'gabriel', 'marcus'])
    for (const slug of MARKETPLACE_COLLABORATOR_SLUGS) {
      const detail = ROLE_DETAILS[slug]
      expect(detail.promise.fr).toBeTruthy()
      expect(detail.skills.length).toBeGreaterThanOrEqual(4)
      expect(detail.missions).toHaveLength(3)
      expect(detail.tools.length).toBeGreaterThanOrEqual(5)
      expect(detail.availability).toMatch(/^(available|beta|on-request)$/)
    }
  })

  it('has a dedicated canonical collection with structured data', () => {
    expect(page).toContain("canonical: '/marketplace/collaborateurs-ia'")
    expect(page).toContain("'@type': 'ItemList'")
    expect(page).toContain("'@type': 'ListItem'")
    expect(page).toContain("'@type': 'BreadcrumbList'")
    expect(page).toContain('<UnitalkStoreHub collaboratorsOnly />')
  })

  it('supports mission-led collaborator discovery while other catalogs retain search', () => {
    expect(hub).toContain("activeCategory.id !== 'collaborateurs-ia' && <label")
    expect(hub).toContain('score: Math.min(99')
    expect(hub).toContain("event.key === 'ArrowRight'")
    expect(hub).toContain('aria-labelledby={`marketplace-tab-${activeCategory.id}`}')
    expect(hub).toContain('aria-live="polite"')
    expect(hub).not.toContain('Vous cherchez un autre rôle ?')
    expect(hub).toContain("activeCategory.id !== 'collaborateurs-ia'")
    expect(hub).toContain('COLLABORATOR_PROFILE_EXAMPLES')
    expect(hub).toContain("highlightsLabel: lang === 'fr' ? 'Profils métier à ajouter'")
    expect(hub).toContain("lang === 'fr' ? 'et plus encore' : 'and more'")
    expect(hub).toContain("lang === 'fr' ? `Confier cette mission à ${item.title}` : `Assign this mission to ${item.title}`")
    expect(hub).not.toContain('className="absolute inset-0 z-0')
    expect(hub).not.toContain("detail.availability === 'available'")
    expect(hub).not.toContain('tabIndex={-1}')
    expect(hub).not.toContain('item.score !== undefined')
    expect(hub).toContain('detail.starterMission?.mission[lang]')
    expect(hub).toContain('starterResult: detail.starterMission?.result[lang]')
    expect(hub).toContain("lang === 'fr' ? 'Résultat :' : 'Outcome:'")
    expect(hub).not.toContain('Aucune action sensible sans validation')
    expect(hub).toContain("role={collaboratorsOnly ? 'region' : 'tabpanel'}")
    expect(hub).toContain('Catégories de la marketplace')
    expect(hub).toContain('Première mission gratuite')
    expect(hub).not.toContain('Quel travail voulez-vous faire avancer ?')
    expect(hub).not.toContain('COLLABORATOR_NEEDS')
    expect(hub).not.toContain('Filtrer par besoin métier')
    expect(hub).toContain('<details className="mt-4 sm:hidden">')
    expect(hub).toContain("featuredLast ? 'xl:col-start-2'")
    expect(hub).toContain('Puis à partir de 49 €/mois par Collaborateur IA, hors capacité IA.')
    expect(hub).toContain('withAlmaAvatar(t.almaBody)')
    expect(hub).toContain('/decouvrir?q=${encodeURIComponent(detail.starterMission?.mission[lang] ?? detail.missions[0][lang])}&collaborateur=')
    expect(hub).toContain('min-h-[220px]')
    expect(hub).toContain("const visibleCategories = collaboratorsOnly ? STORE_CATEGORIES.slice(0, 1) : STORE_CATEGORIES")
    expect(hub).toContain("const navigationCategories = collaboratorsOnly ? STORE_CATEGORIES : visibleCategories")
    expect(hub).toContain("href={`/marketplace/${category.id}`}")
    expect(hub).toContain("const categoryId = collaboratorsOnly ? 'collaborateurs-ia'")
    expect(hub).not.toContain('Un Collaborateur. Plusieurs métiers. Des compétences illimitées.')
    expect(hub).toContain("detail.gender === 'female' ? 'Collaboratrice IA' : 'Collaborateur IA'")
    expect(hub).not.toContain('Un Collaborateur IA n’est pas simplement un agent.')
    expect(hub).toContain('Vous n’avez pas à choisir le modèle.')
    expect(hub).toContain('Voir les options d’infrastructure')
    expect(hub).not.toContain('Choisissez l’identité adaptée à votre première mission.')
    expect(hub).toContain('Ces identités sont des points de départ.')
    expect(hub).toContain('Le nom, le visage et la voix de votre Collaborateur IA restent personnalisables avant son déploiement.')
    expect(hub).not.toContain('Choisissez votre Collaborateur IA.</h2>')
    expect(hub).toContain('const MOBILE_COLLABORATOR_PREVIEW_SIZE = 6')
    expect(hub).toContain("mobileHidden ? 'hidden md:flex' : 'flex'")
    expect(hub).toContain('Voir les 12 Collaborateurs IA')
  })

  it('gives every identity the same mission-led public profile', () => {
    const profile = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')
    expect(profile).toContain('const isMissionLedProfile = true')
    expect(profile).toContain('detail.missions[0][lang]')
    expect(profile).toContain('collaborator-profile-mission-led')
    expect(profile).not.toContain('collaborator-profile-hugo')
  })

  it('keeps Emma focused on leadership support rather than HR', () => {
    expect(missions).toContain('EMMA_LEADERSHIP_MISSION_SLUGS')
    expect(missions).toContain("'preparer-une-revue-strategique'")
    expect(missions).toContain("'preparer-une-note-de-decision'")
    expect(missions).toContain("requestedCollaborator === 'emma'")
    expect(missions).not.toContain("EMMA_LEADERSHIP_MISSION_SLUGS = [\n  'rediger-une-fiche-de-poste'")
  })

  it('separates strategic intelligence from editorial analysis', () => {
    const camilleMissions = new Set(MISSIONS.filter(mission => mission.collaboratorSlug === 'camille').map(mission => mission.slug))
    for (const slug of ['realiser-une-veille-concurrentielle', 'surveiller-un-marche', 'suivre-les-actualites-d-un-secteur', 'detecter-les-tendances-emergentes', 'comparer-les-offres-concurrentes', 'preparer-une-etude-de-marche', 'preparer-un-benchmark', 'produire-une-note-de-veille', 'rechercher-des-informations-publiques', 'preparer-une-revue-strategique']) {
      expect(camilleMissions.has(slug)).toBe(true)
    }
    expect(MISSIONS.find(mission => mission.slug === 'analyser-les-retours-clients')?.collaboratorSlug).toBe('lea')
  })

  it('assigns supplier analysis to Gabriel rather than Lucas', () => {
    const gabrielMissions = new Set(MISSIONS.filter(mission => mission.collaboratorSlug === 'gabriel').map(mission => mission.slug))
    for (const slug of ['comparer-les-offres-fournisseurs', 'suivre-les-renouvellements', 'suivre-les-engagements-fournisseurs']) {
      expect(gabrielMissions.has(slug)).toBe(true)
    }
    expect(ROLE_DETAILS.lucas.role.fr).toBe('Coordinateur des opérations')
  })
})
