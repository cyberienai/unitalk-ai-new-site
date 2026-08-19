import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const profile = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')
const onboarding = readFileSync(new URL('../components/discover/screen-collaborateur.tsx', import.meta.url), 'utf8')
const action = readFileSync(new URL('../app/actions/purchase-draft.ts', import.meta.url), 'utf8')

describe('Collaborator organizational placement', () => {
  it('shows possible placement without claiming a fixed public assignment', () => {
    expect(profile).toContain('Département de référence')
    expect(profile).toContain('Personne · Équipe · Département · Entreprise')
  })

  it('persists the default placement without asking during onboarding', () => {
    expect(onboarding).not.toContain('Où ce Collaborateur IA travaillera-t-il ?')
    expect(onboarding).not.toContain('organizational-placement')
    expect(onboarding).toContain('organizationalPlacement: placement')
    expect(action).toContain('organizationalPlacement: OrganizationalPlacement')
  })
})
