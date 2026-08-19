import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { collaboratorHref, ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getCollaboratorPage } from '@/lib/collaborator-pages'

const content = readFileSync(new URL('../components/collaborateur-content.tsx', import.meta.url), 'utf8')

describe('Nadia canonical public profile', () => {
  it('uses Nadia as the shared finance identity', () => {
    expect(ROLE_DETAILS.nadia.role.fr).toBe('Analyste Financière')
    expect(ROLE_DETAILS.nadia.department.fr).toBe('Finance')
    expect(getCollaboratorPage('nadia')).toBeTruthy()
    expect(collaboratorHref('nadia')).toBe('/@nadia')
  })

  it('uses the mission-led experience with finance-specific content', () => {
    expect(content).toContain('detail.slug === "hugo" || detail.slug === "nadia"')
    expect(content).toContain('Préparer mon reporting financier')
    expect(content).toContain('Confier le reporting à Nadia')
    expect(content).toContain('sources consolidées')
    expect(content).toContain('écarts signalés')
  })
})
