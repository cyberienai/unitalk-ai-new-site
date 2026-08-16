import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { HERMES_CREATORS } from '../lib/hermes-creators'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/blog/hermes-agent-youtube/page.tsx', import.meta.url), 'utf8')
const content = readFileSync(new URL('../components/hermes-creators-content.tsx', import.meta.url), 'utf8')
const order = readFileSync(new URL('../components/commande-content.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

describe('Hermes creator recommendations', () => {
  it('publishes ten verified YouTube profiles', () => {
    expect(HERMES_CREATORS).toHaveLength(10)
    for (const creator of HERMES_CREATORS) {
      expect(creator.channelUrl).toMatch(/^https:\/\/www\.youtube\.com\//)
      expect(creator.videoUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/)
    }
  })

  it('links the editorial category and discloses affiliation', () => {
    expect(navbar).toContain("fr: 'Recommandés'")
    expect(navbar).toContain("href: '/blog/hermes-agent-youtube'")
    expect(content).toContain('participent au programme d’affiliation Unitalk')
    expect(content).toContain('Commander ma première mission gratuitement')
    expect(content).toContain('youtube-nocookie.com/embed')
    expect(order).toContain('hermesCreatorByAffiliateCode')
    expect(order).toContain('Avantage 30 %')
    expect(page).toContain("canonical: '/blog/hermes-agent-youtube'")
    expect(sitemap).toContain("'/blog/hermes-agent-youtube'")
  })

  it('assigns a unique affiliate code to every creator', () => {
    expect(new Set(HERMES_CREATORS.map((creator) => creator.affiliateCode)).size).toBe(10)
    for (const creator of HERMES_CREATORS) expect(creator.affiliateCode).toMatch(/^[A-Z0-9]+30$/)
  })
})
