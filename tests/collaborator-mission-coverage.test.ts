import { describe, expect, it } from 'vitest'
import { getCollaboratorPage, missionsForCollaborator } from '@/lib/collaborator-pages'
import { MISSIONS } from '@/lib/missions-catalog'

const expandedProfiles = ['chloe', 'marcus', 'iris', 'gabriel', 'lucas'] as const

describe('expanded collaborator mission coverage', () => {
  it.each(expandedProfiles)('%s has twelve missions in the shared catalog', (slug) => {
    const missions = MISSIONS.filter((mission) => mission.collaboratorSlug === slug)

    expect(missions).toHaveLength(12)
    expect(new Set(missions.map((mission) => mission.slug)).size).toBe(12)
  })

  it.each(expandedProfiles)('%s exposes missions on its public profile', (slug) => {
    expect(getCollaboratorPage(slug)?.missions).toHaveLength(4)
    expect(missionsForCollaborator(slug, 12)).toHaveLength(12)
  })
})
