import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { MISSIONS, NETWORKS, PATHS, SKILLS } from '@/lib/academy-catalog'

const root=join(import.meta.dirname,'..')
const routes=['','missions','competences','parcours','networks','tarifs','experts','modele','alma','espace','financement','qualite','parcours-gratuits','parcours-gratuits/premiere-mission-ia','formations/co-createur-ia','entreprendre-avec-ia']
function sourceFiles(dir:string):string[]{return readdirSync(dir).flatMap(name=>{const path=join(dir,name);return statSync(path).isDirectory()?sourceFiles(path):/\.(?:ts|tsx)$/.test(name)?[path]:[]})}

describe('Academy integration',()=>{
  it('publishes all static and dynamic routes',()=>{
    for(const route of routes) expect(existsSync(join(root,'app','academy',route,'page.tsx'))).toBe(true)
    for(const route of ['missions/[slug]','competences/[slug]','parcours/[slug]','networks/[sector]']) expect(existsSync(join(root,'app','academy',route,'page.tsx'))).toBe(true)
  })
  it('provides connected catalog data',()=>{
    expect([MISSIONS.length,SKILLS.length,PATHS.length,NETWORKS.length]).toEqual([6,9,4,6])
    for(const mission of MISSIONS) for(const slug of mission.skillSlugs) expect(SKILLS.some(skill=>skill.slug===slug)).toBe(true)
  })
  it('links the Academy brand to each respective home page',()=>{
    const nav=readFileSync(join(root,'components','academy','academy-nav.tsx'),'utf8')
    expect(nav).toContain('<Link href="/" title="Retour à l’accueil Unitalk"')
    expect(nav).toContain('aria-label="Retour à l’accueil Unitalk"><UnitalkLogo')
    expect(nav).toContain('group-hover:text-[#b00c54]">Unitalk</span></Link>')
    expect(nav).toContain('<Link href="/academy" className="text-sm font-bold tracking-[-.02em]" aria-label="Accueil Unitalk Academy">Academy</Link>')
  })
  it('contains no legacy unitalk.fr links in application source',()=>{
    for(const directory of ['app','components','lib']) for(const file of sourceFiles(join(root,directory))) expect(readFileSync(file,'utf8'),file).not.toContain('https://unitalk.fr')
  })
})
