'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { STORE_ITEMS, storeItemHref } from '@/lib/store-catalog'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }
type Category = {
  id: string
  title: Bi
  description: Bi
  search: Bi
  action: Bi
  explain: Bi
  href: string
  accent: string
}

type MarketplaceItem = {
  key: string
  title: string
  description: string
  href?: string
  meta: string
  origin?: string
  pending?: boolean
  status?: Bi
}

const PAGE_SIZE = 12

const MODEL_ITEMS = [
  { key: 'gpt', title: 'GPT', maker: 'OpenAI', meta: 'Texte · Vision · Code' },
  { key: 'claude', title: 'Claude', maker: 'Anthropic', meta: 'Texte · Analyse · Code' },
  { key: 'gemini', title: 'Gemini', maker: 'Google', meta: 'Texte · Vision · Multimodal' },
  { key: 'mistral', title: 'Mistral', maker: 'Mistral AI', meta: 'Texte · Code · Europe' },
  { key: 'deepseek', title: 'DeepSeek', maker: 'DeepSeek', meta: 'Raisonnement · Code' },
  { key: 'llama', title: 'Llama', maker: 'Meta', meta: 'Open weights · Texte' },
] as const

const STORE_CATEGORIES: Category[] = [
  {
    id: 'profils-metier', title: { fr: 'Profils métier', en: 'Job profiles' },
    description: { fr: 'Un profil métier de référence pour chaque métier de la connaissance.', en: 'One reference job profile for every knowledge-work profession.' },
    search: { fr: 'Rechercher un profil métier', en: 'Search job profiles' }, action: { fr: 'Voir le profil', en: 'View profile' }, explain: { fr: 'Comprendre les profils métier', en: 'Understand job profiles' },
    href: '/collaborateurs-ia/profils-metier', accent: '#C80B5B',
  },
  {
    id: 'competences', title: { fr: 'Compétences', en: 'Skills' },
    description: { fr: 'Des savoir-faire précis, testés, versionnés et réutilisables.', en: 'Precise, tested, versioned and reusable know-how.' },
    search: { fr: 'Rechercher une compétence', en: 'Search skills' }, action: { fr: 'Voir la compétence', en: 'View skill' }, explain: { fr: 'Comprendre les compétences', en: 'Understand skills' },
    href: '/collaborateurs-ia/competences', accent: '#6246B5',
  },
  {
    id: 'applications', title: { fr: 'Applications', en: 'Applications' },
    description: { fr: 'Les outils, connecteurs et applications métier autorisés.', en: 'Approved tools, connectors and business applications.' },
    search: { fr: 'Rechercher une application', en: 'Search applications' }, action: { fr: 'Voir l’application', en: 'View application' }, explain: { fr: 'Comprendre les applications', en: 'Understand applications' },
    href: '/collaborateurs-ia/applications', accent: '#B7501E',
  },
  {
    id: 'modeles-ia', title: { fr: 'Modèles IA', en: 'AI models' },
    description: { fr: 'Les moteurs autorisés pour raisonner, analyser, produire et agir.', en: 'Approved engines for reasoning, analysis, creation and action.' },
    search: { fr: 'Rechercher un modèle IA', en: 'Search AI models' }, action: { fr: 'Découvrir le modèle', en: 'Explore model' }, explain: { fr: 'Comprendre les modèles IA', en: 'Understand AI models' },
    href: '/modeles-ia', accent: '#1D6692',
  },
  {
    id: 'serveurs-ia', title: { fr: 'Serveurs IA', en: 'AI servers' },
    description: { fr: 'Des environnements privés dimensionnés pour vos Collaborateurs IA et leurs applications.', en: 'Private environments sized for your AI Collaborators and their applications.' },
    search: { fr: 'Rechercher un serveur IA', en: 'Search AI servers' }, action: { fr: 'Voir le serveur', en: 'View server' }, explain: { fr: 'Comprendre les serveurs IA', en: 'Understand AI servers' },
    href: '/collaborateurs-ia/serveurs', accent: '#216641',
  },
]

function itemsForCategory(categoryId: string, lang: Lang): MarketplaceItem[] {
  const storeType = categoryId === 'profils-metier' ? 'profil' : categoryId === 'competences' ? 'competence' : null
  if (storeType) {
    return STORE_ITEMS.filter((item) => item.type === storeType).map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: storeItemHref(item),
      meta: item.roleInOrg?.[lang] ?? item.facet, origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
      status: item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Inclus', en: 'Included' },
    }))
  }
  if (categoryId === 'applications') {
    return STORE_ITEMS.filter((item) => item.type === 'application' || item.type === 'integration').map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: storeItemHref(item),
      meta: item.editor ?? (item.type === 'integration' ? (lang === 'fr' ? 'Intégration' : 'Integration') : item.facet),
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community', pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Bientôt disponible', en: 'Coming soon' } : item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Connectable', en: 'Connectable' },
    }))
  }
  if (categoryId === 'modeles-ia') {
    return MODEL_ITEMS.map((item) => ({
      key: item.key, title: item.title,
      description: lang === 'fr' ? `Famille de modèles ${item.maker}, disponible selon les droits, les clés et la configuration AI Gateway.` : `${item.maker} model family, available according to permissions, keys and AI Gateway configuration.`,
      href: '/modeles-ia', meta: item.meta, origin: item.maker, status: { fr: 'Selon votre fournisseur', en: 'Via your provider' },
    }))
  }
  if (categoryId === 'serveurs-ia') {
    return STORE_ITEMS.filter((item) => item.type === 'server').map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: storeItemHref(item),
      meta: lang === 'fr' ? 'Infrastructure privée' : 'Private infrastructure', origin: 'Unitalk', pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Sur demande', en: 'On request' } : { fr: 'Provisionnable', en: 'Provisionable' },
    }))
  }
  return []
}

const COPY = {
  fr: {
    heroTitle: 'Faites évoluer votre Collaborateur IA, au rythme de vos besoins.',
    heroAccent: 'au rythme de vos besoins.',
    heroLead: 'Ajoutez de nouveaux profils métier et de nouvelles compétences dès que vos besoins évoluent. Leur ajout est inclus, sans coût supplémentaire.',
    noResults: 'Aucune création ne correspond à cette recherche.', showMore: 'Voir tout le catalogue', showLess: 'Revenir à la sélection',
    emptyTitle: 'Catalogue en préparation', emptyBody: 'Cette catégorie est définie dans l’architecture Unitalk. Ses premières créations publiables seront ajoutées ici.',
    clear: 'Effacer la recherche', available: 'Disponible', preparation: 'Bientôt disponible',
  },
  en: {
    heroTitle: 'Evolve your AI Collaborator as your needs change.',
    heroAccent: 'as your needs change.',
    heroLead: 'Add new job profiles and skills whenever your needs evolve. They are included at no additional cost.',
    noResults: 'No item matches this search.', showMore: 'View the full catalog', showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation', emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    clear: 'Clear search', available: 'Available', preparation: 'Coming soon',
  },
} as const

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function UnitalkStoreHub() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [activeCategoryId, setActiveCategoryId] = useState(STORE_CATEGORIES[0].id)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [catalogQuery, setCatalogQuery] = useState('')
  const activeCategory = STORE_CATEGORIES.find((category) => category.id === activeCategoryId) ?? STORE_CATEGORIES[0]
  const categoryItems = useMemo(() => itemsForCategory(activeCategory.id, lang), [activeCategory.id, lang])
  const filteredItems = useMemo(() => {
    const query = normalizeSearch(catalogQuery.trim())
    if (!query) return categoryItems
    const tokens = query.split(/\s+/)
    return categoryItems.filter((item) => {
      const haystack = normalizeSearch(`${item.title} ${item.description} ${item.meta} ${item.origin ?? ''}`)
      return tokens.every((token) => haystack.includes(token))
    })
  }, [catalogQuery, categoryItems])
  const visibleItems = filteredItems.slice(0, visibleCount)

  useEffect(() => {
    const selectFromHash = () => {
      const categoryId = window.location.hash.slice(1)
      if (STORE_CATEGORIES.some((category) => category.id === categoryId)) {
        setActiveCategoryId(categoryId)
        setVisibleCount(PAGE_SIZE)
      }
    }
    selectFromHash()
    window.addEventListener('hashchange', selectFromHash)
    return () => window.removeEventListener('hashchange', selectFromHash)
  }, [])

  function selectCategory(categoryId: string, scroll = true) {
    setActiveCategoryId(categoryId)
    setVisibleCount(PAGE_SIZE)
    setCatalogQuery('')
    window.history.replaceState(null, '', `${window.location.pathname}#${categoryId}`)
    if (scroll) requestAnimationFrame(() => document.getElementById('marketplace-results')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }))
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="bg-[#EAE3D4] px-5 pb-12 pt-24 sm:px-8 sm:pb-14 sm:pt-28">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="max-w-5xl text-[clamp(2.8rem,6.4vw,5.8rem)] font-semibold leading-[.86] tracking-[-.07em] text-balance">{t.heroTitle.slice(0, -t.heroAccent.length)}<span className="text-[#D10E63]">{t.heroAccent}</span></h1>
          <p className="mt-7 max-w-2xl text-[16px] leading-7 text-[#4E483F] sm:text-[17px]">{t.heroLead}</p>
        </div>
      </section>

      <div className="sticky top-[76px] z-30 border-y border-[#CFC5B5] bg-[#F3EFE6]/95 px-5 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl overflow-x-auto scrollbar-hide" role="tablist" aria-label={lang === 'fr' ? 'Catégories de la marketplace' : 'Marketplace categories'}>
            {STORE_CATEGORIES.map((category) => {
              const active = activeCategory.id === category.id
              return <button key={category.id} type="button" role="tab" aria-selected={active} aria-controls="marketplace-results" onClick={() => selectCategory(category.id)} className={`relative flex h-16 shrink-0 items-center px-4 text-sm font-semibold transition-colors first:pl-0 sm:h-[72px] sm:px-6 sm:text-[15px] ${active ? 'text-[#1C1A17]' : 'text-[#766D61] hover:text-[#1C1A17]'}`}><span>{category.title[lang]}</span><span className={`absolute inset-x-4 bottom-0 h-[3px] transition-transform first:left-0 ${active ? 'scale-x-100' : 'scale-x-0'}`} style={{ backgroundColor: category.accent }} /></button>
            })}
        </div>
      </div>

      <section id="categories" className="scroll-mt-40 px-5 pb-24 pt-10 sm:px-8 sm:pt-12 lg:pb-32">
        <div className="mx-auto w-full max-w-6xl">
          <div id="marketplace-results" role="tabpanel" className="scroll-mt-[184px]">
               {categoryItems.length > 0 && <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><label className="relative block w-full max-w-md"><span className="sr-only">{activeCategory.search[lang]}</span><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={activeCategory.search[lang]} className="h-12 w-full rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 pr-12 text-sm outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[#857C6E] focus:border-[var(--search-accent)] focus:bg-white focus:ring-4 focus:ring-[#1C1A17]/[.05]" style={{ '--search-accent': activeCategory.accent } as CSSProperties} />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={t.clear} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-lg text-[#625B50] transition-colors hover:bg-[#EAE3D4] hover:text-[#1C1A17]">×</button>}</label><Link href={activeCategory.href} className="inline-flex w-fit shrink-0 items-center border-b border-[#857C6E] pb-1 text-xs font-bold text-[#625B50] transition-colors hover:border-[#1C1A17] hover:text-[#1C1A17]">{activeCategory.explain[lang]}<span aria-hidden="true" className="ml-3">↗</span></Link></div>}

              {visibleItems.length > 0 ? <div className="mt-7 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item) => <MarketplaceItemCard key={item.key} item={item} lang={lang} category={activeCategory} labels={{ details: activeCategory.action[lang], available: t.available, preparation: t.preparation }} />)}</div> : categoryItems.length > 0 ? <div className="mt-7 rounded-2xl border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-10 text-center"><h3 className="text-xl font-bold">{t.noResults}</h3><button type="button" onClick={() => setCatalogQuery('')} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.clear}</button></div> : <div className="mt-7 rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-8"><h3 className="text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>}
              {filteredItems.length > PAGE_SIZE && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= filteredItems.length ? PAGE_SIZE : filteredItems.length)} className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white transition-colors hover:bg-[#332F29]">{visibleCount >= filteredItems.length ? t.showLess : t.showMore}</button></div>}
          </div>
        </div>
      </section>
    </main>
  )
}

function MarketplaceItemCard({ item, lang, category, labels }: { item: MarketplaceItem; lang: Lang; category: Category; labels: { details: string; available: string; preparation: string } }) {
  const content = (
    <>
      <div>
        <h3 className="line-clamp-2 text-[23px] font-semibold leading-[1.08] tracking-[-.04em] text-[#1C1A17]">{item.title}</h3>
        <p className="mt-4 line-clamp-3 text-[13px] leading-6 text-[#625B50]">{item.description}</p>
      </div>
      <div className="mt-auto pt-8">
        <div className="flex items-end justify-between gap-3 border-t border-[#DED6C8] pt-4 transition-colors group-hover:border-[var(--profile-accent)]">
          <span className="text-[10px] font-semibold text-[#766D61]">{item.status?.[lang] ?? (item.pending ? labels.preparation : labels.available)}</span>
          {item.href && <span className="text-xs font-bold text-[#1C1A17] transition-colors group-hover:text-[var(--profile-accent)]">{labels.details}<span aria-hidden="true" className="ml-2">→</span></span>}
        </div>
      </div>
    </>
  )
  const style = { '--profile-accent': category.accent } as CSSProperties
  const className = 'group relative flex min-h-[240px] flex-col overflow-hidden rounded-[16px] border border-[#D8D0C2] bg-[#FBF9F4] p-6 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_18px_45px_-38px_rgba(28,26,23,.8)] sm:min-h-[255px]'
  return item.href ? <Link href={item.href} className={className} style={style}>{content}</Link> : <article className={className} style={style}>{content}</article>
}
