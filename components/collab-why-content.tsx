'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useT } from '@/lib/language-context'
import { CollabSubNav } from './collab-subnav'

const ease = [0.22, 1, 0.36, 1] as const

/* Renders a U-word with its recurring leading "U" set as a serif magenta accent
   — the literal signature of "the 8 U's". */
function UWord({ word }: { word: string }) {
  return (
    <span className="inline-flex items-baseline">
      <span className="font-heading text-[1.5em] italic leading-none text-[#E8548C]">U</span>
      <span className="font-mono text-[0.86em] font-semibold uppercase tracking-[0.22em] text-[#C9C2B4]">
        {word.slice(1)}
      </span>
    </span>
  )
}

export function CollabWhyContent() {
  const t = useT({
    fr: {
      eyebrow: 'Pourquoi Unitalk',
      title: 'Unitalk vend des capacités de travail autonomes.',
      subtitle:
        'Unitalk réunit vos équipes, vos Collaborateurs IA, vos applications et vos modèles dans une même interface de travail. Une infrastructure ouverte, gouvernée par votre organisation et conçue pour progresser avec elle.',
      tagline: 'The Universal Work Interface.',
      uEyebrow: 'Les 8 U de Unitalk',
      uHeading: 'Huit principes. Une seule interface.',
      us: [
        {
          u: 'Universal',
          title: 'Tout votre travail peut partir d’une même interface.',
          body: 'Humains, Collaborateurs IA, applications, données et modèles communiquent dans un environnement commun. Votre équipe peut accéder à Unitalk depuis le Web, les messageries, la voix, l’application Desktop ou le terminal.',
        },
        {
          u: 'Unique',
          title: 'Chaque Collaborateur IA possède sa propre identité.',
          body: 'Un nom, un rôle, une mémoire, des coordonnées, des compétences et une histoire dans votre organisation. Il conserve cette identité d’une mission à l’autre, même lorsque ses profils, ses outils ou les modèles utilisés évoluent.',
        },
        {
          u: 'Unified',
          title: 'Une seule présence, à l’extérieur comme à l’intérieur.',
          body: 'Le même Collaborateur peut répondre aux visiteurs, présenter vos offres et prendre des rendez-vous. Il peut aussi travailler avec vos équipes, utiliser vos applications et accomplir des missions internes. Le contexte reste attaché à la même identité.',
        },
        {
          u: 'Useful',
          title: 'Il accomplit du travail réel.',
          body: 'Répondre, qualifier, produire, coder, mettre à jour, automatiser, relancer et suivre. Unitalk ne mesure pas la valeur au nombre de conversations, mais au travail utile accompli pour votre entreprise.',
        },
        {
          u: 'Ubiquitous',
          title: 'Présent partout où le travail se passe.',
          body: 'Site web, texte, voix, téléphone, email, messageries, workspace, Desktop et terminal. Votre Collaborateur IA reste disponible 24h/24 sur les canaux que vous autorisez.',
        },
        {
          u: 'Understanding',
          title: 'Il comprend le contexte avant d’agir.',
          body: 'Votre activité, vos offres, vos documents, vos méthodes, vos préférences et vos règles alimentent sa mémoire autorisée. Il adapte son travail à votre entreprise au lieu d’appliquer une réponse générique.',
        },
        {
          u: 'Upgradeable',
          title: 'Ses capacités évoluent avec vos besoins.',
          body: 'Ajoutez des missions, des profils métier, des compétences, des applications et des automatisations sans recréer un nouvel agent. Votre Collaborateur conserve son identité et son expérience pendant que ses responsabilités progressent.',
        },
        {
          u: 'User-controlled',
          title: 'Votre intelligence vous appartient.',
          body: 'Vous contrôlez la mémoire, les accès, les modèles, les validations et ce que votre entreprise choisit de partager.',
        },
      ],
      levelsTitle: 'Une architecture, plusieurs niveaux de valeur',
      levels: [
        { for: 'Pour votre entreprise', body: 'Un Collaborateur IA qui représente votre activité, travaille avec vos équipes et agit dans vos applications.' },
        { for: 'Pour les créateurs', body: 'Un environnement pour créer et publier des missions, des compétences, des applications et des packs métier.' },
        { for: 'Pour les partenaires', body: 'Des outils professionnels pour déployer des Collaborateurs IA chez leurs clients.' },
        { for: 'Pour les plateformes', body: 'Une infrastructure API pour construire leurs propres expériences IA.' },
      ],
      openTitle: 'Une base ouverte. Un environnement gouverné.',
      openBody1:
        'Unitalk s’appuie sur Hermes, son moteur d’agents open source, pour transformer les instructions, les compétences et les connaissances en actions.',
      openBody2:
        'Votre entreprise peut choisir ses modèles, son hébergement et ses niveaux de contrôle. Les données, la mémoire et les méthodes restent gouvernées dans votre environnement.',
      openCta: 'Découvrir Hermes',
      ecoTitle: 'Chaque entreprise construit ses capacités. L’écosystème peut les enrichir.',
      ecoBody1: 'Votre Collaborateur IA conserve la mémoire et les méthodes propres à votre entreprise.',
      ecoBody2: 'Il peut aussi bénéficier des compétences et des connaissances que leurs auteurs choisissent de publier dans l’écosystème Unitalk.',
      ecoPunchA: 'Privé par défaut.',
      ecoPunchB: 'Partagé par choix.',
      finalEyebrow: 'Une interface pour le travail qui vient.',
      finalTitle: 'Votre entreprise peut désormais avoir son propre Collaborateur IA.',
      finalBody: 'Il répond à vos visiteurs, travaille avec vos équipes et accomplit des missions dans vos applications.',
      finalCta: 'Créer mon Collaborateur IA',
      finalCta2: 'Découvrir les offres',
      finalProof: ['Disponible 24h/24', 'À partir de 49 € par mois', 'Données sous votre contrôle'],
    },
    en: {
      eyebrow: 'Why Unitalk',
      title: 'Unitalk sells autonomous work capabilities.',
      subtitle:
        'Unitalk brings together your teams, your AI Collaborators, your applications and your models in a single work interface. An open infrastructure, governed by your organization and designed to grow with it.',
      tagline: 'The Universal Work Interface.',
      uEyebrow: 'The 8 U’s of Unitalk',
      uHeading: 'Eight principles. One interface.',
      us: [
        {
          u: 'Universal',
          title: 'All your work can start from a single interface.',
          body: 'Humans, AI Collaborators, applications, data and models communicate in a shared environment. Your team can reach Unitalk from the web, messaging, voice, the Desktop app or the terminal.',
        },
        {
          u: 'Unique',
          title: 'Every AI Collaborator has its own identity.',
          body: 'A name, a role, a memory, contact details, skills and a history within your organization. It keeps this identity from one mission to the next, even as its profiles, tools or models evolve.',
        },
        {
          u: 'Unified',
          title: 'One presence, outside as well as inside.',
          body: 'The same Collaborator can answer visitors, present your offers and book meetings. It can also work with your teams, use your applications and carry out internal missions. Context stays attached to the same identity.',
        },
        {
          u: 'Useful',
          title: 'It does real work.',
          body: 'Answer, qualify, produce, code, update, automate, follow up and track. Unitalk does not measure value by the number of conversations, but by the useful work done for your company.',
        },
        {
          u: 'Ubiquitous',
          title: 'Present everywhere work happens.',
          body: 'Website, text, voice, phone, email, messaging, workspace, Desktop and terminal. Your AI Collaborator stays available around the clock on the channels you allow.',
        },
        {
          u: 'Understanding',
          title: 'It understands context before acting.',
          body: 'Your business, your offers, your documents, your methods, your preferences and your rules feed its authorized memory. It adapts its work to your company instead of applying a generic answer.',
        },
        {
          u: 'Upgradeable',
          title: 'Its capabilities grow with your needs.',
          body: 'Add missions, job profiles, skills, applications and automations without recreating a new agent. Your Collaborator keeps its identity and experience while its responsibilities grow.',
        },
        {
          u: 'User-controlled',
          title: 'Your intelligence belongs to you.',
          body: 'You control the memory, access, models, validations and what your company chooses to share.',
        },
      ],
      levelsTitle: 'One architecture, several levels of value',
      levels: [
        { for: 'For your company', body: 'An AI Collaborator that represents your business, works with your teams and acts inside your applications.' },
        { for: 'For creators', body: 'An environment to build and publish missions, skills, applications and industry packs.' },
        { for: 'For partners', body: 'Professional tools to deploy AI Collaborators for their clients.' },
        { for: 'For platforms', body: 'An API infrastructure to build their own AI experiences.' },
      ],
      openTitle: 'An open foundation. A governed environment.',
      openBody1:
        'Unitalk relies on Hermes, its open-source agent engine, to turn instructions, skills and knowledge into actions.',
      openBody2:
        'Your company can choose its models, hosting and control levels. Data, memory and methods stay governed within your environment.',
      openCta: 'Discover Hermes',
      ecoTitle: 'Every company builds its capabilities. The ecosystem can enrich them.',
      ecoBody1: 'Your AI Collaborator keeps the memory and methods specific to your company.',
      ecoBody2: 'It can also benefit from the skills and knowledge that their authors choose to publish in the Unitalk ecosystem.',
      ecoPunchA: 'Private by default.',
      ecoPunchB: 'Shared by choice.',
      finalEyebrow: 'An interface for the work that’s coming.',
      finalTitle: 'Your company can now have its own AI Collaborator.',
      finalBody: 'It answers your visitors, works with your teams and carries out missions inside your applications.',
      finalCta: 'Create my AI Collaborator',
      finalCta2: 'See the plans',
      finalProof: ['Available 24/7', 'From €49 per month', 'Data under your control'],
    },
  })

  return (
    <main className="w-full bg-[#151310] text-[#F4F1EA]">
      <CollabSubNav active="/collaborateurs-ia/pourquoi-unitalk" dark />

      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-[#2C2822] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        {/* faint ink grid, warm */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F4F1EA 1px, transparent 1px), linear-gradient(to bottom, #F4F1EA 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#E8548C]"
          >
            {t.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="mt-6 text-balance font-heading text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#FBF9F3]"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-[#C9C2B4]"
          >
            {t.subtitle}
          </motion.p>

          {/* signature line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-12 flex items-center gap-5"
          >
            <span className="h-px w-10 shrink-0 bg-[#E8548C]" />
            <p className="font-heading text-2xl italic tracking-[-0.01em] text-[#FBF9F3] sm:text-3xl">
              {t.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================= THE 8 U'S ========================= */}
      <section className="border-b border-[#2C2822] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* section header — the "8" is load-bearing: the eight U's */}
          <div className="flex items-end justify-between gap-6 border-b border-[#2C2822] pb-8">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#E8548C]">{t.uEyebrow}</p>
              <h2 className="mt-4 text-balance font-heading text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-[#FBF9F3] sm:text-4xl">
                {t.uHeading}
              </h2>
            </div>
            <span
              aria-hidden
              className="hidden font-heading text-[7rem] font-medium leading-[0.7] text-[#2C2822] sm:block"
            >
              8
            </span>
          </div>

          {/* editorial numbered index */}
          <ul>
            {t.us.map((item, i) => (
              <motion.li
                key={item.u}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease, delay: (i % 2) * 0.05 }}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-3 border-b border-[#2C2822] py-9 sm:grid-cols-[5rem_10rem_1fr] sm:gap-x-8 sm:py-11"
              >
                {/* ordinal */}
                <span className="font-heading text-3xl font-medium leading-none text-[#4A443B] transition-colors duration-300 group-hover:text-[#E8548C] sm:text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* U-word overline (mobile: spans under number via col-span) */}
                <div className="col-start-2 sm:col-start-2 sm:pt-1.5">
                  <UWord word={item.u} />
                </div>

                {/* title + body */}
                <div className="col-span-2 col-start-1 sm:col-span-1 sm:col-start-3">
                  <h3 className="text-balance font-sf text-xl font-semibold leading-snug text-[#FBF9F3] transition-colors duration-300 group-hover:text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#9A9384]">{item.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ====================== LEVELS OF VALUE ====================== */}
      <section className="border-b border-[#2C2822] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="max-w-2xl text-balance font-heading text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-[#FBF9F3] sm:text-4xl">
            {t.levelsTitle}
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#2C2822] bg-[#2C2822] sm:grid-cols-2">
            {t.levels.map((lvl, i) => (
              <motion.div
                key={lvl.for}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="bg-[#151310] p-8 transition-colors duration-300 hover:bg-[#1B1814] sm:p-10"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-bold text-[#E8548C]">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-[#F4F1EA]">{lvl.for}</h3>
                </div>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-[#9A9384]">{lvl.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OPEN FOUNDATION / HERMES ================= */}
      <section className="border-b border-[#2C2822] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#332E27] bg-[#1B1814] px-6 py-14 text-center sm:px-14 sm:py-20"
        >
          <h2 className="text-balance font-heading text-3xl font-medium leading-[1.1] tracking-[-0.02em] text-[#FBF9F3] sm:text-4xl">
            {t.openTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#C9C2B4]">{t.openBody1}</p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#C9C2B4]">{t.openBody2}</p>
          <a
            href="/collaborateurs-ia"
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-[#E8548C]/40 px-7 py-3.5 text-sm font-bold text-[#F2BCD3] transition-colors hover:border-[#E8548C] hover:bg-[#E8548C]/10"
          >
            {t.openCta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </section>

      {/* ============ PRIVATE BY DEFAULT / SHARED BY CHOICE ============ */}
      <section className="border-b border-[#2C2822] px-5 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-[#C9C2B4]">{t.ecoBody1}</p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#C9C2B4]">{t.ecoBody2}</p>
          <p className="mt-12 font-heading text-[clamp(1.9rem,4.5vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#FBF9F3]">
            {t.ecoPunchA} <span className="italic text-[#E8548C]">{t.ecoPunchB}</span>
          </p>
        </div>
      </section>

      {/* ======================= FINAL CONVERSION ======================= */}
      <section className="px-5 py-24 text-center sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#E8548C]">{t.finalEyebrow}</p>
          <h2 className="text-balance font-heading text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-[#FBF9F3]">
            {t.finalTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#C9C2B4]">{t.finalBody}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D10E63] px-8 py-4 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872]"
            >
              {t.finalCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/tarifs"
              className="inline-flex items-center gap-2 rounded-full border border-[#4A443B] px-8 py-4 text-sm font-bold text-[#F4F1EA] transition-colors hover:border-[#F4F1EA]"
            >
              {t.finalCta2}
            </a>
          </div>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {t.finalProof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8C8477]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8548C]" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
