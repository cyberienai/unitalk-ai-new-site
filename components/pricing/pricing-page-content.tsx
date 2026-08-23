import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingHero } from '@/components/pricing/pricing-sections'
import { PricingFaqFinal } from '@/components/pricing/pricing-faq-final'
import { pricingFaqJsonLd } from '@/lib/pricing-faq'
import type { PricingDraft } from '@/lib/unitalk-pricing'

export function PricingPageContent({ initialDraft, selectedProfile, lang = 'fr' }: { initialDraft: PricingDraft; selectedProfile?: string; lang?: 'fr' | 'en' }) {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd(lang)) }} />
      <main id="main-content" tabIndex={-1}>
        <PricingHero />
        <PricingCollaboration initialDraft={initialDraft} selectedProfile={selectedProfile} />
        <PricingFaqFinal />
      </main>
      <SiteFooter />
    </div>
  )
}
