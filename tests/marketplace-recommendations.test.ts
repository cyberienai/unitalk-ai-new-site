import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { HERMES_CREATORS } from '../lib/hermes-creators'

const navbar = readFileSync(new URL('../components/navbar.tsx', import.meta.url), 'utf8')
const page = readFileSync(new URL('../app/marketplace/recommandes/page.tsx', import.meta.url), 'utf8')
const content = readFileSync(new URL('../components/hermes-creators-content.tsx', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8')

describe('Hermes creator recommendations', () => {
  it('publishes ten verified YouTube profiles', () => {
    expect(HERMES_CREATORS).toHaveLength(10)
    for (const creator of HERMES_CREATORS) {
      expect(creator.channelUrl).toMatch(/^https:\/\/www\.youtube\.com\//)
      expect(creator.videoUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=/)
    }
  })

  it('links the editorial category without implying affiliation', () => {
    expect(navbar).toContain("fr: 'Recommandés'")
    expect(navbar).toContain("href: '/marketplace/recommandes'")
    expect(content).toContain('ne sont pas présentés comme affiliés')
    expect(page).toContain("canonical: '/marketplace/recommandes'")
    expect(sitemap).toContain("'/marketplace/recommandes'")
  })
})
