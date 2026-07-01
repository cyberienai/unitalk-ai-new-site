'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
}

const STACK = [
  { label: 'Applications IA', note: 'Ce que vos équipes utilisent' },
  { label: 'Agents IA', note: 'Profils, rôles, personnalités' },
  { label: "Mémoire d'entreprise", note: 'Contexte partagé & gouverné' },
  { label: 'Hermes Intelligence Kernel', note: 'Le moteur open source', kernel: true },
  { label: 'Infrastructure', note: 'Cloud ou on-premise' },
]

const PARTNER_TYPES = [
  {
    tag: 'Développeurs',
    title: 'Construisez sur Hermes et Unitalk',
    body: 'Applications, agents, connecteurs et extensions. Publiez-les sur notre marketplace et distribuez-les auprès de milliers d’entreprises.',
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    tag: 'Hébergeurs & cloud',
    title: 'Une offre Unitalk managée ou souveraine',
    body: 'Déployez Hermes et Unitalk sur votre infrastructure. Offrez à vos clients une IA performante, sécurisée et conforme à leurs exigences.',
    icon: (
      <>
        <path d="M4 14a4 4 0 0 1 4-4 5 5 0 0 1 9.6-1.5A3.5 3.5 0 0 1 18 16H7a3 3 0 0 1-3-2z" />
      </>
    ),
  },
  {
    tag: 'Intégrateurs',
    title: 'Accompagnez la transformation IA',
    body: 'Déployez des agents spécialisés, intégrez Unitalk aux CRM, ERP, CMS et outils collaboratifs, et automatisez les processus de bout en bout.',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
      </>
    ),
  },
  {
    tag: 'Formateurs',
    title: 'Formez la génération IA-native',
    body: 'Utilisez Unitalk comme plateforme pédagogique. Chaque apprenant dispose de son agent, apprend à collaborer avec lui et repart avec des compétences applicables.',
    icon: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
      </>
    ),
  },
  {
    tag: 'Partenaires technologiques',
    title: 'Connectez vos solutions',
    body: 'Exposez vos API, créez des connecteurs natifs et développez des agents spécialisés autour de votre expertise.',
    icon: (
      <>
        <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
        <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
      </>
    ),
  },
]

const ADVANTAGES = [
  'Hermes, notre moteur d’agents IA open source',
  'Les meilleurs modèles d’IA du marché, publics ou privés',
  'Une mémoire organisationnelle partagée',
  'Une infrastructure cloud ou souveraine',
  'Une gouvernance et une sécurité de niveau entreprise',
  'Des automatisations prêtes à l’emploi',
  'Des connecteurs natifs avec les principaux outils métier',
  'Une marketplace d’agents, d’applications et de profils',
  'Des API ouvertes et un SDK pour vos extensions',
]

const VALUE_ACTIONS = [
  'Développez vos propres offres',
  'Vendez vos services',
  'Distribuez vos agents',
  'Hébergez vos clients',
  'Animez vos formations',
  'Construisez votre communauté',
]

export function PartnersContent() {
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
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]"
          >
            Partenaires
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-4 max-w-4xl font-heading text-4xl font-light leading-[1.05] text-white text-balance sm:text-6xl md:text-7xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Rejoignez l&apos;écosystème <span className="text-[#FF0099] italic">Unitalk.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 max-w-2xl text-base leading-relaxed text-[#B4B4BD] sm:text-lg"
          >
            Construisons ensemble l&apos;avenir des entreprises IA-native. Hermes est un moteur
            d&apos;agents open source. Unitalk en fait une plateforme professionnelle prête à
            déployer.
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-4 max-w-2xl text-base leading-relaxed text-[#8E8E93]"
          >
            L&apos;avenir de l&apos;IA ne sera pas construit par une seule entreprise, mais par un
            écosystème de développeurs, hébergeurs, intégrateurs, formateurs et partenaires.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="mailto:partenaires@unitalk.ai?subject=Devenir%20partenaire%20Unitalk"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF0099] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E00085]"
            >
              Devenir partenaire
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a
              href="#types"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
            >
              Découvrir les profils
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. STACK — light */}
      <section className="bg-[#F4F1EA] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">La stack</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-[#12100E] text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              Une pile complète. <span className="text-[#FF0099] italic">Un seul nom.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#5A554D]">
              Unitalk englobe toute la pile, des applications à l&apos;infrastructure. Hermes devient
              une technologie, Unitalk une plateforme d&apos;entreprise — et vos clients n&apos;ont
              jamais besoin de comprendre le moteur pour en percevoir la valeur.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8A857A]">
              C&apos;est exactement ce que fait Apple : personne n&apos;achète un iPhone pour son noyau
              XNU, ni Ubuntu pour Linux. On achète une expérience.
            </p>
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
                <span className={`text-sm font-medium ${layer.kernel ? 'text-white' : 'text-[#12100E]'}`}>
                  {layer.label}
                </span>
                <span className={`text-xs ${layer.kernel ? 'text-[#FF0099]' : 'text-[#8A857A]'}`}>
                  {layer.note}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HERMES vs UNITALK — dark */}
      <section className="border-y border-white/[0.06] bg-[#0A0A0A] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">Pourquoi les deux</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-white text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              « Pourquoi ne pas simplement <span className="text-[#FF0099] italic">installer Hermes</span> ? »
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#B4B4BD]">
              Parce qu&apos;Hermes est un moteur. Unitalk est le système complet qui permet à une
              entreprise de travailler avec des agents IA en toute sécurité, à grande échelle et sans
              complexité.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E8E93]">Hermes</span>
              <p className="mt-4 font-heading text-2xl font-light leading-snug text-white">
                Vous permet de créer <span className="text-[#FF0099] italic">un agent IA.</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#8E8E93]">
                Un moteur d&apos;agents open source que chacun peut installer.
              </p>
            </div>
            <div className="rounded-2xl border border-[#FF0099]/30 bg-[#17131A] p-7 shadow-[0_20px_60px_-24px_rgba(255,0,153,0.5)]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">Unitalk</span>
              <p className="mt-4 font-heading text-2xl font-light leading-snug text-white">
                Permet à <span className="text-[#FF0099] italic">toute votre entreprise</span> de travailler avec des agents.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#C7C7D1]">
                Tout ce qui manque entre une technologie open source et un système critique pour votre
                activité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTNER TYPES — light */}
      <section id="types" className="bg-[#F4F1EA] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 max-w-2xl sm:mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">Les profils</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-[#12100E] text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              Cinq façons de <span className="text-[#FF0099] italic">construire avec nous.</span>
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">Ce que vous obtenez</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-white text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              Le lien entre l&apos;open source <span className="text-[#FF0099] italic">et l&apos;entreprise.</span>
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">Votre modèle</p>
            <h2 className="mt-3 font-heading text-3xl font-light leading-[1.1] text-[#12100E] text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
              Nous fournissons la plateforme. <span className="text-[#FF0099] italic">Vous créez la valeur.</span>
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF0099]">Notre vision</p>
          <h2 className="mt-4 font-heading text-3xl font-light leading-[1.15] text-white text-balance sm:text-4xl md:text-5xl" style={{ letterSpacing: '-0.02em' }}>
            L&apos;IA sera bientôt présente dans toutes les entreprises. Aucune ne pourra répondre seule
            à cette transformation.
          </h2>
          <div className="mt-10 flex flex-col items-center gap-1 text-lg text-[#B4B4BD] sm:text-xl">
            <p><span className="text-white">Hermes</span> est le moteur.</p>
            <p><span className="text-white">Unitalk</span> est la plateforme.</p>
            <p className="font-medium text-[#FF0099]">Vous êtes l&apos;écosystème.</p>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[#8E8E93]">
            Rejoignez les partenaires qui construisent les entreprises IA-native de demain.
          </p>
          <a
            href="mailto:partenaires@unitalk.ai?subject=Devenir%20partenaire%20Unitalk"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FF0099] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#E00085]"
          >
            Devenir partenaire
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </main>
  )
}
