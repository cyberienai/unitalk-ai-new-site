'use client'

import { Navbar } from './navbar'
import { LeftColumn } from './left-column'
import { CenterColumn } from './center-column'
import { Slider } from './slider'
import { FloatingAlmaButton } from './floating-alma-button'

export function HeroSection() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero Content */}
      <div className="max-w-[1440px] mx-auto px-12 pt-[72px] pb-16 min-h-[calc(100vh-72px)]">
        <div className="grid grid-cols-12 gap-12 h-[calc(100vh-72px-64px)]">
          {/* Left Column - 40-42% */}
          <div className="col-span-5 flex items-center">
            <LeftColumn />
          </div>

          {/* Center Column - 28% */}
          <div className="col-span-3 flex items-center">
            <div className="w-full">
              <CenterColumn />
            </div>
          </div>

          {/* Right Column Slider - 30-32% */}
          <div className="col-span-4 flex items-center">
            <div className="w-full h-full">
              <Slider />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Alma Button */}
      <FloatingAlmaButton />

      {/* Conformité Section */}
      <section className="bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.08)] py-16">
        <div className="max-w-[960px] mx-auto px-12 space-y-8">
          <h2 className="text-white text-xs uppercase tracking-widest mb-12">Conformité</h2>
          
          <div className="space-y-8">
            {/* Conformité Block */}
            <div>
              <h3 className="text-white text-xs uppercase tracking-widest mb-2">CONFORMITÉ</h3>
              <p className="text-[#8E8E93] text-sm leading-relaxed">
                Vos données restent en France. Personne ne les lit.
                Personne ne les entraîne. Vous partez quand vous voulez.
              </p>
            </div>

            {/* Confidentialité Block */}
            <div>
              <h3 className="text-white text-xs uppercase tracking-widest mb-2">CONFIDENTIALITÉ</h3>
              <p className="text-[#8E8E93] text-sm leading-relaxed">
                Données isolées et chiffrées. Accès contrôlés.
                Aucune donnée utilisée pour entraîner des modèles.
              </p>
            </div>

            {/* Sécurité Block */}
            <div>
              <h3 className="text-white text-xs uppercase tracking-widest mb-2">SÉCURITÉ</h3>
              <p className="text-[#8E8E93] text-sm leading-relaxed">
                Ils préparent. Vous validez. Ils font.
                Un ingénieur IA prend le relais si besoin.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
