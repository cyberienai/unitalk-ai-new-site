'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, IdCard, Sparkles, Link2, Brain, ArrowRight } from 'lucide-react'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }

const ALMA_CTA = {
  href: '/decouvrir',
  label: { fr: 'Commencer gratuitement', en: 'Start for free' } as Bi,
}

// Store dropdown — equipment for the AI Collaborator
const STORE_EQUIPMENT: {
  icon: typeof IdCard
  title: Bi
  desc: Bi
  href: string
}[] = [
  {
    icon: IdCard,
    title: { fr: 'Profils métier', en: 'Job profiles' },
    desc: { fr: 'Choisissez son rôle.', en: 'Choose its role.' },
    href: '/store/profils-metier',
  },
  {
    icon: Sparkles,
    title: { fr: 'Compétences', en: 'Skills' },
    desc: { fr: 'Développez ses savoir-faire.', en: 'Grow its know-how.' },
    href: '/store/competences',
  },
  {
    icon: Link2,
    title: { fr: 'Connectivité', en: 'Connectivity' },
    desc: { fr: 'Connectez vos outils.', en: 'Connect your tools.' },
    href: '/store/connectivite',
  },
  {
    icon: Brain,
    title: { fr: 'Mémoire', en: 'Memory' },
    desc: { fr: 'Partagez le contexte de votre organisation.', en: 'Share your organization’s context.' },
    href: '/store/memoire',
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
    store: 'Store',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    storeMenu: 'Menu Store',
    // Store panel
    storeHeadTitle: 'Personnalisez votre Collaborateur IA',
    storeHeadText: 'Son rôle, ses compétences, sa connectivité et sa mémoire.',
    storeAll: 'Explorer le Store',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    pricing: 'Pricing',
    workspace: 'Workspace',
    missions: 'Missions',
    collaborators: 'AI Collaborators',
    store: 'Store',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    storeMenu: 'Store menu',
    storeHeadTitle: 'Customize your AI Collaborator',
    storeHeadText: 'Its role, skills, connectivity and memory.',
    storeAll: 'Explore the Store',
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
  const [storeOpen, setStoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const storeRef = useRef<HTMLDivElement | null>(null)
  const storeButtonRef = useRef<HTMLButtonElement | null>(null)
  const { lang, setLang } = useLanguage()
  const t = T[lang]
  const pathname = usePathname() || '/'

  // Active-state resolution
  // Store owns the equipment namespace: /store and all its detail pages.
  const isStoreActive = pathname.startsWith('/store')
  const isCollabActive =
    (pathname === '/collaborateurs-ia' || pathname.startsWith('/collaborateurs-ia/')) &&
    !pathname.startsWith('/collaborateurs-ia/roles')
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
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Store dropdown: close on outside click
  useEffect(() => {
    if (!storeOpen) return
    const onDown = (e: MouseEvent) => {
      if (storeRef.current && !storeRef.current.contains(e.target as Node)) setStoreOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [storeOpen])

  // Store dropdown: close on Escape and return focus to the button
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && storeOpen) {
        setStoreOpen(false)
        storeButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [storeOpen])

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-[#F3EFE6]/85 backdrop-blur-xl transition-colors duration-300 ${
          scrolled || isMenuOpen || storeOpen ? 'border-[#D8D0C2]/70' : 'border-transparent'
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
              <NavItem href="/collaborateurs-ia" active={isCollabActive}>
                {t.collaborators}
              </NavItem>

              {/* Missions — direct link (the need), distinct from the Store (the equipment) */}
              <NavItem href="/missions" active={isMissionsActive}>
                {t.missions}
              </NavItem>

              {/* Store dropdown */}
              <div ref={storeRef} className="relative">
                <button
                  ref={storeButtonRef}
                  type="button"
                  id="store-trigger"
                  onClick={() => setStoreOpen((v) => !v)}
                  aria-expanded={storeOpen}
                  aria-haspopup="true"
                  aria-controls="store-menu"
                  aria-current={isStoreActive ? 'page' : undefined}
                  className={`relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
                    isStoreActive || storeOpen ? 'text-[#D10E63]' : 'text-[#857C6E] hover:text-[#1C1A17]'
                  }`}
                >
                  {t.store}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${storeOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-px rounded-full bg-[#D10E63] transition-opacity duration-200 ${
                      isStoreActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {storeOpen && (
                    <motion.div
                      id="store-menu"
                      role="menu"
                      aria-labelledby="store-trigger"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-0 top-full w-[420px] max-w-[calc(100vw-2rem)] pt-2"
                    >
                      <div className="overflow-hidden rounded-2xl border border-[#E4DDCE] bg-white p-3 shadow-[0_20px_50px_rgba(28,26,23,0.14)]">
                        {/* Store scope: the equipment for a Collaborateur IA (not the missions) */}
                        <div className="px-1.5 pb-3 pt-1">
                          <p className="text-[15px] font-bold text-[#1C1A17]">{t.storeHeadTitle}</p>
                          <p className="mt-0.5 text-[13px] leading-snug text-[#857C6E]">{t.storeHeadText}</p>
                        </div>

                        {/* Equipment entries */}
                        <div className="flex flex-col gap-0.5">
                          {STORE_EQUIPMENT.map((item) => {
                            const Icon = item.icon
                            return (
                              <a
                                key={item.href}
                                href={item.href}
                                role="menuitem"
                                onClick={() => setStoreOpen(false)}
                                className="group flex min-h-[56px] items-center gap-3 rounded-xl px-2.5 outline-none transition-colors hover:bg-[#FDF1F6] focus-visible:bg-[#FDF1F6] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D10E63]/[0.08] text-[#D10E63]">
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

                        <div className="my-2 border-t border-[#EFE8DA]" />

                        {/* Explore all */}
                        <a
                          href="/store"
                          role="menuitem"
                          onClick={() => setStoreOpen(false)}
                          className="group flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-[13px] font-bold text-[#D10E63] outline-none transition-colors hover:bg-[#FDF1F6] focus-visible:bg-[#FDF1F6] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                        >
                          {t.storeAll}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                  <a
                    href="/collaborateurs-ia"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.collaborators}
                  </a>
                  <a
                    href="/missions"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.missions}
                  </a>

                  {/* Store + equipment entries shown directly (no accordion) */}
                  <a
                    href="/store"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-12 items-center text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.store}
                  </a>
                  <div className="ml-3 border-l border-[#DcD4C4] pl-4">
                    {STORE_EQUIPMENT.map((item) => (
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
