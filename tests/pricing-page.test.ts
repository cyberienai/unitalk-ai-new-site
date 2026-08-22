import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')
const faq = readFileSync(new URL('../components/pricing/pricing-faq-final.tsx', import.meta.url), 'utf8')

describe('pricing page publication requirements', () => {
  it('publishes composable pricing metadata and an OG image', () => {
    expect(page).toContain('Tarifs Collaborateur IA et entreprise IA | Unitalk')
    expect(page).toContain("images: [{ url: '/opengraph-image'")
    expect(page).not.toContain("'@type':'Offer'")
  })

  it('makes the free first mission and paid activation explicit', () => {
    expect(sections).toContain("primary: 'Choisir un Collaborateur IA'")
    expect(sections).toContain("secondary: 'Explorer les missions'")
  })

  it('starts with one AI Collaborator and one user license', () => {
    expect(sections).toContain("useState<OrganizationTierId>('solo')")
    expect(sections).toContain('useState(1)')
    expect(sections).toContain("users: '1 utilisateur', price: 'Gratuit'")
  })

  it('answers trial, usage, plan change and credit rollover questions', () => {
    for (const question of ['L’essai gratuit est-il vraiment gratuit ?', 'Que puis-je faire avec 1 million de tokens ?', 'Puis-je changer d’offre à tout moment ?', 'Les crédits inutilisés sont-ils reportés ?']) expect(faq).toContain(question)
    expect(faq).toContain('Les crédits mensuels inclus dans une offre ne sont pas reportés au mois suivant.')
  })
})
