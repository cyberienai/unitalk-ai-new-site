import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingHero } from '@/components/pricing/pricing-sections'
import { PricingFaqFinal } from '@/components/pricing/pricing-faq-final'
import { pricingFaqJsonLd } from '@/lib/pricing-faq'
import type { PricingDraft } from '@/lib/unitalk-pricing'

export function PricingPageContent({ initialDraft, selectedProfile, lang = 'fr' }: { initialDraft: PricingDraft; selectedProfile?: string; lang?: 'fr' | 'en' }) {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <a href="#main-content" className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-[#181615] px-4 py-2 text-sm font-bold text-white transition-transform focus:translate-y-0">{lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>
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
