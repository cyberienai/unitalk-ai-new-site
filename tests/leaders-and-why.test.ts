import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { AI_ARCHITECTS } from '@/lib/ai-architects'

const leaders = readFileSync(new URL('../app/leaders/page.tsx', import.meta.url), 'utf8')
const detail = readFileSync(new URL('../components/leaders/leader-detail-content.tsx', import.meta.url), 'utf8')
const why = readFileSync(new URL('../components/collab-why-content.tsx', import.meta.url), 'utf8')

describe('AI architects and Why Unitalk pages', () => {
  it('provides an image for every architect', () => {
    expect(AI_ARCHITECTS).toHaveLength(9)
    for (const architect of AI_ARCHITECTS) expect(architect.image).toMatch(/^\/leaders\/.+\.(?:jpg|png|svg)$/)
    expect(leaders).toContain('leader.image')
    expect(detail).toContain('leader.image')
  })

  it('states the absence of implied affiliation and keeps roles clear', () => {
    expect(leaders).toContain('sans affiliation ni approbation implicite')
    expect(detail).toContain('Aucune affiliation implicite avec le fournisseur')
    expect(detail).toContain('Alma coordonne')
    expect(detail).toContain('Le Collaborateur IA effectue ensuite la mission')
  })

  it('turns Why Unitalk into a complete product and pricing narrative', () => {
    expect(why).toContain('Un outil répond. Un Collaborateur IA prend une responsabilité.')
    expect(why).toContain('Ce qui est appris reste gouverné par votre entreprise.')
    expect(why).toContain('Une architecture lisible. Un prix composable.')
    expect(why).toContain('href="/tarifs"')
    expect(why).toContain('Alma cadre le besoin et prépare le bon Collaborateur IA. Le Collaborateur effectue la mission.')
  })
})
