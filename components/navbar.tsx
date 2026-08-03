'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Network, ChevronDown } from 'lucide-react'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'
import { NavbarTeamCart } from '@/components/navbar-team-cart'

type NavLink = { fr: string; en: string; href: string; strong?: boolean }
type Featured = { name: string; role: { fr: string; en: string }; href: string; avatar: string }

const CREATE_ORG = {
  href: '/decouvrir',
  label: { fr: 'Créer mon organisation', en: 'Create my organization' },
  desc: {
    fr: 'Notre conseillère IA prépare le contexte de votre organisation et ses premières Missions.',
    en: 'Our AI advisor prepares your organization’s context and its first Missions.',
  },
  cta: { fr: 'Commencer', en: 'Get started' },
}

// Compact dropdown for "Missions"
const MISSIONS_MENU: NavLink[] = [
  { fr: 'Trouver des clients', en: 'Find customers', href: '/missions/trouver-de-nouveaux-clients' },
  { fr: 'Répondre aux clients', en: 'Answer customers', href: '/missions/repondre-a-mes-clients' },
  { fr: 'Créer mes contenus', en: 'Create content', href: '/missions/creer-mes-contenus' },
  { fr: 'Préparer et suivre mes réunions', en: 'Prepare & follow up meetings', href: '/missions/preparer-et-suivre-mes-reunions' },
  { fr: 'Automatiser mes opérations', en: 'Automate operations', href: '/missions/automatiser-mes-operations' },
  { fr: 'Voir toutes les Missions', en: 'See all Missions', href: '/missions', strong: true },
]

// Compact dropdown for "Collaborateurs IA"
const COLLAB_MENU: NavLink[] = [
  { fr: 'Découvrir les Collaborateurs IA', en: 'Discover the AI Collaborators', href: '/collaborateurs-ia', strong: true },
  { fr: 'Explorer les Profils métier', en: 'Explore job Profiles', href: '/collaborateurs-ia/roles' },
  { fr: 'Créateurs et Expertises', en: 'Creators and Expertise', href: '/collaborateurs-ia' },
]

const COLLAB_FEATURED: Featured[] = [
  { name: 'Emma', role: { fr: 'Assistante de direction', en: 'Executive assistant' }, href: '/emma', avatar: '/images/emma-avatar.png' },
  { name: 'Hugo', role: { fr: 'Commercial', en: 'Sales' }, href: '/@hugo', avatar: '/images/hugo-avatar.png' },
  { name: 'Inès', role: { fr: 'Relation client', en: 'Customer care' }, href: '/@ines', avatar: '/images/ines-avatar.png' },
]

// Mobile burger links (flat, per the recommended structure)
const MOBILE_LINKS: NavLink[] = [
  { fr: 'Missions', en: 'Missions', href: '/missions' },
  { fr: 'Collaborateurs IA', en: 'AI Collaborators', href: '/collaborateurs-ia' },
  { fr: 'Workspace', en: 'Workspace', href: '/workspace' },
  { fr: 'Tarifs', en: 'Pricing', href: '/tarifs' },
]

const T = {
  fr: {
    home: 'Accueil Unitalk AI',
    signIn: 'Connexion',
    pricing: 'Tarifs',
    workspace: 'Workspace',
    missions: 'Missions',
    collaborators: 'Collaborateurs IA',
    createOrg: 'Créer mon organisation',
    signUp: 'S’inscrire',
    featuredLabel: 'Mis en avant',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    pricing: 'Pricing',
    workspace: 'Workspace',
    missions: 'Missions',
    collaborators: 'AI Collaborators',
    createOrg: 'Create my organization',
    signUp: 'Sign up',
    featuredLabel: 'Featured',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
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

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<'missions' | 'collaborateurs' | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { lang, setLang } = useLanguage()
  const t = T[lang]

  // Divider under the nav appears only once past the hero (≈ 2nd section)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile) document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close dropdowns on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')

  const openDropdown = (menu: 'missions' | 'collaborateurs') => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(menu)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-[#F3EFE6]/90 backdrop-blur-xl transition-colors duration-300 ${
          scrolled || isMenuOpen || openMenu ? 'border-[#D8D0C2]/75' : 'border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Left: Logo + primary nav */}
          <div className="flex items-center gap-8 xl:gap-10">
            <a href="/" aria-label={t.home} className="flex items-center gap-2 sm:gap-3">
              <UnitalkLogo size={24} />
              <span className="font-inter text-sm font-semibold text-[#1C1A17] sm:text-base">Unitalk</span>
            </a>

            <div className="hidden items-center gap-1 lg:flex">
              {/* Missions dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdown('missions')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'missions' ? null : 'missions')}
                  aria-expanded={openMenu === 'missions'}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-[#857C6E] transition-colors hover:text-[#1C1A17]"
                >
                  {t.missions}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === 'missions' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openMenu === 'missions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full w-64 pt-2"
                    >
                      <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-2 shadow-[0_20px_50px_rgba(28,26,23,0.12)]">
                        {MISSIONS_MENU.map((link) => (
                          <a
                            key={link.fr}
                            href={link.href}
                            onClick={() => setOpenMenu(null)}
                            className={`flex min-h-11 items-center rounded-[10px] px-3 text-sm outline-none transition-[background-color,color,transform] duration-150 hover:translate-x-0.5 hover:bg-[#F5F2EB] focus-visible:translate-x-0.5 focus-visible:bg-[#F5F2EB] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
                              link.strong
                                ? 'font-bold text-[#D10E63]'
                                : 'font-medium text-[#3F3A33] hover:text-[#1C1A17] focus-visible:text-[#1C1A17]'
                            }`}
                          >
                            {link[lang]}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collaborateurs IA dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdown('collaborateurs')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'collaborateurs' ? null : 'collaborateurs')}
                  aria-expanded={openMenu === 'collaborateurs'}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-[#857C6E] transition-colors hover:text-[#1C1A17]"
                >
                  {t.collaborators}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openMenu === 'collaborateurs' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openMenu === 'collaborateurs' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full w-72 pt-2"
                    >
                      <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-2 shadow-[0_20px_50px_rgba(28,26,23,0.12)]">
                        {COLLAB_MENU.map((link) => (
                          <a
                            key={link.fr}
                            href={link.href}
                            onClick={() => setOpenMenu(null)}
                            className={`flex min-h-11 items-center rounded-[10px] px-3 text-sm outline-none transition-[background-color,color,transform] duration-150 hover:translate-x-0.5 hover:bg-[#F5F2EB] focus-visible:translate-x-0.5 focus-visible:bg-[#F5F2EB] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40 ${
                              link.strong
                                ? 'font-bold text-[#D10E63]'
                                : 'font-medium text-[#3F3A33] hover:text-[#1C1A17] focus-visible:text-[#1C1A17]'
                            }`}
                          >
                            {link[lang]}
                          </a>
                        ))}
                        <div className="my-1.5 border-t border-[#E9E2D3]" />
                        <p className="px-3 pb-1 pt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A79C89]">
                          {t.featuredLabel}
                        </p>
                        {COLLAB_FEATURED.map((c) => (
                          <a
                            key={c.name}
                            href={c.href}
                            onClick={() => setOpenMenu(null)}
                            className="flex min-h-11 items-center gap-3 rounded-[10px] px-3 py-1.5 outline-none transition-[background-color,transform] duration-150 hover:translate-x-0.5 hover:bg-[#F5F2EB] focus-visible:translate-x-0.5 focus-visible:bg-[#F5F2EB] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
                          >
                            <img src={c.avatar || '/placeholder.svg'} alt="" className="h-8 w-8 rounded-full object-cover" />
                            <span className="min-w-0">
                              <span className="block text-sm font-bold leading-tight text-[#1C1A17]">{c.name}</span>
                              <span className="block truncate text-[11px] text-[#6E665A]">{c.role[lang]}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Workspace direct link */}
              <a
                href="/workspace"
                className="rounded-full px-3 py-2 text-sm font-medium text-[#857C6E] transition-colors hover:text-[#1C1A17]"
              >
                {t.workspace}
              </a>
            </div>
          </div>

          {/* Right: utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/tarifs"
              className="hidden px-2 py-2 text-sm font-medium text-[#857C6E] transition-colors hover:text-[#1C1A17] lg:inline-flex"
            >
              {t.pricing}
            </a>
            <a
              href="/signup"
              className="hidden px-2 py-2 text-sm font-medium text-[#857C6E] transition-colors hover:text-[#1C1A17] lg:inline-flex"
            >
              {t.signIn}
            </a>
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-1.5 py-2 text-xs font-medium text-[#1C1A17] transition-colors hover:text-[#D10E63]"
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
              {lang === 'fr' ? 'FR' : 'EN'}
            </button>

            <NavbarTeamCart startLabel={t.createOrg} createOrgHref={CREATE_ORG.href} />

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
              className="fixed inset-0 top-16 z-30 hidden bg-black/20 backdrop-blur-sm lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              id="menu-panel"
              className="scrollbar-hide fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto overflow-x-hidden border-[#DcD4C4] bg-[#F3EFE6] lg:inset-x-auto lg:right-0 lg:mr-4 lg:w-auto lg:max-w-sm lg:border-l"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="flex flex-1 flex-col px-0 py-3">
                {/* Primary links */}
                <div className="border-b border-[#DcD4C4] px-8 py-4">
                  {MOBILE_LINKS.map((link) => (
                    <a
                      key={link.fr}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2.5 text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                    >
                      {link[lang]}
                    </a>
                  ))}
                  <a
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 text-base font-semibold text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.signIn}
                  </a>
                </div>

                {/* Contact */}
                <div className="border-b border-[#DcD4C4] px-8 py-4">
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

                {/* Language */}
                <div className="px-8 py-4">
                  <button
                    onClick={toggleLang}
                    className="flex items-center gap-2 py-1.5 text-xs font-normal text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                    aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                  >
                    {lang === 'fr' ? <FrenchFlag /> : <UkFlag />}
                    {lang === 'fr' ? 'Français' : 'English'}
                  </button>
                </div>

                {/* Fixed CTA */}
                <div className="mt-auto border-t border-[#DcD4C4] px-8 py-4">
                  <a
                    href={CREATE_ORG.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 py-3 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B10B53]"
                  >
                    <Network className="h-4 w-4" />
                    {CREATE_ORG.label[lang]}
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
