'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock3, Database, Globe2, Mail, Phone, SquareTerminal, UserRound } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { ModelLogoStrip } from './model-logo-strip'
import { ApplicationLogoStrip } from './application-logo-strip'


export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main>
      <section className="px-5 pb-14 pt-[8.75rem] sm:px-8 sm:pb-16 sm:pt-[9.25rem]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <Kicker>{t.heroKicker}</Kicker>
            <h1 className="hero-heading mt-5">{t.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#4E483F]">{t.heroBody}</p>
            <p className="mt-3 max-w-xl text-[16px] font-semibold text-[#1C1A17]">{t.heroProgress}</p>
            <Link href="/decouvrir" className="mt-7 inline-flex rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-bold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              {t.create} →
            </Link>
            <div className="mt-4 space-y-1.5"><p className="text-[13px] font-medium text-[#4E483F]">{t.trial}</p><p className="text-xs text-[#6E665A]">{t.price}</p></div>
          </div>
          <LucasPortrait lang={lang} />
        </div>
      </section>

      <section className="bg-[#1C1A17] px-5 py-16 text-[#F3EFE6] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-7 lg:grid-cols-[5fr_1fr_6fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2A4C5]">Unitalk AI Gateway</p>
              <h2 className="mt-4 font-sf text-[36px] font-bold leading-[0.98] tracking-[-0.045em] text-white sm:text-[52px]"><span className="block">{t.modelsTitleOne}</span><span className="block text-[#BDB7AC]">{t.modelsTitleTwo}</span></h2>
            </div>
            <div aria-hidden />
            <div className="space-y-4 text-[16px] leading-7 text-[#BDB7AC]"><p>{t.modelsBody}</p><p>{t.modelsContinuity}</p></div>
          </div>
          <ModelLogoStrip lang={lang} />
          <div className="mt-12 grid gap-10 lg:grid-cols-[5fr_1fr_6fr]">
            <div>
              <div className="space-y-1 font-sf text-[28px] font-bold uppercase leading-tight tracking-[-0.025em] text-white sm:text-[34px]">{t.modalities.map((item, index) => <p key={item}><span className="mr-4 font-mono text-[10px] font-normal text-[#777168]">0{index + 1}</span>{item}</p>)}</div>
              <p className="mt-5 max-w-sm text-[13px] leading-6 text-[#BDB7AC]">{t.modalitiesNote}</p>
            </div>
            <div aria-hidden />
            <div>
              <h3 className="font-sf text-[32px] font-bold uppercase leading-[1.02] tracking-[-0.035em] text-white sm:text-[42px]"><span className="block">{t.moaTitleOne}</span><span className="block text-[#F2A4C5]">{t.moaTitleTwo}</span></h3>
              <div className="mt-6 border-y border-white/[0.14] py-5 font-sf text-[20px] font-semibold leading-8 text-white"><p>{t.moaSteps[0]}</p><p>{t.moaSteps[1]}</p><p>{t.moaSteps[2]}</p></div>
              <p className="mt-5 text-[14px] leading-7 text-[#BDB7AC]">{t.moa}</p>
              <p className="mt-4 font-semibold text-white">{t.moaFinal}</p>
            </div>
          </div>
          <Link href="/ai-gateway" className="mt-10 inline-flex text-sm font-bold text-[#F2A4C5]">{t.gatewayLink} →</Link>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-7 lg:grid-cols-[5fr_1fr_6fr]">
            <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.appsKicker}</p><h2 className="mt-4 font-sf text-[36px] font-bold leading-[0.98] tracking-[-0.045em] text-[#1C1A17] sm:text-[52px]">{t.appsTitle}</h2></div>
            <div aria-hidden />
            <p className="self-end whitespace-pre-line text-[18px] font-semibold leading-8 text-[#4E483F]">{t.appsBody}</p>
          </div>
          <ApplicationLogoStrip lang={lang} />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div><h3 className="font-sf text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#1C1A17] sm:text-[38px]">{t.actionsTitle}</h3><p className="mt-4 text-[16px] font-semibold text-[#4E483F]">{t.actionsControl}</p></div>
            <div><h3 className="font-sf text-[24px] font-bold tracking-[-0.025em]">{t.rulesTitle}</h3><p className="mt-4 text-[14px] leading-7 text-[#4E483F]">{t.oauthBody}</p><p className="mt-4 text-[15px] font-semibold leading-6 text-[#1C1A17]">{t.permissions}</p></div>
          </div>
          <Link href="/collaborateurs-ia/applications" className="mt-9 inline-flex text-sm font-bold text-[#D10E63]">{t.appsLink} →</Link>
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
  const t = COPY[lang]
  return (
    <motion.figure initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-[#DED6C8] bg-[#FAF8F3] shadow-[0_28px_65px_-48px_rgba(28,26,23,0.5)]">
      <div className="relative aspect-[16/10] bg-[#ECE6DA]">
        <Image src="/images/lucas-avatar.png" alt={lang === 'fr' ? 'Portrait de Lucas, Collaborateur IA' : 'Portrait of Lucas, AI Collaborator'} fill priority sizes="(max-width: 1024px) 100vw, 420px" className="object-cover object-top" />
        <span className="absolute right-5 top-5 rounded-full bg-[#1C1A17] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">{t.aiIdentity}</span>
      </div>
      <figcaption className="p-5">
        <div className="flex items-center justify-between gap-4"><div><p className="font-sf text-2xl font-bold leading-none">Lucas</p><p className="mt-1.5 text-[13px] text-[#4E483F]">{t.lucasMeta}</p></div><span className="inline-flex shrink-0 items-center gap-1.5 self-center text-xs font-bold text-[#257A43]"><span className="h-2 w-2 rounded-full bg-[#2E9E5B]" />{t.ready}</span></div>
        <div className="mt-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#6E665A]">{t.profilesLabel}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {t.profiles.map((profile, index) => (
              <motion.span key={profile} initial={reduce ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: reduce ? 0 : index * 0.35 }} className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${index === 0 ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white text-[#4E483F]'}`}>{profile}</motion.span>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-[#6E665A]">{t.activeProfile}</p>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-3 border-t border-[#DED6C8] pt-4 text-[11px] text-[#6E665A]">
          <Channel icon={Mail} label={t.channels.email} />
          <Channel icon={CalendarDays} label={t.channels.calendar} />
          <Channel icon={Phone} label={t.channels.phone} />
          <Channel icon={UserRound} label={t.channels.publicProfile} />
          <Channel icon={Globe2} label={t.channels.browser} />
          <Channel icon={SquareTerminal} label={t.channels.code} />
          <Channel icon={Clock3} label={t.channels.scheduling} />
          <Channel icon={Database} label={t.channels.companyMemory} ariaLabel={t.companyMemoryAria} />
        </div>
      </figcaption>
    </motion.figure>
  )
}

function SectionIntro({ kicker, title, body, dark = false }: { kicker?: string; title: string; body: string; dark?: boolean }) {
  return <div>{kicker && <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}>{kicker}</p>}<h2 className={`mt-3 max-w-4xl text-balance font-sf text-[32px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[42px] ${dark ? 'text-white' : 'text-[#1C1A17]'}`}>{title}</h2><p className={`mt-4 max-w-3xl text-[15px] leading-relaxed ${dark ? 'text-[#C9C0B5]' : 'text-[#4E483F]'}`}>{body}</p></div>
}

function Channel({ icon: Icon, label, ariaLabel }: { icon: typeof Mail; label: string; ariaLabel?: string }) { return <span aria-label={ariaLabel} className="flex min-w-0 flex-col items-center gap-1 text-center"><Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /><span className="leading-tight">{label}</span></span> }


const COPY = {
  fr: {
    heroKicker: 'Prêt à accomplir vos missions',
    heroTitle: 'Son identité reste. Ses responsabilités évoluent.',
    heroBody: 'Votre Collaborateur IA rejoint votre entreprise avec une identité durable, ses propres moyens de communication et un environnement de travail privé.',
    heroProgress: 'Ajoutez les profils métier, les compétences et les applications dont il a besoin. Son identité et son expérience restent les mêmes.',
    create: 'Créer mon Collaborateur IA',
    trial: '7 jours d’essai gratuit · 1 million de tokens offerts · Sans carte bancaire',
    price: 'Puis 49 €/mois, hors usages IA.',
    modelsTitleOne: 'Le modèle change.',
    modelsTitleTwo: 'Lucas reste.',
    modelsBody: 'Vous définissez les modèles autorisés. Selon la mission, Lucas peut en mobiliser un seul ou faire travailler plusieurs modèles en parallèle.',
    modelsContinuity: 'Son identité, son contexte, son expérience et ses droits restent attachés au même Collaborateur IA.',
    modalities: ['Texte.', 'Image.', 'Audio.', 'Vidéo.'],
    modalitiesNote: 'Selon les modèles et les droits autorisés par votre entreprise.',
    moaTitleOne: 'Plusieurs intelligences.',
    moaTitleTwo: 'Une seule responsabilité.',
    moaSteps: ['Plusieurs modèles proposent.', 'Un modèle de revue compare.', 'Lucas répond.'],
    moa: 'Pour les missions complexes, plusieurs modèles peuvent produire une proposition. Un modèle de revue les compare avant que Lucas restitue une synthèse unique.',
    moaFinal: 'Une seule identité porte la mission du début à la fin.',
    gatewayLink: 'Explorer l’AI Gateway',
    appsKicker: 'Plus de 3 000 applications',
    appsTitle: 'Il travaille là où votre entreprise travaille.',
    appsBody: 'Vous choisissez les applications.\nVous autorisez les actions.\nLucas accomplit le travail.',
    actionsTitle: 'Il lit. Il prépare. Il agit.',
    actionsControl: 'Les décisions sensibles restent sous votre contrôle.',
    rulesTitle: 'Chaque application. Chaque action. Vos règles.',
    oauthBody: 'OAuth autorise les accès. Les serveurs MCP de Pipedream rendent les actions disponibles. Votre organisation décide jusqu’où Lucas peut aller.',
    permissions: 'Il n’accède pas à tout. Il accède à ce dont son travail a besoin.',
    appsLink: 'Explorer plus de 3 000 applications',
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
    aiIdentity: 'Identité IA',
    lucasMeta: 'Collaborateur IA · Solvea',
    ready: 'Prêt',
    profilesLabel: 'Profils métier · 3',
    profiles: ['Relation client', 'Commercial', 'Fidélisation'],
    activeProfile: 'Mobilisé pour cette mission : Relation client',
    channels: { email: 'Email', calendar: 'Agenda', phone: 'Téléphone', publicProfile: 'Profil public', browser: 'Navigation', code: 'Code', scheduling: 'Planification', companyMemory: 'Mémoire entreprise' },
    companyMemoryAria: 'Accès à la mémoire d’entreprise selon vos autorisations',
  },
  en: {
    heroKicker: 'Ready to accomplish your missions',
    heroTitle: 'Its identity remains. Its responsibilities evolve.',
    heroBody: 'Your AI Collaborator joins your company with a lasting identity, its own communication channels and a private work environment.',
    heroProgress: 'Add the job profiles, skills and applications it needs. Its identity and experience remain the same.',
    create: 'Create my AI Collaborator',
    trial: '7-day free trial · 1 million free tokens · No credit card',
    price: 'Then €49/month, excluding AI usage.',
    modelsTitleOne: 'The model changes.',
    modelsTitleTwo: 'Lucas remains.',
    modelsBody: 'You define the authorized models. Depending on the mission, Lucas can use one or have several models work in parallel.',
    modelsContinuity: 'Its identity, context, experience and permissions remain attached to the same AI Collaborator.',
    modalities: ['Text.', 'Image.', 'Audio.', 'Video.'],
    modalitiesNote: 'Depending on the models and permissions authorized by your company.',
    moaTitleOne: 'Several intelligences.',
    moaTitleTwo: 'One responsibility.',
    moaSteps: ['Several models propose.', 'A review model compares.', 'Lucas responds.'],
    moa: 'For complex missions, several models can produce a proposal. A review model compares them before Lucas delivers one synthesis.',
    moaFinal: 'One identity carries the mission from start to finish.',
    gatewayLink: 'Explore the AI Gateway',
    appsKicker: 'More than 3,000 applications',
    appsTitle: 'It works where your company works.',
    appsBody: 'You choose the applications.\nYou authorize the actions.\nLucas gets the work done.',
    actionsTitle: 'It reads. It prepares. It acts.',
    actionsControl: 'Sensitive decisions remain under your control.',
    rulesTitle: 'Every application. Every action. Your rules.',
    oauthBody: 'OAuth authorizes access. Pipedream MCP servers make actions available. Your organization decides how far Lucas can go.',
    permissions: 'It does not access everything. It accesses what its work requires.',
    appsLink: 'Explore more than 3,000 applications',
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
    aiIdentity: 'AI identity',
    lucasMeta: 'AI Collaborator · Solvea',
    ready: 'Ready',
    profilesLabel: 'Job profiles · 3',
    profiles: ['Customer relations', 'Sales', 'Customer success'],
    activeProfile: 'Used for this mission: Customer relations',
    channels: { email: 'Email', calendar: 'Calendar', phone: 'Phone', publicProfile: 'Public profile', browser: 'Browsing', code: 'Code', scheduling: 'Scheduling', companyMemory: 'Company memory' },
    companyMemoryAria: 'Access to company memory according to your permissions',
  },
} as const
