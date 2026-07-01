'use client'

import { useState } from 'react'
import { Navbar } from './navbar'
import { LeftColumn } from './left-column'
import { CenterColumn } from './center-column'
import { RightColumn } from './right-column'
import { FloatingAlmaButton } from './floating-alma-button'
import { PricingSection } from './pricing-section'
import { TrustSection } from './trust-section'
import { HeroBackdrop } from './backdrop'

export function HeroSection() {
  const [domain, setDomain] = useState('')

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Hero 2-column layout (without center slider) */}
      <section className="relative w-full overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-0 md:h-[calc(100vh-80px)]">
        <HeroBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-6 w-full md:h-full md:items-start md:pt-8 lg:pt-12">
            {/* Left column: wider now that center is removed */}
            <div className="col-span-1 md:col-span-6 flex flex-col">
              <LeftColumn onDomainSubmit={setDomain} />
            </div>

            {/* Right column: also wider */}
            <div className="col-span-1 md:col-span-6 md:flex md:flex-col">
              <RightColumn />
            </div>
          </div>
        </div>
      </section>

      {/* Floating button */}
      <FloatingAlmaButton />

      {/* Slider section (2nd section) */}
      <section className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.06)]">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <CenterColumn domain={domain || 'agence-thomas.fr'} />
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <PricingSection />

      {/* Trust section */}
      <TrustSection />
    </div>
  )
}
