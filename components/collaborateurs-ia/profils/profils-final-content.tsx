'use client'

import Link from 'next/link'
import { AlmaInline } from '@/components/alma-inline'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Search, X } from 'lucide-react'
import { Kicker } from '@/components/home/section-kicker'
import { useLanguage } from '@/lib/language-context'
import { CREATOR_LABELS, DOMAIN_LABELS, STORE_ITEMS, storeItemHref, type StoreItem } from '@/lib/store-catalog'

const SELECTED = ['consultant-strategie-digitale','chef-projet-digital','responsable-seo','gestionnaire-campagnes-publicitaires','responsable-acquisition','responsable-editorial','redacteur-web','community-manager','responsable-crm','webmaster','analyste-web','integrateur-no-code-automatisation']
const CATEGORIES = ['conseil-projet','acquisition','contenu-social','crm-cycle-vie','web-ecommerce','data-mesure','design-creation','developpement-integration','qualite-exploitation']
const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export function ProfilsFinalContent() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'
  const router = useRouter()
  const params = useSearchParams()
  const urlQuery = params.get('q') ?? ''
  const requestedCategory = params.get('categorie') ?? ''
  const urlCategory = DOMAIN_LABELS[requestedCategory] ? requestedCategory : 'selection'
  const [query, setQuery] = useState(urlQuery)
  const [category, setCategory] = useState(urlCategory)
  const [allOpen, setAllOpen] = useState(false)
  const deferred = useDeferredValue(query)
  const profiles = useMemo(() => STORE_ITEMS.filter(item => item.type === 'profil'), [])

  useEffect(() => { setQuery(urlQuery); setCategory(urlCategory) }, [urlQuery, urlCategory])

  const results = useMemo(() => {
    const base = category === 'selection' && !deferred
      ? SELECTED.map(slug => profiles.find(item => item.slug === slug)).filter(Boolean) as StoreItem[]
      : profiles
    return base.filter(profile => {
      if (category !== 'selection' && profile.facet !== category) return false
      if (!deferred.trim()) return true
      const searchable = [profile.name[lang], profile.description[lang], profile.roleInOrg?.[lang], ...(profile.specializations?.map(item => item[lang]) ?? []), ...(profile.knowHow?.map(item => item[lang]) ?? []), ...(profile.exampleMissions?.map(item => item[lang]) ?? []), ...profile.keywords].join(' ')
      return normalize(searchable).includes(normalize(deferred.trim()))
    })
  }, [category, deferred, lang, profiles])

  function href(nextQuery: string, nextCategory: string) {
    const search = new URLSearchParams()
    if (nextQuery.trim()) search.set('q', nextQuery.trim())
    if (nextCategory !== 'selection') search.set('categorie', nextCategory)
    return search.size ? `/collaborateurs-ia/profils-metier?${search}` : '/collaborateurs-ia/profils-metier'
  }

  function selectCategory(event: React.MouseEvent<HTMLAnchorElement>, next: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setCategory(next)
    router.push(href(query, next), { scroll: false })
  }

  return (
    <main className="bg-[#F3EFE6] text-[#1C1A17]">
      <section className="pb-8 pt-24 sm:pt-28">
        <div className="editorial-shell grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Kicker>{fr ? 'Profils métier' : 'Job profiles'}</Kicker>
            <h1 className="hero-heading mt-5">Une seule identité IA. Plusieurs responsabilités.</h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{fr ? 'Ajoutez à votre Collaborateur IA les profils métier dont votre entreprise a besoin. Son identité, son rattachement et son expérience restent les mêmes.' : 'Add the job profiles your company needs. Its identity, reporting line and experience remain.'}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#catalogue" className="inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{fr ? 'Explorer les profils' : 'Explore profiles'} →</a>
              <Link href="/decouvrir?intention=nouveau-profil-metier" className="inline-flex min-h-12 items-center text-sm font-bold text-[#B00C54]">{fr ? 'Créer avec Alma' : 'Create with Alma'}</Link>
            </div>
            <p className="mt-4 text-sm text-[#6E665A]">{fr ? 'Profils métier illimités par Collaborateur IA' : 'Unlimited job profiles per AI Collaborator'}</p>
          </div>
          <LucasCard />
        </div>
      </section>

      <section id="catalogue" className="scroll-mt-24 pb-16 pt-8">
        <div className="editorial-shell">
          <div className="flex items-end justify-between gap-6">
            <div><h2 className="font-sf text-[36px] font-bold sm:text-[46px]">{fr ? 'Choisissez une responsabilité.' : 'Choose a responsibility.'}</h2><p className="mt-3 text-[#4E483F]">{fr ? 'Chaque profil métier peut être adapté au contexte, aux méthodes et aux droits de votre entreprise.' : 'Each profile can be adapted to your company context, methods and rights.'}</p></div>
            <p aria-live="polite" className="shrink-0 text-sm font-semibold text-[#6E665A]">{results.length} {fr ? 'profils' : 'profiles'}</p>
          </div>
          <label htmlFor="profiles-search" className="sr-only">{fr ? 'Rechercher un profil métier' : 'Search job profiles'}</label>
          <div className="relative mt-6 max-w-3xl"><Search aria-hidden className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6E665A]"/><input id="profiles-search" value={query} onChange={event => { setQuery(event.target.value); router.replace(href(event.target.value, category), { scroll: false }) }} placeholder={fr ? 'Rechercher une responsabilité ou un savoir-faire…' : 'Search a responsibility or skill…'} className="h-13 w-full rounded-xl border border-[#DED6C8] bg-white pl-12 pr-12 outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/20"/>{query && <button onClick={() => { setQuery(''); router.replace(href('', category), { scroll: false }) }} aria-label={fr ? 'Effacer la recherche' : 'Clear search'} className="absolute right-3 top-1/2 -translate-y-1/2 p-2"><X className="h-4 w-4"/></button>}</div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            <Pill href={href(query, 'selection')} active={category === 'selection'} onClick={event => selectCategory(event, 'selection')}>Sélection</Pill>
            {CATEGORIES.map(key => <Pill key={key} href={href(query, key)} active={category === key} onClick={event => selectCategory(event, key)}>{shortLabel(key)}</Pill>)}
            <button aria-expanded={allOpen} onClick={() => setAllOpen(value => !value)} className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-full border border-[#D10E63]/50 bg-white px-3.5 text-xs font-semibold leading-none text-[#B00C54]">{fr ? 'Toutes les catégories' : 'All categories'}<ChevronDown aria-hidden className="h-3.5 w-3.5"/></button>
          </div>
          {allOpen && <div className="mt-2 flex flex-wrap gap-2">{Object.keys(DOMAIN_LABELS).filter(key => !CATEGORIES.includes(key)).map(key => <Pill key={key} href={href(query, key)} active={category === key} onClick={event => selectCategory(event, key)}>{DOMAIN_LABELS[key][lang]}</Pill>)}</div>}
          {results.length ? <div className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{results.map(profile => <ProfileCard key={profile.slug} profile={profile} lang={lang}/>)}<CreateCard /></div> : <Empty query={query}/>} 
        </div>
      </section>
    </main>
  )
}

function Pill({ href, active, onClick, children }: { href: string; active: boolean; onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void; children: React.ReactNode }) { return <a href={href} onClick={onClick} aria-current={active ? 'page' : undefined} className={`inline-flex h-9 shrink-0 items-center justify-center rounded-full border px-3.5 text-xs font-semibold leading-none ${active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#DED6C8] bg-white text-[#4E483F]'}`}>{children}</a> }
function shortLabel(key: string) { return ({'conseil-projet':'Conseil et projet',acquisition:'Acquisition','contenu-social':'Contenu','crm-cycle-vie':'CRM','web-ecommerce':'Web','data-mesure':'Données','design-creation':'Design','developpement-integration':'Développement','qualite-exploitation':'Qualité'} as Record<string,string>)[key] ?? key }
function LucasCard() { return <aside className="rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-6"><p className="label">Une identité qui évolue</p><div className="mt-5 flex items-center gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#151310] font-sf text-2xl font-bold text-white">L</span><div><h2 className="font-sf text-2xl font-bold">Lucas</h2><p className="text-sm text-[#6E665A]">Collaborateur IA · Votre entreprise</p></div></div><p className="label mt-6">Profils métier</p><p className="mt-2 text-sm leading-7">Responsable du développement commercial<br/>Responsable relation client<br/>Responsable SEO</p><p className="mt-5 font-semibold text-[#B00C54]">3 responsabilités. Une seule identité IA.</p></aside> }
function ProfileCard({ profile, lang }: { profile: StoreItem; lang: 'fr' | 'en' }) { const url = storeItemHref(profile); return <article className="group relative flex min-h-[290px] flex-col rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-5"><Link href={`/collaborateurs-ia/profils-metier?categorie=${profile.facet}`} className="label relative z-30 w-fit hover:text-[#D10E63]">{DOMAIN_LABELS[profile.facet]?.[lang] ?? profile.facet}</Link><h3 className="relative z-10 mt-3 font-sf text-xl font-bold">{profile.labels?.neutral?.[lang] ?? profile.name[lang]}</h3><p className="relative z-10 mt-3 text-sm leading-6 text-[#4E483F]">{profile.description[lang]}</p><p className="label relative z-10 mt-5">Compétences</p><p className="relative z-10 mt-2 text-xs leading-5 text-[#6E665A]">{profile.knowHow?.slice(0,3).map(item => item[lang]).join(' · ')}</p><p className="relative z-10 mt-auto pt-5 text-xs font-semibold">Créé par {CREATOR_LABELS[profile.creator][lang]} →</p><Link href={url} aria-label={`Voir le profil métier : ${profile.name[lang]}`} className="absolute inset-0 z-0 rounded-2xl"/></article> }
function CreateCard() { return <article className="flex min-h-[290px] flex-col rounded-2xl bg-[#151310] p-6 text-[#FAF8F3]"><p className="label text-[#F2A4C5]">Co-création</p><h3 className="mt-3 font-sf text-2xl font-bold">Votre responsabilité n’est pas encore dans le catalogue ?</h3><p className="mt-4 text-sm leading-7 text-[#CFC6B8]"><AlmaInline /> Alma vous aide à interviewer les personnes concernées, formaliser leur méthode et préparer un profil métier testable.</p><p className="mt-4 text-sm"><AlmaInline /> Alma · Coordinatrice de missions</p><div className="mt-auto flex flex-wrap gap-4 pt-6"><Link href="/decouvrir?intention=nouveau-profil-metier" className="rounded-full bg-[#D10E63] px-5 py-2.5 text-sm font-bold">Créer avec Alma →</Link><Link href="/co-createur-ia" className="py-2.5 text-sm font-bold underline">Devenir Co-créateur IA</Link></div></article> }
function Empty({ query }: { query: string }) { return <div role="status" className="mt-6 rounded-2xl bg-[#151310] p-7 text-[#FAF8F3]"><h3 className="font-sf text-2xl font-bold">Aucun profil ne correspond exactement à « {query} ».</h3><p className="mt-3 text-[#CFC6B8]"><AlmaInline /> Alma peut vous aider à formaliser cette responsabilité.</p><Link href={`/decouvrir?intention=nouveau-profil-metier&q=${encodeURIComponent(query)}`} className="mt-5 inline-flex rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold">Créer avec Alma →</Link></div> }
