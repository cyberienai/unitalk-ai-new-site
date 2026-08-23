'use client'

import { LocalizedLink as Link } from '@/components/localized-link'
import Image from 'next/image'
import { useState } from 'react'
import { AlmaInline } from '@/components/alma-inline'
import { ArrowRight, Check, FileText, ShieldCheck } from 'lucide-react'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { getMission, relatedMissions, MISSION_CATEGORIES, getMissionCategoryHref } from '@/lib/missions-catalog'
import { MissionBreadcrumb } from '@/components/missions/mission-breadcrumb'
import { useLanguage, type Lang } from '@/lib/language-context'
import { collaboratorProfileHref, localizedHref, missionHref } from '@/lib/i18n-routing'
import { missionConversionCopy } from '@/lib/mission-conversion-copy'
import { missionFaq } from '@/lib/mission-detail-faq'

type Copy = {
  back: string
  objectiveWord: string
  stepsWord: string
  deliverableWord: string
  producesWord: string
  skillsWord: string
  toolsWord: string
  recommendedWord: string
  profileWord: string
  collaboratorWord: string
  aiBadge: string
  conditionsWord: string
  volumeWord: string
  deliveryWord: string
  deliveryValue: string
  cadenceWord: string
  keepLine: string
  seeProfile: string
  personalize: string
  relatedWord: string
  seeAll: string
  decisionTitle: string
  reassurance: string
  mobileCta: string
  proofLabel: string
  previewTitle: string
  faqTitle: string
  guideLabel: string
  trialLimit: string
  targetLabel: string
  targetPlaceholder: string
  zoneLabel: string
  volumeLabel: string
  optionalScope: string
  prospectCta: string
  prospectMobileCta: string
  prospectBenefit: (collaborator: string) => string
  methodTitle: string
  methodBody: (collaborator: string) => string
  prospectDecisionTitle: string
  prospectDecisionBody: (collaborator: string) => string
}

const T: Record<Lang, Copy> = {
  fr: {
    back: 'Toutes les missions',
    objectiveWord: 'Objectif',
    stepsWord: 'Comment elle se déroule',
    deliverableWord: 'Exemple de livrable',
    producesWord: 'Ce qu’elle produit',
    skillsWord: 'Savoir-faire mobilisés',
    toolsWord: 'Outils possibles',
    recommendedWord: 'Recommandé pour cette mission',
    profileWord: 'Profil',
    collaboratorWord: 'Collaborateur IA',
    aiBadge: 'IA',
    conditionsWord: 'Conditions',
    volumeWord: 'Volume',
    deliveryWord: 'Délai',
    deliveryValue: 'Confirmé après cadrage',
    cadenceWord: 'Rythme',
    keepLine: 'Confiez-lui cette mission aujourd’hui. Reconfiez-la-lui chaque fois que vous en avez besoin.',
    seeProfile: 'Voir le Collaborateur',
    personalize: 'Personnaliser avec Alma',
    relatedWord: 'Missions liées',
    seeAll: 'Voir toutes les missions',
    decisionTitle: 'Préparer cette mission', reassurance: 'Première mission offerte · Sans carte bancaire', mobileCta: 'Préparer avec Alma', proofLabel: 'Exemple illustratif', previewTitle: 'Aperçu d’une liste qualifiée', faqTitle: 'Questions fréquentes', guideLabel: 'Lire le guide complet de qualification', trialLimit: 'L’essai prend fin avec la mission, après 7 jours ou 1 million de tokens, selon la première limite atteinte.', targetLabel: 'Cible', targetPlaceholder: 'Ex. PME industrielles', zoneLabel: 'Zone', volumeLabel: 'Volume', optionalScope: '3 repères facultatifs pour ne pas repartir de zéro', prospectCta: 'Préparer ma première liste de prospects', prospectMobileCta: 'Préparer ma liste', prospectBenefit: (collaborator) => `${collaborator} prend en charge la recherche et la première qualification. Votre équipe se concentre sur la vérification et la prise de contact.`, methodTitle: 'Comment la qualification est établie', methodBody: (collaborator) => `${collaborator} vérifie l’adéquation avec votre cible, les signaux détectés, vos exclusions et la fraîcheur des sources. La qualification aide à prioriser la vérification ; elle ne déclenche jamais automatiquement une prise de contact.`, prospectDecisionTitle: 'Votre première liste', prospectDecisionBody: (collaborator) => `Donnez trois repères à Alma. Elle prépare ${collaborator} et vous aide à préciser le reste.`,
  },
  en: {
    back: 'All missions',
    objectiveWord: 'Objective',
    stepsWord: 'How it unfolds',
    deliverableWord: 'Example deliverable',
    producesWord: 'What it produces',
    skillsWord: 'Know-how mobilized',
    toolsWord: 'Possible tools',
    recommendedWord: 'Recommended for this mission',
    profileWord: 'Profile',
    collaboratorWord: 'AI Collaborator',
    aiBadge: 'AI',
    conditionsWord: 'Conditions',
    volumeWord: 'Volume',
    deliveryWord: 'Timeline',
    deliveryValue: 'Confirmed after scoping',
    cadenceWord: 'Cadence',
    keepLine: 'Hand it this mission today. Hand it back whenever you need it.',
    seeProfile: 'See the Collaborator',
    personalize: 'Customize with Alma',
    relatedWord: 'Related missions',
    seeAll: 'See all missions',
    decisionTitle: 'Prepare this mission', reassurance: 'First mission included · No credit card', mobileCta: 'Prepare with Alma', proofLabel: 'Illustrative example', previewTitle: 'Qualified list preview', faqTitle: 'Frequently asked questions', guideLabel: 'Read the full qualification guide', trialLimit: 'The trial ends with the mission, after 7 days or 1 million tokens, whichever comes first.', targetLabel: 'Target', targetPlaceholder: 'e.g. industrial SMBs', zoneLabel: 'Region', volumeLabel: 'Volume', optionalScope: '3 optional pointers so you do not start over', prospectCta: 'Prepare my first prospect list', prospectMobileCta: 'Prepare my list', prospectBenefit: (collaborator) => `${collaborator} handles research and initial qualification. Your team can focus on review and outreach.`, methodTitle: 'How qualification is determined', methodBody: (collaborator) => `${collaborator} checks fit with your target, detected signals, exclusions and source freshness. Qualification helps prioritize review; it never triggers outreach automatically.`, prospectDecisionTitle: 'Your first list', prospectDecisionBody: (collaborator) => `Give Alma three pointers. She prepares ${collaborator} and helps you define the rest.`,
  },
}

export function MissionDetailContent({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const t = T[lang]
  const mission = getMission(slug)
  const [target, setTarget] = useState('')
  const [zone, setZone] = useState('France')
  const [volume, setVolume] = useState('50')

  if (!mission) return null

  const collab = ROLE_DETAILS[mission.collaboratorSlug]
  const collaboratorName = collab?.name ?? (lang === 'fr' ? 'le Collaborateur IA' : 'the AI Collaborator')
  const category = MISSION_CATEGORIES.find((c) => c.key === mission.category)
  const related = relatedMissions(mission)
  const conversion = missionConversionCopy(mission.slug, lang)
  const conversionHref = `${localizedHref('discover', lang)}?mission=${mission.slug}&source=mission-detail`
  const faq = missionFaq(mission.slug, lang)
  const isProspectingMission = mission.slug === 'trouver-de-nouveaux-clients'
  const scopedConversionHref = isProspectingMission
    ? `${conversionHref}&${new URLSearchParams({ ...(target.trim() ? { cible: target.trim() } : {}), zone, volume }).toString()}`
    : conversionHref

  return (
    <main id="main-content" className="bg-[#F3EFE6] pb-20 lg:pb-0">
      {/* Hero */}
      <section className="border-b border-[#E4DDCE] px-5 pb-12 pt-28 sm:px-8 sm:pb-14 sm:pt-32">
        <div className="editorial-shell">
          <MissionBreadcrumb items={[{label:'Missions',href:localizedHref('missions', lang)},...(category?[{label:category.label[lang],href:lang === 'en' ? `${localizedHref('missions', lang)}?categorie=${category.key}` : getMissionCategoryHref(category)}]:[]),{label:mission.title[lang]}]} />
          <h1 className="mt-3 max-w-3xl text-balance font-sf text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[#1C1A17] sm:text-5xl">
            {mission.title[lang]}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[#5F594F] md:text-lg">{mission.description[lang]}</p>
           {isProspectingMission && collab && <Link href={collaboratorProfileHref(mission.collaboratorSlug, lang)} className="mt-6 flex w-fit max-w-2xl items-center gap-3 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-3 pr-5 outline-none transition-colors hover:border-[#D10E63]/40 focus-visible:ring-2 focus-visible:ring-[#D10E63]"><Image src={collab.avatar || '/placeholder.svg'} alt="" width={44} height={44} className="size-11 rounded-full object-cover"/><span><span className="block text-sm font-bold text-[#1C1A17]">{collab.name} · {mission.profile[lang]}</span><span className="mt-0.5 block text-xs leading-5 text-[#625B50]">{t.prospectBenefit(collab.name)}</span></span><ArrowRight className="size-4 shrink-0 text-[#B00C54]" /></Link>}
          {isProspectingMission && <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[#4E483F]"><li className="flex items-center gap-2"><Check className="size-4 text-[#D10E63]" />{lang === 'fr' ? 'Liste sourcée' : 'Sourced shortlist'}</li><li className="flex items-center gap-2"><ShieldCheck className="size-4 text-[#D10E63]" />{lang === 'fr' ? 'Validation avant contact' : 'Approval before outreach'}</li></ul>}
        </div>
      </section>

      {/* Body */}
      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* Left column */}
          <div className="flex flex-col gap-10">
            {/* Objective */}
            <section aria-labelledby="mission-objective-title">
              <h2 id="mission-objective-title" className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#6E665A]">{t.objectiveWord}</h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-[#1C1A17]">{mission.objective[lang]}</p>
            </section>

            {/* Steps */}
            <section aria-labelledby="mission-steps-title">
              <h2 id="mission-steps-title" className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#6E665A]">{t.stepsWord}</h2>
              <ol className="mt-4 flex flex-col gap-3">
                {mission.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 font-mono text-xs font-bold text-[#D10E63]">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-[#4E483F]">{s[lang]}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Deliverable */}
            <section aria-labelledby="mission-deliverable-title">
              <h2 id="mission-deliverable-title" className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#6E665A]">{t.deliverableWord}</h2>
              <div className="mt-4 flex items-start gap-3 rounded-3xl border border-[#D10E63]/20 bg-[#D10E63]/[0.045] p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D10E63]/10 text-[#D10E63]">
                  <FileText className="h-4 w-4" />
                </span>
                <p className="text-pretty text-sm leading-relaxed text-[#1C1A17]">{mission.deliverable[lang]}</p>
              </div>
              {isProspectingMission && <ProspectDeliverablePreview lang={lang} proofLabel={t.proofLabel} title={t.previewTitle} collaboratorName={collaboratorName} />}
              {mission.article && <Link href={mission.article.href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{isProspectingMission ? t.guideLabel : mission.article.label[lang]}<ArrowRight className="size-4" /></Link>}
            </section>

            {/* Produces */}
            {!isProspectingMission && <section aria-labelledby="mission-produces-title">
              <h2 id="mission-produces-title" className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#6E665A]">{t.producesWord}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {mission.produces.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 rounded-xl bg-[#FBF9F3] px-4 py-3 text-sm font-medium text-[#1C1A17]">
                    <Check className="h-4 w-4 shrink-0 text-[#22A06B]" strokeWidth={2.5} />
                    {p[lang]}
                  </li>
                ))}
              </ul>
            </section>}

            {/* Skills + tools */}
            {!isProspectingMission && <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.skillsWord}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mission.skills.map((s, i) => (
                    <span key={i} className="rounded-full border border-[#E4DDCE] bg-[#FBF9F3] px-3 py-1 text-xs font-medium text-[#4E483F]">
                      {s[lang]}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">{t.toolsWord}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mission.tools.map((tool) => (
                    <span key={tool} className="rounded-full bg-[#EDE7DA] px-3 py-1 text-xs font-medium text-[#4E483F]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>}
          </div>

          {/* Right column: a decision card focused on the mission outcome. */}
          <aside aria-labelledby="mission-decision-title" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-[#D8D0C2] bg-[#FBF9F3] p-6 shadow-[0_24px_60px_-48px_rgba(28,26,23,.5)]">
              <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{isProspectingMission ? `Alma + ${collaboratorName}` : t.recommendedWord}</p><h2 id="mission-decision-title" className="mt-2 font-sf text-2xl font-bold tracking-[-.035em] text-[#1C1A17]">{isProspectingMission ? t.prospectDecisionTitle : t.decisionTitle}</h2><p className="mt-2 text-sm leading-6 text-[#625B50]">{isProspectingMission ? t.prospectDecisionBody(collaboratorName) : conversion.summary}</p></div>
              <div className="mt-5 border-t border-[#E4DDCE] pt-5">
                {isProspectingMission && <fieldset><legend className="sr-only">{t.optionalScope}</legend><label className="block"><span className="text-xs font-bold text-[#4E483F]">{t.targetLabel}</span><input value={target} onChange={event => setTarget(event.target.value)} placeholder={t.targetPlaceholder} className="mt-1.5 h-11 w-full rounded-xl border border-[#D8D0C2] bg-white px-3 text-sm outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15"/></label><div className="mt-3 grid grid-cols-2 gap-3"><label><span className="text-xs font-bold text-[#4E483F]">{t.zoneLabel}</span><select value={zone} onChange={event => setZone(event.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-[#D8D0C2] bg-white px-3 text-sm outline-none focus:border-[#D10E63]"><option>France</option><option>Europe</option><option>International</option></select></label><label><span className="text-xs font-bold text-[#4E483F]">{t.volumeLabel}</span><select value={volume} onChange={event => setVolume(event.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-[#D8D0C2] bg-white px-3 text-sm outline-none focus:border-[#D10E63]"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100+">100+</option></select></label></div></fieldset>}
                {collab && !isProspectingMission && <Link href={collaboratorProfileHref(mission.collaboratorSlug, lang)} className="mt-4 flex min-h-14 items-center gap-3 border-t border-[#E4DDCE] pt-4 outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"><span className="relative size-10 shrink-0"><span className="relative block size-full overflow-hidden rounded-full"><Image src={collab.avatar || '/placeholder.svg'} alt="" fill className="object-cover" sizes="40px" /></span><span className="absolute -bottom-1 -right-1 rounded-full border-2 border-[#FBF9F3] bg-[#1C1A17] px-1.5 py-px text-[9px] font-bold text-white">{t.aiBadge}</span></span><div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-wide text-[#766D61]">{t.collaboratorWord} {lang === 'fr' ? 'recommandé' : 'recommended'}</p><p className="font-sf text-sm font-bold">{collab.name} · {mission.profile[lang]}</p></div><ArrowRight className="ml-auto size-4 shrink-0 text-[#857C6E]" /></Link>}
                <Link href={scopedConversionHref} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 text-center text-sm font-bold text-white outline-none transition-colors hover:bg-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{isProspectingMission ? t.prospectCta : (lang === 'fr' ? 'Continuer avec Alma' : 'Continue with Alma')}<ArrowRight className="size-4 shrink-0" /></Link>
                <p className="mt-3 text-center text-[11px] font-semibold text-[#625B50]">{t.reassurance}</p>
                <p className="mt-1.5 text-center text-[10px] leading-4 text-[#857C6E]">{t.trialLimit}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[#E4DDCE] px-5 py-14 sm:px-8 sm:py-16">
          <div className="editorial-shell">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-sf text-2xl font-bold tracking-[-0.02em] text-[#1C1A17]">{t.relatedWord}</h2>
              <Link
                href={localizedHref('missions', lang)}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#4E483F] underline-offset-4 transition-colors hover:text-[#D10E63] hover:underline"
              >
                {t.seeAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((m) => (
                <Link
                  key={m.slug}
                  href={missionHref(m.slug, lang)}
                  className="group flex flex-col rounded-3xl border border-[#E4DDCE] bg-[#FBF9F3] p-6 transition-all duration-300 hover:border-[#D10E63]/30 hover:shadow-[0_20px_50px_rgba(28,26,23,0.07)]"
                >
                  <h3 className="font-sf text-lg font-bold tracking-[-0.02em] text-[#1C1A17]">{m.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F594F]">{m.description[lang]}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#D10E63]">
                    {m.profile[lang]}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {faq.length > 0 && <section className="border-t border-[#E4DDCE] bg-[#FBF9F3] px-5 py-14 sm:px-8 sm:py-16"><div className="editorial-shell"><h2 className="font-sf text-3xl font-bold tracking-[-.035em]">{t.faqTitle}</h2><div className="mt-7 grid gap-3 lg:grid-cols-2">{faq.map(item => <details key={item.question} className="rounded-2xl border border-[#D8D0C2] bg-white p-5"><summary className="cursor-pointer text-sm font-bold text-[#1C1A17]">{item.question}</summary><p className="mt-3 text-sm leading-7 text-[#5F594F]">{item.answer}</p></details>)}</div></div></section>}
      <section className="border-t border-[#DED6C8] px-5 py-10 sm:px-8"><div className="editorial-shell flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div className="flex items-center gap-4"><Image src="/alma-avatar.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover"/><div><p className="font-semibold"><AlmaInline /> Alma · {lang === 'fr' ? 'Coordinatrice de missions IA' : 'AI mission coordinator'}</p><p className="text-sm text-[#6E665A]">{lang === 'fr' ? `Alma adapte la mission et prépare ${collaboratorName} selon vos critères.` : `Alma adapts the mission and prepares ${collaboratorName} according to your criteria.`}</p></div></div><Link href={scopedConversionHref} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-5 text-center text-sm font-bold text-white">{isProspectingMission ? t.prospectCta : t.mobileCta}<ArrowRight className="ml-2 size-4 shrink-0" /></Link></div></section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D8D0C2] bg-[#FBF9F3]/95 px-4 pb-[calc(.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden"><div className="mx-auto flex max-w-lg items-center gap-3"><p className="min-w-0 flex-1 truncate text-xs font-bold text-[#1C1A17]">{mission.title[lang]}</p><Link href={scopedConversionHref} className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#D10E63] px-4 text-xs font-bold text-white">{isProspectingMission ? t.prospectMobileCta : t.mobileCta}</Link></div></div>
    </main>
  )
}

function ProspectDeliverablePreview({ lang, proofLabel, title, collaboratorName }: { lang: Lang; proofLabel: string; title: string; collaboratorName: string }) {
  const t = T[lang]
  const rows = lang === 'fr'
    ? [
        ['Nova Industrie', 'Industrie · 120 salariés', 'Recrutement commercial', 'Forte correspondance'],
        ['Atlas Services', 'Services B2B · Lyon', 'Nouvelle implantation', 'Bonne correspondance'],
        ['Mistral Tech', 'Logiciel · 48 salariés', 'Offre compatible', 'À approfondir'],
      ]
    : [
        ['Nova Industrie', 'Industry · 120 employees', 'Sales hiring', 'Strong match'],
        ['Atlas Services', 'B2B services · Lyon', 'New office', 'Good match'],
        ['Mistral Tech', 'Software · 48 employees', 'Matching offer', 'Review further'],
      ]
  const headings = lang === 'fr' ? ['Entreprise', 'Profil', 'Signal sourcé', 'Qualification'] : ['Company', 'Profile', 'Sourced signal', 'Qualification']

  return <div className="mt-5 overflow-hidden rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3]"><div className="flex items-center justify-between gap-4 border-b border-[#D8D0C2] px-4 py-3"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[.14em] text-[#B00C54]">{proofLabel}</p><h3 className="mt-1 text-sm font-bold">{title}</h3></div><span className="rounded-full bg-[#E6F3EA] px-2.5 py-1 text-[10px] font-bold text-[#257A43]">{lang === 'fr' ? 'À valider' : 'To review'}</span></div><div className="overflow-x-auto"><table className="min-w-[660px] w-full text-left"><thead className="bg-[#F0EBE1] text-[10px] uppercase tracking-[.08em] text-[#6E665A]"><tr>{headings.map(heading => <th key={heading} scope="col" className="px-4 py-2.5">{heading}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row[0]} className="border-t border-[#E4DDCE] text-xs"><th scope="row" className="px-4 py-3 font-bold">{row[0]}</th><td className="px-4 py-3 text-[#5F594F]">{row[1]}</td><td className="px-4 py-3 text-[#5F594F]">{row[2]}</td><td className="px-4 py-3 font-bold text-[#B00C54]">{row[3]}</td></tr>)}</tbody></table></div><div className="border-t border-[#E4DDCE] px-4 py-3"><p className="text-xs font-bold text-[#1C1A17]">{t.methodTitle}</p><p className="mt-1 text-[11px] leading-5 text-[#6E665A]">{t.methodBody(collaboratorName)}</p><p className="mt-2 text-[10px] leading-4 text-[#857C6E]">{lang === 'fr' ? 'Exemple fictif présenté uniquement pour illustrer le format du livrable.' : 'Fictional example shown only to illustrate the deliverable format.'}</p></div></div>
}
