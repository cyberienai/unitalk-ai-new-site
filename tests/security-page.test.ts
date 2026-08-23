import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const source = readFileSync(new URL('../components/security-content.tsx', import.meta.url), 'utf8')

describe('security page', () => {
  it('explains defense in depth in customer language', () => {
    for (const value of ['Utilisateurs autorisés', 'Permissions explicites', 'Validation des actions sensibles', 'Exécution isolée', 'Secrets filtrés', 'Traçabilité']) expect(source).toContain(value)
  })

  it('separates Hermes, Unitalk and customer responsibilities', () => {
    expect(source).toContain('Hermes protège le moteur. Unitalk gouverne son usage.')
    expect(source).toContain("['Hermes'")
    expect(source).toContain("['Unitalk'")
    expect(source).toContain("['Votre entreprise'")
  })

  it('keeps human approval and data commitments explicit', () => {
    expect(source).toContain('Autorisé ne veut pas dire automatique.')
    expect(source).toContain('hébergées en France')
    expect(source).toContain('chiffrées en transit et au repos')
    expect(source).toContain('sans votre accord explicite')
    expect(source).toContain('Demander le DPA')
  })

  it('links to the detailed official Hermes security documentation', () => {
    expect(source).toContain('https://hermes-agent.nousresearch.com/docs/user-guide/security')
    expect(source).not.toContain('YOLO')
    expect(source).not.toContain('rm -rf')
  })

  it('accents every heading with the design-system magenta', () => {
    expect(source).toContain('function AccentLastWord')
    expect(source).toContain("dark ? 'text-[#F2A4C5]' : 'text-[#D10E63]'")
    expect(source).toContain('<AccentLastWord value={t.title}/>')
    expect(source).toContain('<AccentLastWord value={t.boundaryTitle} dark/>')
    expect(source).toContain('<AccentLastWord value={title}/>')
  })
})
