import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { MISSIONS } from '@/lib/missions-catalog'

const page = readFileSync(new URL('../app/marketplace/collaborateurs-ia/page.tsx', import.meta.url), 'utf8')
const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')
const missions = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')

describe('Collaborateurs IA marketplace', () => {
  it('publishes one reference identity for each of ten departments', () => {
    expect(MARKETPLACE_COLLABORATOR_SLUGS).toEqual(['emma', 'lea', 'hugo', 'ines', 'arthur', 'nadia', 'chloe', 'iris', 'lucas', 'marcus'])
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
    expect(hub).toContain("highlightsLabel: lang === 'fr' ? 'Autres compétences possibles, et plus encore'")
    expect(hub).toContain('Commencez par un résultat à obtenir, pas par une configuration.')
    expect(hub).toContain('Confier une mission à ${item.title}')
    expect(hub).not.toContain('className="absolute inset-0 z-0')
    expect(hub).not.toContain("detail.availability === 'available'")
    expect(hub).not.toContain('tabIndex={-1}')
    expect(hub).not.toContain('item.score !== undefined')
    expect(hub).toContain('detail.starterMission?.mission[lang]')
    expect(hub).not.toContain('Aucune action sensible sans validation')
    expect(hub).toContain('role="tabpanel"')
    expect(hub).toContain('Catégories de la marketplace')
    expect(hub).toContain('7 jours gratuits')
    expect(hub).not.toContain('Quel travail voulez-vous faire avancer ?')
    expect(hub).not.toContain('COLLABORATOR_NEEDS')
    expect(hub).not.toContain('Filtrer par besoin métier')
    expect(hub).toContain('<details className="mt-4 sm:hidden">')
    expect(hub).toContain("featuredLast ? 'xl:col-start-2'")
    expect(hub).toContain('Puis à partir de 49 €/mois hors capacité IA')
    expect(hub).toContain('withAlmaAvatar(t.almaBody)')
    expect(hub).toContain('/missions?composer=1&collaborateur=')
    expect(hub).toContain('min-h-[220px]')
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

  it('gives Léa additional editorial monitoring and analysis missions', () => {
    const leaMissions = new Set(MISSIONS.filter(mission => mission.collaboratorSlug === 'lea').map(mission => mission.slug))
    for (const slug of ['realiser-une-veille-concurrentielle', 'surveiller-un-marche', 'analyser-les-retours-clients', 'suivre-les-actualites-d-un-secteur', 'detecter-les-tendances-emergentes']) {
      expect(leaMissions.has(slug)).toBe(true)
    }
  })
})
