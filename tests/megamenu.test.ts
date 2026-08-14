import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')

describe('Collaborateurs IA mega menu', () => {
  it('provides a clear start point and product thesis', () => {
    expect(navbar).toContain('Comprendre le Collaborateur IA')
    expect(navbar).toContain('Alma cadre. Les Agents Hermes exécutent. Les humains valident.')
  })

  it('exposes the core product and ecosystem destinations', () => {
    for (const href of ['/collaborateurs-ia/profils-metier','/collaborateurs-ia/competences','/collaborateurs-ia/applications','/desktop','/unitalk/@alma','/co-createur-ia','/experts','/academy','/documentation','/tarifs']) expect(navbar).toContain(href)
  })

  it('uses accessible menu semantics and matching mobile discovery', () => {
    expect(navbar).toContain('role="menu"')
    expect(navbar).toContain('aria-expanded={collabOpen}')
    expect(navbar).toContain('aria-controls="collab-menu"')
    expect(navbar).toContain('mobile-collab-sub')
  })
})
