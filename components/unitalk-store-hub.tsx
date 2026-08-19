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
  short: Bi
  description: Bi
  statement: Bi
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
    id: 'profils-metier', title: { fr: 'Profils métier', en: 'Job profiles' }, short: { fr: 'Responsabilité', en: 'Accountability' },
    description: { fr: 'Un profil métier de référence pour chaque métier de la connaissance.', en: 'One reference job profile for every knowledge-work profession.' },
    statement: { fr: 'Donnez-lui un métier. Donc des limites.', en: 'Give it a profession. Therefore, limits.' },
    href: '/collaborateurs-ia/profils-metier', accent: '#C80B5B',
  },
  {
    id: 'competences', title: { fr: 'Compétences', en: 'Skills' }, short: { fr: 'Savoir-faire', en: 'Know-how' },
    description: { fr: 'Des savoir-faire précis, testés, versionnés et réutilisables.', en: 'Precise, tested, versioned and reusable know-how.' },
    statement: { fr: 'Installez des méthodes, pas des tours de magie.', en: 'Install methods, not magic tricks.' },
    href: '/collaborateurs-ia/competences', accent: '#6246B5',
  },
  {
    id: 'applications', title: { fr: 'Applications', en: 'Applications' }, short: { fr: 'Pouvoir d’agir', en: 'Agency' },
    description: { fr: 'Les outils, connecteurs et applications métier autorisés.', en: 'Approved tools, connectors and business applications.' },
    statement: { fr: 'Ouvrez des portes. Jamais toutes les portes.', en: 'Open doors. Never every door.' },
    href: '/collaborateurs-ia/applications', accent: '#B7501E',
  },
  {
    id: 'modeles-ia', title: { fr: 'Modèles IA', en: 'AI models' }, short: { fr: 'Intelligence', en: 'Intelligence' },
    description: { fr: 'Les moteurs autorisés pour raisonner, analyser, produire et agir.', en: 'Approved engines for reasoning, analysis, creation and action.' },
    statement: { fr: 'Changez de moteur sans perdre votre agent.', en: 'Change engines without losing your agent.' },
    href: '/modeles-ia', accent: '#1D6692',
  },
  {
    id: 'serveurs-ia', title: { fr: 'Serveurs IA', en: 'AI servers' }, short: { fr: 'Souveraineté', en: 'Sovereignty' },
    description: { fr: 'Des environnements privés dimensionnés pour vos Collaborateurs IA et leurs applications.', en: 'Private environments sized for your AI Collaborators and their applications.' },
    statement: { fr: 'Son lieu de travail ne devrait appartenir à personne d’autre.', en: 'Its workplace should belong to no one else.' },
    href: '/collaborateurs-ia/serveurs', accent: '#216641',
  },
]

function itemsForCategory(categoryId: string, lang: Lang): MarketplaceItem[] {
  const storeType = categoryId === 'profils-metier' ? 'profil' : categoryId === 'competences' ? 'competence' : null
  if (storeType) {
    return STORE_ITEMS.filter((item) => item.type === storeType).map((item) => ({
      key: `${item.type}-${item.slug}`, title: item.name[lang], description: item.description[lang], href: storeItemHref(item),
      meta: item.roleInOrg?.[lang] ?? item.facet, origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
      status: item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Prêt à installer', en: 'Ready to install' },
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
    heroTitle: 'Faites évoluer votre Collaborateur IA selon vos besoins.',
    heroLead: 'Ajoutez des profils métier et des compétences à tout moment, sans facturation supplémentaire.',
    understand: 'Comprendre cette catégorie', search: 'Rechercher dans cette catégorie',
    noResults: 'Aucune création ne correspond à cette recherche.', showMore: 'Voir tout le catalogue', showLess: 'Revenir à la sélection',
    emptyTitle: 'Catalogue en préparation', emptyBody: 'Cette catégorie est définie dans l’architecture Unitalk. Ses premières créations publiables seront ajoutées ici.',
    categories: 'Catégories', clear: 'Effacer la recherche', details: 'Voir la fiche', available: 'Disponible', preparation: 'Bientôt disponible',
  },
  en: {
    heroTitle: 'Evolve your AI Collaborator as your needs change.',
    heroLead: 'Add job profiles and skills at any time, at no additional cost.',
    understand: 'Understand this category', search: 'Search this category',
    noResults: 'No item matches this search.', showMore: 'View the full catalog', showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation', emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    categories: 'Categories', clear: 'Clear search', details: 'View details', available: 'Available', preparation: 'Coming soon',
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
      <section className="relative bg-[#EAE3D4] px-5 pb-0 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto w-full max-w-6xl border-x border-[#CFC5B5]">
          <div>
            <div className="border-b border-[#CFC5B5] px-5 pb-10 sm:px-10 sm:pb-12 lg:px-14">
              <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[.82] tracking-[-.075em]">{t.heroTitle}</h1>
              <div className="mt-8">
                <p className="max-w-xl text-[15px] leading-7 text-[#4E483F]">{t.heroLead}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-b border-[#CFC5B5] md:grid-cols-5">
            {STORE_CATEGORIES.map((category) => {
              const active = activeCategory.id === category.id
              return <button key={category.id} type="button" aria-pressed={active} onClick={() => selectCategory(category.id)} className={`group relative flex min-h-24 items-end border-r border-[#CFC5B5] p-4 text-left transition-colors last:border-r-0 sm:p-5 ${active ? 'bg-[#1C1A17] text-white' : 'hover:bg-[#1C1A17] hover:text-white'}`}><span className="block text-base font-semibold leading-tight tracking-[-.025em] sm:text-lg">{category.title[lang]}</span><span className={`absolute bottom-0 left-0 h-1 transition-[width] duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} style={{ backgroundColor: category.accent }} /></button>
            })}
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-20 px-5 pb-24 pt-20 sm:px-8 sm:pt-24 lg:pb-32">
        <div className="mx-auto w-full max-w-6xl">
          <div id="marketplace-results" className="scroll-mt-24">
              <div className="overflow-hidden border-y border-[#CFC5B5] bg-[#FAF8F3]">
                <div className="p-5 sm:p-7">
                  {categoryItems.length > 0 && <label className="relative block border-b-2 border-[#1C1A17]"><span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#857C6E]">{lang === 'fr' ? 'Chercher' : 'Search'}</span><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={t.search} className="h-12 w-full bg-transparent pl-24 pr-12 text-sm outline-none placeholder:text-[#9B9284]" />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={t.clear} className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center font-mono text-lg text-[#625B50] hover:text-[#1C1A17]">×</button>}</label>}
                </div>
              </div>

              {visibleItems.length > 0 ? <div className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item) => <MarketplaceItemCard key={item.key} item={item} lang={lang} category={activeCategory} labels={{ details: t.details, available: t.available, preparation: t.preparation }} />)}</div> : categoryItems.length > 0 ? <div className="mt-4 border border-dashed border-[#CFC5B5] p-10 text-center"><h3 className="text-xl font-bold">{t.noResults}</h3><button type="button" onClick={() => setCatalogQuery('')} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.clear}</button></div> : <div className="mt-4 border border-[#D8D0C2] bg-[#FAF8F3] p-8"><h3 className="text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>}
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
        <h3 className="line-clamp-2 text-[25px] font-semibold leading-[1.05] tracking-[-.045em] text-[#1C1A17]">{item.title}</h3>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#625B50]">{item.description}</p>
      </div>
      <div className="mt-auto pt-7">
        <div className="h-px bg-[#DED6C8] transition-colors group-hover:bg-[var(--profile-accent)]" />
        <div className="flex items-center justify-between gap-3 pt-4">
          <span className="flex items-center gap-2 text-[10px] font-semibold text-[#6E665A]"><span className={`size-1.5 rounded-full ${item.pending ? 'bg-[#D78A2D]' : 'bg-[#34865A]'}`} />{item.status?.[lang] ?? (item.pending ? labels.preparation : labels.available)}</span>
          {item.href && <span className="text-xs font-bold text-[#1C1A17] transition-colors group-hover:text-[var(--profile-accent)]">{labels.details}<span aria-hidden="true" className="ml-2">↗</span></span>}
        </div>
      </div>
    </>
  )
  const style = { '--profile-accent': category.accent } as CSSProperties
  const className = 'group relative flex min-h-[250px] flex-col overflow-hidden rounded-[18px] border border-[#D8D0C2] bg-[#FBF9F4] p-6 text-left outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--profile-accent)] hover:bg-[#FFFDF9] hover:shadow-[0_24px_55px_-42px_rgba(28,26,23,.8)] sm:min-h-[270px]'
  return item.href ? <Link href={item.href} className={className} style={style}>{content}</Link> : <article className={className} style={style}>{content}</article>
}
