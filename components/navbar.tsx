'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UnitalkLogo } from './unitalk-logo'

const NAV_LINKS = [
  { label: 'Nos solutions', href: '/#solutions' },
  { label: 'Offres', href: '/#offres' },
  { label: 'Trouver des agents', href: '/agents' },
  { label: 'Sécurité', href: '#' },
  { label: 'Devenir partenaire', href: '/partenaires' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" aria-label="Accueil Unitalk AI" className="flex items-center gap-2 sm:gap-3">
          <UnitalkLogo size={28} />
          <span className="font-inter text-sm sm:text-base font-semibold text-white">Unitalk AI</span>
        </a>

        {/* Center: Nav links - Desktop only */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#8E8E93] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="hidden sm:inline-flex px-3 sm:px-4 py-2 text-xs sm:text-sm text-white hover:text-[#8E8E93] transition-colors"
            aria-label="Se connecter"
          >
            Se connecter
          </button>
          <a
            href="/creer"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FF0099] hover:bg-[#E00085] text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            aria-label="Créer mon agent"
          >
            Créer mon agent
          </a>

          {/* Menu button — visible on all breakpoints */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] text-white transition-colors hover:bg-[rgba(255,255,255,0.08)]"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
              className="fixed top-16 bottom-0 z-40 overflow-y-auto overflow-x-hidden bg-[#0A0A0A] inset-x-0 lg:inset-x-auto lg:right-0 lg:w-auto lg:max-w-xs lg:mr-4 lg:border-l border-[rgba(255,255,255,0.06)] scrollbar-hide"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="flex flex-col px-0 py-3">
                {/* Account section */}
                <div className="space-y-1 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
                  <a
                    href="/creer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-normal text-white hover:text-[#FF0099] transition-colors"
                  >
                    S&apos;inscrire
                  </a>
                  <a
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-normal text-white hover:text-[#FF0099] transition-colors"
                  >
                    Se connecter
                  </a>
                </div>

                {/* Navigation section */}
                <div className="py-3 px-4 border-b border-[rgba(255,255,255,0.06)]">
                  <div className="space-y-1">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-1.5 text-sm font-normal text-white hover:text-[#FF0099] transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact section */}
                <div className="py-3 px-4 border-b border-[rgba(255,255,255,0.06)]">
                  <a
                    href="tel:+33189713394"
                    className="group flex items-center gap-2 px-4 py-1.5 text-xs font-normal text-[#C7C7D1] hover:text-white transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#FF0099] flex-shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="underline underline-offset-2">01 89 71 33 94</span>
                  </a>
                  <a
                    href="mailto:hello@unitalk.ai"
                    className="group flex items-center gap-2 px-4 py-1.5 text-xs font-normal text-[#C7C7D1] hover:text-white transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#FF0099] flex-shrink-0">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                    <span className="underline underline-offset-2">hello@unitalk.ai</span>
                  </a>
                </div>

                {/* Language selector */}
                <div className="py-3 px-4">
                  <button className="flex items-center gap-2 px-4 py-1.5 text-xs font-normal text-white hover:text-[#FF0099] transition-colors">
                    <span aria-hidden="true" className="inline-flex overflow-hidden rounded-sm border border-[rgba(255,255,255,0.15)]">
                      <span className="h-4 w-2 bg-[#0055A4]" />
                      <span className="h-4 w-2 bg-white" />
                      <span className="h-4 w-2 bg-[#EF4135]" />
                    </span>
                    Français
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
