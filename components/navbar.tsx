'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, IdCard, Sparkles, AppWindow, ArrowRight, UserRound } from 'lucide-react'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }

const ALMA_CTA = {
  href: '/decouvrir',
  label: { fr: 'Commencer gratuitement', en: 'Start for free' } as Bi,
}

// Collaborateurs IA dropdown — the product hub.
// "Découvrir" points to the central presentation; "Développer ses capacités"
// groups the three catalogs (profils métier, compétences, applications).
type MenuEntry = { icon: typeof IdCard; title: Bi; desc: Bi; href: string }

const COLLAB_DISCOVER: MenuEntry = {
  icon: UserRound,
  title: { fr: 'Collaborateurs IA', en: 'AI Collaborators' },
  desc: {
    fr: 'Une identité, une mémoire et une place dans votre entreprise.',
    en: 'An identity, a memory and a place in your company.',
  },
  href: '/collaborateurs-ia',
}

const COLLAB_CAPABILITIES: MenuEntry[] = [
  {
    icon: IdCard,
    title: { fr: 'Profils métier', en: 'Job profiles' },
    desc: {
      fr: 'Les rôles durables qu’il peut exercer.',
      en: 'The durable roles it can hold.',
    },
    href: '/collaborateurs-ia/profils-metier',
  },
  {
    icon: Sparkles,
    title: { fr: 'Compétences', en: 'Skills' },
    desc: {
      fr: 'Les capacités qu’il développe au fil de ses missions.',
      en: 'The capabilities it builds across its missions.',
    },
    href: '/collaborateurs-ia/competences',
  },
  {
    icon: AppWindow,
    title: { fr: 'Applications', en: 'Applications' },
    desc: {
      fr: 'Les outils dans lesquels il travaille avec les autorisations accordées.',
      en: 'The tools it works in with the permissions granted.',
    },
    href: '/collaborateurs-ia/applications',
  },
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
    // Collaborateurs IA panel
    menuDiscover: 'Découvrir',
    menuCapabilities: 'Développer ses capacités',
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
    menuDiscover: 'Discover',
    menuCapabilities: 'Grow its capabilities',
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

/** Desktop primary nav link with hover/focus/active states. */
function NavItem({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`relative rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
        active ? 'text-[#D10E63]' : 'text-[#857C6E] hover:text-[#1C1A17]'
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px rounded-full bg-[#D10E63] transition-opacity duration-200 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </a>
  )
}

export function Navbar(_props: { ctaLabel?: Bi; ctaShortLabel?: Bi } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [collabOpen, setCollabOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const collabRef = useRef<HTMLDivElement | null>(null)
  const collabButtonRef = useRef<HTMLButtonElement | null>(null)
  const { lang, setLang } = useLanguage()
  const t = T[lang]
  const pathname = usePathname() || '/'

  // Active-state resolution
  // Collaborateurs IA owns the product hub: the presentation page and the three
  // capability catalogs (profils métier, compétences, applications) plus details.
  const isCollabActive = pathname === '/collaborateurs-ia' || pathname.startsWith('/collaborateurs-ia/')
  const isMissionsActive = pathname === '/missions' || pathname.startsWith('/missions/')
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
              <span className="font-inter text-sm font-semibold text-[#1C1A17] sm:text-base">Unitalk</span>
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {/* Collaborateurs IA — product hub dropdown */}
              <div ref={collabRef} className="relative">
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
                    isCollabActive || collabOpen ? 'text-[#D10E63]' : 'text-[#857C6E] hover:text-[#1C1A17]'
                  }`}
                >
                  {t.collaborators}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${collabOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px rounded-full bg-[#D10E63] transition-opacity duration-200 ${
                      isCollabActive ? 'opacity-100' : 'opacity-0'
                    }`}
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
                      className="absolute left-0 top-full w-[440px] max-w-[calc(100vw-2rem)] pt-2"
                    >
                      <div className="overflow-hidden rounded-2xl border border-[#E4DDCE] bg-white p-3 shadow-[0_20px_50px_rgba(28,26,23,0.14)]">
                        {/* Découvrir — the central presentation */}
                        <p className="px-1.5 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#B0A796]">
                          {t.menuDiscover}
                        </p>
                        <a
                          href={COLLAB_DISCOVER.href}
                          role="menuitem"
                          onClick={() => setCollabOpen(false)}
                          className="group flex min-h-[56px] items-center gap-3 rounded-xl px-2.5 outline-none transition-all duration-200 hover:bg-[#FDF1F6] hover:shadow-[0_6px_20px_-8px_rgba(209,14,99,0.4)] focus-visible:bg-[#FDF1F6] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/[0.08] text-[#D10E63] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#D10E63]/[0.14]">
                            <COLLAB_DISCOVER.icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-base font-bold leading-tight text-[#1C1A17]">
                              {COLLAB_DISCOVER.title[lang]}
                            </span>
                            <span className="mt-0.5 block text-[12px] leading-snug text-[#857C6E]">
                              {COLLAB_DISCOVER.desc[lang]}
                            </span>
                          </span>
                        </a>

                        <div className="my-2 border-t border-[#EFE8DA]" />

                        {/* Développer ses capacités — the three catalogs */}
                        <p className="px-1.5 pb-1.5 pt-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#B0A796]">
                          {t.menuCapabilities}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {COLLAB_CAPABILITIES.map((item) => {
                            const Icon = item.icon
                            return (
                              <a
                                key={item.href}
                                href={item.href}
                                role="menuitem"
                                onClick={() => setCollabOpen(false)}
                                className="group flex min-h-[56px] items-center gap-3 rounded-xl px-2.5 outline-none transition-all duration-200 hover:bg-[#FDF1F6] hover:shadow-[0_6px_20px_-8px_rgba(209,14,99,0.4)] focus-visible:bg-[#FDF1F6] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/[0.08] text-[#D10E63] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#D10E63]/[0.14]">
                                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-base font-bold leading-tight text-[#1C1A17]">{item.title[lang]}</span>
                                  <span className="mt-0.5 block text-[12px] leading-snug text-[#857C6E]">{item.desc[lang]}</span>
                                </span>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Missions — direct public link (the need) */}
              <NavItem href="/missions" active={isMissionsActive}>
                {t.missions}
              </NavItem>

              <NavItem href="/workspace" active={isWorkspaceActive}>
                {t.workspace}
              </NavItem>
              <NavItem href="/tarifs" active={isPricingActive}>
                {t.pricing}
              </NavItem>
            </div>
          </div>

          {/* Group 3 — Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLang}
              className="hidden items-center gap-1.5 rounded-md px-1.5 py-2 text-xs font-medium text-[#1C1A17] outline-none transition-colors hover:text-[#D10E63] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 lg:inline-flex"
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>

            <a
              href="/connexion"
              className="hidden rounded-md px-2 py-2 text-sm font-medium text-[#857C6E] outline-none transition-colors hover:text-[#1C1A17] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 lg:inline-flex"
            >
              {t.signIn}
            </a>

            {/* Primary CTA — compact, priority */}
            <a
              href={ALMA_CTA.href}
              className="hidden h-10 items-center justify-center rounded-full bg-[#D10E63] px-5 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] lg:inline-flex"
            >
              {ALMA_CTA.label[lang]}
            </a>

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
              className="scrollbar-hide fixed inset-x-0 bottom-0 top-[76px] z-40 flex flex-col overflow-y-auto overflow-x-hidden bg-[#F3EFE6] lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <nav className="flex flex-1 flex-col px-6 py-3">
                {/* Primary links */}
                <div className="border-b border-[#DcD4C4] py-3">
                  {/* Collaborateurs IA + capability catalogs shown directly (no accordion) */}
                  <a
                    href={COLLAB_DISCOVER.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.collaborators}
                  </a>
                  <div className="ml-3 border-l border-[#DcD4C4] pl-4">
                    {COLLAB_CAPABILITIES.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex min-h-12 items-center text-[15px] font-medium text-[#4E483F] transition-colors hover:text-[#D10E63]"
                      >
                        {item.title[lang]}
                      </a>
                    ))}
                  </div>

                  <a
                    href="/missions"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.missions}
                  </a>

                  <a
                    href="/workspace"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.workspace}
                  </a>
                  <a
                    href="/tarifs"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.pricing}
                  </a>
                  <a
                    href="/connexion"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.signIn}
                  </a>
                  <button
                    onClick={toggleLang}
                    className="flex min-h-12 w-full items-center gap-2 text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                    aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                  >
                    {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
                    {lang === 'fr' ? 'Français — FR' : 'English — EN'}
                  </button>
                </div>

                {/* Contact */}
                <div className="border-b border-[#DcD4C4] py-4">
                  <a
                    href="tel:+33189713394"
                    className="group flex items-center gap-2 py-1.5 text-xs font-normal text-[#4E483F] transition-colors hover:text-[#1C1A17]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#D10E63]">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="underline underline-offset-2">01 89 71 33 94</span>
                  </a>
                  <a
                    href="mailto:hello@unitalk.ai"
                    className="group flex items-center gap-2 py-1.5 text-xs font-normal text-[#4E483F] transition-colors hover:text-[#1C1A17]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="flex-shrink-0 text-[#D10E63]">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                    <span className="underline underline-offset-2">hello@unitalk.ai</span>
                  </a>
                </div>

                {/* Fixed CTA */}
                <div className="mt-auto py-4">
                  <a
                    href={ALMA_CTA.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B10B53]"
                  >
                    {ALMA_CTA.label[lang]}
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
