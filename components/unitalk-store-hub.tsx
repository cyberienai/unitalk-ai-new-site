'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  Search,
  Server,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
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
  icon: LucideIcon
}

type MarketplaceItem = {
  key: string
  title: string
  description: string
  href?: string
  meta: string
  image?: string
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
        id: 'profils-metier',
        title: { fr: 'Profils métier', en: 'Job profiles' },
        short: { fr: 'Responsabilité', en: 'Accountability' },
        description: {
          fr: 'Un profil métier de référence pour chaque métier de la connaissance.',
          en: 'One reference job profile for every knowledge-work profession.',
        },
        statement: { fr: 'Donnez-lui un métier. Donc des limites.', en: 'Give it a profession. Therefore, limits.' },
        href: '/collaborateurs-ia/profils-metier',
        icon: BriefcaseBusiness,
      },
      {
        id: 'competences',
        title: { fr: 'Compétences', en: 'Skills' },
        short: { fr: 'Savoir-faire', en: 'Know-how' },
        description: {
          fr: 'Des savoir-faire précis, testés, versionnés et réutilisables.',
          en: 'Precise, tested, versioned and reusable know-how.',
        },
        statement: { fr: 'Installez des méthodes, pas des tours de magie.', en: 'Install methods, not magic tricks.' },
        href: '/collaborateurs-ia/competences',
        icon: Sparkles,
      },
      {
        id: 'applications',
        title: { fr: 'Applications', en: 'Applications' },
        short: { fr: 'Pouvoir d’agir', en: 'Agency' },
        description: {
          fr: 'Les outils, connecteurs et applications métier autorisés.',
          en: 'Approved tools, connectors and business applications.',
        },
        statement: { fr: 'Ouvrez des portes. Jamais toutes les portes.', en: 'Open doors. Never every door.' },
        href: '/collaborateurs-ia/applications',
        icon: Blocks,
      },
      {
        id: 'modeles-ia',
        title: { fr: 'Modèles IA', en: 'AI models' },
        short: { fr: 'Intelligence', en: 'Intelligence' },
        description: {
          fr: 'Les moteurs autorisés pour raisonner, analyser, produire et agir.',
          en: 'Approved engines for reasoning, analysis, creation and action.',
        },
        statement: { fr: 'Changez de moteur sans perdre votre agent.', en: 'Change engines without losing your agent.' },
        href: '/modeles-ia',
        icon: BrainCircuit,
      },
      {
        id: 'serveurs-ia',
        title: { fr: 'Serveurs IA', en: 'AI servers' },
        short: { fr: 'Souveraineté', en: 'Sovereignty' },
        description: {
          fr: 'Des environnements privés dimensionnés pour vos Collaborateurs IA et leurs applications.',
          en: 'Private environments sized for your AI Collaborators and their applications.',
        },
        statement: { fr: 'Son lieu de travail ne devrait appartenir à personne d’autre.', en: 'Its workplace should belong to no one else.' },
        href: '/collaborateurs-ia/serveurs',
        icon: Server,
      },
]

function itemsForCategory(categoryId: string, lang: Lang): MarketplaceItem[] {
  const storeType = categoryId === 'profils-metier' ? 'profil' : categoryId === 'competences' ? 'competence' : null
  if (storeType) {
    return STORE_ITEMS.filter((item) => item.type === storeType).map((item) => ({
      key: `${item.type}-${item.slug}`,
      title: item.name[lang],
      description: item.description[lang],
      href: storeItemHref(item),
      meta: item.roleInOrg?.[lang] ?? item.facet,
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
      status: item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Prêt à installer', en: 'Ready to install' },
    }))
  }

  if (categoryId === 'applications') {
    return STORE_ITEMS.filter((item) => item.type === 'application' || item.type === 'integration').map((item) => ({
      key: `${item.type}-${item.slug}`,
      title: item.name[lang],
      description: item.description[lang],
      href: storeItemHref(item),
      meta: item.editor ?? (item.type === 'integration' ? (lang === 'fr' ? 'Intégration' : 'Integration') : item.facet),
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
      pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Bientôt disponible', en: 'Coming soon' } : item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Connectable', en: 'Connectable' },
    }))
  }

  if (categoryId === 'modeles-ia') {
    return MODEL_ITEMS.map((item) => ({
      key: item.key,
      title: item.title,
      description: lang === 'fr' ? `Famille de modèles ${item.maker}, disponible selon les droits, les clés et la configuration AI Gateway.` : `${item.maker} model family, available according to permissions, keys and AI Gateway configuration.`,
      meta: item.meta,
      origin: item.maker,
      status: { fr: 'Selon votre fournisseur', en: 'Via your provider' },
    }))
  }

  if (categoryId === 'serveurs-ia') {
    return STORE_ITEMS.filter((item) => item.type === 'server').map((item) => ({
      key: `${item.type}-${item.slug}`,
      title: item.name[lang],
      description: item.description[lang],
      href: storeItemHref(item),
      meta: lang === 'fr' ? 'Infrastructure privée' : 'Private infrastructure',
      origin: 'Unitalk',
      pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Sur demande', en: 'On request' } : { fr: 'Provisionnable', en: 'Provisionable' },
    }))
  }

  return []
}

const COPY = {
  fr: {
    categoriesKicker: 'Catalogue',
    categoriesTitle: 'Tout l’équipement de votre Collaborateur IA.',
    categoriesLead: 'Choisissez une catégorie dans la barre latérale, recherchez un élément et ouvrez sa fiche pour vérifier son rôle, sa compatibilité et ses conditions d’utilisation.',
    unitalkOrigin: 'Univers Unitalk',
    understand: 'Comprendre cette catégorie',
    search: 'Rechercher dans cette catégorie',
    noResults: 'Aucune création ne correspond à cette recherche.',
    showMore: 'Voir tout le catalogue',
    showLess: 'Revenir à la sélection',
    emptyTitle: 'Catalogue en préparation',
    emptyBody: 'Cette catégorie est définie dans l’architecture Unitalk. Ses premières créations publiables seront ajoutées ici.',
    items: 'disponibles',
  },
  en: {
    categoriesKicker: 'Catalog',
    categoriesTitle: 'Everything your AI Collaborator needs.',
    categoriesLead: 'Choose a category in the sidebar, search for an item and open its page to review its role, compatibility and usage terms.',
    unitalkOrigin: 'Unitalk universe',
    understand: 'Understand this category',
    search: 'Search this category',
    noResults: 'No item matches this search.',
    showMore: 'View the full catalog',
    showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation',
    emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    items: 'available',
  },
} as const

export function UnitalkStoreHub() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [activeCategoryId, setActiveCategoryId] = useState(STORE_CATEGORIES[0].id)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [catalogQuery, setCatalogQuery] = useState('')
  const activeCategory = STORE_CATEGORIES.find((category) => category.id === activeCategoryId) ?? STORE_CATEGORIES[0]
  const categoryItems = useMemo(() => itemsForCategory(activeCategory.id, lang), [activeCategory.id, lang])
  const filteredItems = useMemo(() => {
    const query = catalogQuery.trim().toLocaleLowerCase(lang)
    if (!query) return categoryItems
    return categoryItems.filter((item) => `${item.title} ${item.description} ${item.meta} ${item.origin ?? ''}`.toLocaleLowerCase(lang).includes(query))
  }, [catalogQuery, categoryItems, lang])
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

  function selectCategory(categoryId: string) {
    setActiveCategoryId(categoryId)
    setVisibleCount(PAGE_SIZE)
    setCatalogQuery('')
    window.history.replaceState(null, '', `${window.location.pathname}#${categoryId}`)
    requestAnimationFrame(() => document.getElementById('marketplace-results')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }))
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section id="categories" className="scroll-mt-20 px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.categoriesKicker}</p>
            <h2 className="mt-3 max-w-3xl text-[clamp(2.3rem,4.4vw,4.7rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.categoriesTitle}</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#625B50]">{t.categoriesLead}</p>
          </div>
          <div className="flex gap-8 lg:gap-10">
            <aside className="hidden w-[220px] shrink-0 lg:block xl:w-[232px]">
              <div className="sticky top-24">
                <p className="mb-2 px-2.5 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#857C6E]">{lang === 'fr' ? 'Catégories' : 'Categories'}</p>
                <nav aria-label={lang === 'fr' ? 'Catégories du Store' : 'Store categories'} className="space-y-0.5">
                  {STORE_CATEGORIES.map((category, index) => {
                    const Icon = category.icon
                    void index
                    return <button key={category.id} type="button" aria-pressed={activeCategory.id === category.id} onClick={() => selectCategory(category.id)} className={`flex w-full items-center gap-2 rounded-[7px] px-2.5 py-2 text-left text-[13px] leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 ${activeCategory.id === category.id ? 'bg-[#FCEAF2] font-semibold text-[#AD0C53]' : 'text-[#6E665A] hover:bg-[#1C1A17]/[.04] hover:text-[#1C1A17]'}`}>
                      <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.7} /><span>{category.title[lang]}</span>
                    </button>
                  })}
                </nav>
                <div className="mt-7 border-t border-[#DED6C8] pt-5">
                  <p className="px-2.5 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#857C6E]">{lang === 'fr' ? 'À propos' : 'About'}</p>
                  <p className="mt-2 px-2.5 text-xs leading-5 text-[#766D61]">{activeCategory.statement[lang]}</p>
                  <Link href={activeCategory.href} className="mt-3 inline-flex items-center gap-1.5 px-2.5 text-xs font-bold text-[#B00C54]">{t.understand}<ArrowUpRight className="size-3.5" /></Link>
                </div>
              </div>
            </aside>
            <div id="marketplace-results" className="min-w-0 flex-1 scroll-mt-24">
              <div className="lg:hidden">
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {STORE_CATEGORIES.map((category) => <button key={category.id} type="button" onClick={() => selectCategory(category.id)} aria-pressed={activeCategory.id === category.id} className={`min-h-9 shrink-0 rounded-full px-3.5 text-xs font-semibold ${activeCategory.id === category.id ? 'bg-[#FCEAF2] text-[#AD0C53]' : 'border border-[#D8D0C2] text-[#4E483F]'}`}>{category.title[lang]}</button>)}
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mt-0">
                <div><h3 className="text-2xl font-semibold tracking-[-.035em]">{activeCategory.title[lang]}</h3><p className="mt-1 max-w-xl text-sm leading-6 text-[#625B50]">{activeCategory.description[lang]}</p></div>
                <p className="shrink-0 text-sm font-semibold text-[#4E483F]">{filteredItems.length} {t.items}</p>
              </div>
              {categoryItems.length > 0 && <label className="relative mt-5 block max-w-sm"><span className="sr-only">{t.search}</span><Search aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6E665A]" /><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={t.search} className="h-11 w-full rounded-full border border-[#D8D0C2] bg-[#FFFDF9] pl-11 pr-11 text-sm outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15" />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={lang === 'fr' ? 'Effacer la recherche' : 'Clear search'} className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-[#857C6E] hover:bg-[#EEE8DD]"><X className="size-4" /></button>}</label>}
              {visibleItems.length > 0 ? <div className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item, index) => <MarketplaceItemCard key={item.key} item={item} lang={lang} index={index} category={activeCategory} />)}</div> : categoryItems.length > 0 ? <div className="mt-6 rounded-3xl border border-dashed border-[#CFC5B5] p-10 text-center"><Search className="mx-auto size-6 text-[#857C6E]" /><h3 className="mt-5 text-xl font-bold">{t.noResults}</h3><button type="button" onClick={() => setCatalogQuery('')} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}</button></div> : <div className="mt-6 rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-8"><UnitalkLogo size={32} activeSegment={0} inactiveColor="#C9BFB0" /><h3 className="mt-6 text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>}
              {filteredItems.length > PAGE_SIZE && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= filteredItems.length ? PAGE_SIZE : filteredItems.length)} className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white hover:bg-[#332F29]">{visibleCount >= filteredItems.length ? t.showLess : t.showMore}</button></div>}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

function MarketplaceItemCard({ item, lang, index, category }: { item: MarketplaceItem; lang: Lang; index: number; category: Category }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        {item.image ? <Image src={item.image} alt="" width={44} height={44} className="size-11 rounded-full object-cover shadow-sm" /> : <span className="flex size-11 items-center justify-center rounded-2xl bg-[#EEE8DD]"><UnitalkLogo size={25} activeSegment={index % 4} inactiveColor="#C9BFB0" /></span>}
        <span className="rounded-full bg-[#EDE7DA] px-2.5 py-1 text-[10px] font-semibold text-[#6E665A]">{item.origin ?? 'Unitalk'}</span>
      </div>
      <p className="mt-5 line-clamp-2 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-[#B00C54]">{category.short[lang]} · {item.meta}</p>
      <h3 className="mt-2 line-clamp-2 text-[21px] font-semibold leading-[1.18] tracking-[-.03em]">{item.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#4E483F]">{item.description}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#DED6C8] pt-4">
        <span className="text-[11px] font-semibold text-[#6E665A]">{item.status?.[lang] ?? (item.pending ? (lang === 'fr' ? 'En préparation' : 'In preparation') : (lang === 'fr' ? 'Disponible' : 'Available'))}</span>
        {item.href && <span className="ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#D10E63] px-3.5 text-[12px] font-bold text-white transition-colors group-hover:bg-[#B00C54]">{lang === 'fr' ? 'Voir la fiche' : 'View details'}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>}
      </div>
    </>
  )

  const className = 'group relative flex min-h-[280px] flex-col overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#FAF8F3] p-6 text-left shadow-[0_24px_60px_-52px_rgba(28,26,23,.75)] outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-[#D10E63] before:transition-transform before:duration-300 hover:-translate-y-1 hover:border-[#D10E63]/35 hover:bg-[#FFFDF9] hover:shadow-[0_28px_65px_-42px_rgba(28,26,23,.35)] hover:before:scale-x-100 focus-visible:ring-2 focus-visible:ring-[#D10E63]'
  return item.href ? <Link href={item.href} className={className}>{content}</Link> : <article className={className}>{content}</article>
}
