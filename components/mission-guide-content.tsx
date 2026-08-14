import Link from 'next/link'
import { ArrowRight, Check, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react'
import { AlmaInline } from '@/components/alma-inline'
import { getMissionCategory, getMissionCategoryHref, relatedMissions, type Mission } from '@/lib/missions-catalog'
import { MissionBreadcrumb } from '@/components/missions/mission-breadcrumb'

const GUIDE_OVERRIDES: Record<string, { lead: string; distinction: string; inputs: string[]; safeguards: string[] }> = {
  'trouver-de-nouveaux-clients': {
    lead: 'Votre Collaborateur IA recherche les entreprises qui correspondent à votre cible, enrichit chaque fiche et explique sa sélection avant toute validation ou prise de contact.',
    distinction: 'Une longue liste ne vaut pas une bonne sélection.',
    inputs: ['Votre profil client idéal', 'Vos exclusions et critères de qualification', 'Les sources autorisées', 'Votre grille de scoring et sa pondération'],
    safeguards: ['Chaque information conserve sa source.', 'Chaque score est expliqué.', 'Aucun ajout au CRM ni contact sans la règle de validation prévue.'],
  },
  'repondre-a-mes-clients': {
    lead: 'Votre Collaborateur IA qualifie chaque demande, retrouve le contexte autorisé et prépare une réponse adaptée sans inventer les informations manquantes.',
    distinction: 'Répondre plus vite, sans perdre le contexte.',
    inputs: ['Vos catégories de demandes', 'Les sources client autorisées', 'Votre ton et votre vocabulaire', 'Vos règles d’escalade et d’engagement'],
    safeguards: ['Une information absente est signalée.', 'Les exceptions restent visibles.', 'Les engagements sensibles peuvent rester sous validation humaine.'],
  },
}

export function MissionGuideContent({ mission }: { mission: Mission }) {
  const category = getMissionCategory(mission.category)
  const related = relatedMissions(mission, 3)
  const override = GUIDE_OVERRIDES[mission.slug]
  const lead = override?.lead ?? `${mission.result.fr} Ce guide vous aide à définir les informations, les règles et les validations nécessaires avant de confier ce travail à un Collaborateur IA.`
  const distinction = override?.distinction ?? 'Un résultat clair. Une méthode explicite. Une décision qui reste à votre équipe.'
  const inputs = override?.inputs ?? ['Le résultat précis que vous attendez', 'Les sources et applications autorisées', 'Les règles propres à votre entreprise', 'Les cas qui nécessitent une validation humaine']
  const safeguards = override?.safeguards ?? ['Le travail reste traçable du contexte au livrable.', 'Les informations incertaines sont signalées.', 'Rien n’est finalisé sans la validation définie par votre entreprise.']

  return (
    <article className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <header className="relative px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="editorial-shell relative">
          <MissionBreadcrumb items={[{ label: 'Missions', href: '/missions' }, ...(category ? [{ label: category.label.fr, href: getMissionCategoryHref(category) }] : []), { label: mission.title.fr }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,.62fr)] lg:items-end lg:gap-16">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">Guide de mission · {category?.label.fr ?? 'Unitalk'}</p>
              <h1 className="mt-5 text-balance text-[42px] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[64px]">Comment {lowerFirst(mission.title.fr)} avec un Collaborateur IA.</h1>
              <p className="mt-6 max-w-2xl text-balance text-[20px] font-semibold leading-7 tracking-[-0.02em] text-[#D10E63]">{distinction}</p>
              <p className="mt-5 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{lead}</p>
              <Link href={`/decouvrir?mission=${mission.slug}`} className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(209,14,99,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(209,14,99,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
                Personnaliser cette mission <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <dl className="rounded-3xl border border-[#DCD4C4] bg-[#FBF9F3]/90 p-6 shadow-[0_24px_70px_-45px_rgba(28,26,23,.35)] backdrop-blur sm:p-7">
              <Summary label="Résultat" value={mission.result.fr} />
              <Summary label="Profil métier" value={mission.profile.fr} />
              <Summary label="Cadence" value={mission.cadence.fr} />
              <Summary label="Validation" value={mission.validation.fr} last />
            </dl>
          </div>
        </div>
      </header>

      <section className="border-y border-[#DCD4C4] bg-[#FBF9F3] px-5 py-16 sm:px-8 sm:py-24">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <SectionHeading number="01" eyebrow="Avant de commencer" title="Donnez-lui les bons repères." />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-[#DCD4C4] bg-[#DCD4C4] sm:grid-cols-2">
            {inputs.map((input, index) => <InfoCard key={input} index={index + 1} title={input} />)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="editorial-shell">
          <SectionHeading number="02" eyebrow="Déroulement" title="Un fil de mission visible du cadrage à la validation." />
          <ol className="mt-12 border-t border-[#CFC6B8]">
            {mission.steps.map((step, index) => (
              <li key={step.fr} className="grid gap-3 border-b border-[#CFC6B8] py-6 sm:grid-cols-[64px_190px_1fr] sm:items-start">
                <span className="font-mono text-xs font-bold text-[#B00C54]">0{index + 1}</span>
                <strong className="text-[17px]">{['Cadrer', 'Préparer', 'Réaliser', 'Valider'][index] ?? `Étape ${index + 1}`}</strong>
                <span className="leading-7 text-[#4E483F]">{step.fr}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {mission.slug === 'realiser-une-veille-concurrentielle' && <CreatorPath />}

      <section className="bg-[#181615] px-5 py-16 text-[#FBF9F3] sm:px-8 sm:py-24">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#F2A4C5]">03 · Contrôle humain</p>
            <h2 className="mt-5 max-w-xl text-balance text-[36px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[52px]">L’IA prépare. Votre entreprise décide.</h2>
            <p className="mt-6 max-w-xl text-[17px] leading-8 text-[#CFC6B8]">{mission.validation.fr}</p>
          </div>
          <div className="space-y-4">
            {safeguards.map((safeguard) => (
              <div key={safeguard} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#D10E63] text-white"><Check className="size-4" /></span>
                <p className="leading-7 text-[#E7E0D5]">{safeguard}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <SectionHeading number="04" eyebrow="Livrable" title="Un résultat exploitable, pas une réponse isolée." />
          <div>
            <p className="text-[21px] font-semibold leading-8 tracking-[-0.02em]">{mission.deliverable.fr}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {mission.produces.map((item) => (
                <div key={item.fr} className="rounded-2xl border border-[#DCD4C4] bg-[#FBF9F3] p-5">
                  <ShieldCheck className="size-5 text-[#D10E63]" />
                  <p className="mt-4 leading-7 text-[#4E483F]">{item.fr}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 border-l-2 border-[#D10E63] pl-5 text-[17px] leading-8 text-[#4E483F]">La méthode peut évoluer avec vos corrections validées, sans transformer automatiquement chaque échange en mémoire d’entreprise.</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-[#DCD4C4] bg-[#EAE3D4] px-5 py-16 sm:px-8">
          <div className="editorial-shell">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">Continuer à explorer</p>
            <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em]">Missions liées</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link key={item.slug} href={`/missions/${item.slug}`} className="group rounded-2xl border border-[#CFC6B8] bg-[#F3EFE6] p-5 outline-none transition-colors hover:border-[#D10E63]/40 focus-visible:ring-2 focus-visible:ring-[#D10E63]">
                  <h3 className="text-lg font-semibold leading-6">{item.title.fr}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6E665A]">{item.result.fr}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#B00C54]">Voir la mission <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="editorial-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">Avec <AlmaInline /> Alma</p>
            <h2 className="mt-4 text-balance text-[36px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[52px]">Adaptez cette mission à vos méthodes.</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-white/80">Décrivez vos outils, vos règles et les décisions qui doivent rester humaines. <AlmaInline /> Alma prépare le cadre de travail avec vous.</p>
          </div>
          <Link href={`/decouvrir?mission=${mission.slug}`} className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#181615] px-7 text-[15px] font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Personnaliser <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </article>
  )
}

function CreatorPath() {
  return <section className="border-y border-[#DCD4C4] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-20"><div className="editorial-shell"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">Vous maîtrisez déjà cette méthode ?</p><div className="mt-5 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start"><div><h2 className="max-w-2xl text-balance text-[36px] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-[50px]">Transformez votre méthode de veille en mission réutilisable.</h2><p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#4E483F]">Un Co-créateur IA peut interviewer l’expert, formaliser les sources, la fréquence, les critères d’analyse et les validations, puis tester et versionner cette mission pour d’autres Collaborateurs IA.</p></div><div className="grid gap-4 sm:grid-cols-2"><article className="flex min-h-[270px] flex-col rounded-3xl bg-[#181615] p-6 text-[#FAF8F3]"><Sparkles className="size-5 text-[#F2A4C5]"/><h3 className="mt-7 text-2xl font-bold tracking-[-0.03em]">Créer avec Unitalk AI</h3><p className="mt-4 text-sm leading-7 text-[#CFC6B8]">Formalisez cette veille en profil, compétence ou mission directement dans l’écosystème Unitalk.</p><Link href="/co-createur-ia" className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-[#F2A4C5]">Découvrir le rôle de Co-créateur<ArrowRight className="size-4"/></Link></article><article className="flex min-h-[270px] flex-col rounded-3xl border border-[#CFC6B8] bg-[#FAF8F3] p-6"><GraduationCap className="size-5 text-[#D10E63]"/><h3 className="mt-7 text-2xl font-bold tracking-[-0.03em]">Apprendre avec Unitalk Academy</h3><p className="mt-4 text-sm leading-7 text-[#4E483F]">Apprenez à recueillir le savoir-faire, construire la mission, la tester et préparer sa publication.</p><a href="/academy/formations/co-createur-ia?source=mission-guide&mission=realiser-une-veille-concurrentielle" className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-[#B00C54]">Voir la formation Co-créateur IA<ArrowRight className="size-4"/></a></article></div></div></div></section>
}

function lowerFirst(value: string) {
  return value.charAt(0).toLocaleLowerCase('fr') + value.slice(1)
}

function Summary({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return <div className={last ? 'pt-5' : 'border-b border-[#DCD4C4] py-5 first:pt-0'}><dt className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#857C6E]">{label}</dt><dd className="mt-2 text-sm font-semibold leading-6">{value}</dd></div>
}

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{number} · {eyebrow}</p><h2 className="mt-5 max-w-xl text-balance text-[36px] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-[50px]">{title}</h2></div>
}

function InfoCard({ index, title }: { index: number; title: string }) {
  return <div className="bg-[#FBF9F3] p-6"><span className="font-mono text-[11px] font-bold text-[#B00C54]">0{index}</span><h3 className="mt-8 text-xl font-semibold leading-7 tracking-[-0.02em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#6E665A]"><AlmaInline /> Alma vous aide à le formuler avant le démarrage.</p></div>
}
