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
  label: { fr: 'Décrire mon besoin', en: 'Describe my need' } as Bi,
}

// Focused Collaborateurs IA menu. Infrastructure remains available deeper in
// the product and documentation, not in the launch navigation.
type MenuEntry = { title: Bi; desc: Bi; href: string }
type MenuAction = { title: Bi; href: string }

const COLLAB_DISCOVER: MenuEntry[] = [
  { title: { fr: 'Qu’est-ce qu’un Collaborateur IA ?', en: 'What is an AI Collaborator?' }, desc: { fr: 'Identité, organisation et ressources.', en: 'Identity, organization and resources.' }, href: '/collaborateurs-ia' },
  { title: { fr: 'Alma', en: 'Alma' }, desc: { fr: 'Personnalise et coordonne.', en: 'Customizes and coordinates.' }, href: '/collaborateurs-ia/alma' },
  { title: { fr: 'Profils métier', en: 'Job profiles' }, desc: { fr: 'Les responsabilités disponibles.', en: 'Available responsibilities.' }, href: '/collaborateurs-ia/profils-metier' },
  { title: { fr: 'Comparatif', en: 'Comparison' }, desc: { fr: 'Assistants, agents et Collaborateurs IA.', en: 'Assistants, agents and AI Collaborators.' }, href: '/collaborateurs-ia/comparatif' },
]

const COLLAB_WORK: MenuEntry[] = [
  { title: { fr: 'Compétences', en: 'Skills' }, desc: { fr: 'Les méthodes qu’il peut réutiliser.', en: 'Methods it can reuse.' }, href: '/collaborateurs-ia/competences' },
  { title: { fr: 'Applications', en: 'Applications' }, desc: { fr: 'Les outils qu’il est autorisé à utiliser.', en: 'Tools it is authorized to use.' }, href: '/collaborateurs-ia/applications' },
  { title: { fr: 'Serveurs privés', en: 'Private servers' }, desc: { fr: 'Son environnement de travail privé.', en: 'Its private working environment.' }, href: '/collaborateurs-ia/serveurs' },
  { title: { fr: 'Modèles IA', en: 'AI models' }, desc: { fr: 'Les modèles et capacités autorisés.', en: 'Authorized models and capacities.' }, href: '/modeles-ia' },
]

const COLLAB_ACTIONS: MenuAction[] = [
  { title: { fr: 'Hermes open source', en: 'Open-source Hermes' }, href: '/blog/hermes-agent-youtube' },
  { title: { fr: 'Serveurs privés', en: 'Private servers' }, href: '/collaborateurs-ia/serveurs' },
  { title: { fr: 'Academy', en: 'Academy' }, href: '/academy' },
]

const T = {
  fr: {
    home: 'Accueil Unitalk AI',
    signIn: 'Connexion',
    pricing: 'Tarifs',
    workspace: 'Workspace',
    marketplace: 'Marketplace',
    missions: 'Missions',
    partners: 'Partenaires',
    collaborators: 'Collaborateurs IA',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    collabMenu: 'Menu Collaborateurs IA',
    menuDiscover: 'Comprendre',
    menuDeploy: 'Équiper',
    menuStore: 'Explorer toute la Marketplace',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    pricing: 'Pricing',
    workspace: 'Workspace',
    marketplace: 'Marketplace',
    missions: 'Missions',
    partners: 'Partners',
    collaborators: 'AI Collaborators',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    collabMenu: 'AI Collaborators menu',
    menuDiscover: 'Understand',
    menuDeploy: 'Equip',
    menuStore: 'Explore the full Marketplace',
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

function DeploymentMenuLink({ entry, lang, onSelect }: { entry: MenuEntry; lang: 'fr' | 'en'; onSelect: () => void }) {
  return <a href={entry.href} role="menuitem" onClick={onSelect} className="group block min-h-[59px] rounded-xl border border-transparent px-3 py-2.5 outline-none transition-colors hover:border-[#D8D0C2] hover:bg-white focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"><strong className="block text-[14px] font-bold leading-5 text-[#1C1A17] group-hover:text-[#B00C54]">{entry.title[lang]}</strong><span className="mt-0.5 block text-[11px] leading-4 text-[#625B50]">{entry.desc[lang]}</span></a>
}

function MobileMarketplaceLink({ entry, index, lang, onSelect }: { entry: MenuEntry; index: number; lang: 'fr' | 'en'; onSelect: () => void }) {
  void index
  return <a href={entry.href} onClick={onSelect} className="group block min-h-12 border-b border-[#E4DDCE] py-2.5 last:border-b-0"><span className="block text-[13px] font-bold text-[#1C1A17] group-hover:text-[#B00C54]">{entry.title[lang]}</span><span className="mt-0.5 block text-[10.5px] leading-4 text-[#766D61]">{entry.desc[lang]}</span></a>
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
  const { openAlma, setLauncherSuppressed } = useAlma()
  const t = T[lang]
  const pathname = usePathname() || '/'

  // The header is transparent only until the page scrolls or a panel opens.
  // While transparent over a dark hero, switch to light-on-dark link colors
  // so labels and hover states stay legible.
  const overDark = darkHero && !scrolled && !isMenuOpen && !collabOpen

  // Missions has its own top-level navigation item, so it must not also mark
  // the Collaborateurs IA trigger as the current page.
  const marketplacePrefixes = ['/collaborateurs-ia', '/desktop', '/ai-gateway', '/modeles-ia', '/academy']
  const isCollabActive = marketplacePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  const isWorkspaceActive = pathname === '/workspace' || pathname.startsWith('/workspace/')
  const isMarketplaceActive = pathname === '/marketplace' || pathname.startsWith('/marketplace/')
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
                       className="fixed left-1/2 top-[76px] w-[760px] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-3"
                       >
                        <div className="max-h-[calc(100dvh-96px)] overflow-y-auto rounded-[20px] border border-[#DED6C8] bg-[#F3EFE6] text-[#1C1A17] shadow-[0_30px_70px_-26px_rgba(21,19,22,.32)]">
                          <div className="grid grid-cols-2">
                           <div className="border-r border-[#DED6C8] p-5">
                             <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.menuDiscover}</p>
                             <div className="mt-4 space-y-2">
                                {COLLAB_DISCOVER.map((entry) => <DeploymentMenuLink key={entry.href} entry={entry} lang={lang} onSelect={() => setCollabOpen(false)} />)}
                             </div>
                           </div>

                           <div className="p-5">
                             <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.menuDeploy}</p>
                             <div className="mt-4 space-y-2">
                                {COLLAB_WORK.map((entry) => <DeploymentMenuLink key={entry.href} entry={entry} lang={lang} onSelect={() => setCollabOpen(false)} />)}
                             </div>
                           </div>
                         </div>

                           <div className="flex min-h-12 items-center justify-between border-t border-[#DED6C8] bg-[#FFFDF9] px-6 text-[11px] font-semibold text-[#625B50]">
                            <div className="flex items-center gap-5">{COLLAB_ACTIONS.map((item) => <a key={item.href} href={item.href} onClick={() => setCollabOpen(false)} className="hover:text-[#B00C54]">{item.title[lang]}</a>)}</div>
                            <a href="/marketplace" onClick={() => setCollabOpen(false)} className="group inline-flex shrink-0 items-center gap-2 font-bold text-[#B00C54]">{t.menuStore}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></a>
                         </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavItem href="/workspace" active={isWorkspaceActive} overDark={overDark}>
                {t.workspace}
              </NavItem>
              <NavItem href="/marketplace" active={isMarketplaceActive} overDark={overDark}>
                {t.marketplace}
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
                <button
                  type="button"
                  onClick={openAlma}
                  className={`hidden h-10 items-center justify-center rounded-full px-5 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 lg:inline-flex ${
                    overDark
                      ? 'bg-[#FBF9F3] text-[#1C1A17] hover:bg-[#EAE3D4] focus-visible:ring-[#FBF9F3]/60 focus-visible:ring-offset-transparent'
                      : 'bg-[#1C1A17] text-[#FBF9F3] hover:bg-[#332F29] focus-visible:ring-[#1C1A17]/40 focus-visible:ring-offset-[#F3EFE6]'
                  }`}
                >
                  {ALMA_CTA.label[lang]}
                </button>
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
                               <p className="px-1 pb-1 pt-3 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{t.menuDiscover}</p>
                               <div className="grid grid-cols-2 gap-x-4">
                                 {COLLAB_DISCOVER.map((entry, index) => <MobileMarketplaceLink key={entry.href} entry={entry} index={index} lang={lang} onSelect={() => setIsMenuOpen(false)} />)}
                               </div>
                               <p className="px-1 pb-1 pt-4 font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{t.menuDeploy}</p>
                               <div>
                                 {COLLAB_WORK.map((entry, index) => <MobileMarketplaceLink key={entry.href} entry={entry} index={index + 4} lang={lang} onSelect={() => setIsMenuOpen(false)} />)}
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
                              <a href="/marketplace" onClick={() => setIsMenuOpen(false)} className="mt-2 flex min-h-11 items-center justify-between rounded-xl bg-[#D10E63] px-4 text-sm font-bold text-white">{t.menuStore}<ArrowRight className="size-4" /></a>
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
                  <a href="/marketplace" onClick={() => setIsMenuOpen(false)} className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]">{t.marketplace}</a>
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
                  <button
                    type="button"
                    onClick={() => { setIsMenuOpen(false); openAlma() }}
                    className="flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-5 py-3 text-[15px] font-bold text-[#FBF9F3] shadow-[0_8px_24px_-8px_rgba(209,14,99,0.5)] transition-colors hover:bg-[#B10B53]"
                  >
                    {ALMA_CTA.label[lang]}
                  </button>
                </div>
              </AnonymousOnly>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
