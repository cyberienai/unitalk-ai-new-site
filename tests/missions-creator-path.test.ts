import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const missions = readFileSync(new URL('../components/missions-content.tsx', import.meta.url), 'utf8')

describe('missions creator path', () => {
  it('invites experts to turn know-how into controlled AI work', () => {
    expect(missions).toContain('Transformez votre savoir-faire en Collaborateur IA capable d’accomplir des missions sous votre contrôle.')
    expect(missions).toContain('href="/co-createur-ia"')
    expect(missions).toContain('https://unitalk.fr/formations/co-createur-ia?source=missions-catalog')
  })

  it('explains governance and publication safeguards', () => {
    for (const proof of ['Méthode testée sur des cas contrôlés', 'Actions autorisées, validées ou interdites', 'Versionnage et publication selon vos droits']) expect(missions).toContain(proof)
  })
})
