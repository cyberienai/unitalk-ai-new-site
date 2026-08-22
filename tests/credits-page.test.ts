import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/credits/page.tsx', import.meta.url), 'utf8')

describe('credits page', () => {
  it('explains prepaid credits, BYOK and hybrid usage', () => {
    expect(page).toContain('Dès 25 €')
    expect(page).toContain('BYOK')
    expect(page).toContain('Hybride')
  })

  it('explains what credits fund and links back to pricing', () => {
    for (const label of ['Modèles IA', 'Création multimodale', 'API externes', 'Téléphone']) expect(page).toContain(label)
    expect(page).toContain('href="/tarifs"')
  })
})
