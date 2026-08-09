'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Fingerprint,
  Layers,
  Hammer,
  Radio,
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { useT } from '@/lib/language-context'
import { CollabSubNav } from './collab-subnav'

const U_ICONS = [Globe, Fingerprint, Layers, Hammer, Radio, BrainCircuit, TrendingUp, ShieldCheck]

export function CollabWhyContent() {
  const t = useT({
    fr: {
      eyebrow: 'Pourquoi Unitalk',
      title: 'Unitalk vend des capacités de travail autonomes.',
      subtitle:
        'Unitalk réunit vos équipes, vos Collaborateurs IA, vos applications et vos modèles dans une même interface de travail. Une infrastructure ouverte, gouvernée par votre organisation et conçue pour progresser avec elle.',
      tagline: 'The Universal Work Interface.',
      uEyebrow: 'Les 8 U de Unitalk',
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
          title: 'Votre entreprise garde le contrôle.',
          body: 'Vous définissez les accès, les modèles autorisés, les validations humaines, la mémoire conservée et les éléments éventuellement partagés. Tout reste privé par défaut. Rien ne rejoint l’écosystème sans votre choix.',
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
          title: 'Your company stays in control.',
          body: 'You define access, allowed models, human validations, retained memory and what may be shared. Everything stays private by default. Nothing joins the ecosystem without your choice.',
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
    <main className="w-full bg-[#F3EFE6]">
      <CollabSubNav active="/collaborateurs-ia/pourquoi-unitalk" />

      {/* Hero */}
      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.eyebrow}</p>
          <h1 className="text-balance font-sf text-4xl font-bold leading-[1.05] text-[#1C1A17] [letter-spacing:-0.04em] sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-[#4E483F]">{t.subtitle}</p>
          <p className="mt-6 font-sf text-lg font-semibold tracking-[-0.01em] text-[#D10E63]">{t.tagline}</p>
        </div>
      </section>

      {/* The 8 U's */}
      <section className="border-t border-[#DDD5CA] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.uEyebrow}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.us.map((item, i) => {
              const Icon = U_ICONS[i]
              return (
                <motion.div
                  key={item.u}
                  className="rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-6 sm:p-7"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1C1A17]">
                      <Icon className="h-5 w-5 text-[#FBF9F3]" />
                    </span>
                    <span className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#D10E63]">{item.u}</span>
                  </div>
                  <h3 className="mt-5 text-balance text-xl font-bold leading-snug text-[#1C1A17]">{item.title}</h3>
                  <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-[#6B6560]">{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Levels of value */}
      <section className="border-t border-[#DDD5CA] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-balance text-center font-sf text-3xl font-bold leading-[1.1] text-[#1C1A17] [letter-spacing:-0.03em] sm:text-4xl">
            {t.levelsTitle}
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.levels.map((lvl, i) => (
              <motion.div
                key={lvl.for}
                className="rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <h3 className="text-[15px] font-bold text-[#1C1A17]">{lvl.for}</h3>
                <p className="mt-3 text-pretty text-[14px] leading-relaxed text-[#6B6560]">{lvl.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open foundation, governed environment */}
      <section className="border-t border-[#DDD5CA] bg-[#161412] px-5 py-20 text-[#F4F1EA] sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.1] [letter-spacing:-0.03em] sm:text-4xl">{t.openTitle}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#B8B0A4]">{t.openBody1}</p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#B8B0A4]">{t.openBody2}</p>
          <a
            href="/collaborateurs-ia"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-[#E8A0BF]/40 bg-[#E8A0BF]/10 px-7 py-3.5 font-bold text-[#F2BCD3] transition-colors hover:bg-[#E8A0BF]/20"
          >
            {t.openCta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Private by default, shared by choice */}
      <section className="border-t border-[#DDD5CA] px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-sf text-3xl font-bold leading-[1.1] text-[#1C1A17] [letter-spacing:-0.03em] sm:text-4xl">
            {t.ecoTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#4E483F]">{t.ecoBody1}</p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#4E483F]">{t.ecoBody2}</p>
          <p className="mt-8 font-sf text-2xl font-semibold tracking-[-0.02em] text-[#1C1A17]">
            {t.ecoPunchA} <span className="text-[#D10E63]">{t.ecoPunchB}</span>
          </p>
        </div>
      </section>

      {/* Final conversion */}
      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#FBD7E6]">{t.finalEyebrow}</p>
          <h2 className="text-balance font-sf text-4xl font-semibold leading-[1.08] [letter-spacing:-0.04em] md:text-5xl">{t.finalTitle}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#FBD7E6]">{t.finalBody}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5"
            >
              {t.finalCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/tarifs"
              className="inline-flex items-center gap-2 rounded-full border border-[#FBF9F3]/50 px-7 py-3.5 font-bold text-[#FBF9F3] transition-colors hover:bg-[#FBF9F3]/10"
            >
              {t.finalCta2}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {t.finalProof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#FBD7E6]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FBF9F3]" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
