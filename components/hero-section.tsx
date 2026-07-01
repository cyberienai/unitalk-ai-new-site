'use client'

import { Navbar } from './navbar'
import { HeroEditorial } from './hero-editorial'
import { IntegrationsMarquee } from './integrations-marquee'
import { ArgumentsSlider } from './arguments-slider'
import { ProductShowcase } from './product-showcase'
import { CapabilitiesSection } from './capabilities-section'
import { AccessSection } from './access-section'
import { StatementBand } from './statement-band'
import { EnterpriseSection } from './enterprise-section'
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

      {/* Integrations logo marquee */}
      <IntegrationsMarquee />

      {/* Product showcase — light section for editorial rhythm */}
      <ProductShowcase />

      {/* Agentic capabilities grid */}
      <CapabilitiesSection />

      {/* Access surfaces — where you reach your agent */}
      <AccessSection />

      {/* Arguments as horizontal card slider */}
      <ArgumentsSlider />

      {/* Editorial pull-quote — learning over time */}
      <StatementBand />

      {/* Enterprise-level statement */}
      <EnterpriseSection />

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
