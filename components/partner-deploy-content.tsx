'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { ProofPill } from '@/components/ui/proof-pill'

const ease = [0.22, 1, 0.36, 1] as const

const COPY = {
  fr: {
    heroTag: 'Multi-clients · Co-branding · Support prioritaire',
    heroTitle: 'Déployez des Collaborateurs IA chez vos clients.',
    heroLead:
      'Vous apportez la relation, l’expertise et la méthode. Unitalk fournit l’infrastructure, le workspace et les Collaborateurs IA.',
    heroPrice: '499 € / mois',
    heroCta: 'Devenir partenaire',
    heroCtaHref: 'mailto:partenaires@unitalk.ai',
    heroSecondary: 'Parler à notre équipe',
    heroSecondaryHref: 'mailto:partenaires@unitalk.ai',

    propEyebrow: 'La proposition',
    propKicker: 'Vous ne revendez pas un chatbot.',
    propTitle: 'Vous développez les capacités de vos clients.',
    propBody1:
      'Chaque Collaborateur IA possède une identité, une mémoire et des accès propres à l’entreprise qui l’emploie.',
    propBody2:
      'Vous pouvez lui ajouter autant de profils métier que nécessaire, sans surcoût par profil. Ses capacités progressent ensuite avec les missions et les méthodes validées par le client.',

    howEyebrow: 'Fonctionnement',
    howTitle: 'Du besoin au déploiement.',
    steps: [
      { n: '01', t: 'Concevez', d: 'Structurez la mission, les règles et les décisions qui doivent rester humaines.' },
      { n: '02', t: 'Configurez', d: 'Affectez le bon Collaborateur IA, puis ajoutez les profils métier, les compétences et les applications nécessaires.' },
      { n: '03', t: 'Déployez', d: 'Ouvrez uniquement les accès autorisés et rejoignez le workspace du client.' },
      { n: '04', t: 'Développez', d: 'Transformez les méthodes validées en capacités réutilisables, sans exposer les données privées du client.' },
    ],

    offerEyebrow: 'Offre',
    offerTitle: 'Tout ce qu’il faut pour accompagner plusieurs clients.',
    offerName: 'Partner',
    offerPrice: '499 € / mois',
    offerItems: [
      'espace professionnel multi-clients',
      'environnements de préparation',
      'outils de création et de configuration',
      'profils métier illimités',
      'missions, compétences, applications et packs',
      'co-branding',
      'academy et certification',
      'support prioritaire',
      'publication et partage des revenus',
    ],
    offerCta: 'Devenir partenaire',
    offerNote:
      'Chaque entreprise cliente conserve son propre abonnement, ses Collaborateurs IA, ses données et ses usages.',

    modelEyebrow: 'Modèle économique',
    modelTitle: 'Votre expertise. Vos clients. Vos revenus.',
    modelBody:
      'Vous fixez librement le prix de vos prestations de conseil, d’intégration, de formation et de suivi.',
    modelIntro: 'Les clients règlent séparément :',
    modelItems: [
      'leur abonnement Unitalk',
      'leurs crédits IA prépayés ou leurs propres clés API',
      'les compétences et applications payantes qu’ils choisissent d’utiliser',
    ],
    modelShare:
      'Lorsque vous publiez un élément éligible dans l’écosystème Unitalk, vous pouvez percevoir une part des revenus générés.',
    modelSignature: 'Privé par défaut. Partagé par choix.',

    vsEyebrow: 'Partner ou Platform ?',
    vsPartnerTitle: 'Partner',
    vsPartnerBody: 'Vous déployez Unitalk chez vos clients avec les outils et l’infrastructure Unitalk.',
    vsPartnerPrice: '499 € / mois',
    vsPartnerTag: 'Vous êtes ici',
    vsPlatformTitle: 'Platform',
    vsPlatformBody: 'Vous construisez votre propre produit, avec votre marque et une infrastructure dédiée.',
    vsPlatformPrice: 'Sur mesure',
    vsPlatformCta: 'Découvrir Platform',
    vsPlatformHref: '/platform',

    faqEyebrow: 'FAQ',
    faqTitle: 'L’essentiel avant de nous parler.',
    faq: [
      { q: 'Les profils métier sont-ils limités ?', a: 'Non. Chaque Collaborateur IA peut recevoir autant de profils métier que ses missions l’exigent.' },
      { q: 'L’abonnement de mes clients est-il inclus ?', a: 'Non. Chaque client conserve son propre abonnement, son environnement et sa consommation IA.' },
      { q: 'Puis-je facturer mes propres prestations ?', a: 'Oui. Vous définissez librement vos tarifs de conseil, de déploiement et d’accompagnement.' },
      { q: 'Puis-je utiliser ma marque ?', a: 'Partner prévoit du co-branding. Pour une expérience entièrement en marque propre, choisissez Platform.' },
    ],

    finalTitle: 'Faites de votre expertise une capacité déployable.',
    finalBody: 'Créez, configurez et déployez des Collaborateurs IA chez vos clients.',
    finalCta: 'Devenir partenaire — 499 € / mois',
    finalHref: 'mailto:partenaires@unitalk.ai',
  },
  en: {
    heroTag: 'Multi-client · Co-branding · Priority support',
    heroTitle: 'Deploy AI Collaborators at your clients.',
    heroLead:
      'You bring the relationship, the expertise and the method. Unitalk provides the infrastructure, the workspace and the AI Collaborators.',
    heroPrice: '€499 / month',
    heroCta: 'Become a partner',
    heroCtaHref: 'mailto:partenaires@unitalk.ai',
    heroSecondary: 'Talk to our team',
    heroSecondaryHref: 'mailto:partenaires@unitalk.ai',

    propEyebrow: 'The proposition',
    propKicker: 'You’re not reselling a chatbot.',
    propTitle: 'You grow your clients’ capabilities.',
    propBody1:
      'Each AI Collaborator has an identity, a memory and access rights specific to the company that employs it.',
    propBody2:
      'You can add as many job profiles as needed, with no per-profile surcharge. Its capabilities then grow with the missions and the methods validated by the client.',

    howEyebrow: 'How it works',
    howTitle: 'From need to deployment.',
    steps: [
      { n: '01', t: 'Design', d: 'Structure the mission, the rules and the decisions that must stay human.' },
      { n: '02', t: 'Configure', d: 'Assign the right AI Collaborator, then add the job profiles, skills and applications needed.' },
      { n: '03', t: 'Deploy', d: 'Open only the authorized access and join the client workspace.' },
      { n: '04', t: 'Grow', d: 'Turn validated methods into reusable capabilities, without exposing the client’s private data.' },
    ],

    offerEyebrow: 'Offer',
    offerTitle: 'Everything you need to support several clients.',
    offerName: 'Partner',
    offerPrice: '€499 / month',
    offerItems: [
      'multi-client professional space',
      'preparation environments',
      'creation and configuration tools',
      'unlimited job profiles',
      'missions, skills, applications and packs',
      'co-branding',
      'academy and certification',
      'priority support',
      'publishing and revenue sharing',
    ],
    offerCta: 'Become a partner',
    offerNote:
      'Each client company keeps its own subscription, its AI Collaborators, its data and its usage.',

    modelEyebrow: 'Business model',
    modelTitle: 'Your expertise. Your clients. Your revenue.',
    modelBody: 'You freely set the price of your consulting, integration, training and follow-up services.',
    modelIntro: 'Clients pay separately for:',
    modelItems: [
      'their Unitalk subscription',
      'their prepaid AI credits or their own API keys',
      'the paid skills and applications they choose to use',
    ],
    modelShare:
      'When you publish an eligible item in the Unitalk ecosystem, you can earn a share of the revenue it generates.',
    modelSignature: 'Private by default. Shared by choice.',

    vsEyebrow: 'Partner or Platform?',
    vsPartnerTitle: 'Partner',
    vsPartnerBody: 'You deploy Unitalk at your clients with Unitalk’s tools and infrastructure.',
    vsPartnerPrice: '€499 / month',
    vsPartnerTag: 'You are here',
    vsPlatformTitle: 'Platform',
    vsPlatformBody: 'You build your own product, with your brand and dedicated infrastructure.',
    vsPlatformPrice: 'Custom',
    vsPlatformCta: 'Discover Platform',
    vsPlatformHref: '/platform',

    faqEyebrow: 'FAQ',
    faqTitle: 'The essentials before we talk.',
    faq: [
      { q: 'Are job profiles limited?', a: 'No. Each AI Collaborator can receive as many job profiles as its missions require.' },
      { q: 'Is my clients’ subscription included?', a: 'No. Each client keeps its own subscription, environment and AI consumption.' },
      { q: 'Can I bill my own services?', a: 'Yes. You freely set your consulting, deployment and support rates.' },
      { q: 'Can I use my brand?', a: 'Partner includes co-branding. For a fully own-brand experience, choose Platform.' },
    ],

    finalTitle: 'Turn your expertise into a deployable capability.',
    finalBody: 'Create, configure and deploy AI Collaborators at your clients.',
    finalCta: 'Become a partner — €499 / month',
    finalHref: 'mailto:partenaires@unitalk.ai',
  },
} as const

export function PartnerDeployContent() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <main className="bg-[#F3EFE6] pt-[76px] text-[#1C1A17]">
      {/* Hero */}
      <section className="px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-20 text-center sm:py-28">
          <div className="flex justify-center">
            <ProofPill>{t.heroTag}</ProofPill>
          </div>
          <h1 className="mt-6 text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#4E483F]">{t.heroLead}</p>
          <p className="mt-7 font-sf text-4xl font-bold tracking-[-0.03em] text-[#D10E63] sm:text-5xl">{t.heroPrice}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={t.heroCtaHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
            >
              {t.heroCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={t.heroSecondaryHref}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#D8D0C2] px-7 text-sm font-semibold text-[#1C1A17] transition-colors hover:border-[#1C1A17]"
            >
              {t.heroSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Proposition */}
      <section className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.propEyebrow}</p>
          <p className="mt-4 text-lg text-[#857C6E]">{t.propKicker}</p>
          <h2 className="mt-1 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.propTitle}</h2>
          <p className="mt-6 text-[15px] leading-relaxed text-[#4E483F]">{t.propBody1}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4E483F]">{t.propBody2}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.howEyebrow}</p>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.howTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-6"
              >
                <span className="font-mono text-sm font-bold text-[#D10E63]">{s.n}</span>
                <h3 className="mt-3 font-sf text-lg font-bold tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#4E483F]">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.offerEyebrow}</p>
            <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.offerTitle}</h2>
          </div>
          <div className="mt-10 rounded-3xl border border-[#1C1A17]/12 bg-[#FBF9F3] p-7 shadow-[0_24px_60px_-32px_rgba(28,26,23,0.35)] sm:p-9">
            <div className="flex items-baseline justify-between border-b border-[#E4DDCE] pb-5">
              <span className="font-sf text-2xl font-bold tracking-[-0.01em]">{t.offerName}</span>
              <span className="font-sf text-2xl font-bold tracking-[-0.02em] text-[#D10E63]">{t.offerPrice}</span>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.offerItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#1C1A17]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={t.heroCtaHref}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
            >
              {t.offerCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-5 text-center text-[13px] leading-relaxed text-[#6B6560]">{t.offerNote}</p>
          </div>
        </div>
      </section>

      {/* Business model */}
      <section className="border-t border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.modelEyebrow}</p>
            <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.modelTitle}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-[#4E483F]">{t.modelBody}</p>
            <p className="mt-6 font-sf text-lg font-bold tracking-[-0.01em] text-[#1C1A17]">{t.modelSignature}</p>
          </div>
          <div>
            <p className="text-[15px] leading-relaxed text-[#4E483F]">{t.modelIntro}</p>
            <ul className="mt-4 grid gap-3">
              {t.modelItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#1C1A17]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] leading-relaxed text-[#6B6560]">{t.modelShare}</p>
          </div>
        </div>
      </section>

      {/* Partner vs Platform */}
      <section className="border-t border-[#E4DDCE] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">
            {t.vsEyebrow}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#D10E63] bg-[#FBF3F7] p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-sf text-xl font-bold tracking-[-0.01em]">{t.vsPartnerTitle}</h3>
                <span className="rounded-full bg-[#D10E63] px-3 py-1 text-[11px] font-semibold text-[#FBF9F3]">
                  {t.vsPartnerTag}
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-[#4E483F]">{t.vsPartnerBody}</p>
              <p className="mt-5 font-sf text-2xl font-bold tracking-[-0.02em] text-[#D10E63]">{t.vsPartnerPrice}</p>
            </div>
            <div className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-7">
              <h3 className="font-sf text-xl font-bold tracking-[-0.01em]">{t.vsPlatformTitle}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#4E483F]">{t.vsPlatformBody}</p>
              <p className="mt-5 font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.vsPlatformPrice}</p>
              <Link
                href={t.vsPlatformHref}
                className="group mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B00C54] transition-colors hover:text-[#8A0A41]"
              >
                {t.vsPlatformCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#E4DDCE] bg-[#EFEADF] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.faqEyebrow}</p>
          <h2 className="mt-3 text-balance font-sf text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.faqTitle}</h2>
          <div className="mt-8 divide-y divide-[#E4DDCE] border-y border-[#E4DDCE]">
            {t.faq.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-sf text-[17px] font-semibold tracking-[-0.01em] text-[#1C1A17]">{item.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D8D0C2] text-[#1C1A17]">
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[15px] leading-relaxed text-[#4E483F]">{item.a}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#161412] px-5 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[#FBF9F3] sm:text-4xl">
            {t.finalTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#B8B0A4]">{t.finalBody}</p>
          <a
            href={t.finalHref}
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-sm font-semibold text-[#FBF9F3] transition-colors hover:bg-[#B00C54]"
          >
            {t.finalCta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
