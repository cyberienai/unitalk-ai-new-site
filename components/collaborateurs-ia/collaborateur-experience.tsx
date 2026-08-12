'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const APP_NAMES = ['Gmail', 'Outlook', 'Google Calendar', 'Microsoft Teams', 'Slack', 'HubSpot', 'Salesforce', 'Notion', 'Google Drive', 'Dropbox', 'Stripe', 'Zendesk']
const MODELS = [
  { name: 'OpenAI', label: 'GPT', mark: '◉' },
  { name: 'Anthropic', label: 'Claude', logo: '/logos/anthropic-white.svg' },
  { name: 'Google Gemini', logo: '/logos/gemini-white.svg' },
  { name: 'DeepSeek', logo: '/logos/deepseek-white.svg' },
  { name: 'Mistral AI', logo: '/logos/mistral-white.svg' },
] as const

export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main>
      <section className="px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.heroKicker}</p>
            <h1 className="hero-heading mt-3">{t.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#4E483F]">{t.heroBody}</p>
            <p className="mt-3 max-w-xl text-[16px] font-semibold text-[#1C1A17]">{t.heroProgress}</p>
            <Link href="/decouvrir" className="mt-7 inline-flex rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-bold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              {t.create} →
            </Link>
            <p className="mt-3 text-[13px] font-medium text-[#6E665A]">{t.trial}</p>
          </div>
          <LucasPortrait lang={lang} />
        </div>
      </section>

      <section className="bg-[#1C1A17] px-5 py-16 text-[#F3EFE6] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionIntro dark kicker="Unitalk AI Gateway" title={t.modelsTitle} body={t.modelsBody} />
          <ModelWall />
          <p className="mt-8 text-center font-sf text-[clamp(1.5rem,3vw,2.3rem)] font-semibold tracking-[-0.02em] text-white">Texte · Image · Audio · Vidéo</p>
          <p className="mx-auto mt-5 max-w-3xl text-center text-[14px] leading-relaxed text-[#C9C0B5]">{t.moa}</p>
          <Link href="/ai-gateway" className="mt-5 flex justify-center text-sm font-bold text-[#F2A4C5]">{t.gatewayLink} →</Link>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionIntro kicker={t.appsKicker} title={t.appsTitle} body={t.appsBody} />
          <WordmarkWall items={APP_NAMES} />
          <p className="mt-8 text-center font-sf text-lg font-bold text-[#1C1A17]">Lire · Préparer · Mettre à jour · Déclencher · Demander une validation</p>
          <p className="mt-3 text-center text-[14px] text-[#4E483F]">{t.permissions}</p>
          <Link href="/collaborateurs-ia/applications" className="mt-5 flex justify-center text-sm font-bold text-[#D10E63]">{t.appsLink} →</Link>
        </div>
      </section>

      <section className="bg-[#1C1A17] px-5 py-14 text-[#F3EFE6] sm:px-8 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <SectionIntro dark title={t.environmentTitle} body={t.environmentBody} />
          <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.environmentItems.map(([title, body]) => (
              <div key={title} className="border-t border-white/20 pt-4">
                <h3 className="font-sf text-2xl font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C9C0B5]">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-semibold text-[#E7DED3]">{t.resources}</p>
          <p className="mt-3 text-sm text-[#C9C0B5]">{t.hermes}</p>
          <Link href="/agent-hermes" className="mt-4 inline-flex text-sm font-bold text-[#F2A4C5]">{t.hermesLink} →</Link>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionIntro kicker={t.identityKicker} title={t.identityTitle} body={t.identityBody} />
          <div className="mt-9 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-[#D10E63]">1 identité</p>
              <div className="mt-5 space-y-3 font-sf text-2xl font-bold sm:text-3xl">
                <p>+ Profils métier</p>
                <p>+ Compétences</p>
                <p>+ Applications</p>
                <p>+ Expérience</p>
              </div>
            </div>
            <div className="rounded-3xl border border-[#DED6C8] bg-[#FAF8F3] p-6 sm:p-8">
              <p className="text-sm font-semibold text-[#6E665A]">Relation client</p>
              <div className="my-4 h-8 w-px bg-[#D10E63]/40" />
              <p className="font-sf text-2xl font-bold">Relation client · Fidélisation</p>
              <div className="mt-6 grid gap-2 text-sm text-[#4E483F] sm:grid-cols-3">
                <span>Identité inchangée</span><span>Mémoire conservée</span><span>Rattachement conservé</span>
              </div>
            </div>
          </div>
          <p className="mt-7 text-[15px] font-semibold text-[#1C1A17]">{t.readyFor}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/collaborateurs-ia/profils-metier" className="text-sm font-bold text-[#D10E63]">{t.profilesLink} →</Link>
            <Link href="/collaborateurs-ia/competences" className="text-sm font-bold text-[#D10E63]">{t.skillsLink} →</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[#DED6C8] px-5 py-16 text-center sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-sf text-[32px] font-bold tracking-[-0.03em] sm:text-[42px]">{t.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">{t.finalBody}</p>
          <Link href="/decouvrir" className="mt-7 inline-flex rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-bold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.create} →</Link>
          <p className="mt-3 text-[13px] font-medium text-[#6E665A]">{t.trial}</p>
        </div>
      </section>
    </main>
  )
}

function LucasPortrait({ lang }: { lang: 'fr' | 'en' }) {
  const reduce = useReducedMotion()
  return (
    <motion.figure initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-[#DED6C8] bg-[#FAF8F3] shadow-[0_28px_65px_-48px_rgba(28,26,23,0.5)]">
      <div className="relative aspect-[4/3] bg-[#ECE6DA]">
        <Image src="/images/lucas-avatar.png" alt={lang === 'fr' ? 'Portrait de Lucas, Collaborateur IA' : 'Portrait of Lucas, AI Collaborator'} fill priority sizes="(max-width: 1024px) 100vw, 420px" className="object-cover object-top" />
        <span className="absolute right-5 top-5 rounded-full bg-[#1C1A17] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Nature IA</span>
      </div>
      <figcaption className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4"><div><p className="font-sf text-2xl font-bold leading-none">Lucas</p><p className="mt-2 text-sm text-[#4E483F]">Collaborateur IA · Relation client · Solvea</p></div><span className="inline-flex shrink-0 items-center gap-1.5 self-center text-xs font-bold text-[#257A43]"><span className="h-2 w-2 rounded-full bg-[#2E9E5B]" />Prêt</span></div>
        <p className="mt-4 text-sm text-[#6E665A]">Email · Téléphone · Agenda</p>
      </figcaption>
    </motion.figure>
  )
}

function SectionIntro({ kicker, title, body, dark = false }: { kicker?: string; title: string; body: string; dark?: boolean }) {
  return <div>{kicker && <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}>{kicker}</p>}<h2 className={`mt-3 max-w-4xl text-balance font-sf text-[32px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[42px] ${dark ? 'text-white' : 'text-[#1C1A17]'}`}>{title}</h2><p className={`mt-4 max-w-3xl text-[15px] leading-relaxed ${dark ? 'text-[#C9C0B5]' : 'text-[#4E483F]'}`}>{body}</p></div>
}

function WordmarkWall({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-current/10 sm:grid-cols-3 lg:grid-cols-6">{items.map((item) => <div key={item} className={`flex min-h-24 items-center justify-center px-4 text-center font-sf text-sm font-bold ${dark ? 'bg-white/[0.035] text-[#E7DED3]' : 'bg-[#FAF8F3] text-[#1C1A17]'}`}>{item}</div>)}</div>
}

function ModelWall() {
  return <div className="mt-10"><div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:gap-x-14">{MODELS.map((model) => <div key={model.name} className="flex min-w-28 items-center justify-center gap-3 text-white">{'logo' in model ? <Image src={model.logo} alt="" width={34} height={34} className="h-8 w-auto max-w-10 object-contain" /> : <span aria-hidden className="text-3xl leading-none">{model.mark}</span>}<div><p className="font-sf text-sm font-semibold">{model.name}</p>{'label' in model && model.label && <p className="text-[10px] text-[#BDB7AC]">{model.label}</p>}</div></div>)}</div><p className="mt-7 text-center text-sm font-medium text-[#BDB7AC]">+ vos modèles privés · connectés selon votre configuration</p></div>
}

const COPY = {
  fr: {
    heroKicker: 'Prêt à accomplir vos missions',
    heroTitle: 'Il a un nom. Un rôle. Du travail à accomplir.',
    heroBody: 'Votre Collaborateur IA rejoint votre entreprise avec une identité, ses propres moyens de communication et un environnement de travail privé.',
    heroProgress: 'Vous choisissez ce qu’il peut utiliser. Il développe ensuite ses compétences au fil de vos missions.',
    create: 'Créer mon Collaborateur IA',
    trial: 'Sept jours d’essai gratuit · 1 million de tokens préchargés · Sans carte bancaire',
    modelsTitle: 'Il ne dépend pas d’un seul modèle.',
    modelsBody: 'Lucas utilise les modèles autorisés par votre entreprise. Le bon modèle peut changer selon le travail. Son identité, son contexte et ses responsabilités restent les mêmes.',
    moa: 'Pour les missions complexes, plusieurs modèles travaillent en parallèle. Un modèle de revue compare leurs propositions. Lucas restitue la synthèse.',
    gatewayLink: 'Découvrir l’AI Gateway',
    appsKicker: 'Plus de 3 000 applications',
    appsTitle: 'Il ne reste pas dans une fenêtre de chat.',
    appsBody: 'Lucas travaille dans les applications que votre entreprise autorise. Les connexions OAuth lui donnent accès aux seules actions nécessaires à son travail.',
    permissions: 'Il n’accède pas à tout. Il accède à ce dont son travail a besoin.',
    appsLink: 'Explorer les applications',
    environmentTitle: 'Son propre environnement pour travailler vraiment.',
    environmentBody: 'Chaque Collaborateur IA dispose de son propre serveur privé, propulsé par Hermes.',
    environmentItems: [['Code', 'Exécuter et vérifier'], ['Navigateur', 'Rechercher sur Internet'], ['Fichiers', 'Conserver son travail'], ['Planification', 'Continuer après la conversation']],
    resources: 'Stockage, RAM et CPU propres à son environnement.',
    hermes: 'Propulsé par Hermes, l’agent autonome open source de Unitalk.',
    hermesLink: 'Découvrir Hermes',
    identityKicker: 'Une identité qui dure',
    identityTitle: 'Vous ne créez pas un agent de plus. Vous faites progresser le même.',
    identityBody: 'Lucas partage le contexte autorisé de votre entreprise. Son expérience reste attachée à son identité. Ajoutez des profils métier, des compétences et des applications sans repartir de zéro.',
    readyFor: 'Déjà prêt pour les réunions, les documents, les images et la vidéo.',
    profilesLink: 'Explorer les profils métier',
    skillsLink: 'Découvrir les compétences',
    finalTitle: 'Confiez-lui une première mission.',
    finalBody: 'Donnez-lui un prénom. Décrivez le travail à accomplir. Alma prépare la suite.',
  },
  en: {
    heroKicker: 'Ready to accomplish your missions',
    heroTitle: 'A name. A role. Work to accomplish.',
    heroBody: 'Your AI Collaborator joins your company with an identity, its own communication channels and a private work environment.',
    heroProgress: 'You choose what it can use. It then develops its skills through your missions.',
    create: 'Create my AI Collaborator',
    trial: 'Seven-day free trial · 1 million tokens preloaded · No credit card',
    modelsTitle: 'It does not depend on a single model.',
    modelsBody: 'Lucas uses the models authorized by your company. The right model can change with the work; its identity, context and responsibilities remain.',
    moa: 'For complex missions, several models work in parallel. A review model compares their proposals. Lucas delivers the synthesis.',
    gatewayLink: 'Discover the AI Gateway',
    appsKicker: 'More than 3,000 applications',
    appsTitle: 'It does not stay inside a chat window.',
    appsBody: 'Lucas works inside the applications your company authorizes. OAuth connections expose only the actions needed for its work.',
    permissions: 'It does not access everything. It accesses what its work requires.',
    appsLink: 'Explore applications',
    environmentTitle: 'Its own environment to do real work.',
    environmentBody: 'Each AI Collaborator has its own private server, powered by Hermes.',
    environmentItems: [['Code', 'Execute and verify'], ['Browser', 'Research online'], ['Files', 'Retain its work'], ['Scheduling', 'Continue after the conversation']],
    resources: 'Storage, RAM and CPU dedicated to its environment.',
    hermes: 'Powered by Hermes, Unitalk’s open-source autonomous agent.',
    hermesLink: 'Discover Hermes',
    identityKicker: 'An identity that lasts',
    identityTitle: 'You do not create another agent. You develop the same one.',
    identityBody: 'Lucas shares your company’s authorized context. Its experience remains attached to its identity. Add job profiles, skills and applications without starting over.',
    readyFor: 'Already ready for meetings, documents, images and video.',
    profilesLink: 'Explore job profiles',
    skillsLink: 'Discover skills',
    finalTitle: 'Assign a first mission.',
    finalBody: 'Give it a first name. Describe the work. Alma prepares the rest.',
  },
} as const
