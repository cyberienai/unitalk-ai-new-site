import Link from 'next/link'
import { Kicker } from '@/components/home/section-kicker'
import { unitalkPricing } from '@/lib/unitalk-pricing'

const PRICING_HREF = '/tarifs?co-createur=1#configurateur'

export function CoCreatorContent() {
  return (
    <main className="bg-[#F3EFE6] text-[#1C1A17]">
      <section className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="editorial-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Kicker>Formation Co-créateur IA Unitalk</Kicker>
            <h1 className="hero-heading mt-5 max-w-2xl">
              Transformez le savoir-faire humain en Collaborateurs IA.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#4E483F]">
              Apprenez à interviewer les équipes, formaliser leurs méthodes et créer les profils métier, compétences et missions dont leurs Collaborateurs IA ont besoin.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <PrimaryLink href={PRICING_HREF}>Devenir Co-créateur IA →</PrimaryLink>
              <a href="#creation-en-situation" className="text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
                Voir une création en situation
              </a>
            </div>
            <p className="mt-4 text-sm text-[#6E665A]">Formation pratique · Propulsée par Hermes, agent autonome open source</p>
          </div>
          <TransformationCard />
        </div>
      </section>

      <LightSection eyebrow="Le métier" title="Un nouveau métier de transmission.">
        <p className="max-w-3xl text-[17px] leading-8 text-[#4E483F]">
          Le Co-créateur ne remplace pas l’expert métier. Il rend son savoir-faire transmissible.
        </p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([title, body], index) => (
            <article key={title} className="rounded-xl border border-[#DED6C8] bg-[#FAF8F3] p-5">
              <p className="font-mono text-[10px] font-bold text-[#B00C54]">0{index + 1}</p>
              <h3 className="mt-3 font-sf text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4E483F]">{body}</p>
            </article>
          ))}
        </div>
      </LightSection>

      <LightSection id="creation-en-situation" eyebrow="Des actifs réutilisables" title="Une conversation devient un actif.">
        <AssetProof />
        <p className="mt-7 font-sf text-2xl font-bold">
          Le Co-créateur ne remplace pas l’expert métier. Il rend son savoir-faire transmissible.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6E665A]">
          Le savoir-faire n’est publié ou partagé qu’avec le consentement et les droits nécessaires.
        </p>
      </LightSection>

      <section className="bg-[#151310] py-16 text-[#FAF8F3] sm:py-20">
        <div className="editorial-shell">
          <Kicker dark>Apprendre en construisant</Kicker>
          <h2 className="mt-5 max-w-3xl font-sf text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[46px]">
            Pas une formation aux prompts.
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#CFC6B8]">
            Vous interviewez, construisez, testez et améliorez de véritables profils métier, compétences et missions dans un environnement agentique propulsé par Hermes, l’agent autonome open source de Nous Research.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DELIVERABLES.map((item) => (
              <p key={item} className="rounded-xl border border-white/15 bg-white/[0.04] p-4 text-sm font-semibold">{item}</p>
            ))}
          </div>
          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="font-mono text-xs leading-6 text-[#CFC6B8]">Navigateur · Code · Terminal · Fichiers · Mémoire · Planification · Missions</p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[#CFC6B8]">
              Hermes est utilisé pour construire, exécuter et tester les créations pendant la formation. Les crédits IA financent les modèles qui génèrent, analysent et vérifient le code ; l’environnement Hermes fournit les ressources qui l’exécutent.
            </p>
          </div>
        </div>
      </section>

      <LightSection eyebrow="Formation et licence" title="Apprenez. Créez. Publiez.">
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#DED6C8] bg-[#FAF8F3]">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">Licence Co-créateur IA Unitalk</p>
              <p className="mt-4 font-sf text-[46px] font-bold tracking-[-0.05em]">{unitalkPricing.aiCocreator.monthlyPrice} €</p>
              <p className="text-sm font-semibold text-[#4E483F]">par mois et par Co-créateur</p>
              <p className="mt-5 font-semibold text-[#B00C54]">Formation Hermes incluse</p>
              <PrimaryLink href={PRICING_HREF} className="mt-7">Ajouter la Licence Co-créateur IA →</PrimaryLink>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <FeatureList title="Créer" items={['Profils métier', 'Compétences', 'Missions', 'Versions', 'Publications']} />
              <FeatureList title="Percevoir" items={['Revenus directs', 'Revenus indirects', 'Activations', 'Utilisations attribuées', 'Historique des règlements']} />
            </div>
          </div>
          <div className="border-t border-[#DED6C8] px-6 py-5 text-sm leading-7 text-[#6E665A] sm:px-8">
            L’assistance humaine supplémentaire utilise des crédits d’assistance. Aucun niveau de revenu n’est garanti : la rémunération dépend des créations publiées, de leur adoption et des conditions du programme.
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <Revenue title="Revenus directs">Vente, licence, personnalisation ou service associé à une création.</Revenue>
          <Revenue title="Revenus indirects">Part de revenus liée à l’utilisation, à l’intégration ou à la contribution d’une création dans une offre Unitalk, selon les règles du programme.</Revenue>
        </div>
      </LightSection>

      <section className="py-16 sm:py-20">
        <div className="editorial-shell">
          <div className="rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-7 sm:p-10">
            <h2 className="max-w-3xl font-sf text-[36px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[46px]">
              Le prochain Collaborateur IA peut commencer par un savoir-faire humain.
            </h2>
            <p className="mt-5 text-[17px] text-[#4E483F]">Apprenez à écouter, formaliser, tester et transmettre.</p>
            <PrimaryLink href={PRICING_HREF} className="mt-7">Devenir Co-créateur IA →</PrimaryLink>
            <p className="mt-5 text-xs text-[#6E665A]">Formation pratique · Environnement Hermes · Créations réelles · Licence Unitalk</p>
          </div>
        </div>
      </section>
    </main>
  )
}

function TransformationCard() {
  const rows = [['Profil métier', 'Commercial B2B'], ['Compétence', 'Qualifier une opportunité'], ['Mission', 'Préparer une proposition commerciale']]
  return (
    <aside className="rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-6 sm:p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">Entretien humain</p>
      <blockquote className="mt-4 text-lg leading-8 text-[#1C1A17]">« Avant d’envoyer une proposition, je vérifie le secteur, l’effectif, le besoin et la personne qui décide. »</blockquote>
      <p aria-hidden className="my-5 text-center text-[#D10E63]">↓</p>
      <div className="divide-y divide-[#DED6C8] border-y border-[#DED6C8]">
        {rows.map(([label, value]) => <div key={label} className="py-3"><span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#6E665A]">{label}</span><strong className="mt-1 block">{value}</strong></div>)}
      </div>
    </aside>
  )
}

function AssetProof() {
  const rows = [['Profil métier', 'Gestionnaire de recouvrement'], ['Compétence', 'Qualifier une facture avant relance'], ['Règle', 'Ne pas relancer si un litige est ouvert'], ['Validation', 'Responsable financier']]
  return <div className="mt-9 rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-6 sm:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">Parole humaine</p><blockquote className="mt-4 max-w-3xl font-sf text-2xl leading-9">« Je ne relance jamais un client lorsqu’un litige est encore ouvert. »</blockquote><dl className="mt-7 divide-y divide-[#DED6C8] border-y border-[#DED6C8]">{rows.map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]"><dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#6E665A]">{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl></div>
}

function LightSection({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="py-16 sm:py-20"><div className="editorial-shell"><Kicker>{eyebrow}</Kicker><h2 className="mt-5 max-w-4xl font-sf text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[46px]">{title}</h2><div className="mt-6">{children}</div></div></section>
}

function PrimaryLink({ href, className = '', children }: { href: string; className?: string; children: React.ReactNode }) {
  return <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-[#D10E63] px-6 text-sm font-bold text-white transition-colors hover:bg-[#B90C58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${className}`}>{children}</Link>
}

function FeatureList({ title, items }: { title: string; items: string[] }) {
  return <div><h3 className="font-sf text-2xl font-bold">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="border-b border-[#DED6C8] pb-3 text-sm text-[#4E483F]">{item}</li>)}</ul></div>
}

function Revenue({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="rounded-xl border border-[#DED6C8] bg-[#FAF8F3] p-5"><h3 className="font-sf text-2xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#4E483F]">{children}</p></article>
}

const STEPS = [
  ['Interviewer', 'Comprendre ce que la personne fait vraiment, y compris les exceptions et les décisions sensibles.'],
  ['Formaliser', 'Transformer sa méthode en responsabilités, compétences, règles et résultats attendus.'],
  ['Tester', 'Vérifier sur des cas réels et intégrer les corrections validées.'],
  ['Transmettre', 'Partager le savoir-faire avec les collaborateurs humains et IA autorisés.'],
]

const DELIVERABLES = ['1 entretien métier', '1 profil métier', '1 compétence testée', '1 mission personnalisable', '1 Collaborateur IA configuré']
