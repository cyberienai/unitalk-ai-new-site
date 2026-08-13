'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, Search, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { CREATOR_LABELS, DOMAIN_LABELS, STORE_ITEMS, storeItemHref, type StoreItem } from '@/lib/store-catalog'

const SELECTED_SLUGS = [
  'assistante-de-direction', 'responsable-projet', 'commercial', 'charge-prospection',
  'responsable-marketing', 'content-strategist', 'responsable-relation-client', 'support-client',
  'charge-de-recrutement', 'charge-formation', 'analyste-financier', 'conseiller-transformation-ia',
] as const

const MAIN_CATEGORIES = ['ventes', 'relation-client', 'marketing', 'finance', 'rh', 'direction', 'transformation'] as const
const PROFILE_HREF = '/collaborateurs-ia/profils-metier/conseiller-transformation-ia'

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function validCategory(value: string | null) {
  return value && Object.prototype.hasOwnProperty.call(DOMAIN_LABELS, value) ? value : 'selection'
}

export function ProfilsFinalContent() {
  const { lang } = useLanguage()
  const router = useRouter()
  const params = useSearchParams()
  const fr = lang === 'fr'
  const urlQuery = params.get('q') ?? ''
  const urlCategory = validCategory(params.get('categorie'))
  const [query, setQuery] = useState(urlQuery)
  const [category, setCategory] = useState(urlCategory)
  const [allOpen, setAllOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const deferredQuery = useDeferredValue(query)
  const profiles = useMemo(() => STORE_ITEMS.filter((item) => item.type === 'profil'), [])

  useEffect(() => { setQuery(urlQuery); setCategory(urlCategory) }, [urlQuery, urlCategory])

  const results = useMemo(() => {
    const base = category === 'selection' && !deferredQuery ? SELECTED_SLUGS.map(slug => profiles.find(p => p.slug === slug)).filter(Boolean) as StoreItem[] : profiles
    const filtered = base.filter(profile => {
      if (category !== 'selection' && profile.facet !== category) return false
      if (!deferredQuery.trim()) return true
      const text = normalize([profile.name[lang], profile.description[lang], profile.roleInOrg?.[lang], ...(profile.knowHow?.map(x => x[lang]) ?? []), ...(profile.exampleMissions?.map(x => x[lang]) ?? []), ...profile.keywords].join(' '))
      return text.includes(normalize(deferredQuery.trim()))
    })
    return showAll || category !== 'selection' || deferredQuery ? filtered : filtered.slice(0, 12)
  }, [category, deferredQuery, lang, profiles, showAll])

  function update(nextQuery: string, nextCategory: string, push = false) {
    const search = new URLSearchParams()
    if (nextQuery.trim()) search.set('q', nextQuery.trim())
    if (nextCategory !== 'selection') search.set('categorie', nextCategory)
    const href = search.size ? `/collaborateurs-ia/profils-metier?${search}` : '/collaborateurs-ia/profils-metier'
    router[push ? 'push' : 'replace'](href, { scroll: false })
  }

  function chooseCategory(next: string) {
    setCategory(next)
    setShowAll(false)
    update(query, next, true)
    requestAnimationFrame(() => document.getElementById('catalogue')?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }))
  }

  return (
    <main className="bg-[#F3EFE6] text-[#1C1A17]">
      <section className="px-5 pb-8 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
            <div>
              <p className="label">{fr ? 'Store de profils métier' : 'Job profile Store'}</p>
              <h1 className="mt-3 font-sf text-[42px] font-bold leading-[.97] tracking-[-.05em] sm:text-[58px]"><span className="block">{fr ? 'Ajoutez une responsabilité.' : 'Add a responsibility.'}</span><span className="block text-[#6E665A]">{fr ? 'Gardez la même identité.' : 'Keep the same identity.'}</span></h1>
              <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#4E483F]">{fr ? 'Un profil métier donne à votre Collaborateur IA une responsabilité durable, les compétences nécessaires et de nouvelles missions à prendre en charge.' : 'A job profile gives your AI Collaborator a lasting responsibility, the required skills and new missions.'}</p>
              <p className="mt-4 font-sf text-xl font-bold text-[#B00C54]">{fr ? 'Profils métier illimités · Une seule identité' : 'Unlimited job profiles · One identity'}</p>
              <label htmlFor="profile-search" className="mt-6 block text-sm font-semibold">{fr ? 'Quelle responsabilité voulez-vous lui confier ?' : 'What responsibility would you like to assign?'}</label>
              <div className="relative mt-2 max-w-2xl"><Search aria-hidden className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6E665A]"/><input id="profile-search" value={query} onChange={event => { const value = event.target.value; setQuery(value); update(value, category) }} placeholder={fr ? 'Rechercher un profil, une responsabilité ou un savoir-faire…' : 'Search a profile, responsibility or skill…'} className="h-13 w-full border border-[#DED6C8] bg-white pl-12 pr-12 outline-none focus:border-[#D10E63]"/>{query && <button onClick={() => { setQuery(''); update('', category) }} aria-label={fr ? 'Effacer la recherche' : 'Clear search'} className="absolute right-3 top-1/2 -translate-y-1/2 p-2"><X className="h-4 w-4"/></button>}</div>
              <div className="mt-4 flex max-w-[500px] items-center gap-3"><Image src="/alma-avatar.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover"/><div><p className="text-sm font-semibold">Alma · {fr ? 'Coordinatrice de missions' : 'Mission coordinator'}</p><p className="text-[13px] text-[#4E483F]">{fr ? 'Je vous aide à choisir ou créer le profil adapté à la responsabilité.' : 'I help you choose or create the right profile.'} <Link href="/decouvrir?intention=profil-metier" className="font-semibold text-[#B00C54]">{fr ? 'Parler à Alma' : 'Talk to Alma'} →</Link></p></div></div>
            </div>
            <LucasProof />
          </div>

          <div id="catalogue" className="mt-8 scroll-mt-24 border-t border-[#1C1A17]/15 pt-5">
            <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"> <Category href="/collaborateurs-ia/profils-metier" active={category === 'selection'} onClick={event => { event.preventDefault(); chooseCategory('selection') }}>Sélection</Category>{MAIN_CATEGORIES.map(key => <Category key={key} href={`/collaborateurs-ia/profils-metier?categorie=${key}`} active={category === key} onClick={event => { event.preventDefault(); chooseCategory(key) }}>{shortLabel(key, lang)}</Category>)}<button onClick={() => setAllOpen(value => !value)} aria-expanded={allOpen} className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full border border-[#D10E63]/50 bg-white px-3.5 text-[12px] font-semibold leading-none text-[#B00C54]">{fr ? 'Toutes les catégories' : 'All categories'}<ChevronDown className={`h-3.5 w-3.5 ${allOpen ? 'rotate-180' : ''}`}/></button></div>
            {allOpen && <div className="mt-2 flex flex-wrap gap-2">{Object.keys(DOMAIN_LABELS).filter(key => !MAIN_CATEGORIES.includes(key as typeof MAIN_CATEGORIES[number])).map(key => <Category key={key} href={`/collaborateurs-ia/profils-metier?categorie=${key}`} active={category === key} onClick={event => { event.preventDefault(); chooseCategory(key) }}>{DOMAIN_LABELS[key][lang]}</Category>)}</div>}
            <div className="mt-5 flex items-end justify-between gap-5"><div><h2 className="font-sf text-[28px] font-bold">{fr ? 'Des responsabilités prêtes à adapter.' : 'Responsibilities ready to adapt.'}</h2><p className="mt-1 text-sm text-[#6E665A]">{fr ? 'Choisissez un profil, vérifiez ce qu’il apporte et adaptez-le à votre entreprise.' : 'Choose a profile, review what it adds and adapt it to your company.'}</p></div><p aria-live="polite" className="shrink-0 text-sm font-semibold text-[#6E665A]">{results.length} {fr ? 'profils' : 'profiles'}</p></div>
            {results.length ? (
              <div className="mt-5 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{results.map(profile => <ProfileCard key={profile.slug} profile={profile} lang={lang}/>)}</div>
            ) : (
              <Empty query={query}/>
            )}
            {category === 'selection' && !query && profiles.length > 12 && !showAll && <button onClick={() => setShowAll(true)} className="mx-auto mt-7 block border border-[#1C1A17] px-5 py-2.5 text-sm font-bold">{fr ? 'Voir le catalogue complet' : 'View full catalog'}</button>}
          </div>
        </div>
      </section>

      <CustomProfile />
      <Continuity />
      <CreatorProof />
      <Ontology />
      <section className="border-t border-[#DED6C8] bg-[#EAE4D9] px-5 py-14 sm:px-8"><div className="mx-auto max-w-[1000px]"><h2 className="font-sf text-[38px] font-bold">{fr ? 'Quelle responsabilité voulez-vous lui confier ?' : 'What responsibility would you like to assign?'}</h2><p className="mt-4 text-[#4E483F]">{fr ? 'Choisissez un profil existant ou décrivez la mission à Alma.' : 'Choose an existing profile or describe the mission to Alma.'}</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/decouvrir?intention=profil-metier" className="bg-[#D10E63] px-5 py-3 text-sm font-bold text-white">{fr ? 'Parler à Alma' : 'Talk to Alma'} →</Link><a href="#catalogue" className="px-3 py-3 text-sm font-bold underline">{fr ? 'Explorer les profils' : 'Explore profiles'}</a></div><p className="mt-4 text-xs text-[#6E665A]">{fr ? 'Profils métier illimités · Une seule identité · Adaptation selon vos droits' : 'Unlimited profiles · One identity · Adapted to your rights'}</p></div></section>
    </main>
  )
}

function Category({href,active,onClick,children}:{href:string;active:boolean;onClick:(event:React.MouseEvent<HTMLAnchorElement>)=>void;children:React.ReactNode}){return <a href={href} onClick={onClick} aria-current={active?'page':undefined} className={`inline-flex h-9 shrink-0 items-center justify-center rounded-full border px-3.5 text-[12px] font-semibold leading-none ${active?'border-[#D10E63] bg-[#D10E63] text-white':'border-[#DED6C8] bg-white text-[#4E483F] hover:text-[#D10E63]'}`}>{children}</a>}
function shortLabel(key:string,lang:'fr'|'en'){const labels:Record<string,{fr:string;en:string}>={ventes:{fr:'Ventes',en:'Sales'},'relation-client':{fr:'Relation client',en:'Customer relations'},marketing:{fr:'Marketing',en:'Marketing'},finance:{fr:'Finance',en:'Finance'},rh:{fr:'RH',en:'HR'},direction:{fr:'Direction',en:'Leadership'},transformation:{fr:'Unitalk',en:'Unitalk'}};return labels[key]?.[lang]??DOMAIN_LABELS[key]?.[lang]??key}
function LucasProof(){return <aside className="border border-[#DED6C8] bg-[#FAF8F3] p-5"><p className="label">Exemple</p><h2 className="mt-3 font-sf text-2xl font-bold">Lucas</h2><p className="text-sm text-[#6E665A]">Collaborateur IA · Votre entreprise</p><div className="mt-5 border-t border-[#DED6C8] pt-4"><p className="label">Identité</p><p className="mt-2 text-sm">Une identité durable</p><p className="label mt-5">Profils métier</p><p className="mt-2 text-sm">Responsable du développement commercial<br/>Responsable relation client</p></div><p className="mt-5 font-semibold text-[#B00C54]">La même identité. Deux responsabilités.</p></aside>}
function ProfileCard({profile,lang}:{profile:StoreItem;lang:'fr'|'en'}){const creator=CREATOR_LABELS[profile.creator][lang];return <article className="group relative flex min-h-[280px] flex-col border border-[#DED6C8] bg-[#FAF8F3] p-5 transition-colors hover:border-[#D10E63]/40"><p className="label relative z-10">{DOMAIN_LABELS[profile.facet]?.[lang]??profile.facet}</p><h3 className="relative z-10 mt-3 font-sf text-[22px] font-bold">{genericLabel(profile,lang)}</h3><p className="relative z-10 mt-3 text-sm leading-6 text-[#4E483F]">{safeDescription(profile,lang)}</p><div className="relative z-10 mt-5"><p className="label">{lang==='fr'?'Compétences':'Skills'}</p><p className="mt-2 text-xs leading-5 text-[#6E665A]">{profile.knowHow?.slice(0,3).map(x=>x[lang]).join(' · ')}</p><p className="label mt-4">{lang==='fr'?'Exemples de missions':'Mission examples'}</p><p className="mt-2 text-xs leading-5 text-[#6E665A]">{profile.exampleMissions?.slice(0,2).map(x=>x[lang]).join(' · ')}</p></div><footer className="relative z-20 mt-auto flex items-center justify-between gap-4 pt-5 text-xs"><span>Créé par {creator}</span><Link href={storeItemHref(profile)} className="font-bold text-[#B00C54]">Voir le profil →</Link></footer><Link href={storeItemHref(profile)} aria-hidden tabIndex={-1} className="absolute inset-0 z-0"/></article>}
function genericLabel(profile:StoreItem,lang:'fr'|'en'){if(lang==='fr'&&profile.slug==='assistante-de-direction')return 'Assistance de direction';if(lang==='fr'&&profile.slug==='conseiller-transformation-ia')return 'Transformation IA';return profile.name[lang]}
function safeDescription(profile:StoreItem,lang:'fr'|'en'){if(lang==='fr'&&profile.slug==='commercial')return 'Identifie les opportunités, prépare les prises de contact et organise le suivi commercial.';if(lang==='fr'&&profile.slug==='charge-de-recrutement')return 'Prépare une première lecture selon les critères validés et transmet la décision aux personnes autorisées.';return profile.description[lang]}
function Empty({query}:{query:string}){return <div role="status" className="mt-6 bg-[#151310] p-7 text-[#FAF8F3]"><h3 className="font-sf text-2xl font-bold">Aucun profil ne correspond précisément.</h3><p className="mt-3 text-[#CFC6B8]">Alma peut préparer une réponse à partir de votre objectif.</p><Link href={`/decouvrir?intention=profil-metier&q=${encodeURIComponent(query)}`} className="mt-5 inline-flex bg-[#D10E63] px-5 py-3 text-sm font-bold">Continuer avec Alma →</Link></div>}
function CustomProfile(){return <section className="bg-[#151310] px-5 py-12 text-[#FAF8F3] sm:px-8"><div className="mx-auto grid max-w-[1100px] gap-7 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="label text-[#F2A4C5]">Co-création</p><h2 className="mt-3 font-sf text-[34px] font-bold">Créer un nouveau profil métier</h2><p className="mt-3 max-w-3xl text-[#CFC6B8]">Votre responsabilité n’existe pas encore ? Alma vous aide à interviewer les personnes concernées, formaliser leur méthode et préparer un profil testable.</p><p className="mt-4 text-sm">Alma · Coordinatrice de missions</p></div><div className="flex flex-col gap-3"><Link href="/decouvrir?intention=nouveau-profil-metier" className="bg-[#D10E63] px-5 py-3 text-sm font-bold">Créer avec Alma →</Link><Link href="/co-createur-ia" className="text-sm font-bold underline">Devenir Co-créateur IA</Link></div></div></section>}
function Continuity(){return <section className="px-5 py-16 sm:px-8"><div className="mx-auto max-w-[1100px]"><p className="label">Une seule identité IA. Plusieurs responsabilités.</p><h2 className="mt-3 font-sf text-[38px] font-bold">Le même Lucas. Une nouvelle responsabilité.</h2><p className="mt-4 max-w-3xl text-[16px] leading-7 text-[#4E483F]">Ajoutez un profil métier sans recréer son identité, sa mémoire, son rattachement ni son environnement de travail.</p><div className="mt-8 grid gap-6 border-y border-[#1C1A17]/15 py-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr]"><Proof title="Avant">Lucas<br/>Responsable du développement commercial<br/><small>Email · Calendrier · Mémoire · Environnement</small></Proof><b className="self-center text-3xl text-[#D10E63]">+</b><Proof title="Profil ajouté">Responsable relation client<br/><small>Qualification · Suivi · Synthèse</small></Proof><b className="self-center text-3xl text-[#D10E63]">=</b><Proof title="Après">Lucas<br/>Deux responsabilités<br/><small>Même identité · Expérience enrichie</small></Proof></div><p className="mt-6 font-semibold">Un profil métier change ce que Lucas peut prendre en charge. Il ne remplace pas celui qui travaille.</p></div></section>}
function Proof({title,children}:{title:string;children:React.ReactNode}){return <div><p className="label">{title}</p><p className="mt-3 leading-7">{children}</p></div>}
function CreatorProof(){return <section className="bg-[#EAE4D9] px-5 py-16 sm:px-8"><div className="mx-auto max-w-[1000px]"><p className="label">Créé par un humain. Exercé par une IA.</p><h2 className="mt-3 font-sf text-[38px] font-bold">Alma ne se clone pas.<br/>Son savoir-faire se transmet.</h2><dl className="mt-8 grid gap-6 sm:grid-cols-4"><ProofFact l="Profil métier" v="Conseillère en transformation IA"/><ProofFact l="Créé par" v="Patrick Chassany"/><ProofFact l="Exercé par" v="Alma"/><ProofFact l="Partageable" v="Selon les droits et conditions"/></dl><div className="mt-7 flex flex-wrap gap-4 text-sm font-bold text-[#B00C54]"><Link href="/@patrickchassany">Voir Patrick →</Link><Link href="/@unitalk/alma">Voir Alma →</Link><Link href={PROFILE_HREF}>Découvrir le profil métier →</Link></div></div></section>}
function ProofFact({l,v}:{l:string;v:string}){return <div className="border-t border-[#1C1A17]/15 pt-4"><dt className="label">{l}</dt><dd className="mt-2 font-semibold">{v}</dd></div>}
function Ontology(){return <section className="px-5 py-16 sm:px-8"><div className="mx-auto max-w-[1000px]"><h2 className="font-sf text-[38px] font-bold">Du travail aux moyens d’action.</h2><div className="mt-8 grid gap-6 sm:grid-cols-4"><ProofFact l="Mission" v="Le travail à accomplir."/><ProofFact l="Profil métier" v="La responsabilité durable."/><ProofFact l="Compétence" v="La méthode validée."/><ProofFact l="Application" v="Le moyen d’action autorisé."/></div></div></section>}
