'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UnitalkLogo } from './unitalk-logo'

const NAV_LINKS = [
  { label: 'Nos solutions', href: '#' },
  { label: 'Offres', href: '#offres' },
  { label: 'Trouver des agents', href: '#' },
  { label: 'Sécurité', href: '#' },
  { label: 'Devenir partenaire', href: '#' },
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[#0A0A0A]">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <UnitalkLogo size={28} />
          <span className="font-inter text-sm sm:text-base font-semibold text-white">Unitalk AI</span>
        </div>

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
            Login
          </button>
          <button
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FF0099] hover:bg-[#E00085] text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            aria-label="Essayer gratuitement"
          >
            Essayer
          </button>

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
              className="fixed top-16 bottom-0 z-40 overflow-y-auto border-t border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] inset-x-0 lg:inset-x-auto lg:right-0 lg:w-80 lg:border-l lg:border-t-0"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <nav className="flex flex-col px-6 py-6 space-y-1">
                {/* Account group */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="space-y-0"
                >
                  <motion.a
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    whileHover={{ x: 4 }}
                    className="rounded-lg px-4 py-3.5 text-base font-medium text-white transition-all hover:bg-white/5"
                  >
                    S&apos;inscrire
                  </motion.a>
                  <motion.a
                    href="#"
                    onClick={() => setIsMenuOpen(false)}
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    whileHover={{ x: 4 }}
                    className="rounded-lg px-4 py-3.5 text-base font-medium text-white transition-all hover:bg-white/5"
                  >
                    Se connecter
                  </motion.a>
                </motion.div>

                {/* Divider */}
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

                {/* Primary nav group */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                  className="space-y-0"
                >
                  {NAV_LINKS.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                      whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                      className="rounded-lg px-4 py-3.5 text-base font-medium text-white transition-all"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Divider */}
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

                {/* Contact group */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.35,
                      },
                    },
                  }}
                  className="space-y-1 pt-2"
                >
                  <motion.a
                    href="tel:+33189713394"
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm text-[#C7C7D1] transition-all hover:bg-white/5"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#FF0099] flex-shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="underline underline-offset-4 group-hover:text-white">01 89 71 33 94</span>
                  </motion.a>
                  <motion.a
                    href="mailto:hello@unitalk.ai"
                    variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm text-[#C7C7D1] transition-all hover:bg-white/5"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-[#FF0099] flex-shrink-0">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                    <span className="underline underline-offset-4 group-hover:text-white">hello@unitalk.ai</span>
                  </motion.a>
                </motion.div>

                {/* Divider */}
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />

                {/* Language selector */}
                <motion.button
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm font-medium text-white transition-all"
                >
                  <span aria-hidden="true" className="inline-flex overflow-hidden rounded-sm border border-[rgba(255,255,255,0.15)]">
                    <span className="h-4 w-2 bg-[#0055A4]" />
                    <span className="h-4 w-2 bg-white" />
                    <span className="h-4 w-2 bg-[#EF4135]" />
                  </span>
                  Français
                </motion.button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
