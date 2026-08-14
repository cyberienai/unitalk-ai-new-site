'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, CircleCheck, FolderOpen, Globe2, ShieldCheck, SquareTerminal, TimerReset } from 'lucide-react'
import { useLanguage, type Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

type FormatKey = 'text' | 'image' | 'audio' | 'video' | 'code'
type IdentityIndex = 0 | 1 | 2

const FORMAT_KEYS: FormatKey[] = ['text', 'image', 'audio', 'video', 'code']

export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <main className="font-sf">
      <section className="relative overflow-hidden px-5 pb-12 pt-[8.25rem] sm:px-8 sm:pb-16 sm:pt-[9rem]">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="editorial-shell relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="max-w-xl">
            <Kicker>{t.heroKicker}</Kicker>
            <h1 className="hero-heading mt-5 whitespace-pre-line [font-size:42px] sm:[font-size:50.4px]">{t.heroTitle}</h1>
            <p className="mt-6 text-[17px] leading-8 text-[#4E483F]">{t.heroBody}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.heroBenefits.map((benefit) => <li key={benefit} className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-[#3F3A33]"><CircleCheck className="mt-0.5 size-4 shrink-0 text-[#D10E63]" />{benefit}</li>)}
            </ul>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link href="/decouvrir?source=collaborateur-ia-hero" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(209,14,99,0.55)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 sm:w-auto">
                <span className="text-center leading-tight">
                  <span className="block">{t.heroCta}</span>
                  <span className="block">{t.heroCtaAlma}</span>
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a href="#demonstration" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-4 hover:text-[#B00C54]">
                {t.seeWork} <ChevronDown className="size-4" />
              </a>
            </div>
            <p className="mt-4 text-xs font-semibold text-[#6E665A]">{t.trial}</p>
          </div>
          <LucasMissionCard lang={lang} />
        </div>
      </section>

      <section aria-label={t.reassuranceLabel} className="border-y border-[#DCD4C4] bg-[#EAE3D4] px-5 sm:px-8">
        <div className="editorial-shell grid divide-y divide-[#D2C8B8] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {t.reassurances.map((item) => <div key={item.title} className="py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"><p className="text-sm font-bold text-[#1C1A17]">{item.title}</p><p className="mt-1 text-xs leading-5 text-[#625B50]">{item.body}</p></div>)}
        </div>
      </section>

      <section id="demonstration" className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <SectionHeading eyebrow={t.startKicker} title={t.startTitle} body={t.startBody} />
            <ol className="grid gap-3 sm:grid-cols-3">
              {t.startSteps.map((step, index) => <li key={step.title} className="rounded-2xl border border-[#DCD4C4] bg-[#FBF9F3] p-5"><span className="font-mono text-[10px] font-black tracking-[0.16em] text-[#B00C54]">0{index + 1}</span><h2 className="mt-4 text-base font-bold">{step.title}</h2><p className="mt-2 text-sm leading-6 text-[#625B50]">{step.body}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section id="formats" className="border-y border-[#DCD4C4] bg-[#FBF9F3] px-5 py-16 sm:px-8">
        <div className="editorial-shell">
          <SectionHeading eyebrow={t.formatsKicker} title={t.formatsTitle} body={t.formatsBody} />
          <FormatTabs lang={lang} />
          <ConversionBand lang={lang} source="formats" />
        </div>
      </section>

      <section className="bg-[#181615] px-5 py-16 text-[#FBF9F3] sm:px-8">
        <div className="editorial-shell">
          <SectionHeading dark eyebrow={t.workKicker} title={t.workTitle} body={t.workBody} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {t.workItems.map((item, index) => {
              const Icon = [Globe2, FolderOpen, SquareTerminal, TimerReset][index]
              return <div key={item.title} className="bg-[#211E1B] p-6"><Icon className="size-5 text-[#F2A4C5]" /><h3 className="mt-8 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#CFC6B8]">{item.body}</p></div>
            })}
          </div>
          <p className="mt-6 text-sm font-semibold text-[#E7E0D5]">{t.hermes}</p>

          <div className="mt-16 border-t border-white/15 pt-12">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#F2A4C5]">{t.appsKicker}</p>
            <h2 className="mt-4 max-w-3xl text-balance text-[32px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[42px]">{t.appsTitle}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {t.appTypes.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#F2A4C5]">{item.title}</h3><p className="mt-4 text-sm leading-7 text-[#CFC6B8]">{item.body}</p></div>)}
            </div>
            <div className="mt-8 flex gap-4 rounded-2xl border border-[#D10E63]/40 bg-[#D10E63]/10 p-5"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#F2A4C5]" /><p className="text-sm font-semibold leading-7">{t.permissionRule}</p></div>
            <div className="mt-10 grid gap-3 text-sm md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <ArchitectureItem label={t.architecture.collaboratorLabel} value={t.architecture.collaboratorValue} />
              <ArrowRight aria-hidden className="hidden size-4 text-[#F2A4C5] md:block" />
              <ArchitectureItem label={t.architecture.serverLabel} value={t.architecture.serverValue} />
              <ArrowRight aria-hidden className="hidden size-4 text-[#F2A4C5] md:block" />
              <ArchitectureItem label={t.architecture.accessLabel} value={t.architecture.accessValue} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.identityKicker}</p>
            <h2 className="mt-5 max-w-xl text-balance text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[44px]">{t.identityTitle}</h2>
            <p className="mt-5 max-w-xl text-[16px] leading-8 text-[#4E483F]">{t.identityBody}</p>
          </div>
          <div className="rounded-3xl border border-[#DCD4C4] bg-[#FBF9F3] p-6 sm:p-8">
            <div className="flex items-center gap-4 border-b border-[#DCD4C4] pb-6">
              <Image src="/images/lucas-avatar.png" alt="" width={56} height={56} className="size-14 rounded-full object-cover" />
              <div><p className="text-xl font-semibold">Lucas</p><p className="mt-1 text-sm text-[#6E665A]">{t.lucasMeta}</p></div>
            </div>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <IdentityList label={t.profilesLabel} items={t.profiles} />
              <IdentityList label={t.experienceLabel} items={t.experience} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#181615] px-5 py-16 text-[#FBF9F3] sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#F2A4C5]">{t.finalKicker}</p>
            <h2 className="mt-5 text-balance text-[36px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[48px]">{t.finalTitle}</h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#CFC6B8]">{t.finalBody}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#E7E0D5]">{t.finalProofs.map((proof) => <li key={proof} className="flex items-center gap-2"><Check className="size-4 text-[#F2A4C5]" />{proof}</li>)}</ul>
          </div>
          <div className="flex min-w-[260px] flex-col items-stretch gap-3">
            <Link href="/decouvrir?source=collaborateur-ia-final" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181615]">
              {t.finalCta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/missions" className="text-center text-sm font-bold text-[#E7E0D5] underline decoration-[#F2A4C5]/40 underline-offset-4 hover:text-white">{t.exploreMissions}</Link>
            <Link href="/tarifs" className="text-center text-xs font-semibold text-[#AFA397] hover:text-white">{t.pricing}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function ConversionBand({ lang, source }: { lang: Lang; source: string }) {
  const t = COPY[lang]
  return <div className="mt-12 flex flex-col justify-between gap-6 rounded-3xl bg-[#EAE3D4] p-6 sm:flex-row sm:items-center sm:p-8"><div><p className="text-xl font-bold tracking-[-0.02em]">{t.midCtaTitle}</p><p className="mt-2 max-w-2xl text-sm leading-6 text-[#625B50]">{t.midCtaBody}</p></div><Link href={`/decouvrir?source=collaborateur-ia-${source}`} className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{t.midCta}<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Link></div>
}

function LucasMissionCard({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const reduce = useReducedMotion()
  const [active, setActive] = useState<IdentityIndex>(0)
  const identities = t.heroIdentities

  useEffect(() => {
    if (reduce) return
    const timer = window.setTimeout(() => setActive((current) => ((current + 1) % identities.length) as IdentityIndex), 4800)
    return () => window.clearTimeout(timer)
  }, [active, identities.length, reduce])

  const identity = identities[active]
  return <div className="mx-auto w-full max-w-[480px]"><div className="overflow-hidden rounded-3xl border border-[#DCD4C4] bg-[#FBF9F3] shadow-[0_28px_65px_-48px_rgba(28,26,23,0.5)]"><AnimatePresence mode="wait" initial={false}><motion.div key={identity.name} initial={reduce ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }} transition={{ duration: reduce ? 0 : 0.3 }}><div className="grid grid-cols-[112px_1fr] items-stretch sm:grid-cols-[150px_1fr]"><div className="relative min-h-44 bg-[#ECE6DA]"><Image src={identity.avatar} alt={`${lang === 'fr' ? 'Portrait de' : 'Portrait of'} ${identity.name}, ${lang === 'fr' ? 'Collaborateur IA' : 'AI Collaborator'}`} fill priority={active === 0} sizes="150px" className="object-cover object-top" /></div><div className="p-5"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{t.aiIdentity}</p><h2 className="mt-3 text-2xl font-semibold">{identity.name}</h2><p className="mt-1 text-sm text-[#6E665A]">{identity.meta}</p></div></div><div className="grid gap-px border-t border-[#DCD4C4] bg-[#DCD4C4] sm:grid-cols-2"><MissionFact label={t.currentMission} value={identity.mission} /><MissionFact label={t.profilesLabel} value={identity.profiles.join(' · ')} /><MissionFact label={t.permissionsLabel} value={identity.permissions.join('\n')} /><MissionFact label={t.stateLabel} value={identity.state} accent /></div></motion.div></AnimatePresence></div><div role="tablist" aria-label={t.identitySelector} className="mt-4 flex justify-center gap-2">{identities.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={active === index} aria-label={`${t.showIdentity} ${item.name}`} onClick={() => setActive(index as IdentityIndex)} className={`h-2 rounded-full outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${active === index ? 'w-8 bg-[#D10E63]' : 'w-2 bg-[#BDB3A1] hover:bg-[#857C6E]'}`} />)}</div></div>
}

function MissionFact({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="bg-[#FBF9F3] p-5"><p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#857C6E]">{label}</p><p className={`mt-3 whitespace-pre-line text-sm font-semibold leading-6 ${accent ? 'text-[#257A43]' : ''}`}>{value}</p></div>
}

function FormatTabs({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [active, setActive] = useState<FormatKey>('text')
  const refs = useRef<Record<FormatKey, HTMLButtonElement | null>>({ text: null, image: null, audio: null, video: null, code: null })
  const item = t.formats[active]

  function selectByKeyboard(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % FORMAT_KEYS.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + FORMAT_KEYS.length) % FORMAT_KEYS.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = FORMAT_KEYS.length - 1
    else return
    event.preventDefault()
    const key = FORMAT_KEYS[next]
    setActive(key)
    refs.current[key]?.focus()
  }

  return <div className="mt-12"><div role="tablist" aria-label={t.formatsTabLabel} className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">{FORMAT_KEYS.map((key, index) => <button key={key} ref={(node) => { refs.current[key] = node }} id={`format-tab-${key}`} type="button" role="tab" aria-selected={active === key} aria-controls={`format-panel-${key}`} tabIndex={active === key ? 0 : -1} onClick={() => setActive(key)} onKeyDown={(event) => selectByKeyboard(event, index)} className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${active === key ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white text-[#4E483F] hover:border-[#D10E63]/50'}`}>{t.formatLabels[key]}</button>)}</div><div id={`format-panel-${active}`} role="tabpanel" aria-labelledby={`format-tab-${active}`} tabIndex={0} className="mt-6 rounded-3xl border border-[#DCD4C4] bg-[#F3EFE6] p-6 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] sm:p-8"><div className="grid gap-8 lg:grid-cols-3">{(['request', 'work', 'result'] as const).map((field, index) => <div key={field} className={index ? 'border-t border-[#DCD4C4] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0' : ''}><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.flowLabels[field]}</p><p className="mt-4 whitespace-pre-line text-[16px] font-semibold leading-7">{item[field]}</p></div>)}</div>{'note' in item && <p className="mt-8 border-l-2 border-[#D10E63] pl-5 text-sm leading-7 text-[#4E483F]">{item.note}</p>}</div></div>
}

function SectionHeading({ eyebrow, title, body, dark = false }: { eyebrow: string; title: string; body: string; dark?: boolean }) {
  return <div className="max-w-4xl"><p className={`font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}>{eyebrow}</p><h2 className={`mt-5 text-balance text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[44px] ${dark ? 'text-white' : ''}`}>{title}</h2><p className={`mt-5 max-w-3xl text-[16px] leading-8 ${dark ? 'text-[#CFC6B8]' : 'text-[#4E483F]'}`}>{body}</p></div>
}

function ArchitectureItem({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#F2A4C5]">{label}</p><p className="mt-3 leading-6 text-[#E7E0D5]">{value}</p></div>
}

function IdentityList({ label, items }: { label: string; items: readonly string[] }) {
  return <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#857C6E]">{label}</p><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6"><Check className="mt-1 size-4 shrink-0 text-[#D10E63]" />{item}</li>)}</ul></div>
}

const COPY = {
  fr: {
    heroKicker: 'Collaborateur IA pour entreprise', heroTitle: 'Son identité IA reste la même.\nSes responsabilités évoluent.', heroBody: 'Confiez enfin le travail répétitif à un Collaborateur IA qui connaît votre entreprise, agit dans vos outils et demande votre validation lorsque la décision vous appartient.', heroBenefits: ['Travaille avec vos applications', 'Conserve le contexte validé', 'Disponible pour vos missions récurrentes', 'Actions sensibles sous votre contrôle'], heroCta: 'Démarrer gratuitement', heroCtaAlma: 'avec Alma', seeWork: 'Voir une mission en action', trial: '7 jours gratuits · Sans carte bancaire · À partir de 74 €/mois après l’essai',
    reassuranceLabel: 'Garanties de l’offre', reassurances: [{ title: 'Vous commencez par un besoin réel', body: 'Alma transforme votre besoin en mission cadrée.' }, { title: 'Vous gardez le contrôle', body: 'Les accès et validations sont définis avant l’activation.' }, { title: 'Son expérience ne repart pas de zéro', body: 'Le contexte validé reste attaché à son identité IA.' }],
    startKicker: 'Simple à démarrer', startTitle: 'Tout commence par une mission.', startBody: 'Pas besoin de lancer un projet informatique. Décrivez le résultat attendu : Alma vous aide à cadrer le travail et à préparer le bon Collaborateur IA.', startSteps: [{ title: 'Décrivez le travail', body: 'Expliquez ce que vous voulez déléguer avec vos propres mots.' }, { title: 'Validez le cadre', body: 'Résultat, sources, applications, droits et validations.' }, { title: 'Mettez-le au travail', body: 'Le Collaborateur IA exécute et vous rend le résultat.' }],
    aiIdentity: 'Identité IA', lucasMeta: 'Collaborateur IA · Solvea', currentMission: 'Mission en cours', mission: 'Répondre aux demandes reçues par email', profilesLabel: 'Profils métier', profiles: ['Relation client', 'Commercial', 'Fidélisation'], permissionsLabel: 'Autorisations de cette mission', permissions: ['Lire les demandes reçues', 'Préparer une réponse', 'Soumettre avant envoi'], stateLabel: 'État', state: '3 réponses prêtes à valider',
    identitySelector: 'Exemples de Collaborateurs IA', showIdentity: 'Afficher', heroIdentities: [
      { name: 'Lucas', avatar: '/images/lucas-avatar.png', meta: 'Collaborateur IA · Solvea', mission: 'Répondre aux demandes reçues par email', profiles: ['Relation client', 'Commercial', 'Fidélisation'], permissions: ['Lire les demandes reçues', 'Préparer une réponse', 'Soumettre avant envoi'], state: '3 réponses prêtes à valider' },
      { name: 'Emma', avatar: '/images/emma-avatar.png', meta: 'Collaboratrice IA · Solvea', mission: 'Préparer les réunions de direction', profiles: ['Assistante de direction', 'Organisation'], permissions: ['Lire l’agenda autorisé', 'Préparer les dossiers', 'Soumettre le compte rendu'], state: 'Réunion de 14 h préparée' },
      { name: 'Chloé', avatar: '/images/chloe-avatar.png', meta: 'Collaboratrice IA · Solvea', mission: 'Qualifier les nouveaux prospects', profiles: ['Commercial', 'Développement commercial'], permissions: ['Rechercher les entreprises', 'Enrichir les fiches', 'Proposer une qualification'], state: '12 prospects prêts à vérifier' },
    ],
    formatsKicker: 'Comprendre et produire', formatsTitle: 'Il comprend, produit et code dans le format utile à la mission.', formatsBody: 'Selon les modèles et les outils autorisés par votre entreprise, un même Collaborateur IA peut travailler avec du texte, des images, de l’audio, de la vidéo et du code, sans perdre le contexte de la mission.', formatsTabLabel: 'Formats de travail', formatLabels: { text: 'Texte', image: 'Image', audio: 'Audio', video: 'Vidéo', code: 'Code' }, flowLabels: { request: 'Demande', work: 'Travail', result: 'Résultat' },
    formats: {
      text: { request: 'Répondre à une demande client en tenant compte de son dossier.', work: 'Lire la demande, retrouver les informations autorisées et préparer une réponse conforme aux règles de l’entreprise.', result: 'Une réponse contextualisée, prête à relire et à valider.' },
      image: { request: 'Comparer deux versions d’un visuel produit.', work: 'Lire les éléments visibles, relever les écarts et, si un modèle autorisé le permet, préparer une variante.', result: 'Une comparaison documentée et un visuel exploitable si la génération est disponible.' },
      audio: { request: 'Transformer un enregistrement de réunion en décisions et actions.', work: 'Transcrire l’audio, distinguer les intervenants et rattacher chaque décision à son contexte.', result: 'Une transcription structurée, les décisions prises et les actions attribuées.' },
      video: { request: 'Préparer la publication d’une démonstration produit.', work: 'Analyser la vidéo, identifier les séquences utiles et préparer chapitres, résumé et sous-titres.', result: 'Une vidéo documentée, chapitrée et prête pour la validation éditoriale.' },
      code: { request: 'Réconcilier deux exports de ventes\net signaler les anomalies.', work: 'Écrire un script, le tester sur des données contrôlées et vérifier les écarts dans l’environnement isolé du Collaborateur IA.', result: 'Un fichier nettoyé, un rapport d’anomalies et une version du script conservée avec la mission.', note: 'Lorsque la mission le nécessite et que les droits le permettent, Code peut aussi servir à construire ou adapter une application métier vibecodée, testée et versionnée.' },
    },
    workKicker: 'Exécuter', workTitle: 'Il ne se contente pas de produire. Il agit avec les moyens autorisés.', workBody: 'Code désigne un format de production et un savoir-faire. Le Terminal est un moyen d’exécution disponible uniquement dans l’environnement isolé et selon les droits de la mission.', workItems: [{ title: 'Navigateur', body: 'Parcourir et utiliser les sites autorisés.' }, { title: 'Fichiers', body: 'Lire, produire et organiser les fichiers de la mission.' }, { title: 'Terminal', body: 'Exécuter et vérifier du code dans son environnement isolé.' }, { title: 'Planification', body: 'Reprendre un travail et continuer au-delà d’une conversation.' }], hermes: 'Propulsé par Hermes, l’agent autonome open source de Nous Research.',
    appsKicker: 'Applications et services', appsTitle: 'Les outils restent séparés des droits accordés au Collaborateur IA.', appTypes: [{ title: 'Connecteurs', body: 'Services externes autorisés par l’entreprise.' }, { title: 'Applications natives', body: 'Applications open source vérifiées et déployées sur le Serveur IA privé de l’entreprise.' }, { title: 'Applications métier', body: 'Applications privées ou modèles vibecodés pour soutenir une mission précise.' }], permissionRule: 'Installer une application ne donne aucun accès à un Collaborateur IA. Les droits sont accordés séparément.', architecture: { collaboratorLabel: 'Collaborateur IA', collaboratorValue: 'Environnement Hermes/VPS isolé', serverLabel: 'Serveur IA privé', serverValue: 'Applications et services de l’entreprise', accessLabel: 'Accès', accessValue: 'n8n, API, MCP ou navigateur selon les droits' },
    identityKicker: 'Une identité qui dure', identityTitle: 'Une seule identité IA. Plusieurs responsabilités.', identityBody: 'Les profils métier peuvent évoluer et l’expérience validée peut rester attachée à Lucas. Son identité, son rattachement et les règles de l’entreprise ne sont pas recréés à chaque mission.', experienceLabel: 'Expérience validée', experience: ['Politique de réponse client · version 3', 'Règles de qualification commerciale · version 2'],
    midCtaTitle: 'Quel travail voulez-vous ne plus avoir à faire seul ?', midCtaBody: 'Décrivez-le à Alma. Elle vous aide à cadrer la mission avant toute activation.', midCta: 'Décrire ma mission',
    finalKicker: 'Votre première mission', finalTitle: 'Montrez le travail. Alma prépare le Collaborateur IA.', finalBody: 'Commencez avec une mission concrète. Vous validez son périmètre, ses accès et les décisions qui doivent rester humaines.', finalProofs: ['7 jours gratuits', 'Sans carte bancaire', 'À partir de 74 €/mois'], finalCta: 'Démarrer gratuitement', exploreMissions: 'Ou explorer les missions', pricing: 'Consulter les tarifs détaillés',
  },
  en: {
    heroKicker: 'AI Collaborator for business', heroTitle: 'Its AI identity stays the same.\nIts responsibilities evolve.', heroBody: 'Finally hand repetitive work to an AI Collaborator that knows your company, acts in your tools and asks for approval whenever the decision belongs to you.', heroBenefits: ['Works with your applications', 'Keeps validated context', 'Available for recurring missions', 'Sensitive actions under your control'], heroCta: 'Start free', heroCtaAlma: 'with Alma', seeWork: 'See a mission in action', trial: '7 days free · No credit card · From €74/month after trial',
    reassuranceLabel: 'Offer guarantees', reassurances: [{ title: 'Start with real work', body: 'Alma turns your need into a scoped mission.' }, { title: 'You stay in control', body: 'Access and approvals are defined before activation.' }, { title: 'Experience does not reset', body: 'Validated context remains attached to its AI identity.' }],
    startKicker: 'Easy to start', startTitle: 'One first mission, not an IT project.', startBody: 'Describe the expected outcome. Alma helps scope the work and prepare the right AI Collaborator.', startSteps: [{ title: 'Describe the work', body: 'Explain what you want to delegate in your own words.' }, { title: 'Approve the scope', body: 'Outcome, sources, applications, permissions and approvals.' }, { title: 'Put it to work', body: 'The AI Collaborator executes and delivers the result.' }],
    aiIdentity: 'AI identity', lucasMeta: 'AI Collaborator · Solvea', currentMission: 'Current mission', mission: 'Answer requests received by email', profilesLabel: 'Job profiles', profiles: ['Customer relations', 'Sales', 'Customer success'], permissionsLabel: 'Permissions for this mission', permissions: ['Read received requests', 'Prepare a reply', 'Submit before sending'], stateLabel: 'Status', state: '3 replies ready for review',
    identitySelector: 'AI Collaborator examples', showIdentity: 'Show', heroIdentities: [
      { name: 'Lucas', avatar: '/images/lucas-avatar.png', meta: 'AI Collaborator · Solvea', mission: 'Answer requests received by email', profiles: ['Customer relations', 'Sales', 'Customer success'], permissions: ['Read received requests', 'Prepare a reply', 'Submit before sending'], state: '3 replies ready for review' },
      { name: 'Emma', avatar: '/images/emma-avatar.png', meta: 'AI Collaborator · Solvea', mission: 'Prepare executive meetings', profiles: ['Executive assistant', 'Organization'], permissions: ['Read authorized calendar', 'Prepare meeting files', 'Submit meeting notes'], state: '2 p.m. meeting prepared' },
      { name: 'Chloé', avatar: '/images/chloe-avatar.png', meta: 'AI Collaborator · Solvea', mission: 'Qualify new prospects', profiles: ['Sales', 'Business development'], permissions: ['Research companies', 'Enrich records', 'Suggest qualification'], state: '12 prospects ready for review' },
    ],
    formatsKicker: 'Understand and produce', formatsTitle: 'It understands, produces and codes in the format the mission needs.', formatsBody: 'Depending on the models and tools your company authorizes, one AI Collaborator can work with text, images, audio, video and code without losing the mission context.', formatsTabLabel: 'Work formats', formatLabels: { text: 'Text', image: 'Image', audio: 'Audio', video: 'Video', code: 'Code' }, flowLabels: { request: 'Request', work: 'Work', result: 'Result' },
    formats: {
      text: { request: 'Answer a customer request using its case context.', work: 'Read the request, retrieve authorized information and prepare a reply that follows company rules.', result: 'A contextual reply ready for review and approval.' },
      image: { request: 'Compare two versions of a product visual.', work: 'Read visible elements, identify differences and prepare a variant if an authorized model supports it.', result: 'A documented comparison and a usable visual when generation is available.' },
      audio: { request: 'Turn a meeting recording into decisions and actions.', work: 'Transcribe audio, distinguish speakers and connect every decision to its context.', result: 'A structured transcript, decisions and assigned actions.' },
      video: { request: 'Prepare a product demo for publication.', work: 'Analyze the video and prepare chapters, a summary and subtitles.', result: 'A documented, chaptered video ready for editorial review.' },
      code: { request: 'Reconcile two sales exports\nand flag anomalies.', work: 'Write a script, test it on controlled data and verify discrepancies in the AI Collaborator’s isolated environment.', result: 'A cleaned file, an anomaly report and a versioned script retained with the mission.', note: 'When the mission requires it and permissions allow it, Code can also build or adapt a vibe-coded business application that is tested and versioned.' },
    },
    workKicker: 'Execute', workTitle: 'It does not only produce. It acts with authorized means.', workBody: 'Code is a production format and skill. The Terminal is an execution method available only in the isolated environment and under mission permissions.', workItems: [{ title: 'Browser', body: 'Browse and use authorized websites.' }, { title: 'Files', body: 'Read, produce and organize mission files.' }, { title: 'Terminal', body: 'Run and verify code in its isolated environment.' }, { title: 'Scheduling', body: 'Resume work and continue beyond a conversation.' }], hermes: 'Powered by Hermes, the open-source autonomous agent from Nous Research.',
    appsKicker: 'Applications and services', appsTitle: 'Tools remain separate from the permissions granted to the AI Collaborator.', appTypes: [{ title: 'Connectors', body: 'External services authorized by the company.' }, { title: 'Native applications', body: 'Verified open-source applications deployed on the company’s private AI Server.' }, { title: 'Business applications', body: 'Private applications or vibe-coded templates supporting a specific mission.' }], permissionRule: 'Installing an application grants no access to an AI Collaborator. Permissions are granted separately.', architecture: { collaboratorLabel: 'AI Collaborator', collaboratorValue: 'Isolated Hermes/VPS environment', serverLabel: 'Private AI Server', serverValue: 'Company applications and services', accessLabel: 'Access', accessValue: 'n8n, API, MCP or browser according to permissions' },
    identityKicker: 'An identity that lasts', identityTitle: 'One AI identity. Several responsibilities.', identityBody: 'Job profiles can evolve and validated experience can remain attached to Lucas. Its identity, organization and company rules are not recreated for every mission.', experienceLabel: 'Validated experience', experience: ['Customer reply policy · version 3', 'Sales qualification rules · version 2'],
    midCtaTitle: 'What work do you no longer want to handle alone?', midCtaBody: 'Describe it to Alma. She helps scope the mission before anything is activated.', midCta: 'Describe my mission',
    finalKicker: 'Your first mission', finalTitle: 'Show the work. Alma prepares the AI Collaborator.', finalBody: 'Start with one concrete mission. You approve its scope, access and the decisions that must remain human.', finalProofs: ['7 days free', 'No credit card', 'From €74/month'], finalCta: 'Start free', exploreMissions: 'Or explore missions', pricing: 'View detailed pricing',
  },
} as const
