'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
} from 'lucide-react'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'
import { AnonymousOnly, UserMenuDesktop, UserMenuMobile } from './auth/user-menu'
import { useAlma } from '@/lib/alma-context'

type Bi = { fr: string; en: string }

const ALMA_CTA = {
  href: '/missions?composer=1&source=nav',
  label: { fr: 'Décrire une mission', en: 'Describe a mission' } as Bi,
}

// Marketplace dropdown: one entry point for every way to discover,
// equip or contribute an AI Collaborator.
type MenuEntry = { title: Bi; desc: Bi; href: string }
type MenuAction = { title: Bi; href: string }

const MARKETPLACE_FEATURED: MenuEntry = {
  title: { fr: 'La Marketplace des Collaborateurs IA', en: 'The AI Collaborator Marketplace' },
  desc: {
    fr: 'Des missions, des profils, des compétences et des applications pour faire évoluer votre Collaborateur IA.',
    en: 'Missions, profiles, skills and applications to help your AI Collaborator evolve.',
  },
  href: '/marketplace',
}

const COLLABORATOR_EXPLAINER = {
  title: { fr: 'Qu’est-ce qu’un Collaborateur IA ?', en: 'What is an AI Collaborator?' } as Bi,
  desc: {
    fr: 'Identité durable, missions, compétences et contrôle humain.',
    en: 'Durable identity, missions, skills and human control.',
  } as Bi,
  href: '/collaborateurs-ia',
}

const MARKETPLACE_CATALOGS: MenuEntry[] = [
  { title: { fr: 'Missions', en: 'Missions' }, desc: { fr: 'Le travail à accomplir.', en: 'The work to be done.' }, href: '/missions' },
  { title: { fr: 'Profils métier', en: 'Job profiles' }, desc: { fr: 'Les responsabilités durables.', en: 'Lasting responsibilities.' }, href: '/collaborateurs-ia/profils-metier' },
  { title: { fr: 'Compétences', en: 'Skills' }, desc: { fr: 'Les méthodes réutilisables.', en: 'Reusable methods.' }, href: '/collaborateurs-ia/competences' },
  { title: { fr: 'Applications', en: 'Applications' }, desc: { fr: 'Les outils de travail.', en: 'Tools for the work.' }, href: '/collaborateurs-ia/applications' },
  { title: { fr: 'Intégrations', en: 'Integrations' }, desc: { fr: 'Les services connectés.', en: 'Connected services.' }, href: '/collaborateurs-ia/integrations' },
  { title: { fr: 'Modèles IA', en: 'AI models' }, desc: { fr: 'Les intelligences autorisées.', en: 'Authorized intelligences.' }, href: '/modeles-ia' },
]

const MARKETPLACE_BUILD: MenuEntry[] = [
  { title: { fr: 'Co-créateur IA', en: 'AI Co-creator' }, desc: { fr: 'Créer et commercialiser.', en: 'Create and commercialize.' }, href: '/co-createur-ia' },
  { title: { fr: 'Unitalk Academy', en: 'Unitalk Academy' }, desc: { fr: 'Se former sur le travail réel.', en: 'Learn through real work.' }, href: '/academy' },
  { title: { fr: 'Experts', en: 'Experts' }, desc: { fr: 'Être accompagné.', en: 'Get expert support.' }, href: '/experts' },
  { title: { fr: 'Partenaires', en: 'Partners' }, desc: { fr: 'Déployer chez vos clients.', en: 'Deploy for your clients.' }, href: '/partenaires' },
]

const COLLAB_ACTIONS: MenuAction[] = [
  { title: { fr: 'Recommandés', en: 'Recommended' }, href: '/blog/hermes-agent-youtube' },
  { title: { fr: 'Pourquoi Unitalk ?', en: 'Why Unitalk?' }, href: '/collaborateurs-ia/pourquoi-unitalk' },
]

const T = {
  fr: {
    home: 'Accueil Unitalk AI',
    signIn: 'Connexion',
    pricing: 'Tarifs',
    workspace: 'Workspace',
    missions: 'Missions',
    partners: 'Partenaires',
    collaborators: 'Marketplace IA',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    collabMenu: 'Menu Marketplace IA',
    menuDiscover: 'Comprendre',
    menuAccompaniment: 'Participer',
    menuFeatured: 'Ouverte à la communauté',
    menuEquip: 'Explorer',
    menuResources: 'Ressources',
    menuStore: 'Ouvrir la Marketplace IA',
    menuMarketplace: 'Explorer la Marketplace',
    menuCatalog: 'Catalogue',
    menuBuild: 'Créer & développer',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    pricing: 'Pricing',
    workspace: 'Workspace',
    missions: 'Missions',
    partners: 'Partners',
    collaborators: 'AI Marketplace',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    collabMenu: 'AI Marketplace menu',
    menuDiscover: 'Understand',
    menuAccompaniment: 'Participate',
    menuFeatured: 'Open to the community',
    menuEquip: 'Explore',
    menuResources: 'Resources',
    menuStore: 'Open the AI Marketplace',
    menuMarketplace: 'Explore the Marketplace',
    menuCatalog: 'Catalog',
    menuBuild: 'Create & grow',
  },
}

function FrenchFlag() {
  return (
    <span aria-hidden="true" className="inline-flex overflow-hidden rounded-sm border border-[#DcD4C4]">
      <span className="h-4 w-[6px] bg-[#0055A4]" />
      <span className="h-4 w-[6px] bg-white" />
      <span className="h-4 w-[6px] bg-[#EF4135]" />
    </span>
  )
}

function UkFlag() {
  return (
    <span aria-hidden="true" className="inline-block h-4 w-[18px] overflow-hidden rounded-sm border border-[#DcD4C4]">
      <svg viewBox="0 0 60 30" className="h-full w-full">
        <clipPath id="uk-clip">
          <rect width="60" height="30" />
        </clipPath>
        <g clipPath="url(#uk-clip)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-clip)" />
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    </span>
  )
}

function MarketplaceMenuLink({ entry, index, lang, onSelect, compact = false }: { entry: MenuEntry; index: number; lang: 'fr' | 'en'; onSelect: () => void; compact?: boolean }) {
  return <a href={entry.href} role="menuitem" onClick={onSelect} className={`group flex items-center gap-3 rounded-xl border border-transparent outline-none transition-colors hover:border-[#D8D0C2] hover:bg-white focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${compact ? 'min-h-[58px] px-3 py-2' : 'min-h-[70px] px-3 py-2.5'}`}><UnitalkLogo size={compact ? 18 : 20} activeSegment={index % 8} color="#D10E63" inactiveColor="#C5BBAB" className="shrink-0" /><span className="min-w-0"><strong className="block text-[14px] font-bold leading-5 text-[#1C1A17] transition-colors group-hover:text-[#B00C54]">{entry.title[lang]}</strong><span className="mt-0.5 block text-[12px] leading-[1.35] text-[#5F574D]">{entry.desc[lang]}</span></span></a>
}

function MobileMarketplaceLink({ entry, index, lang, onSelect }: { entry: MenuEntry; index: number; lang: 'fr' | 'en'; onSelect: () => void }) {
  return <a href={entry.href} onClick={onSelect} className="group flex min-h-12 items-center gap-3 border-b border-[#E4DDCE] py-2.5 last:border-b-0"><UnitalkLogo size={18} activeSegment={index % 8} color="#D10E63" inactiveColor="#CFC5B5" className="shrink-0" /><span><span className="block text-[13px] font-bold text-[#1C1A17] group-hover:text-[#B00C54]">{entry.title[lang]}</span><span className="mt-0.5 block text-[10.5px] text-[#766D61]">{entry.desc[lang]}</span></span></a>
}

/** Desktop primary nav link with hover/focus/active states.
 *  `overDark` = transparent navbar sitting over a dark hero → light-on-dark colors. */
function NavItem({
  href,
  active,
  overDark,
  onClick,
  children,
}: {
  href: string
  active: boolean
  overDark: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
}) {
  const color = active
    ? overDark
      ? 'text-[#F5679D]'
      : 'text-[#D10E63]'
    : overDark
      ? 'text-[#D7D0C4] hover:text-[#FBF9F3]'
      : 'text-[#857C6E] hover:text-[#1C1A17]'
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${color}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px rounded-full transition-opacity duration-200 ${
          overDark ? 'bg-[#F5679D]' : 'bg-[#D10E63]'
        } ${active ? 'opacity-100' : 'opacity-0'}`}
      />
    </a>
  )
}

export function Navbar(
  { darkHero = false }: { ctaLabel?: Bi; ctaShortLabel?: Bi; darkHero?: boolean } = {},
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [collabOpen, setCollabOpen] = useState(false)
  const [mobileCollabOpen, setMobileCollabOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const collabRef = useRef<HTMLDivElement | null>(null)
  const collabButtonRef = useRef<HTMLButtonElement | null>(null)
  // Hover intent: small close delay so moving from trigger to panel doesn't flicker.
  const collabHoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openCollabHover = () => {
    if (collabHoverTimeout.current) clearTimeout(collabHoverTimeout.current)
    setCollabOpen(true)
  }
  const closeCollabHover = () => {
    if (collabHoverTimeout.current) clearTimeout(collabHoverTimeout.current)
    collabHoverTimeout.current = setTimeout(() => setCollabOpen(false), 120)
  }
  const { lang, setLang } = useLanguage()
  const { setLauncherSuppressed } = useAlma()
  const t = T[lang]
  const pathname = usePathname() || '/'

  // The header is transparent only until the page scrolls or a panel opens.
  // While transparent over a dark hero, switch to light-on-dark link colors
  // so labels and hover states stay legible.
  const overDark = darkHero && !scrolled && !isMenuOpen && !collabOpen

  // The Marketplace owns every catalog and community path grouped in its menu.
  const marketplacePrefixes = ['/marketplace', '/collaborateurs-ia', '/modeles-ia', '/academy', '/experts', '/missions', '/co-createur-ia']
  const isCollabActive = marketplacePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  const isWorkspaceActive = pathname === '/workspace' || pathname.startsWith('/workspace/')
  const isPricingActive = pathname === '/tarifs'

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile) document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    setLauncherSuppressed(collabOpen)
    return () => setLauncherSuppressed(false)
  }, [collabOpen, setLauncherSuppressed])

  // Subtle bottom border once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Collaborateurs IA dropdown: close on outside click
  useEffect(() => {
    if (!collabOpen) return
    const onDown = (e: MouseEvent) => {
      if (collabRef.current && !collabRef.current.contains(e.target as Node)) setCollabOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [collabOpen])

  // Collaborateurs IA dropdown: close on Escape and return focus to the button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && collabOpen) {
        setCollabOpen(false)
        collabButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [collabOpen])

  // Clear any pending hover-close timer on unmount
  useEffect(() => () => {
    if (collabHoverTimeout.current) clearTimeout(collabHoverTimeout.current)
  }, [])

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled || isMenuOpen || collabOpen
            ? 'border-[#1C1A17]/[0.08] bg-[#F3EFE6]/96 backdrop-blur-[16px]'
            : 'border-transparent bg-transparent backdrop-blur-0'
        }`}
      >
        <nav className="editorial-shell flex h-[76px] items-center justify-between">
          {/* Group 1 — Identity + Group 2 — Navigation */}
          <div className="flex items-center gap-8 xl:gap-10">
            <a href="/" aria-label={t.home} className="flex items-center gap-2 sm:gap-3">
              <UnitalkLogo size={24} />
              <span
                className={`font-inter text-sm font-semibold transition-colors sm:text-base ${
                  overDark ? 'text-[#FBF9F3]' : 'text-[#1C1A17]'
                }`}
              >
                Unitalk
              </span>
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              <NavItem href="/missions" active={pathname === '/missions' || pathname.startsWith('/missions/')} overDark={overDark}>
                {t.missions}
              </NavItem>
              {/* Marketplace IA — every way to find, equip or contribute a Collaborateur IA */}
              <div
                ref={collabRef}
                className="relative"
                onMouseEnter={openCollabHover}
                onMouseLeave={closeCollabHover}
              >
                <button
                  ref={collabButtonRef}
                  type="button"
                  id="collab-trigger"
                  onClick={() => setCollabOpen((open) => !open)}
                  aria-expanded={collabOpen}
                  aria-haspopup="true"
                  aria-controls="collab-menu"
                  aria-current={isCollabActive ? 'page' : undefined}
                  className={`relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
                    isCollabActive || collabOpen
                      ? overDark
                        ? 'text-[#F5679D]'
                        : 'text-[#D10E63]'
                      : overDark
                        ? 'text-[#D7D0C4] hover:text-[#FBF9F3]'
                        : 'text-[#857C6E] hover:text-[#1C1A17]'
                  }`}
                >
                  {t.collaborators}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${collabOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px rounded-full transition-opacity duration-200 ${
                      overDark ? 'bg-[#F5679D]' : 'bg-[#D10E63]'
                    } ${isCollabActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                </button>

                <AnimatePresence>
                  {collabOpen && (
                    <motion.div
                      id="collab-menu"
                      role="menu"
                      aria-labelledby="collab-trigger"
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: 'top left' }}
                      className="absolute -left-[170px] top-full w-[980px] max-w-[calc(100vw-2rem)] pt-3"
                    >
                      <div className="overflow-hidden rounded-[26px] border border-[#D7CFC1] bg-[#F8F5EE] text-[#1C1A17] shadow-[0_32px_80px_-24px_rgba(28,26,23,.35)] ring-1 ring-white/80">
                        <div className="flex items-center justify-between gap-8 border-b border-[#DED6C8] px-6 py-5">
                          <div className="flex min-w-0 items-center gap-4">
                            <UnitalkLogo size={32} activeSegment={0} color="#D10E63" inactiveColor="#D2C9BA" className="shrink-0" />
                            <div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.menuFeatured}</p><h2 className="mt-1 text-[22px] font-bold tracking-[-.035em]">{MARKETPLACE_FEATURED.title[lang]}</h2><p className="mt-1 text-[13px] leading-5 text-[#5F574D]">{MARKETPLACE_FEATURED.desc[lang]}</p></div>
                          </div>
                          <a href={MARKETPLACE_FEATURED.href} role="menuitem" onClick={() => setCollabOpen(false)} className="group inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-[#181615] px-5 text-xs font-bold text-white outline-none transition-colors hover:bg-[#332F29] focus-visible:ring-2 focus-visible:ring-[#D10E63]">{t.menuMarketplace}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></a>
                        </div>

                        <div className="grid grid-cols-[1fr_310px] divide-x divide-[#DED6C8]">
                          <div className="p-5">
                            <div className="flex items-center justify-between px-3 pb-3"><p className="font-mono text-[11px] font-black uppercase tracking-[.16em] text-[#6E665A]">{t.menuCatalog}</p><a href={COLLABORATOR_EXPLAINER.href} onClick={() => setCollabOpen(false)} className="text-[12px] font-bold text-[#B00C54] underline-offset-4 hover:underline">{lang === 'fr' ? 'Comprendre le Collaborateur IA' : 'Understand the AI Collaborator'}</a></div>
                            <div className="grid grid-cols-2 gap-1">
                              {MARKETPLACE_CATALOGS.map((entry, index) => <MarketplaceMenuLink key={entry.href} entry={entry} index={index} lang={lang} onSelect={() => setCollabOpen(false)} />)}
                            </div>
                          </div>

                          <div className="bg-[#F0EBE1] p-5">
                            <p className="px-3 pb-3 font-mono text-[11px] font-black uppercase tracking-[.16em] text-[#6E665A]">{t.menuBuild}</p>
                            <div className="space-y-1">
                              {MARKETPLACE_BUILD.map((entry, index) => <MarketplaceMenuLink key={entry.href} entry={entry} index={index + 4} lang={lang} compact onSelect={() => setCollabOpen(false)} />)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#DED6C8] bg-[#FFFDF9] px-6 py-3.5">
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-bold text-[#4E483F]">
                            <a href="/tarifs" onClick={() => setCollabOpen(false)} className="text-[#1C1A17] hover:text-[#B00C54]">{t.pricing}</a>
                            {COLLAB_ACTIONS.map((item) => <a key={item.href} href={item.href} onClick={() => setCollabOpen(false)} className="hover:text-[#B00C54]">{item.title[lang]}</a>)}
                            <a href="/documentation" onClick={() => setCollabOpen(false)} className="hover:text-[#B00C54]">Documentation</a>
                          </div>
                          <a href="/co-createur-ia" onClick={() => setCollabOpen(false)} className="shrink-0 text-[13px] font-bold text-[#B00C54] underline-offset-4 hover:underline">{lang === 'fr' ? 'Créer pour la Marketplace →' : 'Create for the Marketplace →'}</a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavItem href="/workspace" active={isWorkspaceActive} overDark={overDark}>
                {t.workspace}
              </NavItem>
              <NavItem href="/partenaires" active={pathname === '/partenaires' || pathname.startsWith('/partenaires/')} overDark={overDark}>
                {t.partners}
              </NavItem>
              <NavItem href="/tarifs" active={isPricingActive} overDark={overDark}>
                {t.pricing}
              </NavItem>
            </div>
          </div>

          {/* Group 3 — Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLang}
              className={`hidden items-center gap-1.5 rounded-md px-1.5 py-2 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 lg:inline-flex ${
                overDark ? 'text-[#EDE8DE] hover:text-[#FBF9F3]' : 'text-[#1C1A17] hover:text-[#D10E63]'
              }`}
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>

            <UserMenuDesktop
              overDark={overDark}
              anonymousAction={
                <a
                  href={ALMA_CTA.href}
                  className={`hidden h-10 items-center justify-center rounded-full px-5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 lg:inline-flex ${
                    overDark
                      ? 'bg-[#FBF9F3] text-[#1C1A17] hover:bg-[#EAE3D4] focus-visible:ring-[#FBF9F3]/60 focus-visible:ring-offset-transparent'
                      : 'bg-[#1C1A17] text-[#FBF9F3] hover:bg-[#332F29] focus-visible:ring-[#1C1A17]/40 focus-visible:ring-offset-[#F3EFE6]'
                  }`}
                >
                  {ALMA_CTA.label[lang]}
                </a>
              }
            />

            {/* Mobile burger */}
            <button
              onClick={() => {
                if (isMenuOpen) setMobileCollabOpen(false)
                setIsMenuOpen((v) => !v)
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DcD4C4] bg-[#FBF9F3] text-[#1C1A17] transition-colors hover:bg-[#EAE3D4] lg:hidden"
              aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="menu-panel"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile burger panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 top-[76px] z-30 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              id="menu-panel"
              className="fixed inset-x-0 bottom-0 top-[76px] z-40 flex flex-col overflow-hidden bg-[#F3EFE6] lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Scrollable link area — leaves the CTA footer always visible */}
              <nav className="scrollbar-hide flex-1 overflow-y-auto overflow-x-hidden px-6 py-2">
                {/* Primary links — same structure as desktop */}
                <div className="divide-y divide-[#E4DDCE]">
                  {/* Marketplace IA — collapsible so the menu stays short */}
                  <a href="/missions" onClick={() => setIsMenuOpen(false)} className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]">{t.missions}</a>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => setMobileCollabOpen((v) => !v)}
                      aria-expanded={mobileCollabOpen}
                      aria-controls="mobile-collab-sub"
                      className="flex min-h-11 w-full items-center justify-between text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                    >
                      {t.collaborators}
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-4 w-4 text-[#6B6252] transition-transform duration-200 ${mobileCollabOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileCollabOpen && (
                        <motion.div
                          id="mobile-collab-sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                           <div className="ml-1 flex flex-col border-l border-[#DcD4C4] pb-2 pl-4">
                             <div className="relative my-3 overflow-hidden rounded-2xl bg-[#181615] p-4 text-[#FAF8F3]">
                              <span aria-hidden="true" className="absolute -right-8 -top-10 size-28 rounded-full bg-[#D10E63]/25 blur-2xl" />
                               <a href={MARKETPLACE_FEATURED.href} onClick={() => setIsMenuOpen(false)} className="relative flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5]"><UnitalkLogo size={28} activeSegment={0} color="#F2A4C5" inactiveColor="#514A43" /><span className="block text-[14px] font-bold">{MARKETPLACE_FEATURED.title[lang]}</span></a>
                             </div>
                              <a href={COLLABORATOR_EXPLAINER.href} onClick={() => setIsMenuOpen(false)} className="my-2 flex rounded-xl border border-[#D8D0C2] bg-[#FAF8F3] p-4 text-left"><span><span className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#B00C54]">{t.menuDiscover}</span><span className="mt-2 block text-sm font-bold text-[#1C1A17]">{COLLABORATOR_EXPLAINER.title[lang]}</span><span className="mt-1.5 block text-xs leading-5 text-[#625B50]">{COLLABORATOR_EXPLAINER.desc[lang]}</span></span><ArrowRight className="ml-auto mt-1 size-4 shrink-0 text-[#D10E63]" /></a>
                              <p className="px-1 pb-1 pt-3 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{t.menuCatalog}</p>
                              <div className="grid grid-cols-2 gap-x-4">
                                {MARKETPLACE_CATALOGS.map((entry, index) => <MobileMarketplaceLink key={entry.href} entry={entry} index={index} lang={lang} onSelect={() => setIsMenuOpen(false)} />)}
                              </div>
                              <p className="px-1 pb-1 pt-4 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{t.menuBuild}</p>
                              <div>
                                {MARKETPLACE_BUILD.map((entry, index) => <MobileMarketplaceLink key={entry.href} entry={entry} index={index + 4} lang={lang} onSelect={() => setIsMenuOpen(false)} />)}
                              </div>
                             <div className="my-1.5 border-t border-[#E4DDCE]" />
                            {COLLAB_ACTIONS.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex min-h-10 items-center gap-1.5 text-[14px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                              >
                                {item.title[lang]}
                                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-[#D10E63]" />
                              </a>
                            ))}
                            <a href="/documentation" onClick={() => setIsMenuOpen(false)} className="flex min-h-10 items-center text-[14px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]">Documentation</a>
                             <a href={MARKETPLACE_FEATURED.href} onClick={() => setIsMenuOpen(false)} className="mt-2 flex min-h-11 items-center justify-between rounded-xl bg-[#D10E63] px-4 text-sm font-bold text-white">{t.menuMarketplace}<ArrowRight className="size-4" /></a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <a
                    href="/workspace"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.workspace}
                  </a>
                  <a href="/partenaires" onClick={() => setIsMenuOpen(false)} className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]">
                    {t.partners}
                  </a>
                  <a
                    href="/tarifs"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.pricing}
                  </a>
                  <UserMenuMobile onNavigate={() => setIsMenuOpen(false)} />
                  <button
                    onClick={toggleLang}
                    className="flex min-h-11 w-full items-center gap-2 text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                    aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                  >
                    {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
                    {lang === 'fr' ? 'Français — FR' : 'English — EN'}
                  </button>
                </div>

                {/* Contact */}
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-[#E4DDCE] pt-3">
                  <a
                    href="tel:+33189713394"
                    className="group flex items-center gap-2 py-1 text-[13px] font-medium text-[#4E483F] transition-colors hover:text-[#1C1A17]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#D10E63]">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="underline underline-offset-2">01 89 71 33 94</span>
                  </a>
                  <a
                    href="mailto:hello@unitalk.ai"
                    className="group flex items-center gap-2 py-1 text-[13px] font-medium text-[#4E483F] transition-colors hover:text-[#1C1A17]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#D10E63]">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                    <span className="underline underline-offset-2">hello@unitalk.ai</span>
                  </a>
                </div>
              </nav>

              {/* Sticky CTA footer — always visible above the fold */}
              <AnonymousOnly>
                <div className="shrink-0 border-t border-[#DcD4C4] bg-[#F3EFE6] px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
                  <a
                    href={ALMA_CTA.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-5 py-3 text-[15px] font-bold text-[#FBF9F3] shadow-[0_8px_24px_-8px_rgba(209,14,99,0.5)] transition-colors hover:bg-[#B10B53]"
                  >
                    {ALMA_CTA.label[lang]}
                  </a>
                </div>
              </AnonymousOnly>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
