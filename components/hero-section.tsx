'use client'

import { useState } from 'react'
import { Navbar } from './navbar'
import { LeftColumn } from './left-column'
import { AlmaChat } from './alma-chat'
import { ArgumentsSlider } from './arguments-slider'
import { PricingSection } from './pricing-section'
import { TrustSection } from './trust-section'
import { HeroBackdrop } from './backdrop'

export function HeroSection() {
  const [domain, setDomain] = useState('')

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Hero 2-column layout — left CTA, right Alma chat + orbe */}
      <section className="relative w-full overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-0 md:min-h-[calc(100vh-80px)]">
        <HeroBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-8 lg:gap-10 w-full md:items-center md:pt-8 lg:pt-12">
            {/* Left column: CTA */}
            <div className="col-span-1 md:col-span-6 flex flex-col">
              <LeftColumn onDomainSubmit={setDomain} />
            </div>

            {/* Right column: fixed Alma chat */}
            <div className="col-span-1 md:col-span-6 flex flex-col items-center relative">
              <AlmaChat />
            </div>
          </div>
        </div>
      </section>

      {/* Arguments as horizontal card slider */}
      <ArgumentsSlider />

      {/* Pricing section */}
      <PricingSection />

      {/* Trust section */}
      <TrustSection />
    </div>
  )
}
