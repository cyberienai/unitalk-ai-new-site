import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const french = readFileSync(new URL('../app/marketplace/collaborateurs-ia/page.tsx', import.meta.url), 'utf8')
const english = readFileSync(new URL('../app/en/marketplace/ai-collaborators/page.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
const hub = readFileSync(new URL('../components/unitalk-store-hub.tsx', import.meta.url), 'utf8')

describe('Collaborators marketplace international SEO', () => {
  it('publishes reciprocal localized canonicals and hreflang entries', () => {
    for (const source of [french, english]) {
      expect(source).toContain("fr: '/marketplace/collaborateurs-ia'")
      expect(source).toContain("en: '/en/marketplace/ai-collaborators'")
      expect(source).toContain("'x-default': '/marketplace/collaborateurs-ia'")
    }
    expect(english).toContain("canonical: '/en/marketplace/ai-collaborators'")
    expect(english).toContain("inLanguage: 'en'")
    expect(english).toContain('<UnitalkStoreHub collaboratorsOnly fixedLang="en"/>')
    expect(sitemap).toContain("'/en/marketplace/ai-collaborators'")
  })

  it('provides the catalog introduction in both languages', () => {
    expect(hub).toContain('Choisissez le Collaborateur IA qui rejoindra votre équipe.')
    expect(hub).toContain('Choose the AI Collaborator who will join your team.')
    expect(hub).toContain('Personalize their identity')
  })
})
