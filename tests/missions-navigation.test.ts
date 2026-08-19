import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')

describe('missions navigation', () => {
  it('keeps the selected collaborator when switching mission families', () => {
    expect(content).toContain("if (requestedCollaborator) params.set('collaborateur', requestedCollaborator)")
    expect(content).toContain("if (next === 'all') params.set('vue', 'toutes')")
    expect(content).not.toContain("next === 'all' ? '/missions?vue=toutes'")
  })

  it('hides search and family filters on a collaborator mission page', () => {
    expect(content).toContain('!requestedCollaboratorDetail && <div className="mt-7 flex flex-col gap-4')
  })
})
