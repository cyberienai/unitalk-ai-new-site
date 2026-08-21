import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const configurator = readFileSync(new URL('../components/pricing/pricing-configurator.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')

describe('pricing simplification', () => {
  it('separates the paid AI Collaborator from free MIT-licensed Hermes', () => {
    expect(configurator).toContain('Chaque licence comprend une identité IA, une voix, un email, un calendrier, un numéro de téléphone, une mémoire, des applications autorisées et un environnement privé.')
    expect(configurator).toContain("lineCollab: 'Licence Collaborateur IA'")
    expect(sections).toContain("label: 'Chaque Collaborateur IA'")
    expect(sections).toContain('Hermes, Workspace et Desktop sont inclus.')
    expect(sections).toContain("'Hermes open source'")
    expect(sections).toContain('Son identité, sa mémoire, ses communications, ses applications et son serveur privé.')
    expect(sections).toContain('Un seul compte pour vos équipes, vos Collaborateurs IA, leurs accès et leur facturation.')
    expect(configurator).not.toContain('profil Hermes')
  })

  it('keeps one configurator and removes the long explanation component', () => {
    expect(page).toContain('<PricingHero />')
    expect(page).toContain('<PricingCollaboration />')
    expect(page).not.toContain('<PricingExplanations />')
  })

  it('uses plain-language pricing hierarchy', () => {
    expect(sections).toContain('Un prix simple pour commencer.')
    expect(sections).toContain('Une configuration qui évolue avec vous.')
    expect(sections).toContain("label: 'Votre entreprise'")
    expect(configurator).toContain("lineOrg: 'Votre entreprise'")
    expect(configurator).toContain("lineOrgDetail: 'Administration centralisée, Alma, Workspace et Desktop'")
    expect(configurator).toContain("lineHermes: 'Hermes open source'")
    expect(configurator).toContain("lineHermesDetail: 'Profils métier et compétences · Licence MIT'")
    expect(configurator).toContain("cardAfterTrial: 'Total mensuel'")
    expect(configurator).toContain("heading: 'Configurez votre prix'")
    expect(configurator).toContain("planTitle: '2. Quel volume de travail ?'")
  })

  it('writes API keys and token capacities in full', () => {
    expect(configurator).toContain("name: 'Vos Clés API'")
    for (const [name, volume] of [['Usage régulier', '5 millions de tokens par mois'], ['Usage soutenu', '10 millions de tokens par mois'], ['Usage intensif', '20 millions de tokens par mois']]) {
      expect(configurator).toContain(`name: '${name}'`)
      expect(configurator).toContain(`tokens: '${volume}'`)
    }
    expect(configurator).not.toContain("name: '5 M'")
    expect(configurator.match(/5 millions de tokens par mois/g)).toHaveLength(1)
  })
})
