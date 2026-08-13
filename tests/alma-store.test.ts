import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const store = readFileSync(new URL('../components/alma/alma-store-content.tsx', import.meta.url), 'utf8')
const signup = readFileSync(new URL('../app/inscription/page.tsx', import.meta.url), 'utf8')

describe('Alma Store and signup context', () => {
  it('does not publish undefined prices or contradictory add status', () => {
    expect(store).not.toContain('Prix à définir')
    expect(store).not.toContain('À ajouter')
    expect(store).toContain('Profil socle inclus')
    expect(store).toContain('Extension disponible selon configuration')
  })

  it('keeps the Alma profile intent through signup', () => {
    expect(signup).toContain("source === 'alma-profile' && intent === 'nouvelle-mission'")
    expect(signup).toContain('/decouvrir?source=alma-profile&intention=nouvelle-mission')
  })
})
