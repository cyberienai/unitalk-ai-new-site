'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Database,
  Globe2,
  LockKeyhole,
  Mail,
  Server,
  ShieldCheck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { AlmaInline } from '@/components/alma-inline'

const MARKETPLACE_LINKS = [
  { href: '/marketplace/collaborateurs-ia', key: 'collaborators' },
  { href: '/marketplace/profils-metier', key: 'profiles' },
  { href: '/marketplace/competences', key: 'skills' },
  { href: '/marketplace/applications', key: 'apps' },
  { href: '/marketplace/modeles-ia', key: 'models' },
  { href: '/marketplace/serveurs-ia', key: 'servers' },
] as const

export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#191715]">
      <section className="hero-viewport relative flex items-center overflow-hidden border-b border-[#CFC5B5] bg-[#F3EFE6] pb-14 pt-24 sm:pb-16 sm:pt-28">
        <div aria-hidden className="absolute inset-0 opacity-[.045] [background-image:linear-gradient(#191715_1px,transparent_1px),linear-gradient(90deg,#191715_1px,transparent_1px)] [background-size:56px_56px]" />
        <div aria-hidden className="absolute -right-40 top-12 size-[38rem] rounded-full bg-[#D10E63]/[.08] blur-3xl" />
        <div className="editorial-shell relative grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            <div className="max-w-2xl">
              <div className="mb-5 flex justify-center sm:mb-6 sm:justify-start"><Kicker>{t.eyebrow}</Kicker></div>
              <h1 className="text-balance text-center font-sf text-[clamp(1.9rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-.05em] text-[#1C1A17] sm:text-left">{t.heroTitle}<span className="block text-[#D10E63]">{t.heroAccent}</span></h1>
              <p className="mx-auto mt-4 max-w-xl text-balance text-center text-base leading-relaxed text-[#4E483F] sm:mx-0 sm:text-left md:text-lg">{t.heroBody}</p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <Link href="/decouvrir?source=collaborateurs-ia-hero" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white outline-none transition hover:bg-[#B90C58] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.start}<ArrowRight className="size-4" /></Link>
                <a href="#fonctionnement" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#191715] px-7 text-sm font-bold outline-none transition hover:bg-[#191715] hover:text-white focus-visible:ring-2 focus-visible:ring-[#D10E63]">{t.understand}<ArrowDown className="size-4" /></a>
              </div>
              <p className="mt-5 text-center text-xs font-medium text-[#6B6560] sm:text-left">{t.reassurance} · <span className="whitespace-nowrap"><AlmaInline className="mr-1" />{t.almaGuidance}</span></p>
            </div>
            <aside className="group relative mx-auto w-full max-w-md">
              <div aria-hidden className="pointer-events-none absolute -inset-16 -z-10"><div className="absolute left-[42%] top-[46%] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D10E63]/30 blur-[90px]"/><div className="absolute right-[8%] top-[8%] h-[52%] w-[52%] rounded-full bg-[#F2A65A]/20 blur-[80px]"/></div>
              <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#17130F] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.65)] transition-transform duration-500 group-hover:-translate-y-1.5">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-7"><div><p className="font-mono text-[9px] font-black uppercase tracking-[.17em] text-[#F2A4C5]">{t.heroCardKicker}</p><h2 className="mt-2 text-xl font-semibold tracking-[-.035em]">{t.heroCardTitle}</h2></div><span className="flex size-10 items-center justify-center rounded-full bg-[#D10E63]"><Building2 className="size-5" /></span></div>
                <div className="p-6 sm:p-7">
                  <div className="flex items-center">
                    {[
                      ['/images/emma-avatar.png', 'Emma'],
                      ['/nina-avatar.png', 'Camille'],
                      ['/images/nadia-avatar.png', 'Nadia'],
                    ].map(([src, name], index) => <div key={name} className={`relative size-16 overflow-hidden rounded-full border-[3px] border-[#191715] ${index > 0 ? '-ml-3' : ''}`}><Image src={src} alt={name} fill sizes="64px" className="object-cover" /></div>)}
                    <div className="ml-4"><p className="text-sm font-bold">{t.heroCardTeam}</p><p className="mt-1 text-xs text-[#AFA397]">{t.heroCardTeamBody}</p></div>
                  </div>
                  <div className="relative mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#211E1B]">
                    <div aria-hidden className="absolute bottom-0 left-1/2 top-0 w-px bg-white/10" />
                    <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                    <div className="relative grid grid-cols-2">
                      {t.heroProofs.map((proof) => <div key={proof} className="flex min-h-20 items-start gap-3 p-4"><span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#F15B9B] shadow-[0_0_0_4px_rgba(209,14,99,.12)]"/><p className="text-[12px] font-semibold leading-5 text-[#E7E0D5]">{proof}</p></div>)}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#D10E63]/25 bg-[#D10E63]/10 px-4 py-3"><ShieldCheck className="size-5 shrink-0 text-[#F2A4C5]"/><p className="text-xs font-semibold leading-5 text-[#E7E0D5]">{t.heroCardRule}</p></div>
                </div>
              </div>
            </aside>
        </div>
      </section>

      <section id="fonctionnement" className="scroll-mt-20 bg-[#191715] py-16 text-white sm:py-24">
        <div className="editorial-shell">
          <div className="grid gap-10 lg:grid-cols-[.62fr_1.38fr] lg:items-center">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start">
              <Image src="/images/hermes-agent-logo.webp" alt="Logo Hermes Agent" width={128} height={128} className="size-20 rounded-2xl object-cover sm:size-24" />
              <span className="font-mono text-lg text-white/35">×</span>
              <span className="flex size-20 items-center justify-center rounded-2xl bg-[#F3EFE6] sm:size-24"><UnitalkLogo size={56} /></span>
            </div>
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.foundationKicker}</p>
              <h2 className="mt-5 max-w-4xl text-balance text-[clamp(2.2rem,4.4vw,4.4rem)] font-semibold leading-[.92] tracking-[-.06em]">{t.foundationTitle}</h2>
              <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[#CFC6B8]">{t.foundationBody}</p>
              <Link href="/hermes" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-bold transition hover:border-[#F2A4C5] hover:text-[#F2A4C5]">{t.foundationCta}<ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#CFC5B5] bg-[#FAF8F3] py-16 sm:py-24">
        <div className="editorial-shell">
          <SectionHeading kicker={t.placeKicker} title={t.placeTitle} body={t.placeBody} />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#CFC5B5] sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {t.placements.map((label, index) => {
              const Icon = [UserRound, UsersRound, Building2, Globe2][index]
              return <div key={label} className="bg-[#F3EFE6] p-6 sm:p-7"><div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-full bg-[#D10E63]/10"><Icon className="size-5 text-[#B00C54]"/></span><span className="font-mono text-[9px] font-black text-[#857C6E]">0{index + 1}</span></div><h3 className="mt-7 text-xl font-semibold tracking-[-.03em]">{label}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{t.placementDescriptions[index]}</p></div>
            })}
          </div>
          <div className="mt-6 overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#EAE3D4]">
            <div className="grid gap-5 border-b border-[#CFC5B5] p-7 sm:p-9 lg:grid-cols-[auto_1fr_auto] lg:items-center"><span className="flex size-12 items-center justify-center rounded-full bg-[#D10E63] text-white"><ShieldCheck className="size-6" /></span><p className="text-[clamp(1.35rem,2.3vw,2.1rem)] font-semibold leading-tight tracking-[-.04em]">{t.placementRule}</p><span className="font-mono text-[9px] font-black uppercase tracking-[.15em] text-[#B00C54]">{t.placementRuleLabel}</span></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              <ResourceFact icon={LockKeyhole} title={t.privateMemory} body={t.privateMemoryBody} />
              <ResourceFact icon={Database} title={t.sharedKnowledge} body={t.sharedKnowledgeBody} border />
              <ResourceFact icon={Mail} title={t.communication} body={t.communicationBody} border />
              <ResourceFact icon={Server} title={t.sovereignty} body={t.sovereigntyBody} border />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E8E0D2] py-16 sm:py-24">
        <div className="editorial-shell">
          <SectionHeading kicker={t.marketKicker} title={t.marketTitle} body={t.marketBody} />
          <div className="mt-10 overflow-hidden rounded-[28px] border border-[#BFB4A4] bg-[#FAF8F3] sm:mt-12">
            {MARKETPLACE_LINKS.map(({ href, key }, index) => {
              const item = t.marketItems[key]
              return <Link key={key} href={href} className={`group grid min-h-36 gap-5 border-b border-[#CFC5B5] p-6 outline-none transition-colors last:border-b-0 hover:bg-white focus-visible:bg-white sm:grid-cols-[4rem_minmax(10rem,.65fr)_1fr_auto] sm:items-center sm:gap-7 sm:p-7 ${index === 3 ? 'bg-[#F6E5EC]' : ''}`}><span className="font-mono text-[10px] font-black text-[#B00C54]">0{index + 1}</span><div><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#857C6E]">{item.eyebrow}</p><h3 className="mt-2 text-[clamp(1.35rem,2.5vw,2rem)] font-semibold tracking-[-.04em]">{item.title}</h3></div><p className="max-w-xl text-[13px] leading-6 text-[#625B50]">{item.body}</p><span className="flex size-10 items-center justify-center rounded-full border border-[#BFB4A4] text-[#B00C54] transition-all group-hover:border-[#D10E63] group-hover:bg-[#D10E63] group-hover:text-white"><ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/></span></Link>
            })}
          </div>
          <div className="mt-7 flex max-w-4xl items-start gap-4 border-l-2 border-[#B00C54] pl-5"><span className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">{t.marketNote}</span><p className="text-sm font-semibold leading-7 text-[#4E483F]">{t.marketConclusion}</p></div>
        </div>
      </section>

      <section className="border-y border-[#191715] bg-[#F3EFE6] py-16 sm:py-24">
        <div className="editorial-shell">
          <SectionHeading kicker={t.assetKicker} title={t.assetTitle} body={t.assetBody} />
          <div className="mt-10 grid overflow-hidden rounded-[28px] border border-[#191715] sm:mt-12 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative flex flex-col bg-[#191715] p-7 text-white sm:p-10">
              <div className="flex items-center justify-between"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.assetCardKicker}</p><span className="rounded-full border border-[#64C98D]/25 bg-[#64C98D]/10 px-3 py-1.5 text-[10px] font-bold text-[#86D9A7]">{t.assetStatus}</span></div>
              <div className="mt-8 flex items-center gap-4"><div className="relative size-20 overflow-hidden rounded-full ring-2 ring-[#F2A4C5]/30"><Image src="/images/emma-avatar.png" alt="Emma" fill sizes="80px" className="object-cover"/></div><div><h3 className="text-3xl font-semibold tracking-[-.04em]">Emma</h3><p className="mt-1 text-sm text-[#BEB4A8]">{t.assetRole}</p></div></div>
              <dl className="mt-9 divide-y divide-white/10 border-y border-white/10">{t.assetKeeps.map(([label,value])=><div key={label} className="grid grid-cols-[1fr_auto] gap-4 py-4"><dt className="text-xs text-[#AFA397]">{label}</dt><dd className="text-xs font-bold text-white">{value}</dd></div>)}</dl>
              <div className="mt-auto pt-8"><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.handoverLabel}</p><div className="mt-4 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-white/15"><UserRound className="size-5 text-[#AFA397]"/></span><ArrowRight className="size-4 text-[#F2A4C5]"/><span className="flex size-10 items-center justify-center rounded-full bg-[#D10E63]"><UserRound className="size-5"/></span><p className="ml-2 text-xs font-semibold text-[#D8D0C5]">{t.handoverBody}</p></div></div>
            </div>
            <div className="bg-[#FAF8F3]">
              {t.assetPoints.map((point, index) => <div key={point.title} className={`grid gap-4 p-6 sm:grid-cols-[3rem_1fr] sm:p-8 ${index > 0 ? 'border-t border-[#CFC5B5]' : ''}`}><span className="font-mono text-[10px] font-black text-[#B00C54]">0{index + 1}</span><div><h3 className="text-xl font-semibold tracking-[-.03em]">{point.title}</h3><p className="mt-2 text-sm leading-7 text-[#625B50]">{point.body}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#D10E63] py-16 text-white sm:py-24">
        <div aria-hidden className="absolute -right-24 -top-32 size-[32rem] rounded-full border border-white/15" />
        <div aria-hidden className="absolute -right-8 -top-12 size-64 rounded-full border border-white/10" />
        <div className="editorial-shell relative grid gap-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div>
            <div className="flex items-center gap-4"><Image src="/alma-avatar.png" alt="" width={56} height={56} className="size-14 rounded-full object-cover ring-2 ring-white/30"/><div><p className="text-lg font-bold">Alma</p><p className="text-xs font-semibold text-white/70">{t.almaRole}</p></div></div>
            <h2 className="mt-8 max-w-4xl text-balance text-[clamp(2.25rem,4.5vw,4.4rem)] font-semibold leading-[.94] tracking-[-.055em]">{t.almaTitle}</h2>
            <p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/80">{t.almaBody}</p>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-white/15 bg-[#191715] shadow-[0_34px_80px_-38px_rgba(25,23,21,.75)]">
            <div className="border-b border-white/10 p-6 sm:p-7"><p className="font-mono text-[9px] font-black uppercase tracking-[.17em] text-[#F2A4C5]">{t.almaCardKicker}</p><h3 className="mt-3 text-2xl font-semibold tracking-[-.04em]">{t.almaCardTitle}</h3></div>
            <ol className="grid sm:grid-cols-2">{t.almaPrepares.map((item,index)=><li key={item} className={`flex min-h-28 gap-4 p-5 sm:p-6 ${index > 0 ? 'border-t border-white/10 sm:[&:nth-child(2)]:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-l sm:border-white/10' : ''} ${index >= 2 ? 'sm:border-t' : ''}`}><span className="font-mono text-[9px] font-black text-[#F2A4C5]">0{index+1}</span><p className="text-sm font-semibold leading-6 text-[#E7E0D5]">{item}</p></li>)}</ol>
            <div className="border-t border-white/10 p-6 sm:p-7"><p className="text-sm font-bold leading-6">{t.almaRule}</p><div className="mt-6 flex flex-col gap-3"><Link href="/decouvrir?source=collaborateurs-ia" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#F3EFE6] px-7 text-sm font-bold text-[#191715] transition hover:bg-white">{t.almaCta}<ArrowRight className="size-4"/></Link><Link href="/marketplace" className="text-center text-sm font-bold text-[#F2A4C5] underline decoration-white/25 underline-offset-4">{t.marketCta}</Link></div><p className="mt-5 text-center text-xs font-semibold text-white/60">{t.reassurance} · <span className="whitespace-nowrap"><AlmaInline className="mr-1 ring-white/30" />{t.almaGuidance}</span></p></div>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeading({ kicker, title, body, dark = false }: { kicker: string; title: string; body: string; dark?: boolean }) {
  return <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-12"><div><p className={`font-mono text-[10px] font-black uppercase tracking-[.18em] ${dark ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}>{kicker}</p><h2 className="mt-5 max-w-3xl text-balance text-[clamp(2.1rem,4.2vw,4.1rem)] font-semibold leading-[.94] tracking-[-.055em]">{title}</h2></div><p className={`max-w-xl text-[16px] leading-8 ${dark ? 'text-[#CFC6B8]' : 'text-[#514A42]'}`}>{body}</p></div>
}

function ResourceFact({ icon: Icon, title, body, border = false }: { icon: LucideIcon; title: string; body: string; border?: boolean }) {
  return <div className={`border-t border-[#CFC5B5] p-6 sm:p-7 lg:border-t-0 ${border ? 'lg:border-l' : ''}`}><Icon className="size-5 text-[#B00C54]"/><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p></div>
}

const COPY = {
  fr: {
    eyebrow: 'Collaborateurs IA', heroTitle: 'Un Collaborateur IA rejoint votre équipe.', heroAccent: 'Ses capacités évoluent avec votre entreprise.', heroBody: 'Il possède une identité, une mémoire et un rôle définis par votre entreprise. Il travaille avec vos équipes dans un espace partagé et utilise uniquement les ressources que vous lui attribuez.',
    heroProofs: ['Rattaché à votre organisation', 'Profils métier et compétences', 'Connexion à plus de 3 000 apps', 'Accès aux meilleurs modèles d’IA', 'Mémoire sous votre contrôle', 'Un serveur privé par Collaborateur'], heroCardKicker: 'Votre organisation', heroCardTitle: 'Une équipe humaine et IA', heroCardTeam: 'Collaborateurs connectés', heroCardTeamBody: 'Une identité et un rôle pour chacun', heroCardRule: 'Vous choisissez leurs responsabilités, leurs accès et les décisions qui restent humaines.', start: 'Commencer avec Alma', understand: 'Voir comment ça marche', reassurance: 'Première mission gratuite · Sans carte bancaire', almaGuidance: 'Personnalisation guidée par Alma',
    foundationKicker: 'Infrastructure Hermes', foundationTitle: 'Propulsé par Hermes. Opéré par Unitalk.', foundationBody: 'Chaque Collaborateur IA repose sur une instance dédiée de Hermes, l’agent autonome open source. Unitalk l’héberge, le maintient et lui apporte l’identité, la mémoire, les connexions et l’espace nécessaires pour travailler avec vos équipes.', foundationCta: 'Découvrir l’infrastructure Hermes de Unitalk',
    placeKicker: 'Une place claire dans l’organisation', placeTitle: 'Choisissez avec qui il travaille.', placeBody: 'Rattachez chaque Collaborateur IA au bon niveau de l’entreprise. Ce choix organise sa collaboration sans lui ouvrir automatiquement l’accès aux données ou aux outils.', placements: ['Une personne', 'Une équipe', 'Un département', 'Toute l’entreprise'], placementDescriptions: ['Un responsable direct lui confie et suit ses missions.','Il collabore avec les membres d’un même collectif.','Il intervient au service d’une fonction de l’entreprise.','Il contribue à des missions transverses selon ses droits.'], placementRuleLabel: 'Deux choix séparés', placementRule: 'Le rattachement définit avec qui il travaille. Les autorisations définissent ce qu’il peut voir et faire.', privateMemory: 'Sa mémoire propre', privateMemoryBody: 'Méthodes, expérience et corrections validées restent disponibles entre ses missions.', sharedKnowledge: 'Les savoirs partagés', sharedKnowledgeBody: 'Il consulte uniquement les documents et informations que l’entreprise lui ouvre.', communication: 'Ses moyens de communication', communicationBody: 'Email, calendrier, messagerie et espace Unitalk selon les canaux autorisés.', sovereignty: 'Son serveur IA', sovereigntyBody: 'Chaque instance Hermes dispose de son propre serveur dans Unitalk AI Cloud.',
    marketKicker: 'Un Store ouvert à la communauté', marketTitle: 'Tout ce dont il a besoin, au même endroit.', marketBody: 'Ajoutez simplement des profils métier, des compétences et des applications créés par Unitalk ou proposés par la communauté, sans recréer son identité.',
    marketItems: {
      collaborators: { eyebrow: 'Identités', title: 'Collaborateurs IA', body: 'Choisissez le Collaborateur qui rejoindra votre organisation.' },
      profiles: { eyebrow: 'Responsabilités', title: 'Profils métier', body: 'Ajoutez les rôles dont votre entreprise a besoin.' },
      skills: { eyebrow: 'Savoir-faire', title: 'Compétences', body: 'Attribuez des méthodes précises et réutilisables.' },
      apps: { eyebrow: '3 000+ connexions', title: 'Applications', body: 'Reliez-le aux outils dans lesquels vos équipes travaillent déjà.' },
      models: { eyebrow: 'Selon la mission', title: 'Modèles d’IA', body: 'Donnez-lui accès aux principaux modèles autorisés par votre entreprise.' },
      servers: { eyebrow: 'Ressources dédiées', title: 'Serveurs IA', body: 'Choisissez des ressources partagées ou un serveur privé.' },
    },
    marketNote: 'Le principe', marketConclusion: 'Vous ne choisissez pas seulement une intelligence artificielle. Vous équipez un Collaborateur pour accomplir ses missions.',
    assetKicker: 'Un capital opérationnel durable', assetTitle: 'Votre Collaborateur reste. Son expérience aussi.', assetBody: 'Il appartient à l’entreprise, pas à la personne qui le supervise. Quand les équipes changent, son identité, ses méthodes et la mémoire que vous avez choisi de conserver restent disponibles.', assetCardKicker: 'Propriété de votre entreprise', assetStatus: 'Actif', assetRole: 'Collaboratrice IA · Votre entreprise', assetKeeps: [['Identité professionnelle','Conservée'],['Mémoire autorisée','Conservée'],['Méthodes validées','Conservées']], handoverLabel: 'Changement de responsable', handoverBody: 'Supervision transférée, continuité préservée',
    assetPoints: [
      { title: 'Réattribuez sa supervision', body: 'Lorsqu’une personne quitte l’entreprise, ses accès sont supprimés et un nouveau responsable prend le relais.' },
      { title: 'Conservez ce qui a été appris', body: 'Les méthodes validées, l’historique utile et la mémoire choisie par l’entreprise restent attachés au Collaborateur.' },
      { title: 'Faites évoluer ses responsabilités', body: 'Ajoutez de nouveaux profils, compétences et outils sans recréer son identité ni perdre son expérience.' },
    ],
    almaRole: 'Coordinatrice de missions IA', almaTitle: 'Partez d’une mission. Alma prépare le Collaborateur adapté.', almaBody: 'Décrivez le résultat que vous attendez. Alma transforme ce besoin en un cadre de travail clair et prépare le Collaborateur qui rejoindra votre équipe.', almaCardKicker: 'Préparation guidée', almaCardTitle: 'Alma prépare avec vous', almaPrepares: ['Sa place et ses responsabilités dans l’organisation', 'Les connaissances, compétences et applications utiles', 'Les accès et les décisions qui restent sous contrôle humain', 'Le serveur et l’hébergement adaptés à vos exigences'], almaRule: 'Alma prépare et coordonne. Le Collaborateur accomplit la mission. Votre équipe garde la décision.', almaCta: 'Décrire ma première mission', marketCta: 'Explorer la Marketplace',
  },
  en: {
    eyebrow: 'AI Collaborators', heroTitle: 'An AI Collaborator joins your team.', heroAccent: 'Its capabilities evolve with your organization.', heroBody: 'It has an identity, memory and role defined by your organization. It works with your teams in a shared space and only uses the resources you assign to it.',
    heroProofs: ['Placed within your organization', 'Job profiles and skills', 'Connects to 3,000+ apps', 'Access to the best AI models', 'Memory under your control', 'One private server per Collaborator'], heroCardKicker: 'Your organization', heroCardTitle: 'A human and AI team', heroCardTeam: 'Connected Collaborators', heroCardTeamBody: 'An identity and role for each', heroCardRule: 'You choose their responsibilities, access and the decisions that remain human.', start: 'Start with Alma', understand: 'See how it works', reassurance: 'First mission free · No card', almaGuidance: 'Personalized with Alma',
    foundationKicker: 'Hermes infrastructure', foundationTitle: 'Powered by Hermes. Operated by Unitalk.', foundationBody: 'Every AI Collaborator runs on a dedicated Hermes instance, the open-source autonomous agent. Unitalk hosts and maintains it, then adds the identity, memory, connections and workspace it needs to work with your teams.', foundationCta: 'Discover Unitalk’s Hermes infrastructure',
    placeKicker: 'A clear place in the organization', placeTitle: 'Choose who it works with.', placeBody: 'Place each AI Collaborator at the right level of the organization. This organizes collaboration without automatically granting access to data or tools.', placements: ['One person', 'A team', 'A department', 'The whole organization'], placementDescriptions: ['A direct manager assigns and follows its missions.','It collaborates with the members of one team.','It supports a business function across the organization.','It contributes to cross-functional missions under its permissions.'], placementRuleLabel: 'Two separate choices', placementRule: 'Placement defines who it works with. Permissions define what it can see and do.', privateMemory: 'Its own memory', privateMemoryBody: 'Methods, experience and approved corrections remain available across missions.', sharedKnowledge: 'Shared knowledge', sharedKnowledgeBody: 'It only accesses documents and information the organization opens to it.', communication: 'Its communication tools', communicationBody: 'Email, calendar, messaging and Unitalk workspace through approved channels.', sovereignty: 'Its AI server', sovereigntyBody: 'Each Hermes instance has its own server in Unitalk AI Cloud.',
    marketKicker: 'A Store open to the community', marketTitle: 'Everything it needs, in one place.', marketBody: 'Simply add job profiles, skills and applications created by Unitalk or contributed by the community, without recreating its identity.',
    marketItems: {
      collaborators: { eyebrow: 'Identities', title: 'AI Collaborators', body: 'Choose the Collaborator that will join your organization.' },
      profiles: { eyebrow: 'Responsibilities', title: 'Job profiles', body: 'Add the roles your organization needs.' },
      skills: { eyebrow: 'Know-how', title: 'Skills', body: 'Assign precise, reusable methods.' },
      apps: { eyebrow: '3,000+ connections', title: 'Applications', body: 'Connect it to the tools your teams already use.' },
      models: { eyebrow: 'For each mission', title: 'AI models', body: 'Give it access to leading models approved by your organization.' },
      servers: { eyebrow: 'Dedicated resources', title: 'AI servers', body: 'Choose shared resources or a private server.' },
    },
    marketNote: 'The principle', marketConclusion: 'You are not merely choosing artificial intelligence. You are equipping a Collaborator to carry out its missions.',
    assetKicker: 'Lasting operational capital', assetTitle: 'Your Collaborator stays. So does its experience.', assetBody: 'It belongs to the organization, not the person supervising it. When teams change, its identity, methods and the memory you choose to retain remain available.', assetCardKicker: 'Owned by your organization', assetStatus: 'Active', assetRole: 'AI Collaborator · Your organization', assetKeeps: [['Professional identity','Retained'],['Authorized memory','Retained'],['Approved methods','Retained']], handoverLabel: 'Manager change', handoverBody: 'Supervision transferred, continuity preserved',
    assetPoints: [
      { title: 'Reassign its supervision', body: 'When someone leaves the organization, their access is removed and a new manager takes over.' },
      { title: 'Retain what has been learned', body: 'Approved methods, useful history and organization-selected memory stay attached to the Collaborator.' },
      { title: 'Evolve its responsibilities', body: 'Add new profiles, skills and tools without recreating its identity or losing its experience.' },
    ],
    almaRole: 'AI mission coordinator', almaTitle: 'Start with a mission. Alma prepares the right Collaborator.', almaBody: 'Describe the outcome you expect. Alma turns that need into a clear working framework and prepares the Collaborator who will join your team.', almaCardKicker: 'Guided preparation', almaCardTitle: 'Alma prepares it with you', almaPrepares: ['Its place and responsibilities in the organization', 'The useful knowledge, skills and applications', 'Access and decisions that remain under human control', 'The server and hosting suited to your requirements'], almaRule: 'Alma prepares and coordinates. The Collaborator carries out the mission. Your team keeps the decision.', almaCta: 'Describe my first mission', marketCta: 'Explore the Marketplace',
  },
} as const
