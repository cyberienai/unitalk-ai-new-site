import type { Metadata } from 'next'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { PricingCollaboration, PricingHero } from '@/components/pricing/pricing-sections'
import { PricingFinalCta } from '@/components/pricing/pricing-final-cta'
import { PricingDraftProvider } from '@/components/pricing/pricing-draft-context'
import { PricingFaqFinal } from '@/components/pricing/pricing-faq-final'
import { PRICING_DRAFT_COOKIE, normalizePricingDraft, parsePricingDraftEnvelope, type AiCapacityId } from '@/lib/unitalk-pricing'

export const metadata: Metadata = {
  title: 'Tarifs Collaborateur IA et entreprise IA | Unitalk',
  description:
    'Configurez votre entreprise IA : Compte Entreprise, licences Collaborateur IA dès 49 €/mois et capacité modèles IA avec Vos Clés API ou jusqu’à 20 millions de tokens.',
  alternates: { canonical: '/tarifs' },
  openGraph: {
    type: 'website',
    url: 'https://unitalk.ai/tarifs',
    title: 'Tarifs Collaborateur IA et entreprise IA | Unitalk',
    description: 'Un compte central, des Collaborateurs IA à 49 €/mois, Hermes gratuit sous licence MIT et une capacité modèles IA ajustable.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Tarifs Collaborateur IA | Unitalk', description: 'Configurez votre entreprise IA et calculez immédiatement votre prix mensuel.', images: ['/opengraph-image'] },
}

const pricingFaqItems=[['Comment est calculé le prix de Unitalk ?','Le total comprend un Compte Entreprise IA, les licences Collaborateur IA et leur capacité modèles IA.'],['Que comprend une licence Collaborateur IA ?','Une identité IA, des moyens de communication, une mémoire, des applications, des fichiers, des ressources privées et un environnement isolé.'],['Hermes est-il payant ?','Non. Hermes est gratuit et open source sous licence MIT.'],['Puis-je utiliser mes propres Clés API ?','Oui. Unitalk ne facture alors aucun quota de modèles ; vos fournisseurs facturent directement leur consommation.'],['Puis-je modifier ma configuration ?','Oui. Le nombre de Collaborateurs IA et leur capacité restent ajustables.']]
const faqJsonLd={ '@context':'https://schema.org','@type':'FAQPage',mainEntity:pricingFaqItems.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}})) }

const PROFILE_LABELS: Record<string, string> = { emma: 'Emma · Assistante de direction', chloe: 'Chloé · Commerciale', lucas: 'Lucas · Relation client', nadia: 'Nadia · Responsable marketing', marcus: 'Marcus · Responsable CRM', hugo: 'Hugo · Coordinateur des opérations' }
const CAPACITIES = new Set<AiCapacityId>(['byok', 'quarterTime', 'halfTime', 'fullTime'])

export default async function TarifsPage({ searchParams }: { searchParams: Promise<{ profil?: string; capacite?: string }> }) {
  const store = await cookies()
  const query = await searchParams
  const envelope = parsePricingDraftEnvelope(store.get(PRICING_DRAFT_COOKIE)?.value)
  const storedDraft = envelope?.draft ?? normalizePricingDraft({})
  const requestedCapacity = CAPACITIES.has(query.capacite as AiCapacityId) ? query.capacite as AiCapacityId : undefined
  const draft = normalizePricingDraft({ ...storedDraft, capacity: requestedCapacity ?? storedDraft.capacity })
  const selectedProfile = query.profil ? PROFILE_LABELS[query.profil] : undefined
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqJsonLd)}} />
      <PricingDraftProvider initialDraft={draft} selectedProfile={selectedProfile}>
        <main>
          <Suspense fallback={<div className="mx-auto h-[720px] max-w-[1120px] px-5 sm:px-8" />}>
            <PricingHero />
          </Suspense>
          <PricingCollaboration />
          <PricingFaqFinal />
          <PricingFinalCta />
        </main>
      </PricingDraftProvider>
      <SiteFooter />
    </div>
  )
}
