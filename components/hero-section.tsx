'use client'

import { useState } from 'react'
import { Navbar } from './navbar'
import { LeftColumn } from './left-column'
import { CenterColumn } from './center-column'
import { RightColumn } from './right-column'
import { FloatingAlmaButton } from './floating-alma-button'
import { TrustSection } from './trust-section'

export function HeroSection() {
  const [domain, setDomain] = useState('')

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Hero 3-column layout */}
      <section className="relative min-h-screen pt-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
            {/* Left column: 40% */}
            <div className="md:col-span-5">
              <LeftColumn onDomainSubmit={setDomain} />
            </div>

            {/* Center column: 28% */}
            <div className="md:col-span-3">
              <CenterColumn domain={domain || 'agence-thomas.fr'} />
            </div>

            {/* Right column: 32% */}
            <div className="md:col-span-4">
              <RightColumn />
            </div>
          </div>
        </div>
      </section>

      {/* Floating button */}
      <FloatingAlmaButton />

      {/* Trust section */}
      <TrustSection />
    </div>
  )
}
