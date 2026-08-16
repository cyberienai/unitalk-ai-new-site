import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const content = readFileSync(new URL('../components/co-creator-content.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/co-createur-ia/page.tsx', import.meta.url), 'utf8')

describe('Co-creator commercial programs', () => {
  it('distinguishes affiliate and partner commissions', () => {
    expect(content).toContain('Commission Affilié')
    expect(content).toContain('number="30 %"')
    expect(content).toContain('Commission Partenaire')
    expect(content).toContain('number="50 %"')
  })

  it('links both programs and states their conditions', () => {
    expect(content).toContain('href="/partenaires#affiliation"')
    expect(content).toContain('href="/partenaires/deployer"')
    expect(content).toContain('ne se cumulent pas sur une même vente')
    expect(page).toContain('30 % de commission comme Affilié ou 50 % comme Partenaire')
  })
})
