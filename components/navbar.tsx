'use client'

import { UnitalkLogo } from './unitalk-logo'

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[#0A0A0A]">
      <nav className="mx-auto max-w-7xl px-12 md:px-6 h-72px flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <UnitalkLogo size={32} />
          <span className="font-inter text-base font-semibold text-white hidden sm:inline">Unitalk AI</span>
        </div>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-8">
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
        <div className="flex items-center gap-4">
          <button
            className="hidden sm:inline-flex px-4 py-2 text-sm text-white hover:text-[#8E8E93] transition-colors"
            aria-label="Login"
          >
            Login
          </button>
          <button
            className="px-5 py-2.5 rounded-full bg-[#FF0099] hover:bg-[#E00085] text-white text-sm font-medium transition-colors"
            aria-label="Start free trial"
          >
            Essayer gratuitement
          </button>
        </div>
      </nav>
    </header>
  )
}
