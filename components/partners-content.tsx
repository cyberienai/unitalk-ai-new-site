'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
}

const PARTNER_ICONS: ReactNode[] = [
  (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  <path key="1" d="M4 14a4 4 0 0 1 4-4 5 5 0 0 1 9.6-1.5A3.5 3.5 0 0 1 18 16H7a3 3 0 0 1-3-2z" />,
  (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
    </>
  ),
  (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </>
  ),
  (
    <>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </>
  ),
]

const T = {
  fr: {
    heroEyebrow: 'Partenaires',
    heroTitle: <>Rejoignez l&apos;écosystème <span className="text-[#FF0099] italic">Unitalk.</span></>,
    heroP1:
      'Construisons ensemble l’avenir des entreprises IA-native. Hermes est un moteur d’agents open source. Unitalk en fait une plateforme professionnelle prête à déployer.',
    heroP2:
      'L’avenir de l’IA ne sera pas construit par une seule entreprise, mais par un écosystème de développeurs, hébergeurs, intégrateurs, formateurs et partenaires.',
    becomePartner: 'Devenir partenaire',
    discoverProfiles: 'Découvrir les profils',
    stackEyebrow: 'La stack',
    stackTitle: <>Une pile complète. <span className="text-[#FF0099] italic">Un seul nom.</span></>,
    stackP1:
      'Unitalk englobe toute la pile, des applications à l’infrastructure. Hermes devient une technologie, Unitalk une plateforme d’entreprise — et vos clients n’ont jamais besoin de comprendre le moteur pour en percevoir la valeur.',
    stackP2:
      'C’est exactement ce que fait Apple : personne n’achète un iPhone pour son noyau XNU, ni Ubuntu pour Linux. On achète une expérience.',
    stack: [
      { label: 'Applications IA', note: 'Ce que vos équipes utilisent' },
      { label: 'Agents IA', note: 'Profils, rôles, personnalités' },
      { label: 'Mémoire d’entreprise', note: 'Contexte partagé & gouverné' },
      { label: 'Hermes Intelligence Kernel', note: 'Le moteur open source', kernel: true },
      { label: 'Infrastructure', note: 'Cloud ou on-premise' },
    ],
    whyEyebrow: 'Pourquoi les deux',
    whyTitle: <>« Pourquoi ne pas simplement <span className="text-[#FF0099] italic">installer Hermes</span> ? »</>,
    whyP:
      'Parce qu’Hermes est un moteur. Unitalk est le système complet qui permet à une entreprise de travailler avec des agents IA en toute sécurité, à grande échelle et sans complexité.',
    hermesTag: 'Hermes',
    hermesTitle: <>Vous permet de créer <span className="text-[#FF0099] italic">un agent IA.</span></>,
    hermesP: 'Un moteur d’agents open source que chacun peut installer.',
    unitalkTag: 'Unitalk',
    unitalkTitle: <>Permet à <span className="text-[#FF0099] italic">toute votre entreprise</span> de travailler avec des agents.</>,
    unitalkP: 'Tout ce qui manque entre une technologie open source et un système critique pour votre activité.',
    typesEyebrow: 'Les profils',
    typesTitle: <>Cinq façons de <span className="text-[#FF0099] italic">construire avec nous.</span></>,
    partnerTypes: [
      { tag: 'Développeurs', title: 'Construisez sur Hermes et Unitalk', body: 'Applications, agents, connecteurs et extensions. Publiez-les sur notre marketplace et distribuez-les auprès de milliers d’entreprises.' },
      { tag: 'Hébergeurs & cloud', title: 'Une offre Unitalk managée ou souveraine', body: 'Déployez Hermes et Unitalk sur votre infrastructure. Offrez à vos clients une IA performante, sécurisée et conforme à leurs exigences.' },
      { tag: 'Intégrateurs', title: 'Accompagnez la transformation IA', body: 'Déployez des agents spécialisés, intégrez Unitalk aux CRM, ERP, CMS et outils collaboratifs, et automatisez les processus de bout en bout.' },
      { tag: 'Formateurs', title: 'Formez la génération IA-native', body: 'Utilisez Unitalk comme plateforme pédagogique. Chaque apprenant dispose de son agent, apprend à collaborer avec lui et repart avec des compétences applicables.' },
      { tag: 'Partenaires technologiques', title: 'Connectez vos solutions', body: 'Exposez vos API, créez des connecteurs natifs et développez des agents spécialisés autour de votre expertise.' },
    ],
    advEyebrow: 'Ce que vous obtenez',
    advTitle: <>Le lien entre l&apos;open source <span className="text-[#FF0099] italic">et l&apos;entreprise.</span></>,
    advantages: [
      'Hermes, notre moteur d’agents IA open source',
      'Les meilleurs modèles d’IA du marché, publics ou privés',
      'Une mémoire organisationnelle partagée',
      'Une infrastructure cloud ou souveraine',
      'Une gouvernance et une sécurité de niveau entreprise',
      'Des automatisations prêtes à l’emploi',
      'Des connecteurs natifs avec les principaux outils métier',
      'Une marketplace d’agents, d’applications et de profils',
      'Des API ouvertes et un SDK pour vos extensions',
    ],
    valueEyebrow: 'Votre modèle',
    valueTitle: <>Nous fournissons la plateforme. <span className="text-[#FF0099] italic">Vous créez la valeur.</span></>,
    valueActions: [
      'Développez vos propres offres',
      'Vendez vos services',
      'Distribuez vos agents',
      'Hébergez vos clients',
      'Animez vos formations',
      'Construisez votre communauté',
    ],
    visionEyebrow: 'Notre vision',
    visionTitle: 'L’IA sera bientôt présente dans toutes les entreprises. Aucune ne pourra répondre seule à cette transformation.',
    visionEngine: <><span className="text-white">Hermes</span> est le moteur.</>,
    visionPlatform: <><span className="text-white">Unitalk</span> est la plateforme.</>,
    visionEcosystem: 'Vous êtes l’écosystème.',
    visionP: 'Rejoignez les partenaires qui construisent les entreprises IA-native de demain.',
  },
  en: {
    heroEyebrow: 'Partners',
    heroTitle: <>Join the <span className="text-[#FF0099] italic">Unitalk</span> ecosystem.</>,
    heroP1:
      'Let’s build the future of AI-native companies together. Hermes is an open-source agent engine. Unitalk turns it into a professional, ready-to-deploy platform.',
    heroP2:
      'The future of AI won’t be built by a single company, but by an ecosystem of developers, hosts, integrators, trainers and partners.',
    becomePartner: 'Become a partner',
    discoverProfiles: 'Explore the profiles',
    stackEyebrow: 'The stack',
    stackTitle: <>A complete stack. <span className="text-[#FF0099] italic">One single name.</span></>,
    stackP1:
      'Unitalk covers the whole stack, from applications to infrastructure. Hermes becomes a technology, Unitalk an enterprise platform — and your customers never need to understand the engine to feel the value.',
    stackP2:
      'That’s exactly what Apple does: no one buys an iPhone for its XNU kernel, nor Ubuntu for Linux. You buy an experience.',
    stack: [
      { label: 'AI applications', note: 'What your teams use' },
      { label: 'AI agents', note: 'Profiles, roles, personalities' },
      { label: 'Company memory', note: 'Shared & governed context' },
      { label: 'Hermes Intelligence Kernel', note: 'The open-source engine', kernel: true },
      { label: 'Infrastructure', note: 'Cloud or on-premise' },
    ],
    whyEyebrow: 'Why both',
    whyTitle: <>“Why not just <span className="text-[#FF0099] italic">install Hermes</span>?”</>,
    whyP:
      'Because Hermes is an engine. Unitalk is the complete system that lets a company work with AI agents securely, at scale and without complexity.',
    hermesTag: 'Hermes',
    hermesTitle: <>Lets you create <span className="text-[#FF0099] italic">one AI agent.</span></>,
    hermesP: 'An open-source agent engine anyone can install.',
    unitalkTag: 'Unitalk',
    unitalkTitle: <>Lets <span className="text-[#FF0099] italic">your whole company</span> work with agents.</>,
    unitalkP: 'Everything missing between an open-source technology and a business-critical system.',
    typesEyebrow: 'The profiles',
    typesTitle: <>Five ways to <span className="text-[#FF0099] italic">build with us.</span></>,
    partnerTypes: [
      { tag: 'Developers', title: 'Build on Hermes and Unitalk', body: 'Applications, agents, connectors and extensions. Publish them on our marketplace and distribute them to thousands of companies.' },
      { tag: 'Hosts & cloud', title: 'A managed or sovereign Unitalk offering', body: 'Deploy Hermes and Unitalk on your infrastructure. Offer your customers powerful, secure AI that meets their requirements.' },
      { tag: 'Integrators', title: 'Drive the AI transformation', body: 'Deploy specialized agents, integrate Unitalk with CRMs, ERPs, CMSs and collaboration tools, and automate processes end to end.' },
      { tag: 'Trainers', title: 'Train the AI-native generation', body: 'Use Unitalk as a teaching platform. Each learner gets their own agent, learns to collaborate with it and leaves with applicable skills.' },
      { tag: 'Technology partners', title: 'Connect your solutions', body: 'Expose your APIs, build native connectors and develop specialized agents around your expertise.' },
    ],
    advEyebrow: 'What you get',
    advTitle: <>The bridge between open source <span className="text-[#FF0099] italic">and the enterprise.</span></>,
    advantages: [
      'Hermes, our open-source AI agent engine',
      'The best AI models on the market, public or private',
      'A shared organizational memory',
      'Cloud or sovereign infrastructure',
      'Enterprise-grade governance and security',
      'Ready-to-use automations',
      'Native connectors with the main business tools',
      'A marketplace of agents, applications and profiles',
      'Open APIs and an SDK for your extensions',
    ],
    valueEyebrow: 'Your model',
    valueTitle: <>We provide the platform. <span className="text-[#FF0099] italic">You create the value.</span></>,
    valueActions: [
      'Build your own offerings',
      'Sell your services',
      'Distribute your agents',
      'Host your customers',
      'Run your training programs',
      'Grow your community',
    ],
    visionEyebrow: 'Our vision',
    visionTitle: 'AI will soon be present in every company. None will be able to answer this transformation alone.',
    visionEngine: <><span className="text-white">Hermes</span> is the engine.</>,
    visionPlatform: <><span className="text-white">Unitalk</span> is the platform.</>,
    visionEcosystem: 'You are the ecosystem.',
    visionP: 'Join the partners building tomorrow’s AI-native companies.',
  },
}

export function PartnersContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const STACK = t.stack
  const PARTNER_TYPES = t.partnerTypes.map((p, i) => ({ ...p, icon: PARTNER_ICONS[i] }))
  const ADVANTAGES = t.advantages
  const VALUE_ACTIONS = t.valueActions

  return (
    <main className="w-full bg-[#0A0A0A]">
      {/* 1. HERO — dark */}
      <section className="relative overflow-hidden border-b border-white/[0.06] px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-10rem] top-[-6rem] h-[30rem] w-[30rem] rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #FF0099, transparent 70%)' }}
        />
        <div className="mx-auto w-full max-w-6xl">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">
            {t.heroEyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-4 max-w-4xl font-heading text-4xl font-light leading-[1.05] text-white text-balance sm:text-6xl md:text-7xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="mt-6 max-w-2xl text-base leading-relaxed text-[#B4B4BD] sm:text-lg">
            {t.heroP1}
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-4 max-w-2xl text-base leading-relaxed text-[#8E8E93]">
            {t.heroP2}
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="mailto:partenaires@unitalk.ai?subject=Devenir%20partenaire%20Unitalk"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF0099] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E00085]"
            >
              {t.becomePartner}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#types" className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]">
              {t.discoverProfiles}
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. STACK — light */}
      <section className="bg-[#F4F1EA] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">{t.stackEyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-[#12100E] text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              {t.stackTitle}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#5A554D]">{t.stackP1}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8A857A]">{t.stackP2}</p>
          </div>

          <div className="flex flex-col gap-2">
            {STACK.map((layer, i) => (
              <motion.div
                key={layer.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className={`flex items-center justify-between rounded-xl border px-5 py-4 ${
                  layer.kernel
                    ? 'border-[#FF0099]/40 bg-[#12100E] text-white shadow-[0_12px_40px_-16px_rgba(255,0,153,0.4)]'
                    : 'border-black/10 bg-white/70 text-[#12100E]'
                }`}
              >
                <span className={`text-sm font-medium ${layer.kernel ? 'text-white' : 'text-[#12100E]'}`}>{layer.label}</span>
                <span className={`text-xs ${layer.kernel ? 'text-[#FF0099]' : 'text-[#8A857A]'}`}>{layer.note}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HERMES vs UNITALK — dark */}
      <section className="border-y border-white/[0.06] bg-[#0A0A0A] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">{t.whyEyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-white text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              {t.whyTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#B4B4BD]">{t.whyP}</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E8E93]">{t.hermesTag}</span>
              <p className="mt-4 font-heading text-2xl font-light leading-snug text-white">{t.hermesTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#8E8E93]">{t.hermesP}</p>
            </div>
            <div className="rounded-2xl border border-[#FF0099]/30 bg-[#17131A] p-7 shadow-[0_20px_60px_-24px_rgba(255,0,153,0.5)]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">{t.unitalkTag}</span>
              <p className="mt-4 font-heading text-2xl font-light leading-snug text-white">{t.unitalkTitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#C7C7D1]">{t.unitalkP}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTNER TYPES — light */}
      <section id="types" className="bg-[#F4F1EA] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 max-w-2xl sm:mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">{t.typesEyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-[#12100E] text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              {t.typesTitle}
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TYPES.map((p, i) => (
              <motion.div
                key={p.tag}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '80px' }}
                custom={i}
                className="flex flex-col rounded-2xl border border-black/10 bg-white/70 p-6 transition-colors hover:border-[#FF0099]/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF0099]/10 text-[#FF0099]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                </span>
                <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A857A]">{p.tag}</span>
                <h3 className="mt-2 text-lg font-medium leading-snug text-[#12100E]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5A554D]">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ADVANTAGES — dark */}
      <section className="border-y border-white/[0.06] bg-[#0A0A0A] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">{t.advEyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-white text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              {t.advTitle}
            </h2>
          </div>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((a, i) => (
              <motion.div
                key={a}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i % 3}
                className="flex items-start gap-3 border-t border-white/10 pt-4"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0099" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm leading-relaxed text-[#C7C7D1]">{a}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. YOUR BUSINESS — light */}
      <section className="bg-[#F4F1EA] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">{t.valueEyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-[#12100E] text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              {t.valueTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_ACTIONS.map((v, i) => (
              <motion.div
                key={v}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i % 3}
                className="rounded-xl border border-black/10 bg-white/70 px-5 py-4 text-sm font-medium text-[#12100E]"
              >
                {v}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VISION + CTA — dark */}
      <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #FF0099, transparent 70%)' }}
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">{t.visionEyebrow}</p>
          <h2 className="mt-4 font-heading text-3xl font-light leading-[1.15] text-white text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            {t.visionTitle}
          </h2>
          <div className="mt-10 flex flex-col items-center gap-1 text-lg text-[#B4B4BD] sm:text-xl">
            <p>{t.visionEngine}</p>
            <p>{t.visionPlatform}</p>
            <p className="font-medium text-[#FF0099]">{t.visionEcosystem}</p>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[#8E8E93]">{t.visionP}</p>
          <a
            href="mailto:partenaires@unitalk.ai?subject=Devenir%20partenaire%20Unitalk"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FF0099] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#E00085]"
          >
            {t.becomePartner}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </main>
  )
}
