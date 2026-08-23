import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')
const faq = readFileSync(new URL('../components/pricing/pricing-faq-final.tsx', import.meta.url), 'utf8')
const faqData = readFileSync(new URL('../lib/pricing-faq.ts', import.meta.url), 'utf8')

describe('pricing page publication requirements', () => {
  it('publishes composable pricing metadata and an OG image', () => {
    expect(page).toContain("title: 'Tarifs Collaborateur IA et entreprise IA'")
    expect(page).toContain("images: [{ url: '/opengraph-image'")
    expect(page).not.toContain("'@type':'Offer'")
  })

  it('makes the free first mission and paid activation explicit', () => {
    expect(sections).toContain("primary: 'Démarrer avec Alma'")
    expect(sections).toContain("title: 'Votre première mission.', accent: 'Offerte.'")
    expect(sections).toContain('Workspace Solo gratuit. Chaque Collaborateur IA : 49 €/mois.')
    expect(sections).toContain('0 € aujourd’hui. Aucun abonnement ne démarre sans votre confirmation.')
    expect(sections).toContain("continue: 'Continuer avec cette configuration'")
    expect(sections).toContain('assistants IA privés ou partagés')
    expect(sections).toContain('missions avec mémoire, outils et autonomie encadrée')
    expect(sections).toContain('selectedTierBase.users} · ${workspaceCreditsValue}')
    expect(sections).toContain('Unitalk permet de déployer des agents open source autonomes à l’échelle de l’entreprise.')
    expect(sections).not.toContain("secondary: 'Configurer mon équipe'")
  })

  it('starts with one AI Collaborator and one user license', () => {
    expect(sections).toContain('useState<OrganizationTierId>(initialDraft.organizationTier)')
    expect(sections).toContain('useState(initialDraft.collaborators)')
    expect(sections).toContain("name: 'Solo', users: '1 humain inclus · Gratuit', option: 'Solo · 1 humain inclus', price: ''")
    expect(sections).toContain("tokensLine: 'Modèle DeepSeek hébergé en Europe'")
  })

  it('answers trial, included usage and plan change questions', () => {
    for (const question of ['Que vais-je payer aujourd’hui ?', 'Combien de tokens sont inclus ?', 'Puis-je modifier ou résilier ma configuration ?', 'Où suivre la consommation ?']) expect(faqData).toContain(question)
    expect(faqData).toContain('5 millions de tokens par mois')
    expect(faqData).toContain('1 000 crédits en Solo, 2 500 en Équipe ou 20 000 en Entreprise')
    expect(faqData).toContain('crédits IA inclus ou prépayés, ou connecter vos propres clés API')
    expect(faq).toContain('pricingFaqItems[lang]')
  })
})
