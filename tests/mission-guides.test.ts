import { describe, expect, it } from 'vitest'
import { MISSIONS, getMissionGuideHref } from '@/lib/missions-catalog'

describe('mission guides', () => {
  it('provides a guide URL for every mission', () => {
    expect(MISSIONS).not.toHaveLength(0)
    for (const mission of MISSIONS) expect(getMissionGuideHref(mission)).toMatch(/^\/(?:blog|guides\/missions)\//)
  })

  it('preserves editorial guide URLs and derives all other URLs', () => {
    const prospects = MISSIONS.find((mission) => mission.slug === 'trouver-de-nouveaux-clients')
    const roadmap = MISSIONS.find((mission) => mission.slug === 'preparer-une-feuille-de-route-produit')
    expect(prospects && getMissionGuideHref(prospects)).toBe('/blog/trouver-prospects-qualifies-ia')
    expect(roadmap && getMissionGuideHref(roadmap)).toBe('/guides/missions/preparer-une-feuille-de-route-produit')
  })
})
