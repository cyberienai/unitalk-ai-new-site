import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync(new URL('../app/tarifs/page.tsx', import.meta.url), 'utf8')
const englishPage = readFileSync(new URL('../app/en/pricing/page.tsx', import.meta.url), 'utf8')
const content = readFileSync(new URL('../components/pricing/pricing-page-content.tsx', import.meta.url), 'utf8')
const sections = readFileSync(new URL('../components/pricing/pricing-sections.tsx', import.meta.url), 'utf8')
const faq = readFileSync(new URL('../components/pricing/pricing-faq-final.tsx', import.meta.url), 'utf8')
const faqData = readFileSync(new URL('../lib/pricing-faq.ts', import.meta.url), 'utf8')

describe('pricing simplification', () => {
  it('presents organization-wide pricing and the full package', () => {
    for (const value of ['Pas de facturation par utilisateur.', 'Assistants d’équipe illimités', 'Workspace Web et Desktop', 'Fonctionne avec plus de 3 200 applications']) expect(sections).toContain(value)
    for (const value of ['Missions prises en charge', 'Mémoire privée et partagée', 'Email, calendrier et téléphone', 'Instance Hermes dédiée']) expect(sections).toContain(value)
    expect(sections).toContain('Accès au Store de modèles IA : texte, image, vidéo et audio')
  })

  it('persists exactly the configuration shown to the user', () => {
    expect(sections).toContain("usageMode: 'included', creditBudget: 0, capacity: 'included'")
    expect(sections).toContain('pricingRecurringTotal({ organizationTier, collaborators })')
    expect(sections).toContain('useState(initialDraft.collaborators)')
    expect(sections).not.toContain('useState(initialDraft.coCreators)')
    expect(sections).not.toContain('Licence Co-créateur IA')
  })

  it('supports incoming intent and restores the stored draft', () => {
    expect(page).toContain('PURCHASE_DRAFT_COOKIE')
    expect(page).toContain('params.profil')
    expect(page).not.toContain("params['co-createur']")
    expect(page).toContain('stored?.selectedProfile')
    expect(sections).toContain('selectedProfile')
  })

  it('shares visible FAQ and structured data', () => {
    expect(faq).toContain('pricingFaqItems[lang]')
    expect(page).toContain('PricingPageContent')
    expect(content).toContain('pricingFaqJsonLd(lang)')
    expect(faqData).toContain('Que vais-je payer aujourd’hui ?')
    expect(faqData).toContain('selon la première limite atteinte')
    expect(faq).toContain('role="region"')
  })

  it('publishes localized pricing routes and metadata', () => {
    expect(page).toContain("'en-US': '/en/pricing'")
    expect(englishPage).toContain("canonical: '/en/pricing'")
    expect(englishPage).toContain('lang="en"')
  })

  it('has accessible controls and failure feedback', () => {
    expect(content).toContain('href="#main-content"')
    expect(sections).toContain('disabled={value >= unitalkPricing.aiCollaborator.max}')
    expect(sections).toContain('aria-busy={pending}')
    expect(sections).toContain('role="alert"')
    expect(sections).toContain('aria-label={`${noun} : ${value}`}')
  })
})
