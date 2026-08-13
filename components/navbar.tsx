'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'
import { AnonymousOnly, UserMenuDesktop, UserMenuMobile } from './auth/user-menu'
import { useAlma } from '@/lib/alma-context'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }

const ALMA_CTA = {
  href: '/decouvrir?source=nav',
  label: { fr: 'Commencez gratuitement', en: 'Start free' } as Bi,
}

// Collaborateurs IA dropdown — the product hub, in three sections:
// Product-focused Collaborateurs IA menu: concept, profiles, skills,
// applications and Alma. Experts remain available in the footer.
type MenuEntry = { title: Bi; desc: Bi; href: string; avatar?: string }
type MenuAction = { title: Bi; href: string }

const COLLAB_DISCOVER: MenuEntry[] = [
  {
    title: { fr: 'Qu’est-ce qu’un Collaborateur IA ?', en: 'What is an AI Collaborator?' },
    desc: {
      fr: 'Une identité professionnelle, un environnement privé et une expérience qui progresse avec votre entreprise.',
      en: 'A professional identity, a private environment and experience that grows with your company.',
    },
    href: '/collaborateurs-ia',
  },
  {
    title: { fr: 'Profils métier', en: 'Job profiles' },
    desc: {
      fr: 'Les responsabilités durables qu’il peut exercer.',
      en: 'The lasting responsibilities it can perform.',
    },
    href: '/collaborateurs-ia/profils-metier',
  },
  {
    title: { fr: 'Compétences', en: 'Skills' },
    desc: {
      fr: 'Les savoir-faire qu’il peut appliquer, améliorer et partager.',
      en: 'The know-how it can apply, improve and share.',
    },
    href: '/collaborateurs-ia/competences',
  },
  {
    title: { fr: 'Applications', en: 'Applications' },
    desc: {
      fr: 'Plus de 3 000 outils accessibles selon vos règles.',
      en: 'More than 3,000 tools accessible under your rules.',
    },
    href: '/collaborateurs-ia/applications',
  },
]

const COLLAB_ACCOMPANIMENT: MenuEntry[] = [
  {
    title: { fr: 'Alma · Conseillère IA', en: 'Alma · AI advisor' },
    desc: {
      fr: 'Cadrez une première mission et préparez votre Collaborateur IA.',
      en: 'Frame a first mission and prepare your AI Collaborator.',
    },
    href: '/unitalk/@alma',
    avatar: '/alma-avatar.png',
  },
  {
    title: { fr: 'Devenir Co-créateur IA', en: 'Become an AI Co-creator' },
    desc: {
      fr: 'Apprenez à créer, publier et monétiser des profils, compétences et missions.',
      en: 'Learn to create, publish and monetize profiles, skills and missions.',
    },
    href: '/co-createur-ia',
  },
  {
    title: { fr: 'AI Native Pack', en: 'AI Native Pack' },
    desc: {
      fr: 'Passez de la première mission à une adoption structurée avec vos équipes.',
      en: 'Move from the first mission to structured adoption with your teams.',
    },
    href: '/accompagnement',
  },
  {
    title: { fr: 'Experts humains', en: 'Human experts' },
    desc: {
      fr: 'Concevez, intégrez ou faites évoluer vos Collaborateurs IA avec un spécialiste.',
      en: 'Design, integrate or advance your AI Collaborators with a specialist.',
    },
    href: '/experts',
  },
]

const COLLAB_ACTIONS: MenuAction[] = [
  { title: { fr: 'Pourquoi Unitalk ?', en: 'Why Unitalk?' }, href: '/collaborateurs-ia/pourquoi-unitalk' },
]

const T = {
  fr: {
    home: 'Accueil Unitalk AI',
    signIn: 'Connexion',
    pricing: 'Tarifs',
    workspace: 'Workspace',
    missions: 'Missions',
    collaborators: 'Collaborateurs IA',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    collabMenu: 'Menu Collaborateurs IA',
    // Collaborateurs IA panel — two-column mega menu
    menuDiscover: 'Le Collaborateur',
    menuAccompaniment: 'Créer & accompagner',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    pricing: 'Pricing',
    workspace: 'Workspace',
    missions: 'Missions',
    collaborators: 'AI Collaborators',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    collabMenu: 'AI Collaborators menu',
    menuDiscover: 'The Collaborator',
    menuAccompaniment: 'Create & support',
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

/** Icon-free menu link for the Collaborateurs IA panel: a growing left accent
 *  bar on hover keeps the row elegant and premium without decorative icons. */
function CollabMenuLink({ entry, lang, onSelect }: { entry: MenuEntry; lang: Lang; onSelect: () => void }) {
  return (
    <a
      href={entry.href}
      role="menuitem"
      onClick={onSelect}
      className="group relative block w-full rounded-lg border-l-2 border-transparent px-4 py-3 outline-none transition-colors duration-150 hover:border-[#D10E63] hover:bg-[#F3EFE6] focus-visible:border-[#D10E63] focus-visible:bg-[#F3EFE6] focus-visible:ring-2 focus-visible:ring-[#D10E63]/30"
    >
      <span
        aria-hidden="true"
        className="hidden"
      />
      {entry.avatar ? (
        <span className="flex items-start gap-3">
          <img
            src={entry.avatar || "/placeholder.svg"}
            alt=""
            aria-hidden="true"
            className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-[#EAD9E0]"
          />
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold leading-tight text-[#1C1A17] transition-colors duration-200 group-hover:text-[#D10E63] group-focus-visible:text-[#D10E63]">
              {entry.title[lang]}
            </span>
            <span className="mt-1 block text-[12.5px] leading-relaxed text-[#4E483F]">{entry.desc[lang]}</span>
          </span>
        </span>
      ) : (
        <>
          <span className="block text-[15px] font-semibold leading-tight text-[#1C1A17] transition-colors duration-200 group-hover:text-[#D10E63] group-focus-visible:text-[#D10E63]">
            {entry.title[lang]}
          </span>
          <span className="mt-1 block text-[12.5px] leading-relaxed text-[#4E483F]">{entry.desc[lang]}</span>
        </>
      )}
    </a>
  )
}

function AccompanimentMenuLink({ entry, lang, onSelect }: { entry: MenuEntry; lang: Lang; onSelect: () => void }) {
  return (
    <a href={entry.href} role="menuitem" onClick={onSelect} className="group flex min-h-[104px] w-full items-start gap-3 px-4 py-[18px] outline-none transition-colors duration-150 hover:bg-[#F3EEE5] focus-visible:bg-[#F3EEE5] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D10E63]/40">
      {entry.avatar && <img src={entry.avatar} alt="" aria-hidden="true" className="h-[42px] w-[42px] shrink-0 rounded-full object-cover" />}
      <span className="min-w-0 flex-1"><span className="block text-[15px] font-semibold leading-tight text-[#1C1A17] transition-colors group-hover:text-[#D10E63] group-focus-visible:text-[#D10E63]">{entry.title[lang]}</span><span className="mt-1.5 block text-[12.5px] leading-relaxed text-[#4E483F]">{entry.desc[lang]}</span></span>
      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63] opacity-45 transition-[transform,opacity] duration-150 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100" />
    </a>
  )
}

/** Direct-action row for the "Votre Collaborateur" section: a single bold line
 *  with a trailing arrow that nudges forward on hover — no description. */
function CollabActionLink({ entry, lang, onSelect }: { entry: MenuAction; lang: Lang; onSelect: () => void }) {
  return (
    <a
      href={entry.href}
      role="menuitem"
      onClick={onSelect}
      className="group flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-[14.5px] font-semibold text-[#1C1A17] outline-none transition-colors duration-200 hover:bg-[#FFFDF9] hover:text-[#D10E63] focus-visible:bg-[#FFFDF9] focus-visible:text-[#D10E63] focus-visible:ring-2 focus-visible:ring-[#D10E63]/60"
    >
      {entry.title[lang]}
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.75}
        className="h-4 w-4 shrink-0 text-[#D10E63] transition-transform duration-200 group-hover:translate-x-1"
      />
    </a>
  )
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

  // Active-state resolution
  // Collaborateurs IA owns the product hub: the presentation page and the three
  // capability catalogs (profils métier, compétences, applications) plus details.
  const isCollabActive = pathname === '/collaborateurs-ia' || pathname.startsWith('/collaborateurs-ia/')
  const isMissionsActive = pathname === '/missions' || pathname.startsWith('/missions/')
  // Experts: the human pillar — accompaniment around the Collaborateurs IA.
  const isWorkspaceActive = pathname === '/workspace' || pathname.startsWith('/workspace/')
  const isPricingActive = pathname === '/tarifs'

  function handleMissionsClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== '/missions' || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile) document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    if (!isMenuOpen) setMobileCollabOpen(false)
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
        <nav className={`editorial-shell flex items-center justify-between ${isMissionsActive ? 'h-[64px]' : 'h-[76px]'}`}>
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
              {/* Missions — the entry point: start from the need to accomplish */}
              <NavItem href="/missions" active={isMissionsActive} overDark={overDark} onClick={handleMissionsClick}>
                {t.missions}
              </NavItem>

              {/* Collaborateurs IA — product hub dropdown (who takes the work on) */}
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
                  onClick={() => setCollabOpen((v) => !v)}
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
                      className="absolute left-0 top-full w-[880px] max-w-[calc(100vw-2rem)] pt-2"
                    >
                      <div className="overflow-hidden rounded-2xl border border-[#E4DDCE] bg-[#FAF8F3] shadow-[0_24px_60px_-12px_rgba(28,26,23,0.22)]">
                        {/* Two-column body: product (left) vs ecosystem (right) */}
                        <div className="grid grid-cols-[58fr_42fr]">
                          {/* Left — Le Collaborateur: the four product bricks */}
                          <div className="p-3">
                            <p className="px-4 pb-1.5 pt-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">
                              {t.menuDiscover}
                            </p>
                            <div className="flex flex-col">
                              {COLLAB_DISCOVER.map((item) => (
                                <AccompanimentMenuLink
                                  key={item.href}
                                  entry={item}
                                  lang={lang}
                                  onSelect={() => setCollabOpen(false)}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Right — Accompagnement & écosystème, on warmer cream */}
                          <div className="border-l border-[#DED6C8] p-3">
                            <p className="px-4 pb-1.5 pt-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">
                              {t.menuAccompaniment}
                            </p>
                            <div className="flex flex-col divide-y divide-[#1C1A17]/10">
                              {COLLAB_ACCOMPANIMENT.map((item) => (
                              <AccompanimentMenuLink
                                  key={item.href}
                                  entry={item}
                                  lang={lang}
                                  onSelect={() => setCollabOpen(false)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Footer bar — the single "Pourquoi Unitalk ?" direct link */}
                        <div className="border-t border-[#EFE8DA] bg-[#F3EEE5] px-3 py-4">
                          {COLLAB_ACTIONS.map((item) => (
                            <CollabActionLink
                              key={item.href}
                              entry={item}
                              lang={lang}
                              onSelect={() => setCollabOpen(false)}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavItem href="/workspace" active={isWorkspaceActive} overDark={overDark}>
                {t.workspace}
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
              onClick={() => setIsMenuOpen((v) => !v)}
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
                {/* Primary links — same order as desktop: Missions first (the need) */}
                <div className="divide-y divide-[#E4DDCE]">
                  <a
                    href="/missions"
                    onClick={(event) => {
                      handleMissionsClick(event)
                      setIsMenuOpen(false)
                    }}
                    className="flex min-h-11 items-center text-[15px] font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.missions}
                  </a>

                  {/* Collaborateurs IA — collapsible so the menu stays short */}
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
                            <p className="pb-0.5 pt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">
                              {t.menuDiscover}
                            </p>
                            {COLLAB_DISCOVER.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex min-h-10 items-center text-[14px] font-medium text-[#4E483F] transition-colors hover:text-[#D10E63]"
                              >
                                {item.title[lang]}
                              </a>
                            ))}
                            <p className="pb-0.5 pt-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8172]">
                              {t.menuAccompaniment}
                            </p>
                            {COLLAB_ACCOMPANIMENT.map((item) => (
                              <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex min-h-10 items-center text-[14px] font-medium text-[#4E483F] transition-colors hover:text-[#D10E63]"
                              >
                                {item.title[lang]}
                              </a>
                            ))}
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
