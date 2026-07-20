'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'
import { COLLAB_SECTION } from '@/lib/collaborators-nav'

type NavLink = { fr: string; en: string; href: string }

// Collaborateurs IA dropdown (desktop)
const COLLAB_MENU: NavLink[] = [
  { fr: 'Découvrir les Collaborateurs IA', en: 'Discover AI Collaborators', href: '/collaborateurs-ia' },
  { fr: 'Présence numérique', en: 'Digital presence', href: '#' },
  { fr: 'Marketplace', en: 'Marketplace', href: '#' },
]

// Unitalk Work dropdown (desktop)
const WORK_MENU: NavLink[] = [
  { fr: 'Desktop', en: 'Desktop', href: '#' },
  { fr: 'Cloud', en: 'Cloud', href: '#' },
  { fr: 'Local (Ollama)', en: 'Local (Ollama)', href: '#' },
  { fr: 'Messageries', en: 'Messaging', href: '#' },
  { fr: 'Terminal', en: 'Terminal', href: '#' },
]

const WORK_LABEL = { fr: 'Unitalk Work', en: 'Unitalk Work' }
const PRICING_LINK: NavLink = { fr: 'Tarifs', en: 'Pricing', href: '/#offres' }

// Full burger menu — organized in sections
const MENU_SECTIONS: { title: { fr: string; en: string }; links: NavLink[] }[] = [
  {
    title: { fr: 'Produit', en: 'Product' },
    links: [
      { fr: 'Collaborateurs IA', en: 'AI Collaborators', href: '/collaborateurs-ia' },
      { fr: 'Unitalk Work', en: 'Unitalk Work', href: '#' },
      { fr: 'Tarifs', en: 'Pricing', href: '/#offres' },
    ],
  },
  {
    title: { fr: 'Plateforme', en: 'Platform' },
    links: [
      { fr: 'AI Server', en: 'AI Server', href: '#' },
      { fr: 'AI Gateway', en: 'AI Gateway', href: '#' },
    ],
  },
  {
    title: { fr: 'Créer', en: 'Build' },
    links: [
      { fr: 'Marketplace', en: 'Marketplace', href: '#' },
      { fr: 'Devenir partenaire', en: 'Become a partner', href: '/partenaires' },
      { fr: 'Développeurs', en: 'Developers', href: '#' },
    ],
  },
  {
    title: { fr: 'Ressources', en: 'Resources' },
    links: [
      { fr: 'Documentation', en: 'Documentation', href: '#' },
      { fr: 'Academy', en: 'Academy', href: '#' },
      { fr: 'Blog', en: 'Blog', href: '#' },
    ],
  },
  {
    title: { fr: 'Entreprise', en: 'Company' },
    links: [
      { fr: 'À propos', en: 'About', href: '#' },
      { fr: 'Contact', en: 'Contact', href: '/contact' },
      { fr: 'Sécurité', en: 'Security', href: '/#confiance' },
    ],
  },
]

const T = {
  fr: {
    home: 'Accueil Unitalk AI',
    signIn: 'Se connecter',
    createFirstAgent: "Commencer l'essai gratuit",
    signUp: 'S’inscrire',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    createFirstAgent: 'Start free trial',
    signUp: 'Sign up',
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
    <span
      aria-hidden="true"
      className="inline-block h-4 w-[18px] overflow-hidden rounded-sm border border-[#DcD4C4]"
    >
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${open ? 'rotate-180 text-[#D10E63]' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function NavDropdown({
  label,
  items,
  lang,
  isOpen,
  onOpen,
  onClose,
  width = 'w-72',
}: {
  label: string
  items: NavLink[]
  lang: 'fr' | 'en'
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  width?: string
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#857C6E] transition-colors hover:text-[#1C1A17]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        {label}
        <Chevron open={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute left-1/2 top-full z-50 ${width} -translate-x-1/2 pt-3`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
          >
            <div className="overflow-hidden rounded-2xl border border-[#DcD4C4] bg-[#FBF9F3] p-2 shadow-[0_24px_60px_rgba(28,26,23,0.16)]">
              <p className="px-3 pb-2 pt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">
                {label}
              </p>
              {items.map((link) => (
                <a
                  key={link.fr}
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#1C1A17] transition-colors hover:bg-[#F3EFE6] hover:text-[#D10E63]"
                >
                  {link[lang]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<'collab' | 'work' | null>(null)
  const { lang, setLang } = useLanguage()
  const t = T[lang]

  // Lock body scroll while the menu is open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile) {
      document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr')

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D8D0C2]/75 bg-[#F3EFE6]/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Left: Logo + inline nav */}
          <div className="flex items-center gap-8 xl:gap-10">
            <a href="/" aria-label={t.home} className="flex items-center gap-2 sm:gap-3">
              <UnitalkLogo size={24} />
              <span className="font-inter text-sm font-semibold text-[#1C1A17] sm:text-base">Unitalk</span>
            </a>

            <div className="hidden items-center gap-6 lg:flex xl:gap-8">
              <NavDropdown
                label={COLLAB_SECTION[lang]}
                items={COLLAB_MENU}
                lang={lang}
                isOpen={openDropdown === 'collab'}
                onOpen={() => setOpenDropdown('collab')}
                onClose={() => setOpenDropdown(null)}
              />
              <NavDropdown
                label={WORK_LABEL[lang]}
                items={WORK_MENU}
                lang={lang}
                isOpen={openDropdown === 'work'}
                onOpen={() => setOpenDropdown('work')}
                onClose={() => setOpenDropdown(null)}
                width="w-56"
              />
              <a
                href={PRICING_LINK.href}
                className="text-sm font-medium text-[#857C6E] transition-colors hover:text-[#1C1A17]"
              >
                {PRICING_LINK[lang]}
              </a>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/login"
              className="hidden px-3 py-2 text-sm font-medium text-[#1C1A17] transition-colors hover:text-[#D10E63] sm:inline-flex"
              aria-label={t.signIn}
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

            <a
              href="/signup"
              className="hidden min-h-10 items-center gap-2 rounded-full bg-[#D10E63] px-5 text-sm font-semibold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 lg:inline-flex"
            >
              {t.createFirstAgent}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DcD4C4] bg-[#FBF9F3] text-[#1C1A17] transition-colors hover:bg-[#EAE3D4]"
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

      {/* Burger menu panel */}
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
              className="scrollbar-hide fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overflow-x-hidden border-[#DcD4C4] bg-[#F3EFE6] lg:inset-x-auto lg:right-0 lg:mr-4 lg:w-auto lg:max-w-sm lg:border-l"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="flex flex-col px-0 py-3">
                {/* Account */}
                <div className="space-y-1 border-b border-[#DcD4C4] px-8 py-4">
                  <a
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.signUp}
                  </a>
                  <a
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                  >
                    {t.signIn}
                  </a>
                </div>

                {/* Sections */}
                {MENU_SECTIONS.map((section) => (
                  <div key={section.title.fr} className="border-b border-[#DcD4C4] px-8 py-4">
                    <p className="pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D10E63]">
                      {section.title[lang]}
                    </p>
                    <div className="space-y-0.5">
                      {section.links.map((link) => (
                        <a
                          key={`${section.title.fr}-${link.fr}`}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block py-1.5 text-sm font-normal text-[#1C1A17] transition-colors hover:text-[#D10E63]"
                        >
                          {link[lang]}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}

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
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
