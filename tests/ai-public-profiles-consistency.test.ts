import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { DETAILED_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getCollaboratorPage } from '@/lib/collaborator-pages'

const profile = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')
const route = readFileSync(new URL('../app/[handle]/page.tsx', import.meta.url), 'utf8')

describe('AI public profile consistency', () => {
  it('has a complete public page for every detailed AI identity', () => {
    expect(DETAILED_SLUGS).toEqual(expect.arrayContaining(['emma', 'lea', 'arthur', 'hugo', 'nadia', 'ines']))
    for (const slug of DETAILED_SLUGS) {
      expect(ROLE_DETAILS[slug]).toBeTruthy()
      expect(getCollaboratorPage(slug)).toBeTruthy()
    }
  })

  it('drives visible profile content from the selected identity', () => {
    for (const key of ['persona.claim[lang]', 'persona.composer[lang]', 'persona.proofTitle[lang]', 'persona.proofMission[lang]', 'persona.apps']) expect(profile).toContain(key)
    expect(profile).toContain('detail.manager.role[lang]')
    expect(profile).toContain('detail.role[lang]')
    expect(route).toContain('page ? <CollaborateurContent page={page}')
  })

  it('preserves the requested identity through onboarding', () => {
    expect(profile).toContain('collaborateur=${encodeURIComponent(detail.slug)}')
  })
})
