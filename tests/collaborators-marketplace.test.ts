import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { MARKETPLACE_COLLABORATOR_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'

const page = readFileSync(new URL('../app/marketplace/collaborateurs-ia/page.tsx', import.meta.url), 'utf8')
const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')

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

  it('keeps collaborator browsing simple while other catalogs retain search', () => {
    expect(hub).toContain("activeCategory.id !== 'collaborateurs-ia' && <label")
    expect(hub).toContain('score: Math.min(99')
    expect(hub).toContain("event.key === 'ArrowRight'")
    expect(hub).toContain('aria-labelledby={collaboratorsOnly ? undefined : `marketplace-tab-${activeCategory.id}`}')
    expect(hub).toContain('aria-live="polite"')
    expect(hub).not.toContain('Vous cherchez un autre rôle ?')
    expect(hub).toContain("activeCategory.id !== 'collaborateurs-ia'")
    expect(hub).toContain('COLLABORATOR_PROFILE_EXAMPLES')
    expect(hub).toContain("highlightsLabel: lang === 'fr' ? 'Exemples d’évolution'")
    expect(hub).toContain('Vous ne choisissez pas un métier définitif.')
    expect(hub).toContain('Confier une mission à ${item.title}')
    expect(hub).not.toContain('className="absolute inset-0 z-0')
    expect(hub).not.toContain("detail.availability === 'available'")
    expect(hub).not.toContain('tabIndex={-1}')
    expect(hub).not.toContain('item.score !== undefined')
    expect(hub).toContain('COLLABORATOR_PROOFS')
    expect(hub).toContain('Aucune action n’est lancée sans votre validation.')
    expect(hub).toContain("role={collaboratorsOnly ? undefined : 'tabpanel'}")
    expect(hub).toContain('Choisissez votre Collaborateur IA')
    expect(hub).toContain('Première mission offerte')
    expect(hub).toContain('<details className="mt-4 sm:hidden">')
    expect(hub).toContain("featuredLast ? '2xl:col-start-2'")
  })

  it('gives every identity the same mission-led public profile', () => {
    const profile = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')
    expect(profile).toContain('const isMissionLedProfile = true')
    expect(profile).toContain('detail.missions[0][lang]')
    expect(profile).toContain('collaborator-profile-mission-led')
    expect(profile).not.toContain('collaborator-profile-hugo')
  })
})
