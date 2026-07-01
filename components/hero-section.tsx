'use client'

import { Navbar } from './navbar'
import { HeroEditorial } from './hero-editorial'
import { ArgumentsSlider } from './arguments-slider'
import { ProductShowcase } from './product-showcase'
import { PricingSection } from './pricing-section'
import { TrustSection } from './trust-section'
import { FaqSection } from './faq-section'
import { HeroBackdrop } from './backdrop'

export function HeroSection() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Editorial full-frame hero */}
      <section className="relative w-full overflow-hidden pt-16 sm:pt-20">
        <HeroBackdrop />
        <HeroEditorial />
      </section>

      {/* Product showcase — light section for editorial rhythm */}
      <ProductShowcase />

      {/* Arguments as horizontal card slider */}
      <ArgumentsSlider />

      {/* Pricing section */}
      <PricingSection />

      {/* Trust section */}
      <TrustSection />

      {/* FAQ section */}
      <FaqSection />
    </div>
  )
}
