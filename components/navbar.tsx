'use client'

import { useState } from 'react'
import { UnitalkLogo } from './unitalk-logo'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[#0A0A0A]">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <UnitalkLogo size={28} />
          <span className="font-inter text-sm sm:text-base font-semibold text-white hidden sm:inline">Unitalk AI</span>
        </div>

        {/* Center: Nav links - Desktop only */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <a href="#" className="text-sm text-[#8E8E93] hover:text-white transition-colors">
            Produit
          </a>
          <a href="#" className="text-sm text-[#8E8E93] hover:text-white transition-colors">
            Offres
          </a>
          <a href="#" className="text-sm text-[#8E8E93] hover:text-white transition-colors">
            Sécurité
          </a>
          <a href="#" className="text-sm text-[#8E8E93] hover:text-white transition-colors">
            Partenaires
          </a>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="hidden sm:inline-flex px-3 sm:px-4 py-2 text-xs sm:text-sm text-white hover:text-[#8E8E93] transition-colors"
            aria-label="Login"
          >
            Login
          </button>
          <button
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FF0099] hover:bg-[#E00085] text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            aria-label="Start free trial"
          >
            Essayer
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#8E8E93] hover:text-white transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[rgba(255,255,255,0.06)] bg-[#0A0A0A] px-4 py-4 space-y-3">
          <a href="#" className="block text-sm text-[#8E8E93] hover:text-white transition-colors">
            Produit
          </a>
          <a href="#" className="block text-sm text-[#8E8E93] hover:text-white transition-colors">
            Offres
          </a>
          <a href="#" className="block text-sm text-[#8E8E93] hover:text-white transition-colors">
            Sécurité
          </a>
          <a href="#" className="block text-sm text-[#8E8E93] hover:text-white transition-colors">
            Partenaires
          </a>
        </div>
      )}
    </header>
  )
}
