import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const french = readFileSync(new URL('../app/marketplace/collaborateurs-ia/page.tsx', import.meta.url), 'utf8')
const english = readFileSync(new URL('../app/en/marketplace/ai-collaborators/page.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

describe('Collaborators marketplace international SEO', () => {
  it('publishes reciprocal localized canonicals and hreflang entries', () => {
    for (const source of [french, english]) {
      expect(source).toContain("'fr-FR': '/marketplace/collaborateurs-ia'")
      expect(source).toContain("'en-US': '/en/marketplace/ai-collaborators'")
      expect(source).toContain("'x-default': '/marketplace/collaborateurs-ia'")
    }
    expect(english).toContain("canonical: '/en/marketplace/ai-collaborators'")
    expect(english).toContain('inLanguage: \'en-US\'')
    expect(english).toContain('<UnitalkStoreHub collaboratorsOnly fixedLang="en"/>')
    expect(sitemap).toContain("'/en/marketplace/ai-collaborators'")
  })
})
