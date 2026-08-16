import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Architecture — Unitalk',
  description:
    'Comprendre l\'architecture des licences Unitalk AI : Alma Entreprise, Collaborateur IA, Capacité IA, Workspace & Desktop.',
}

// ── Data ──────────────────────────────────────────────────────────────────────

const almaTree = [
  'Alma, Coordinatrice de missions',
  'Entreprise — Membres humains, Équipes et rôles, Responsables, Droits administratifs',
  'Gouvernance — Politiques d\'accès, Validations humaines, Règles d\'escalade, Budgets et quotas, Traçabilité',
  'Connaissance de l\'entreprise — Mémoire partagée, Documents et procédures, Méthodes validées, Contexte d’entreprise',
  'Stores Unitalk — Profils métier, Compétences, Missions, Applications',
  'Applications connectées — Connecteurs, API, MCP, Webhooks, Applications métier privées',
  'Unitalk AI Gateway — Modèles autorisés, Fournisseurs, Clés API, Routage et fallback, Budgets et quotas, Suivi des coûts',
  'Infrastructure IA — Serveurs IA enregistrés, Hébergeurs autorisés, Environnements privés, Stockage et secrets, Politiques de déploiement',
  'Workspace & Desktop — Accès Web, Application Desktop, Membres humains illimités, Accès aux missions et validations',
]

const workspaceTree = [
  'Workspace Web',
  'Unitalk Desktop',
  'Tableau de bord d\'équipe',
  'Missions — En cours, Historique, Activité, Résultats',
  'Validations — Approuver, Modifier, Refuser, Journal des décisions',
  'Collaboration — Commentaires, Notifications, Mentions, Partage de fichiers',
  'Supervision — État des Collaborateurs IA, Consommation, Alertes, Blocages',
  'Accès multicanal — Web, Desktop, Mobile, Messageries compatibles',
]

const collaboratorTree = [
  'Identité IA professionnelle — Nom, Avatar, Nature IA explicite, Rattachement à l\'entreprise, Responsable humain, Profil public',
  'Profil Collaborateur IA pour Hermes — Runtime agentique, Environnement de travail, Mémoire propre, Fichiers, Terminal, Navigateur, Tâches planifiées',
  'Profils métier illimités',
  'Compétences installées — Compétences Unitalk, Compétences privées, Versions, Expérience validée',
  'Applications autorisées — Connecteurs attribués, Outils MCP autorisés, API autorisées, Applications métier',
  'Outils de communication — Adresse email, Agenda, Téléphone (si activé), Messageries d\'équipe, Web, Desktop, Terminal',
  'Droits propres — Sources accessibles, Actions autorisées, Actions soumises à validation, Actions interdites',
  'Ressources d\'exécution — Environnement isolé, Secrets propres, Stockage, Ressources dédiées selon l\'offre',
]

const capacityTree = [
  'BYOK — Clés propres de l\'entreprise, Usage facturé par le fournisseur, Gouvernance par Unitalk AI Gateway',
  'Quart-temps — 5 millions de tokens/mois, Charge d\'action légère ou récurrente',
  'Mi-temps — 10 millions de tokens/mois, Prise en charge quotidienne',
  'Temps plein — 20 millions de tokens/mois, Processus complexes et volumes importants',
  'Crédits complémentaires — Recharges ponctuelles, Modèles avancés, Image, audio, vidéo, code, Dépassements autorisés',
]

const placementRows = [
  ['Profils métier', 'Catalogue et règles', 'Profils installés'],
  ['Compétences', 'Bibliothèque et versions', 'Compétences attribuées'],
  ['Applications', 'Connexions disponibles', 'Applications autorisées'],
  ['MCP', 'Serveurs enregistrés', 'Outils MCP autorisés'],
  ['Modèles IA', 'Fournisseurs et modèles autorisés', 'Modèles utilisables'],
  ['Clés API', 'Coffre de l\'entreprise', 'Accès indirect selon les droits'],
  ['Serveurs IA', 'Inventaire et politique', 'Environnement d\'exécution affecté'],
  ['Identité IA', 'Gouvernance et rattachement', 'Identité propre'],
  ['Email et agenda', 'Domaines et politiques', 'Coordonnées propres'],
  ['Téléphone', 'Fournisseur et budget', 'Ligne attribuée'],
  ['Mémoire partagée', 'Entreprise', 'Lecture selon les droits'],
  ['Mémoire privée', 'Politique de conservation', 'Mémoire propre du Collaborateur'],
]

const priceLines = [
  { name: 'Alma Entreprise', desc: 'Contrôle, connaissance, Stores, Gateway et infrastructure', price: '50 €/mois' },
  { name: 'Unitalk Workspace & Desktop', desc: 'Web, Desktop, missions, activité et validations', price: 'Inclus', featured: false },
  { name: 'Collaborateur IA + profil Hermes', desc: 'Identité, environnement, profils et outils', price: '49 €/mois' },
  { name: 'Capacité IA', desc: 'Modèles, tokens et charge d\'action', price: '0 à 100 €/mois' },
  { name: 'Co-créateur IA', desc: 'Création, versionnage et publication', price: '50 €/mois' },
]

// ── Helpers ────────────────────────────────────────────────────────────────────

function TreeBranch({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-5 sm:p-6">
      <h3 className="font-sf text-lg font-bold text-[#1C1A17]">{label}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => {
          const [main, ...rest] = item.split(' — ')
          return (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]" />
              <span>
                <strong className="text-[#1C1A17]">{main}</strong>
                {rest.length > 0 && (
                  <span className="text-[#6B6560]"> — {rest.join(' — ')}</span>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${className}`}>{children}</section>
}

function SectionInner({ children }: { children: React.ReactNode }) {
  return <div className="editorial-shell">{children}</div>
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pb-12 pt-28 sm:pt-32">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-[#D10E63]/[0.06] blur-3xl" />
        <div className="editorial-shell relative">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">
            Architecture
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-[40px] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[52px]">
            Comment les licences Unitalk s&rsquo;articulent
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#4E483F]">
            Alma Entreprise gouverne les ressources disponibles. Chaque Collaborateur IA reçoit
            ensuite une identité, des compétences, des applications, des canaux de communication et
            une capacité adaptés à ses missions.
          </p>
        </div>
      </section>

      {/* Distinctions */}
      <Section className="border-t border-[#DED6C8]">
        <SectionInner>
          <h2 className="text-[28px] font-bold tracking-[-0.03em]">Distinctions essentielles</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: 'Alma Entreprise', sub: 'Configure et gouverne', color: '#0055A4' },
              { label: 'Workspace & Desktop', sub: 'Permettent de travailler', color: '#22A06B' },
              { label: 'Licence Collaborateur IA', sub: 'Crée une identité capable d\'agir', color: '#D10E63' },
              { label: 'Capacité IA', sub: 'Finance l\'usage des modèles', color: '#E56910' },
              { label: 'Ressources dédiées', sub: 'Financent l\'infrastructure d\'exécution', color: '#8B5CF6' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#DED6C8] bg-white p-5"
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <h3 className="mt-3 font-sf text-[15px] font-bold">{item.label}</h3>
                <p className="mt-1 text-[13px] text-[#6B6560]">{item.sub}</p>
              </div>
            ))}
          </div>
        </SectionInner>
      </Section>

      {/* Alma Entreprise */}
      <Section id="connaissance-entreprise" className="bg-[#EAE3D4]">
        <SectionInner>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0055A4]/25 bg-[#0055A4]/[0.08] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#0055A4]">
            Licence
          </div>
          <h2 className="text-[32px] font-bold tracking-[-0.03em]">Alma Entreprise</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">
            Alma Entreprise configure et gouverne. Elle fournit le <strong>cadre de gestion</strong> :&nbsp;
            contrôle, connaissance, Stores, Gateway et infrastructure.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <TreeBranch label="Périmètre" items={almaTree} />
            <div className="flex flex-col justify-center gap-4 rounded-2xl border border-[#DED6C8] bg-[#FAF8F3] p-6">
              <p className="text-[28px] font-black text-[#1C1A17]">50 €<span className="text-sm font-normal text-[#6B6560]">/mois</span></p>
              <p className="text-sm leading-relaxed text-[#4E483F]">
                Inclut Alma, la coordinatrice de missions, le Workspace Web, Unitalk Desktop,
                les membres humains illimités, la gouvernance et l&rsquo;accès aux Stores.
              </p>
              <p className="text-xs text-[#857C6E]">
                Workspace &amp; Desktop sont <strong className="text-[#22A06B]">inclus</strong> avec Alma Entreprise.
              </p>
            </div>
          </div>
        </SectionInner>
      </Section>

      {/* Collaborateur IA */}
      <Section id="memoire-et-contexte">
        <SectionInner>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.08] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">
            Licence
          </div>
          <h2 className="text-[32px] font-bold tracking-[-0.03em]">Collaborateur IA</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">
            La Licence Collaborateur IA fournit les <strong>ressources individuelles</strong> :&nbsp;
            identité, environnement, profils métier, compétences, applications et outils de communication.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <TreeBranch label="Périmètre" items={collaboratorTree} />
            <div className="flex flex-col justify-center gap-4 rounded-2xl border border-[#DED6C8] bg-white p-6">
              <p className="text-[28px] font-black text-[#1C1A17]">49 €<span className="text-sm font-normal text-[#6B6560]">/mois</span></p>
              <p className="text-sm leading-relaxed text-[#4E483F]">
                Chaque Collaborateur IA possède sa propre identité vérifiée, son profil Hermes, ses
                profils métier illimités, ses compétences et ses canaux de communication directs
                (email, calendrier, téléphone).
              </p>
            </div>
          </div>
        </SectionInner>
      </Section>

      {/* Workspace & Desktop */}
      <Section className="bg-[#EAE3D4]">
        <SectionInner>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#22A06B]/25 bg-[#22A06B]/[0.08] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#22A06B]">
            Inclus avec Alma Entreprise
          </div>
          <h2 className="text-[32px] font-bold tracking-[-0.03em]">Workspace &amp; Desktop</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">
            Le Workspace Web et l&rsquo;application Desktop sont <strong className="text-[#22A06B]">inclus</strong> avec
            Alma Entreprise. Les membres humains sont illimités.
          </p>
          <div className="mt-8">
            <TreeBranch label="Périmètre" items={workspaceTree} />
          </div>
        </SectionInner>
      </Section>

      {/* Capacité IA */}
      <Section>
        <SectionInner>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E56910]/25 bg-[#E56910]/[0.08] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#C4560A]">
            Capacité
          </div>
          <h2 className="text-[32px] font-bold tracking-[-0.03em]">Capacité IA</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">
            La capacité finance la consommation des modèles via AI Gateway. Elle n&rsquo;inclut pas
            les profils, compétences ou applications — uniquement les tokens et la charge d&rsquo;action.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <TreeBranch label="Niveaux" items={capacityTree} />
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl border border-[#DED6C8] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#857C6E]">Fourchette de prix</p>
                <p className="mt-1 text-[28px] font-black text-[#1C1A17]">0 – 100 €<span className="text-sm font-normal text-[#6B6560]">/mois</span></p>
                <p className="mt-2 text-sm text-[#4E483F]">Par Collaborateur IA. BYOK : 0 €. Quart-temps : 25 €. Mi-temps : 50 €. Temps plein : 100 €.</p>
              </div>
              <p className="text-xs leading-relaxed text-[#857C6E] px-1">
                La capacité est attribuée <strong>par Collaborateur IA</strong>. Chaque identité possède
                sa propre capacité, facturée indépendamment.
              </p>
            </div>
          </div>
        </SectionInner>
      </Section>

      {/* Placement des éléments */}
      <Section className="bg-[#EAE3D4]">
        <SectionInner>
          <h2 className="text-[28px] font-bold tracking-[-0.03em]">Placement des éléments</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">
            Certains éléments sont gérés au niveau de l&rsquo;Entreprise, d&rsquo;autres sont
            attribués individuellement à chaque Collaborateur IA.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#DED6C8]">
                  <th className="py-3 pr-6 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#857C6E]">Élément</th>
                  <th className="py-3 pr-6 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#857C6E]">Gestion Entreprise</th>
                  <th className="py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#857C6E]">Attribution Collaborateur</th>
                </tr>
              </thead>
              <tbody>
                {placementRows.map(([item, org, collab]) => (
                  <tr key={item} className="border-b border-[#DED6C8]/60">
                    <td className="py-3 pr-6 font-bold text-[#1C1A17]">{item}</td>
                    <td className="py-3 pr-6 text-[#4E483F]">{org}</td>
                    <td className="py-3 text-[#4E483F]">{collab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionInner>
      </Section>

      {/* Résumé tarifaire */}
      <Section>
        <SectionInner>
          <h2 className="text-[28px] font-bold tracking-[-0.03em]">Résumé tarifaire</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">
            Cinq lignes conceptuelles. Le total dépend du nombre de Collaborateurs IA et de leur capacité.
          </p>
          <div className="mt-8 space-y-3">
            {priceLines.map((line) => (
              <div
                key={line.name}
                className="flex flex-col justify-between gap-2 rounded-2xl border border-[#DED6C8] bg-white p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-sf text-[15px] font-bold text-[#1C1A17]">{line.name}</h3>
                  <p className="mt-0.5 text-[13px] text-[#6B6560]">{line.desc}</p>
                </div>
                <span className={`shrink-0 font-mono text-sm font-bold ${
                  line.price === 'Inclus' ? 'text-[#22A06B]' : 'text-[#1C1A17]'
                }`}>
                  {line.price}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#4E483F]">
            <strong>Alma Entreprise gouverne les ressources disponibles.</strong> Chaque Collaborateur IA
            reçoit ensuite une identité, des compétences, des applications, des canaux de communication
            et une capacité adaptés à ses missions. Ce découpage garantit que chaque niveau est facturé
            pour ce qu&rsquo;il fournit réellement — pas plus, pas moins.
          </p>
        </SectionInner>
      </Section>

      <SiteFooter />
    </div>
  )
}
