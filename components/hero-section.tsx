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
      <section className="relative w-full pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-0 md:h-[calc(100vh-80px)]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-6 w-full md:h-full md:items-start md:pt-8 lg:pt-12">
            {/* Left column: 40% on desktop, full on mobile */}
            <div className="col-span-1 md:col-span-5 flex flex-col">
              <LeftColumn onDomainSubmit={setDomain} />
            </div>

            {/* Center column: 28% on desktop, hidden on tablet, full on mobile below lg */}
            <div className="col-span-1 md:col-span-3 hidden sm:block md:block md:flex md:flex-col">
              <CenterColumn domain={domain || 'agence-thomas.fr'} />
            </div>

            {/* Right column: 32% on desktop, full on mobile */}
            <div className="col-span-1 md:col-span-4 md:flex md:flex-col">
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
