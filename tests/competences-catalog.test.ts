import { describe, expect, it } from 'vitest'
import { STORE_ITEMS } from '@/lib/store-catalog'

describe('competences catalog', () => {
  it('publishes the complete skill catalog with valid profile relationships', () => {
    const profiles = STORE_ITEMS.filter(item => item.type === 'profil')
    const skills = STORE_ITEMS.filter(item => item.type === 'competence')
    const profileMap = new Map(profiles.map(item => [item.slug, item]))
    const skillMap = new Map(skills.map(item => [item.slug, item]))

    expect(skills.length).toBeGreaterThanOrEqual(105)
    expect(new Set(skills.map(item => item.slug)).size).toBe(skills.length)
    expect(skills.some(item => item.slug.startsWith('mustad-'))).toBe(false)

    for (const profile of profiles) {
      expect(profile.relatedSkills?.length).toBeGreaterThan(0)
      for (const skill of profile.relatedSkills ?? []) expect(skillMap.get(skill)?.relatedProfiles).toContain(profile.slug)
    }
    for (const skill of skills) {
      expect(skill.name.fr).toBeTruthy()
      expect(skill.description.fr).toBeTruthy()
      expect(skill.facet).toBeTruthy()
      for (const profile of skill.relatedProfiles ?? []) expect(profileMap.get(profile)?.relatedSkills).toContain(skill.slug)
    }

    expect(skillMap.get('human-approval-policy')?.relatedProfiles).toHaveLength(profiles.length)
    expect(skillMap.get('audit-and-action-log')?.relatedProfiles).toHaveLength(profiles.length)
  })
})
