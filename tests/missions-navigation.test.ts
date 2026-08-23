import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')

describe('missions navigation', () => {
  it('keeps the selected collaborator when switching business needs', () => {
    expect(content).toContain('new URLSearchParams(searchParams.toString())')
    expect(content).toContain("if (next === 'all') params.set('vue', 'toutes')")
    expect(content).not.toContain("next === 'all' ? '/missions?vue=toutes'")
  })

  it('hides search and family filters on a collaborator mission page', () => {
    expect(content).toContain('!requestedCollaboratorDetail && <div className="mt-7 grid gap-4')
  })

  it('exposes customer-oriented business filters', () => {
    expect(content).toContain("sales: 'Ventes'")
    expect(content).toContain("customers: 'Clients'")
    expect(content).toContain("marketing: 'Marketing'")
    expect(content).toContain("tech: 'Tech'")
    expect(content).toContain("administration: 'Administration'")
    expect(content).toContain("direction: 'Direction'")
    expect(content).toContain("documents: 'Documents'")
    expect(content).toContain("analysis: 'Analyse'")
    expect(content).toContain('NEED_FAMILIES.map')
    expect(content).toContain('className="relative block md:hidden"')
    expect(content).toContain('PRIMARY_FAMILIES.includes(key)')
    expect(content).toContain("moreAreas: 'Plus de catégories'")
    expect(content).not.toContain("areas: 'Domaines'")
    expect(content).toContain('lg:grid-cols-[260px_minmax(0,1fr)]')
    expect(content).not.toContain('Autres domaines')
    expect(content).toContain('showAllFamilies')
  })

  it('prioritizes popular missions without hiding the rest of the catalog', () => {
    expect(content).toContain('POPULAR_MISSIONS_BY_FAMILY')
    expect(content).not.toContain('isBeyondGenericChat')
    expect(content).toContain('popularityRank(a, family)')
  })

  it('keeps URL state synchronized and supports multi-term search', () => {
    expect(content).toContain('setFamily(initialFamily)')
    expect(content).toContain('searchMissions(search, lang)')
    expect(content).toContain("params.set('q', query.trim())")
  })

  it('restores catalog state and exposes actionable empty states', () => {
    expect(content).toContain("sessionStorage.getItem('unitalk_missions_state')")
    expect(content).toContain('clearAllFilters')
    expect(content).toContain('role="group"')
  })

  it('keeps the catalog visible and avoids forcing the composer', () => {
    expect(content).not.toContain('lg:min-h-[100svh]')
    expect(content).toContain('lg:max-w-[260px]')
    expect(content).toContain('(!requestedCollaboratorDetail || composerRequested)')
    expect(content).toContain('filteredMissions.length > 0 && visibleCount >= filteredMissions.length')
  })

})
