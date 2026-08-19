import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { DETAILED_SLUGS, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getCollaboratorPage } from '@/lib/collaborator-pages'

const profile = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')
const route = readFileSync(new URL('../app/[handle]/page.tsx', import.meta.url), 'utf8')
const legacyRoute = readFileSync(new URL('../app/collaborateurs/[slug]/page.tsx', import.meta.url), 'utf8')
const discoverFlow = readFileSync(new URL('../components/discover/discover-flow.tsx', import.meta.url), 'utf8')

describe('AI public profile consistency', () => {
  it('has a complete public page for every detailed AI identity', () => {
    expect(DETAILED_SLUGS).toEqual(expect.arrayContaining(['emma', 'lea', 'arthur', 'hugo', 'nadia', 'ines']))
    for (const slug of DETAILED_SLUGS) {
      expect(ROLE_DETAILS[slug]).toBeTruthy()
      expect(getCollaboratorPage(slug)).toBeTruthy()
    }
  })

  it('uses complete roles and explicit grammatical gender', () => {
    expect(ROLE_DETAILS.emma.role).toEqual({ fr: 'Assistante de direction', en: 'Executive Assistant' })
    expect(ROLE_DETAILS.ines.role.fr).toBe('Support client')
    for (const slug of DETAILED_SLUGS) expect(ROLE_DETAILS[slug].gender).toMatch(/^(female|male)$/)
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

  it('keeps profile wording and mission onboarding persona-neutral', () => {
    expect(profile).toContain('Missions prêtes à l’emploi avec ${detail.name}')
    expect(profile).toContain('Voir toutes les missions de ${detail.name}')
    expect(profile).toContain('missions?collaborateur=${encodeURIComponent(detail.slug)}')
    expect(profile).toContain('STATUS_LABELS[mission.status][lang]')
    expect(profile).toContain('detail.slug === "hugo"')
    expect(discoverFlow).toContain("const flowSteps: OnboardingStep[] = ['mission', 'entreprise', 'collaborateur', 'workspace']")
    expect(discoverFlow).toContain("onContinue={() => goTo('collaborateur')}")
  })

  it('redirects every legacy profile to its canonical handle', () => {
    expect(legacyRoute).toContain('COLLABORATOR_PAGE_SLUGS.map')
    expect(legacyRoute).toContain('permanentRedirect(`/@${encodeURIComponent(slug)}`)')
  })
})
