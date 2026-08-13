import Link from 'next/link'
import { getMission } from '@/lib/missions-catalog'
import { getStoreItemBySlug, storeItemHref } from '@/lib/store-catalog'
import { MissionBreadcrumb } from '@/components/missions/mission-breadcrumb'
import { getMissionCategory, getMissionCategoryHref } from '@/lib/missions-catalog'

const MISSION_SLUG = 'trouver-de-nouveaux-clients'
const mission = getMission(MISSION_SLUG)!
const category = getMissionCategory(mission.category)!
const profile = getStoreItemBySlug('commercial')!
const skills = ['qualifier-un-prospect', 'relancer-une-opportunite', 'preparer-un-rendez-vous'].map(getStoreItemBySlug).filter(Boolean)
const applications = ['hubspot', 'salesforce', 'linkedin'].map(getStoreItemBySlug).filter(Boolean)

export function ProspectsGuideContent() {
  return (
    <article className="bg-[#F3EFE6] text-[#1C1A17]">
      <section className="px-5 pb-16 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-[1180px]">
          <MissionBreadcrumb items={[{label:'Missions',href:'/missions'},{label:category.label.fr,href:getMissionCategoryHref(category)},{label:mission.title.fr}]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">Mission · Prospection B2B</p>
              <h1 className="mt-4 font-sf text-[42px] font-bold leading-[0.98] tracking-[-0.05em] sm:text-[64px]"><span className="block">Trouver des prospects qualifiés.</span><span className="block text-[#6E665A]">Et savoir exactement pourquoi.</span></h1>
              <p className="mt-7 max-w-3xl text-[18px] leading-8 text-[#4E483F]">Votre Collaborateur IA applique vos critères, consulte les sources autorisées et documente chaque sélection. Votre équipe commerciale garde la décision avant tout ajout au CRM ou toute prise de contact.</p>
              <Link href={`/decouvrir?mission=${MISSION_SLUG}`} className="mt-7 inline-flex bg-[#D10E63] px-6 py-3 text-sm font-bold text-white">Personnaliser cette mission →</Link>
              <p className="mt-3 text-[13px] text-[#6E665A]">7 jours d’essai · 1 million de tokens offerts · Sans carte bancaire</p>
            </div>
            <dl className="border-y border-[#1C1A17]/15">
              <HeroFact label="Résultat" value="Une sélection documentée de prospects à examiner." />
              <HeroFact label="Profil métier" value={profile.name.fr} href={storeItemHref(profile)} />
              <HeroFact label="Validation" value="Avant CRM ou prise de contact" />
              <div className="py-5"><dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">Applications</dt><dd className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">{applications.map((app) => <Link key={app!.slug} href={storeItemHref(app!)} className="underline decoration-[#D10E63]/30 underline-offset-4">{app!.name.fr}</Link>)}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <Act eyebrow="01 · Le résultat" title="Une sélection que votre équipe peut décider d’utiliser.">
        <p>Chaque prospect est accompagné des raisons de sa sélection, des sources consultées, de la date des signaux observés et des points qui restent à vérifier.</p>
        <section className="mt-10 border-y border-[#1C1A17]/15 py-7">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">Exemple fictif</p>
          <h3 className="mt-3 font-sf text-[30px] font-bold">Acme Industries</h3>
          <p className="mt-2 text-sm text-[#6E665A]">Exemple fictif destiné à illustrer la structure du résultat.</p>
          <dl className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2"><ExampleFact label="Pourquoi elle correspond" value="86 salariés et recrutement récent de trois commerciaux." /><ExampleFact label="Sources" value="Site de l’entreprise · Offre d’emploi · Registre autorisé" /><ExampleFact label="Point à vérifier" value="Aucun responsable identifié pour le périmètre concerné." /><ExampleFact label="Niveau de confiance" value="Moyen" /><ExampleFact label="Recommandation" value="Conserver dans la sélection pour validation." /></dl>
        </section>
      </Act>

      <Act eyebrow="02 · Le Collaborateur IA" title="Une identité porte la mission du début à la fin." muted>
        <p>Cette mission n’est pas confiée à un agent temporaire. Elle est accomplie par votre Collaborateur IA, avec son identité, son environnement de travail et le contexte que votre entreprise l’autorise à utiliser.</p>
        <div className="mt-10 grid border-y border-[#1C1A17]/15 sm:grid-cols-2"><Concept title="Collaborateur IA" body="Une identité durable qui porte la responsabilité." /><Concept title="Profil métier" body="La responsabilité commerciale mobilisée dans la durée." href={storeItemHref(profile)} /><Concept title="Compétences" body="Les savoir-faire nécessaires à la recherche, à la vérification et à la qualification." /><Concept title="Applications" body="Les moyens d’action autorisés pour accomplir la mission." /></div>
        <p className="mt-8 text-[16px] font-semibold">La mission est le travail. Le profil métier est la responsabilité. Les compétences sont les savoir-faire. Les applications sont les moyens d’action.</p>
      </Act>

      <Act eyebrow="03 · Ce qu’il mobilise" title="Il n’invente pas votre définition d’un bon prospect.">
        <div className="grid border-y border-[#1C1A17]/15 sm:grid-cols-2"><Concept title="Votre contexte" body="Cible commerciale, secteurs, tailles, zones géographiques et signaux recherchés." /><Concept title="Votre mémoire d’entreprise" body="Clients existants, comptes déjà approchés, exclusions et corrections que l’entreprise choisit de conserver." /><Concept title="Ses compétences" body="Rechercher, vérifier, recouper, qualifier et documenter selon la méthode validée." links={skills.map((skill) => ({ label: skill!.name.fr, href: storeItemHref(skill!) }))} /><Concept title="Ses applications" body="Navigateur, documents, CRM ou outils de communication explicitement autorisés." links={applications.map((app) => ({ label: app!.name.fr, href: storeItemHref(app!) }))} /></div>
        <p className="mt-8 font-sf text-[26px] font-bold">Le contexte est partagé. Les accès restent gouvernés.</p>
      </Act>

      <Act eyebrow="04 · Travail collaboratif" title="Le Collaborateur IA prépare. L’équipe décide." muted>
        <ol className="mt-10 border-t border-[#1C1A17]/15">{WORKFLOW.map(([title, body], index) => <li key={title} className="grid gap-3 border-b border-[#1C1A17]/15 py-6 sm:grid-cols-[60px_180px_1fr]"><span className="font-mono text-[10px] text-[#B00C54]">0{index + 1}</span><strong className="text-sm uppercase tracking-[0.08em]">{title}</strong><span className="leading-7 text-[#4E483F]">{body}</span></li>)}</ol>
      </Act>

      <Act eyebrow="05 · Ce qui reste" title="Le résultat est livré. Le savoir-faire reste dans l’entreprise.">
        <p>Les corrections validées peuvent améliorer les compétences mobilisées et la définition du profil métier associé à cette mission.</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3"><Concept title="Profil métier" body="Il peut être réutilisé et attribué à d’autres Collaborateurs IA selon les droits de l’organisation." /><Concept title="Compétences" body="Les savoir-faire validés peuvent être partagés avec les équipes humaines et les autres Collaborateurs IA autorisés." /><Concept title="Mémoire" body="Le contexte et l’expérience restent gouvernés par les droits définis dans l’entreprise." /></div>
        <p className="mt-10 font-sf text-[30px] font-bold text-[#B00C54]">Validé une fois. Réutilisé par tous ceux qui y sont autorisés.</p>
      </Act>

      <Act eyebrow="06 · La mission" title="Le contrat de travail, en un regard." muted>
        <dl className="mt-8 border-y border-[#1C1A17]/15"><FicheRow label="Mission" value="Trouver des prospects correspondant à notre cible commerciale." /><FicheRow label="Résultat" value="Une sélection documentée, sans doublons, accompagnée des raisons de qualification et des sources utilisées." /><FicheRow label="Contexte partagé" value="Critères de cible, exclusions, clients existants et sources autorisées." /><FicheRow label="Applications" value="Celles que l’entreprise autorise pour rechercher, documenter ou transmettre le résultat." /><FicheRow label="Validation humaine" value="Avant tout ajout au CRM ou toute prise de contact." /><FicheRow label="Expérience conservée" value="Les motifs d’acceptation, de correction ou de refus que l’entreprise décide de conserver." /><FicheRow label="Partage" value="Les profils métier et compétences validés peuvent être réutilisés selon les droits définis par l’entreprise." /></dl>
        <section className="mt-14"><h2 className="font-sf text-[32px] font-bold">Questions fréquentes</h2><div className="mt-5 border-t border-[#1C1A17]/15"><Faq q="Comment le Collaborateur IA qualifie-t-il un prospect ?">Il applique les critères définis par l’entreprise, consulte les sources autorisées et explique pourquoi chaque prospect est retenu.</Faq><Faq q="Peut-il contacter automatiquement les prospects ?">Seulement si l’entreprise l’autorise. La recherche, l’ajout au CRM, la préparation d’un message et son envoi peuvent avoir des règles de validation différentes.</Faq><Faq q="Que devient l’expérience après la mission ?">Les corrections validées peuvent enrichir les compétences et le profil métier mobilisés. Ces savoir-faire peuvent ensuite être réutilisés ou partagés avec les collaborateurs humains et IA autorisés.</Faq></div></section>
      </Act>

      <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8 sm:py-20"><div className="mx-auto max-w-[1000px]"><h2 className="font-sf text-[38px] font-bold leading-tight tracking-[-0.04em] sm:text-[54px]">Personnalisez cette mission pour votre entreprise.</h2><p className="mt-5 max-w-3xl text-[17px] leading-8 text-white/80">Donnez à Alma votre contexte, vos critères et vos règles. Elle vous aide à préparer le Collaborateur IA qui accomplira la mission.</p><div className="mt-8 flex flex-wrap items-center gap-5"><Link href={`/decouvrir?mission=${MISSION_SLUG}`} className="bg-[#151310] px-6 py-3 text-sm font-bold text-white">Personnaliser cette mission →</Link><Link href="/missions" className="text-sm font-bold text-white underline underline-offset-4">Voir toutes les missions →</Link></div><p className="mt-4 text-[13px] text-white/75">7 jours d’essai · 1 million de tokens offerts · Sans carte bancaire</p></div></section>
    </article>
  )
}

const WORKFLOW = [
  ['Cadrer', 'L’équipe définit les critères, les exclusions et les sources autorisées.'],
  ['Rechercher', 'Le Collaborateur IA rassemble et vérifie les informations disponibles.'],
  ['Expliquer', 'Chaque prospect est accompagné des raisons de sa sélection.'],
  ['Valider', 'L’équipe accepte, corrige ou refuse avant toute action sensible.'],
  ['Continuer', 'Les corrections validées améliorent la prochaine mission.'],
] as const

function Act({ eyebrow, title, muted = false, children }: { eyebrow: string; title: string; muted?: boolean; children: React.ReactNode }) { return <section className={muted ? 'bg-[#EAE4D9] px-5 py-16 sm:px-8 sm:py-24' : 'px-5 py-16 sm:px-8 sm:py-24'}><div className="mx-auto max-w-[1000px]"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">{eyebrow}</p><h2 className="mt-4 max-w-4xl font-sf text-[34px] font-bold leading-[1.04] tracking-[-0.04em] sm:text-[50px]">{title}</h2><div className="mt-6 text-[17px] leading-8 text-[#4E483F]">{children}</div></div></section> }
function HeroFact({ label, value, href }: { label: string; value: string; href?: string }) { return <div className="border-b border-[#1C1A17]/15 py-5 last:border-b-0"><dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{label}</dt><dd className="mt-2 font-sf text-[22px] font-bold leading-tight">{href ? <Link href={href} className="underline decoration-[#D10E63]/30 underline-offset-4">{value}</Link> : value}</dd></div> }
function ExampleFact({ label, value }: { label: string; value: string }) { return <div><dt className="text-sm font-bold">{label}</dt><dd className="mt-1 text-[15px] leading-7 text-[#4E483F]">{value}</dd></div> }
function Concept({ title, body, href, links }: { title: string; body: string; href?: string; links?: { label: string; href: string }[] }) { return <div className="border-b border-[#1C1A17]/15 py-7 sm:px-6 sm:odd:border-r sm:first:pl-0"><h3 className="font-sf text-[24px] font-bold">{href ? <Link href={href} className="underline decoration-[#D10E63]/30 underline-offset-4">{title}</Link> : title}</h3><p className="mt-3 text-[15px] leading-7 text-[#4E483F]">{body}</p>{links && <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">{links.map((link) => <Link key={link.href} href={link.href} className="text-[#B00C54] underline underline-offset-3">{link.label}</Link>)}</p>}</div> }
function FicheRow({ label, value }: { label: string; value: string }) { return <div className="grid gap-2 border-b border-[#1C1A17]/15 py-5 last:border-b-0 sm:grid-cols-[180px_1fr]"><dt className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6E665A]">{label}</dt><dd className="text-[15px] leading-7">{value}</dd></div> }
function Faq({ q, children }: { q: string; children: React.ReactNode }) { return <div className="border-b border-[#1C1A17]/15 py-5"><h3 className="font-sf text-[20px] font-bold">{q}</h3><p className="mt-2 text-[15px] leading-7 text-[#4E483F]">{children}</p></div> }
