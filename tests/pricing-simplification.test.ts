import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const configurator = readFileSync(new URL('../components/pricing/pricing-configurator.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')

describe('pricing simplification', () => {
  it('separates the paid AI Collaborator from free MIT-licensed Hermes', () => {
    expect(configurator).toContain('Chaque licence comprend une identité IA, une voix, un email, un calendrier, un numéro de téléphone, une mémoire, des applications autorisées et un environnement privé.')
    expect(configurator).toContain("lineCollab: 'Licence Collaborateur IA'")
    expect(sections).toContain("name: 'Licence Collaborateur IA'")
    expect(sections).toContain("name: 'Hermes open source'")
    expect(sections).toContain("price: 'Gratuit'")
    expect(sections).toContain("period: ' · Licence MIT'")
    expect(sections).toContain('Profils métier et compétences')
    expect(sections).toContain('Applications et modèles IA autorisés')
    expect(sections).toContain('Email, calendrier et numéro de téléphone')
    expect(sections).toContain('Le compte central de votre entreprise pour administrer les humains, les Collaborateurs IA, leurs accès, leurs budgets et leur facturation.')
    expect(configurator).not.toContain('profil Hermes')
  })

  it('keeps one configurator and removes the long explanation component', () => {
    expect(page).toContain('<PricingHero />')
    expect(page).toContain('<PricingCollaboration />')
    expect(page).not.toContain('<PricingExplanations />')
  })

  it('uses plain-language pricing hierarchy', () => {
    expect(sections).toContain('Des tarifs clairs pour toute votre entreprise IA.')
    expect(sections).toContain("heroAccent: 'Composables. Sans surprise.'")
    expect(sections).not.toContain("heroAccent: 'Clairs. Composables. Sans surprise.'")
    expect(sections).toContain('Ce que vous payez. Ce qui reste gratuit.')
    expect(sections).toContain('Une seule Licence Entreprise IA est nécessaire par entreprise')
    expect(configurator).toContain("lineOrg: 'Licence Entreprise IA'")
    expect(configurator).toContain("lineOrgDetail: 'Administration centralisée, Alma, Workspace et Desktop'")
    expect(configurator).toContain("lineHermes: 'Hermes open source'")
    expect(configurator).toContain("lineHermesDetail: 'Profils métier et compétences · Licence MIT'")
    expect(configurator).toContain("cardAfterTrial: 'Total mensuel'")
  })

  it('writes API keys and token capacities in full', () => {
    expect(configurator).toContain("name: 'Vos Clés API'")
    for (const [name, volume] of [['Quart-temps', '5 millions de tokens par mois'], ['Mi-temps', '10 millions de tokens par mois'], ['Temps plein', '20 millions de tokens par mois']]) {
      expect(configurator).toContain(`name: '${name}'`)
      expect(configurator).toContain(`tokens: '${volume}'`)
    }
    expect(configurator).not.toContain("name: '5 M'")
    expect(configurator.match(/5 millions de tokens par mois/g)).toHaveLength(1)
  })
})
