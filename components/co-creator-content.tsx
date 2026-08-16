import Link from 'next/link'
import { Kicker } from '@/components/home/section-kicker'
import { unitalkPricing } from '@/lib/unitalk-pricing'
import { CollectionCockpitDemo } from '@/components/co-creator/collection-cockpit-demo'

const PRICING_HREF = '/tarifs?co-createur=1#configurateur'
const ACADEMY_COURSE = '/academy/formations/co-createur-ia?source=unitalk-ai'
const ACADEMY_FREE = '/academy/parcours-gratuits/premiere-mission-ia?source=unitalk-ai'
const ACADEMY_FUNDING = '/academy/financement?formation=co-createur-ia&source=unitalk-ai'

export function CoCreatorContent() {
  return (
    <main className="bg-[#F3EFE6] text-[#1C1A17]">
      <section className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="editorial-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Kicker>Unitalk Academy · Formation Co-créateur IA</Kicker>
            <h1 className="hero-heading mt-5 max-w-2xl">
              Formez-vous, créez et commercialisez vos propres Collaborateurs IA.
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#4E483F]">
              Commencez par une mission réelle. Apprenez à construire une solution qu’une entreprise veut utiliser, puis à la proposer avec la licence Co-créateur.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <PrimaryLink href={ACADEMY_FREE}>Commencer gratuitement sur Unitalk Academy →</PrimaryLink>
              <a href={ACADEMY_COURSE} className="text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">Découvrir le programme complet</a>
              <a href="#creation-en-situation" className="text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
                Voir une création en situation
              </a>
            </div>
            <p className="mt-4 text-sm text-[#6E665A]">Unitalk Academy vous apprend le métier. La licence Unitalk vous donne les droits de créer et publier dans le produit.</p>
            <p className="mt-4 text-sm text-[#6E665A]">Vous avez déjà un profil prêt ? <Link href="/collaborateurs-ia/profils-metier/publier" className="font-bold text-[#B00C54] underline-offset-4 hover:underline">Publier un profil existant</Link></p>
          </div>
          <TransformationCard />
        </div>
      </section>

      <LightSection eyebrow="Le métier" title="Résoudre un problème avant de construire un produit.">
        <p className="max-w-3xl text-[17px] leading-8 text-[#4E483F]">
          Le Co-créateur part du travail réel. Il écoute l’expert, rend sa méthode transmissible et construit le Collaborateur IA qui pourra l’appliquer sous contrôle humain.
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

      <LightSection id="creation-en-situation" eyebrow="Création en situation" title="Du savoir-faire à l’application métier.">
        <p className="max-w-4xl text-[17px] leading-8 text-[#4E483F]">Le Co-créateur ne s’arrête pas à formaliser une méthode. Il construit avec Hermes l’application qui permet au Collaborateur IA et aux équipes de l’utiliser dans le travail réel.</p>
        <div className="mt-9 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <AssetProof />
          <CollectionCockpitDemo />
        </div>
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
            Vous apprenez en livrant.
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#CFC6B8]">
            Pas de projet fictif à ranger après la formation. Vous interviewez, construisez, vibecodez, testez et améliorez un Collaborateur IA à partir d’une mission réelle, dans un environnement agentique propulsé par Hermes, l’agent autonome open source de Nous Research.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((item, index) => (
              <p key={item} className="rounded-xl border border-white/15 bg-white/[0.04] p-4 text-sm font-semibold"><span className="mr-2 font-mono text-[10px] text-[#F2A4C5]">0{index + 1}</span>{item}</p>
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

      <LightSection eyebrow="Formation et licence" title="Apprenez le métier. Obtenez les moyens de l’exercer.">
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#DED6C8] bg-[#FAF8F3]">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">Licence Co-créateur IA Unitalk</p>
              <p className="mt-4 font-sf text-[46px] font-bold tracking-[-0.05em]">{unitalkPricing.aiCocreator.monthlyPrice} €</p>
              <p className="text-sm font-semibold text-[#4E483F]">par mois et par Co-créateur</p>
              <p className="mt-5 font-semibold text-[#B00C54]">Formation Hermes incluse avec la licence</p>
              <PrimaryLink href={ACADEMY_COURSE} className="mt-7">Voir la formation sur Unitalk Academy →</PrimaryLink>
              <a href={ACADEMY_FUNDING} className="mt-4 inline-flex text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">Étudier une prise en charge →</a>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <FeatureList title="Créer" items={['Profils métier', 'Compétences', 'Missions', 'Applications métier vibecodées', 'Versions', 'Publications']} />
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

      <section className="border-y border-[#2D2925] bg-[#151310] py-16 text-[#FAF8F3] sm:py-20">
        <div className="editorial-shell">
          <Kicker dark>Deux façons de développer votre activité</Kicker>
          <div className="mt-5 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <h2 className="max-w-3xl font-sf text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[46px]">
              Recommandez ou déployez. Votre rémunération suit votre engagement.
            </h2>
            <p className="max-w-2xl text-[16px] leading-8 text-[#CFC6B8]">
              Le programme d’affiliation rémunère la recommandation. Le programme Partenaire rémunère une implication plus complète dans la vente, le déploiement et l’accompagnement du client.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <CommercialProgram
              number="30 %"
              title="Commission Affilié"
              audience="Vous recommandez Unitalk."
              body="Recevez 30 % des abonnements éligibles encaissés pendant la première année pour chaque nouveau client attribué à votre code affilié."
              items={['Code affilié personnel', 'Attribution des commandes', 'Suivi des abonnements éligibles']}
              href="/partenaires#affiliation"
              cta="Rejoindre le programme d’affiliation"
            />
            <CommercialProgram
              number="50 %"
              title="Commission Partenaire"
              audience="Vous vendez, déployez et accompagnez."
              body="Recevez 50 % selon les conditions du programme Partenaire lorsque vous prenez en charge le développement commercial et le déploiement chez vos clients."
              items={['Espace multi-clients', 'Déploiement et accompagnement', 'Suivi commercial et partage des revenus']}
              href="/partenaires/deployer"
              cta="Découvrir le programme Partenaire"
              featured
            />
          </div>
          <p className="mt-6 max-w-4xl text-xs leading-6 text-[#8F8579]">
            Les commissions s’appliquent aux montants éligibles effectivement encaissés, selon les règles d’attribution, la durée et les exclusions de chaque programme. Elles ne constituent pas une garantie de revenu et ne se cumulent pas sur une même vente, sauf accord explicite.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="editorial-shell">
          <div className="rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-7 sm:p-10">
            <h2 className="max-w-3xl font-sf text-[36px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[46px]">
              Votre activité peut commencer par une seule mission utile.
            </h2>
            <p className="mt-5 text-[17px] text-[#4E483F]">Trouvez le problème. Construisez la solution. Montrez le résultat. Vendez seulement ensuite.</p>
            <PrimaryLink href={ACADEMY_FREE} className="mt-7">Commencer ma première mission →</PrimaryLink>
            <Link href={PRICING_HREF} className="mt-5 inline-flex text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">Ajouter la licence produit Co-créateur →</Link>
            <Link href="/collaborateurs-ia/profils-metier/publier" className="mt-5 inline-flex text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline">J’ai déjà un profil à publier →</Link>
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
  const rows = [['Profil métier', 'Gestionnaire de recouvrement'], ['Compétence', 'Qualifier une facture avant relance'], ['Mission', 'Préparer les relances à valider'], ['Application métier', 'Cockpit de recouvrement'], ['Validation', 'Responsable financier']]
  return <div className="rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-6 sm:p-8"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">Parole humaine</p><blockquote className="mt-4 max-w-3xl font-sf text-2xl leading-9">« Je ne relance jamais un client lorsqu’un litige est encore ouvert. »</blockquote><dl className="mt-7 divide-y divide-[#DED6C8] border-y border-[#DED6C8]">{rows.map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr]"><dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#6E665A]">{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl></div>
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

function CommercialProgram({ number, title, audience, body, items, href, cta, featured = false }: { number: string; title: string; audience: string; body: string; items: string[]; href: string; cta: string; featured?: boolean }) {
  return <article className={`flex min-h-[390px] flex-col rounded-2xl border p-6 sm:p-8 ${featured ? 'border-[#D10E63] bg-[#201B1D]' : 'border-white/15 bg-white/[.035]'}`}><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{title}</p><p className="mt-5 font-sf text-[64px] font-bold leading-none tracking-[-.06em] text-white">{number}</p><h3 className="mt-5 text-xl font-bold">{audience}</h3><p className="mt-3 text-sm leading-7 text-[#CFC6B8]">{body}</p><ul className="mt-6 space-y-3 border-t border-white/10 pt-5">{items.map((item) => <li key={item} className="flex items-center gap-3 text-xs font-semibold text-[#E7E0D6]"><span className="size-1.5 rounded-full bg-[#F2A4C5]" />{item}</li>)}</ul><Link href={href} className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-xl px-5 pt-6 text-sm font-bold ${featured ? 'bg-[#D10E63] text-white hover:bg-[#B90C58]' : 'border border-white/20 text-white hover:border-[#F2A4C5]'}`}>{cta} →</Link></article>
}

const STEPS = [
  ['Interviewer', 'Comprendre ce que la personne fait vraiment, y compris les exceptions et les décisions sensibles.'],
  ['Formaliser', 'Transformer sa méthode en responsabilités, compétences, règles et résultats attendus.'],
  ['Construire', 'Vibecoder avec Hermes l’application métier qui rend ce savoir-faire utilisable dans le travail réel.'],
  ['Tester', 'Vérifier profil, compétence, mission et application sur des cas contrôlés, puis intégrer les corrections.'],
  ['Publier', 'Versionner et partager les créations avec les collaborateurs autorisés, selon leurs droits.'],
]

const DELIVERABLES = ['1 entretien métier', '1 profil métier', '1 compétence testée', '1 mission personnalisable', '1 application métier vibecodée', '1 Collaborateur IA configuré']
