'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UnitalkLogo } from './unitalk-logo'
import { useLanguage } from '@/lib/language-context'

// Full list — shown in the burger menu
const NAV_LINKS = [
  { fr: 'Démarrer', en: 'Get Started', href: '/solo' },
  { fr: 'Collaborer', en: 'Collaborate', href: '/teams' },
  { fr: 'Déployer', en: 'Deploy', href: '/business' },
  { fr: 'Tarifs', en: 'Pricing', href: '/tarifs' },
  { fr: 'Solutions', en: 'Solutions', href: '/solutions' },
  { fr: "10 profils prêts à l'emploi", en: '10 ready-to-use profiles', href: '/use-cases' },
  { fr: 'Accompagnement', en: 'Support', href: '/accompagnement' },
  { fr: 'Agent Hermes', en: 'Hermes Agent', href: '/agent-hermes' },
  { fr: 'Modèles IA', en: 'AI models', href: '/modeles-ia' },
  { fr: 'Hébergeurs', en: 'Hosting', href: '/hebergeurs' },
  { fr: 'Agent IA public', en: 'Public AI agent', href: '/agent-ia-public' },
  { fr: 'Sécurité', en: 'Security', href: '/#confiance' },
  { fr: 'Devenir partenaire', en: 'Become a partner', href: '/partenaires' },
]

// Essentials — shown inline on desktop
const PRIMARY_LINKS = [
  { fr: 'Démarrer', en: 'Get Started', href: '/solo' },
  { fr: 'Collaborer', en: 'Collaborate', href: '/teams' },
  { fr: 'Déployer', en: 'Deploy', href: '/business' },
  { fr: 'Tarifs', en: 'Pricing', href: '/tarifs' },
]

const T = {
  fr: {
    home: 'Accueil Unitalk AI',
    signIn: 'Se connecter',
    talkToAlma: 'Parlez à Alma',
    createAgent: 'Créer mon Collaborateur IA gratuit',
    signUp: 'S’inscrire',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  en: {
    home: 'Unitalk AI Home',
    signIn: 'Sign in',
    talkToAlma: 'Talk to Alma',
    createAgent: 'Create my AI Collaborator for free',
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

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { lang, setLang } = useLanguage()
  const t = T[lang]

  // Prevent hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true)
  }, [])

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F3EFE6]/85 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Logo + nav links grouped together */}
        <div className="flex items-center gap-8 xl:gap-10">
          <a href="/" aria-label={t.home} className="flex items-center gap-2 sm:gap-3">
            <UnitalkLogo size={24} />
            <span className="font-inter text-sm sm:text-base font-semibold text-[#1C1A17]">Unitalk</span>
          </a>

          {/* Nav links - Desktop only (essentials) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {mounted && PRIMARY_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#857C6E] hover:text-[#1C1A17] transition-colors"
              >
                {link[lang]}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="/#alma"
            className="hidden sm:inline-flex text-xs sm:text-sm font-medium text-[#D10E63] hover:text-[#B00B52] transition-colors"
          >
            {t.talkToAlma}
          </a>
          <button
            className="inline-flex px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#1C1A17] hover:text-[#857C6E] transition-colors"
            aria-label={t.signIn}
          >
            {t.signIn}
          </button>
          {/* Language selector — toggles FR/EN */}
          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 px-1.5 py-2 text-xs font-medium text-[#1C1A17] hover:text-[#D10E63] transition-colors"
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            {lang === 'fr' ? <UkFlag /> : <FrenchFlag />}
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          {/* Menu button — visible on all breakpoints */}
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

      {/* Menu panel — adaptive for mobile (full screen) and desktop (sidebar) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop — desktop only */}
            <motion.div
              className="hidden lg:block fixed inset-0 top-16 z-30 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              id="menu-panel"
              className="fixed top-16 bottom-0 z-40 overflow-y-auto overflow-x-hidden bg-[#F3EFE6] inset-x-0 lg:inset-x-auto lg:right-0 lg:w-auto lg:max-w-xs lg:mr-4 lg:border-l border-[#DcD4C4] scrollbar-hide"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="flex flex-col px-0 py-3">
                {/* Account section */}
                <div className="space-y-1 px-4 py-3 border-b border-[#DcD4C4]">
                  <a
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-normal text-[#1C1A17] hover:text-[#D10E63] transition-colors"
                  >
                    {t.signUp}
                  </a>
                  <a
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-normal text-[#1C1A17] hover:text-[#D10E63] transition-colors"
                  >
                    {t.signIn}
                  </a>
                </div>

                {/* Navigation section */}
                <div className="py-3 px-4 border-b border-[#DcD4C4]">
                  <div className="space-y-1">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-1.5 text-sm font-normal text-[#1C1A17] hover:text-[#D10E63] transition-colors"
                      >
                        {link[lang]}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact section */}
                <div className="py-3 px-4 border-b border-[#DcD4C4]">
                  <a
                    href="tel:+33189713394"
                    className="group flex items-center gap-2 px-4 py-1.5 text-xs font-normal text-[#4E483F] hover:text-[#1C1A17] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#D10E63] flex-shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="underline underline-offset-2">01 89 71 33 94</span>
                  </a>
                  <a
                    href="mailto:hello@unitalk.ai"
                    className="group flex items-center gap-2 px-4 py-1.5 text-xs font-normal text-[#4E483F] hover:text-[#1C1A17] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#D10E63] flex-shrink-0">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                    <span className="underline underline-offset-2">hello@unitalk.ai</span>
                  </a>
                </div>

                {/* Language selector — toggles FR/EN */}
                <div className="py-3 px-4">
                  <button
                    onClick={toggleLang}
                    className="flex items-center gap-2 px-4 py-1.5 text-xs font-normal text-[#1C1A17] hover:text-[#D10E63] transition-colors"
                    aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                  >
                    {lang === 'fr' ? <UkFlag /> : <FrenchFlag />}
                    {lang === 'fr' ? 'English' : 'Français'}
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
