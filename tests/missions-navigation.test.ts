import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')

describe('missions navigation', () => {
  it('keeps the selected collaborator when switching business needs', () => {
    expect(content).toContain("if (requestedCollaborator) params.set('collaborateur', requestedCollaborator)")
    expect(content).toContain("if (next === 'all') params.set('vue', 'toutes')")
    expect(content).not.toContain("next === 'all' ? '/missions?vue=toutes'")
  })

  it('hides search and family filters on a collaborator mission page', () => {
    expect(content).toContain('!requestedCollaboratorDetail && <div className="mt-7 flex flex-col gap-4')
  })

  it('exposes customer-oriented business filters', () => {
    expect(content).toContain("sales: 'Ventes'")
    expect(content).toContain("customers: 'Clients'")
    expect(content).toContain("marketing: 'Marketing'")
    expect(content).toContain("tech: 'Tech'")
  })

  it('prioritizes operational missions instead of generic chat tasks', () => {
    expect(content).toContain('POPULAR_MISSIONS_BY_FAMILY')
    expect(content).toContain('isBeyondGenericChat')
    expect(content).toContain('popularityRank(a, family)')
  })
})
