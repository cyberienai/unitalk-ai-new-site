import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const footer = readFileSync(new URL('../components/site-footer.tsx', import.meta.url), 'utf8')

describe('site footer', () => {
  it('only keeps the brand, contact and legal links', () => {
    expect(footer).toContain('mailto:hello@unitalk.ai')
    expect(footer).toContain('/mentions-legales')
    expect(footer).toContain('/confidentialite')
    expect(footer).toContain('/conditions')
    expect(footer).not.toContain("title: 'Produit'")
    expect(footer).not.toContain("href: '/desktop'")
  })
})
