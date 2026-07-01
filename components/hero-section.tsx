'use client'

import { Navbar } from './navbar'
import { HeroEditorial } from './hero-editorial'
import { ArgumentsSlider } from './arguments-slider'
import { ProductShowcase } from './product-showcase'
import { PricingSection } from './pricing-section'
import { TrustSection } from './trust-section'
import { FaqSection } from './faq-section'
import { SiteFooter } from './site-footer'
import { HeroBackdrop } from './backdrop'

export function HeroSection() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
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

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
