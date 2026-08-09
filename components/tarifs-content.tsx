'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ProofPill } from '@/components/ui/proof-pill'

const ease = [0.22, 1, 0.36, 1] as const

type Offer = {
  id: string
  name: string
  price: string
  period?: string
  subline?: string
  pitch: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
}

const T = {
  fr: {
    eyebrow: 'Tarifs',
    title1: 'Votre Collaborateur IA dès ',
    title2: '49 € par mois.',
    subtitle:
      'Il répond à vos visiteurs, travaille avec vos équipes et accomplit des missions dans vos applications. Alma vous accompagne pour le créer et développer ses capacités.',
    trial: '7 jours d’essai · Sans carte bancaire',
    offersTitle: 'Choisissez votre offre',
    perMonth: '/ mois',
    popular: 'Le plus choisi',
    offers: [
      {
        id: 'creator',
        name: 'Creator',
        price: '49 €',
        period: '/ mois',
        subline: '1 Collaborateur IA · Profils métier illimités',
        pitch: 'Pour créer le Collaborateur IA de votre entreprise.',
        features: [
          'identité et mémoire persistantes',
          'profils métier à ajouter sans limite',
          'présence publique texte et voix',
          'workspace privé',
          'missions et compétences',
          'accès contrôlés aux applications',
          'accompagnement continu par Alma',
        ],
        cta: 'Créer mon Collaborateur IA',
        href: '/decouvrir',
        featured: true,
      },
      {
        id: 'partner',
        name: 'Partner',
        price: '499 €',
        period: '/ mois',
        pitch: 'Pour déployer des Collaborateurs IA auprès de vos clients.',
        features: [
          'tout Creator',
          'gestion multi-clients',
          'environnements de test',
          'outils de création',
          'store et partage des revenus',
          'API, Academy et certification',
          'co-branding et support prioritaire',
        ],
        cta: 'Devenir partenaire',
        href: '/partenaires',
      },
      {
        id: 'platform',
        name: 'Platform',
        price: 'Sur mesure',
        pitch: 'Pour construire votre propre produit avec l’infrastructure Unitalk.',
        features: [
          'API complète',
          'expérience et marque propres',
          'infrastructure dédiée',
          'modèles, mémoire et exécution',
          'intégrations sur mesure',
          'gouvernance et engagements de service',
        ],
        cta: 'Parler à notre équipe',
        href: 'mailto:hello@unitalk.ai',
      },
    ] as Offer[],
    identityEyebrow: 'Une identité, tous ses métiers',
    identityTitle: 'Une identité. Tous les profils nécessaires à son travail.',
    identityBody:
      'Votre Collaborateur IA reste une seule identité. Vous lui ajoutez autant de profils métier que ses missions l’exigent, sans surcoût par profil. Seuls les usages variables — modèles, voix, téléphonie — consomment des crédits.',
    almaEyebrow: 'Alma est incluse',
    almaTitle: 'Vous n’avez pas à maîtriser toute l’IA pour la mettre au travail.',
    almaBody1:
      'Alma prépare avec vous le contexte, le rôle et la première mission de votre Collaborateur IA.',
    almaBody2:
      'Elle recommande ensuite les compétences et les applications dont il a besoin. Lorsqu’une intervention humaine devient nécessaire, elle transmet le contexte à un expert Unitalk.',
    almaQuote: 'Alma vous guide. Votre Collaborateur IA travaille pour votre entreprise.',
    creditsEyebrow: 'Forfait & crédits',
    creditsTitle: 'Un forfait pour son environnement. Des crédits pour ses usages.',
    creditsBody1:
      'L’abonnement couvre son identité, sa mémoire, sa présence publique, son workspace et l’accompagnement d’Alma.',
    creditsBody2:
      'Les modèles IA, la voix, la téléphonie et les ressources variables utilisent les crédits partagés de votre organisation. Vous pouvez également connecter vos propres clés API.',
    creditsQuote: 'Aucun abonnement à un modèle par utilisateur.',
    faqTitle: 'Questions fréquentes',
    faq: [
      {
        q: 'Que comprend Creator à 49 € ?',
        a: 'Un Collaborateur IA, sa page publique, son interface texte et voix, son workspace, sa mémoire, ses premières capacités et l’accompagnement d’Alma.',
      },
      {
        q: 'Alma est-elle mon Collaborateur IA ?',
        a: 'Non. Alma est la conseillère Unitalk. Elle vous aide à créer et faire progresser votre propre Collaborateur IA.',
      },
      {
        q: 'Mon Collaborateur peut-il répondre sur mon site ?',
        a: 'Oui. Il peut présenter votre activité, répondre aux visiteurs, qualifier les demandes et prendre des rendez-vous.',
      },
      {
        q: 'Mes données restent-elles privées ?',
        a: 'Oui. Votre mémoire, vos documents et vos méthodes restent privés par défaut. Rien n’est partagé sans votre choix.',
      },
      {
        q: 'Puis-je utiliser mes propres clés API ?',
        a: 'Oui. Vous pouvez utiliser vos clés, les crédits Unitalk ou combiner les deux.',
      },
    ],
    finalTitle: 'Créez votre Collaborateur IA avec Alma.',
    finalPrice: '49 € / mois',
    finalCta: 'Créer mon Collaborateur IA',
    finalProof: '7 jours d’essai · Sans carte bancaire · Données sous votre contrôle',
  },
  en: {
    eyebrow: 'Pricing',
    title1: 'Your AI Collaborator from ',
    title2: '€49 per month.',
    subtitle:
      'It answers your visitors, works with your teams and carries out missions inside your applications. Alma helps you create it and grow its capabilities.',
    trial: '7-day trial · No credit card',
    offersTitle: 'Choose your plan',
    perMonth: '/ month',
    popular: 'Most chosen',
    offers: [
      {
        id: 'creator',
        name: 'Creator',
        price: '€49',
        period: '/ month',
        subline: '1 AI Collaborator · Unlimited job profiles',
        pitch: 'To create your company’s AI Collaborator.',
        features: [
          'persistent identity and memory',
          'add job profiles with no limit',
          'public text and voice presence',
          'private workspace',
          'missions and skills',
          'controlled access to applications',
          'continuous guidance from Alma',
        ],
        cta: 'Create my AI Collaborator',
        href: '/decouvrir',
        featured: true,
      },
      {
        id: 'partner',
        name: 'Partner',
        price: '€499',
        period: '/ month',
        pitch: 'To deploy AI Collaborators for your clients.',
        features: [
          'everything in Creator',
          'multi-client management',
          'test environments',
          'creation tools',
          'store and revenue sharing',
          'API, Academy and certification',
          'co-branding and priority support',
        ],
        cta: 'Become a partner',
        href: '/partenaires',
      },
      {
        id: 'platform',
        name: 'Platform',
        price: 'Custom',
        pitch: 'To build your own product on Unitalk infrastructure.',
        features: [
          'full API',
          'your own experience and brand',
          'dedicated infrastructure',
          'models, memory and execution',
          'custom integrations',
          'governance and service commitments',
        ],
        cta: 'Talk to our team',
        href: 'mailto:hello@unitalk.ai',
      },
    ] as Offer[],
    identityEyebrow: 'One identity, all its roles',
    identityTitle: 'One identity. Every profile its work requires.',
    identityBody:
      'Your AI Collaborator stays a single identity. You add as many job profiles as its missions require, with no per-profile fee. Only variable usage — models, voice, telephony — consumes credits.',
    almaEyebrow: 'Alma is included',
    almaTitle: 'You don’t need to master all of AI to put it to work.',
    almaBody1:
      'Alma prepares the context, the role and the first mission of your AI Collaborator with you.',
    almaBody2:
      'She then recommends the skills and applications it needs. When human intervention becomes necessary, she hands the context to a Unitalk expert.',
    almaQuote: 'Alma guides you. Your AI Collaborator works for your company.',
    creditsEyebrow: 'Plan & credits',
    creditsTitle: 'A plan for its environment. Credits for its usage.',
    creditsBody1:
      'The subscription covers its identity, memory, public presence, workspace and Alma’s guidance.',
    creditsBody2:
      'AI models, voice, telephony and variable resources use your organization’s shared credits. You can also connect your own API keys.',
    creditsQuote: 'No per-user model subscription.',
    faqTitle: 'Frequently asked questions',
    faq: [
      {
        q: 'What does Creator include at €49?',
        a: 'One AI Collaborator, its public page, its text and voice interface, its workspace, its memory, its first capabilities and Alma’s guidance.',
      },
      {
        q: 'Is Alma my AI Collaborator?',
        a: 'No. Alma is the Unitalk advisor. She helps you create and grow your own AI Collaborator.',
      },
      {
        q: 'Can my Collaborator answer on my website?',
        a: 'Yes. It can present your business, answer visitors, qualify requests and book appointments.',
      },
      {
        q: 'Does my data stay private?',
        a: 'Yes. Your memory, documents and methods stay private by default. Nothing is shared without your choice.',
      },
      {
        q: 'Can I use my own API keys?',
        a: 'Yes. You can use your keys, Unitalk credits, or combine both.',
      },
    ],
    finalTitle: 'Create your AI Collaborator with Alma.',
    finalPrice: '€49 / month',
    finalCta: 'Create my AI Collaborator',
    finalProof: '7-day trial · No credit card · Data under your control',
  },
}

function OfferCard({ offer, perMonth, popular, index }: { offer: Offer; perMonth: string; popular: string; index: number }) {
  const ctaClass = offer.featured
    ? 'bg-[#D10E63] text-[#FBF9F3] hover:-translate-y-0.5'
    : 'border border-[#1C1A17] text-[#1C1A17] hover:bg-[#1C1A17] hover:text-[#FBF9F3]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      className={`relative flex flex-col rounded-[1.75rem] p-7 sm:p-8 ${
        offer.featured
          ? 'premium-shadow border-2 border-[#D10E63] bg-[#FBF9F3]'
          : 'border border-[#D8D0C2] bg-[#FBF9F3]'
      }`}
    >
      {offer.featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-[#D10E63] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#FBF9F3]">
          {popular}
        </span>
      )}
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8A8175]">{offer.name}</p>
      <div className="mt-3 flex items-end gap-1">
        <span className="font-sf text-4xl font-bold tracking-[-0.04em] text-[#1C1A17] sm:text-[2.75rem]">{offer.price}</span>
        {offer.period && <span className="mb-1.5 text-sm font-medium text-[#6B6560]">{perMonth}</span>}
      </div>
      {offer.subline && (
        <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#B00C54]">{offer.subline}</p>
      )}
      <p className="mt-3 min-h-[2.75rem] text-[14px] leading-relaxed text-[#4E483F]">{offer.pitch}</p>

      <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-[#E4DCCF] pt-6">
        {offer.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#3F3A33]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D10E63]" strokeWidth={2.5} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      <Link
        href={offer.href}
        className={`mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${ctaClass}`}
      >
        {offer.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#E4DCCF]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
      >
        <span className="font-sf text-[16px] font-semibold text-[#1C1A17] sm:text-[17px]">{q}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D8D0C2] text-[#D10E63]">
          {open ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
        </span>
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.28, ease }}
          className="overflow-hidden pb-5 pr-10 text-[14.5px] leading-relaxed text-[#5F594F]"
        >
          {a}
        </motion.p>
      )}
    </div>
  )
}

export function TarifsContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="w-full bg-[#F3EFE6]">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-grid pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <ProofPill>{t.trial}</ProofPill>
          </div>
          <h1
            className="mt-5 text-balance font-sf text-4xl font-bold leading-[1.05] text-[#1C1A17] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.title1}
            <span className="text-[#D10E63]">{t.title2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4E483F] sm:text-lg">{t.subtitle}</p>
        </div>
      </section>

      {/* Offres */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <h2 className="text-balance text-center font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
          {t.offersTitle}
        </h2>
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
          {t.offers.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} perMonth={t.perMonth} popular={t.popular} index={i} />
          ))}
        </div>
      </section>

      {/* Une identité, tous ses métiers */}
      <section className="mx-auto w-full max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[1.75rem] border border-[#D8D0C2] bg-[#FBF9F3] p-7 text-center sm:p-9"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.identityEyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-xl text-balance font-sf text-xl font-bold tracking-[-0.02em] text-[#1C1A17] sm:text-2xl">
            {t.identityTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.identityBody}</p>
        </motion.div>
      </section>

      {/* Alma incluse */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[2rem] border border-[#2C2822] bg-[#161412] p-8 sm:p-12"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8548C]">{t.almaEyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-balance font-heading text-2xl font-medium leading-[1.15] text-[#F4F1EA] sm:text-4xl">
            {t.almaTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:max-w-2xl">
            <p className="text-[15px] leading-relaxed text-[#B8B0A4]">{t.almaBody1}</p>
            <p className="text-[15px] leading-relaxed text-[#B8B0A4]">{t.almaBody2}</p>
          </div>
          <blockquote className="mt-8 border-l-2 border-[#D10E63] pl-5 font-heading text-xl font-medium leading-snug text-[#F4F1EA] sm:text-2xl">
            {t.almaQuote}
          </blockquote>
        </motion.div>
      </section>

      {/* Forfait & crédits */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">{t.creditsEyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
            {t.creditsTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.creditsBody1}</p>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{t.creditsBody2}</p>
          <p className="mx-auto mt-6 inline-block rounded-full bg-[#EFE9DC] px-5 py-2 font-sf text-sm font-semibold text-[#1C1A17]">
            {t.creditsQuote}
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        <h2 className="text-balance text-center font-sf text-2xl font-bold tracking-[-0.025em] text-[#1C1A17] sm:text-3xl">
          {t.faqTitle}
        </h2>
        <div className="mt-8 border-t border-[#E4DCCF]">
          {t.faq.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="premium-shadow overflow-hidden rounded-[2rem] border border-[#2C2822] bg-[#161412] px-6 py-14 text-center sm:px-10 sm:py-16"
        >
          <h2 className="mx-auto max-w-2xl text-balance font-heading text-3xl font-medium leading-[1.1] text-[#F4F1EA] sm:text-5xl">
            {t.finalTitle}
          </h2>
          <p className="mt-5 font-sf text-xl font-bold text-[#E8548C]">{t.finalPrice}</p>
          <Link
            href="/decouvrir"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#161412]"
          >
            {t.finalCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-6 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[#8C8477]">{t.finalProof}</p>
        </motion.div>
      </section>
    </main>
  )
}
