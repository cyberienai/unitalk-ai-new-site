import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const footer = readFileSync(new URL('../components/site-footer.tsx', import.meta.url), 'utf8')

describe('site footer', () => {
  it('provides product, resource, company and partner navigation', () => {
    expect(footer).toContain('https://cal.com/patrickchassany/30min')
    expect(footer).toContain('/marketplace/collaborateurs-ia')
    expect(footer).not.toContain("['Marketplace', '/marketplace']")
    expect(footer).toContain('/missions')
    expect(footer).toContain("['Unitalk Desktop', '/desktop']")
    expect(footer).toContain('/blog')
    expect(footer).toContain('/changelog')
    expect(footer).toContain('/documentation')
    expect(footer).toContain('/academy')
    expect(footer).toContain('/securite')
    expect(footer).toContain('https://unitalk.promotekit.com/')
    expect(footer).toContain('/reseau-co-createurs')
    expect(footer).toContain('/mentions-legales')
    expect(footer).toContain('/confidentialite')
    expect(footer).toContain('/conditions')
  })

  it('keeps the footer bilingual and localizes public links', () => {
    expect(footer).toContain("navigation: 'Navigation du pied de page'")
    expect(footer).toContain("navigation: 'Footer navigation'")
    expect(footer).toContain('localizePublicHref(href, lang)')
  })
})
