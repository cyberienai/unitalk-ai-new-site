'use client'

import { Navbar } from './navbar'
import { HeroNew } from './hero-new'
import { AlmaIaSections } from './alma-ia-sections'
import { CoreProductCards } from './core-product-cards'
import { ProductShowcase } from './product-showcase'
import { CapabilitiesSection } from './capabilities-section'
import { PricingSection } from './pricing-section'
import { FaqSection } from './faq-section'
import { SiteFooter } from './site-footer'

export function HeroSection() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />

      {/* New hero with 2 columns and Sofia card */}
      <HeroNew lang="fr" />

      {/* Alma onboarding + IA dispersée sections */}
      <AlmaIaSections lang="fr" />

      {/* Core product: what transforms an agent into collaborator */}
      <CoreProductCards lang="fr" />

      {/* Product showcase — adapted */}
      <ProductShowcase />

      {/* Agentic capabilities grid */}
      <CapabilitiesSection />

      {/* Pricing section */}
      <PricingSection />

      {/* FAQ section */}
      <FaqSection />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
