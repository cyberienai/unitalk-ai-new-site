'use client'

import { UnitalkLogo } from './unitalk-logo'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-[1440px] mx-auto px-12 h-[72px] flex items-center justify-between">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <UnitalkLogo size={32} />
          <span className="text-white font-medium text-base">Unitalk AI</span>
        </div>

        {/* Center Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-[#8E8E93] text-sm font-medium hover:text-white transition-colors">
            Produit
          </a>
          <a href="#" className="text-[#8E8E93] text-sm font-medium hover:text-white transition-colors">
            Offres
          </a>
          <a href="#" className="text-[#8E8E93] text-sm font-medium hover:text-white transition-colors">
            Sécurité
          </a>
          <a href="#" className="text-[#8E8E93] text-sm font-medium hover:text-white transition-colors">
            Partenaires
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button 
            className="px-4 py-2 text-white text-sm font-medium hover:bg-[#1E1E1E] rounded-full transition-colors border border-[rgba(255,255,255,0.1)]"
            aria-label="Login"
          >
            Connexion
          </button>
          <button 
            className="px-9 py-2.5 bg-[#FF0099] text-white text-sm font-medium rounded-full hover:bg-[#E00085] transition-colors"
            aria-label="Start free trial"
          >
            Essayer gratuitement
          </button>
        </div>
      </div>
    </nav>
  )
}
