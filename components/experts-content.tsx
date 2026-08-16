'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  Ban,
  Bot,
  Check,
  CircleDot,
  Clock3,
  Eye,
  FileCheck2,
  Fingerprint,
  Gauge,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const TRANSFORMATION = [
  ['01', 'Mission réelle', 'Un travail utile, un résultat observable et un responsable.'],
  ['02', 'Jugement humain', 'Les exceptions, les risques et les décisions non délégables.'],
  ['03', 'Collaborateur IA', 'Un rôle, des compétences, des sources, des outils et des limites.'],
  ['04', 'Tests contrôlés', 'Des cas réels, des erreurs documentées et des corrections.'],
  ['05', 'Transmission', 'Une équipe capable de contrôler et d’améliorer la méthode.'],
] as const

const GATES = [
  ['Recevoir la demande', 'IA', 'Rassembler le dossier et les échanges autorisés.'],
  ['Appliquer les règles', 'IA', 'Comparer le cas aux règles explicites et citer les sources.'],
  ['Détecter une exception', 'ALERTE', 'Suspendre le traitement et présenter le point ambigu.'],
  ['Arbitrer l’exception', 'EXPERT', 'Interpréter le cas et assumer la décision engageante.'],
  ['Préparer le résultat', 'IA', 'Produire le livrable selon la décision validée.'],
  ['Autoriser l’action', 'HUMAIN', 'Valider avant toute action irréversible ou sensible.'],
] as const

const DELIVERABLES = [
  'Mission cadrée et résultat attendu',
  'Méthode, sources et exceptions',
  'Matrice des validations humaines',
  'Collaborateur IA configuré',
  'Protocole et résultats de test',
  'Guide de contrôle pour l’équipe',
] as const

const ROLES = [
  {
    code: 'MÉTHODE',
    title: 'Expert métier',
    body: 'Il explique le travail réel, révèle les exceptions et assume les arbitrages qui exigent son jugement.',
    output: 'Produit : méthode et décisions réservées',
    href: '#mission-experte',
    cta: 'Demander un regard expert',
  },
  {
    code: 'CONSTRUCTION',
    title: 'Co-créateur IA',
    body: 'Il transforme la méthode en profil, compétences, mission, application métier et protocole de test.',
    output: 'Produit : Collaborateur IA testable',
    href: '/academy/formations/co-createur-ia',
    cta: 'Apprendre le métier',
  },
  {
    code: 'DÉPLOIEMENT',
    title: 'Partenaire Unitalk',
    body: 'Il connecte les applications, configure les droits et accompagne le déploiement chez le client.',
    output: 'Produit : capacité déployée et gouvernée',
    href: '/partenaires/deployer',
    cta: 'Découvrir le programme',
  },
] as const

export function ExpertsContent() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'
  const [mission, setMission] = useState('')

  const mailHref = `mailto:hello@unitalk.ai?subject=${encodeURIComponent(fr ? 'Regard expert sur une mission' : 'Expert review of a mission')}&body=${encodeURIComponent(`${fr ? 'Bonjour,\n\nVoici la mission pour laquelle un jugement expert peut être nécessaire :' : 'Hello,\n\nHere is the mission that may require expert judgment:'}\n\n${mission.trim() || (fr ? '[Décrivez la mission]' : '[Describe the mission]')}\n\n${fr ? 'Résultat attendu :\nDécisions à réserver à un humain :\nÉchéance :' : 'Expected result:\nDecisions to reserve for a human:\nTimeline:'}`)}`

  return (
    <main className="overflow-hidden bg-[#F3EFE6] pt-[76px] text-[#1C1A17]">
      <section className="relative min-h-[760px] border-b border-[#CFC5B5] px-5 py-16 sm:px-8 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden className="absolute -right-32 top-10 size-[34rem] rounded-full bg-[#D10E63]/[.07] blur-3xl" />
        <div className="editorial-shell relative grid gap-14 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">Mission réelle · Jugement humain · Capacité IA</p>
            <h1 className="mt-7 max-w-4xl font-sf text-[clamp(3.5rem,7vw,7.4rem)] font-semibold leading-[.86] tracking-[-.075em]">
              Ne cherchez pas<br />d’abord un <span className="text-[#D10E63]">expert.</span>
            </h1>
            <p className="mt-8 max-w-xl text-[18px] leading-8 text-[#4E483F]">Partez du travail à réussir. Rendez la méthode explicite. Réservez le jugement humain aux décisions qui l’exigent. Construisez l’IA autour du reste.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#mission-experte" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">Décrire une mission réelle<ArrowDown className="size-4" /></a>
              <a href="#methode" className="inline-flex min-h-12 items-center gap-2 border-b border-[#1C1A17] px-1 text-sm font-bold">Voir la méthode<ArrowRight className="size-4" /></a>
            </div>
          </div>

          <MissionStack />
        </div>
        <div className="editorial-shell relative mt-16 grid border-y border-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">
          {['La mission avant la technologie','Le jugement reste explicite','La preuve avant le déploiement','La méthode reste dans l’équipe'].map((item,index)=><p key={item} className="flex min-h-16 items-center gap-3 border-b border-[#CFC5B5] py-4 text-xs font-bold last:border-b-0 sm:border-r sm:px-4 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"><span className="font-mono text-[9px] text-[#B00C54]">0{index+1}</span>{item}</p>)}
        </div>
      </section>

      <section id="mission-experte" className="scroll-mt-24 bg-[#181615] px-5 py-20 text-[#FAF8F3] sm:px-8 sm:py-28">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">Carte de la mission</p>
            <h2 className="mt-5 font-sf text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[.92] tracking-[-.06em]">Où le jugement humain change-t-il le résultat ?</h2>
            <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#CFC6B8]">Décrivez le travail. Cette page ne prétend pas choisir automatiquement un expert : elle vous aide à préparer une demande précise.</p>
          </div>
          <div className="border border-white/15 bg-white/[.04] p-5 sm:p-8">
            <label htmlFor="expert-mission" className="text-sm font-bold">Quelle mission doit mieux fonctionner ?</label>
            <textarea id="expert-mission" value={mission} onChange={event=>setMission(event.target.value)} rows={6} placeholder="Ex. Traiter les demandes de remboursement, mais faire arbitrer les exceptions contractuelles par notre responsable juridique…" className="mt-4 w-full resize-y border border-white/15 bg-[#211E1A] p-5 text-[16px] leading-7 text-white outline-none placeholder:text-[#8F8579] focus:border-[#F2A4C5]" />
            <div className="mt-6 grid gap-px bg-white/15 sm:grid-cols-2">
              <article className="bg-[#181615] p-5"><Bot className="size-5 text-[#F2A4C5]"/><h3 className="mt-5 text-lg font-bold">Le Collaborateur IA peut</h3><ul className="mt-4 space-y-3 text-sm text-[#CFC6B8]">{['Rechercher et rassembler','Appliquer les règles écrites','Préparer un résultat','Signaler une exception'].map(item=><li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#45C578]"/>{item}</li>)}</ul></article>
              <article className="bg-[#181615] p-5"><Scale className="size-5 text-[#F2A4C5]"/><h3 className="mt-5 text-lg font-bold">L’humain doit encore</h3><ul className="mt-4 space-y-3 text-sm text-[#CFC6B8]">{['Définir les exceptions','Arbitrer les cas ambigus','Assumer les décisions sensibles','Valider les seuils de risque'].map(item=><li key={item} className="flex gap-2"><CircleDot className="mt-0.5 size-4 shrink-0 text-[#F2A4C5]"/>{item}</li>)}</ul></article>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4"><a href={mailHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">Envoyer ce cadrage à Unitalk<ArrowRight className="size-4"/></a><Link href="/decouvrir?source=experts" className="text-sm font-bold text-[#F2A4C5] underline underline-offset-4">Continuer avec Alma</Link></div>
            <p className="mt-4 text-xs leading-5 text-[#8F8579]">Le premier bouton ouvre votre messagerie. Rien n’est transmis automatiquement.</p>
          </div>
        </div>
      </section>

      <section id="methode" className="scroll-mt-24 border-b border-[#CFC5B5] px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell">
          <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">La ligne de transformation</p>
          <h2 className="mt-5 max-w-4xl font-sf text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[.92] tracking-[-.06em]">L’expert n’exécute pas tout.<br/><span className="text-[#D10E63]">Il rend le jugement transmissible.</span></h2>
          <div className="mt-14 grid border-l border-t border-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-5">{TRANSFORMATION.map(([number,title,body])=><article key={number} className="min-h-64 border-b border-r border-[#CFC5B5] p-6"><span className="font-mono text-xs font-black text-[#B00C54]">{number}</span><h3 className="mt-12 font-sf text-xl font-bold">{title}</h3><p className="mt-4 text-sm leading-7 text-[#625B50]">{body}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-[#EAE3D4] px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">Démonstration</p><h2 className="mt-5 font-sf text-[clamp(2.6rem,4.6vw,4.8rem)] font-semibold leading-[.94] tracking-[-.055em]">L’expert n’est pas dans la boucle partout.</h2><p className="mt-6 text-[16px] leading-8 text-[#4E483F]">Il intervient à une porte de jugement précise. Le reste du travail continue sans transformer chaque étape en réunion.</p></div>
          <div className="border border-[#C4BAAA] bg-[#F8F4EC]">
            <div className="flex items-center justify-between border-b border-[#C4BAAA] p-5"><div><p className="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-[#857C6E]">Mission exemple</p><h3 className="mt-1 font-sf text-xl font-bold">Traiter une demande de remboursement</h3></div><span className="hidden rounded-full bg-[#1C1A17] px-3 py-1 text-[10px] font-bold text-white sm:block">6 étapes</span></div>
            <div>{GATES.map(([title,actor,body],index)=><article key={title} className="grid gap-3 border-b border-[#D8D0C2] p-5 last:border-b-0 sm:grid-cols-[36px_1fr_90px] sm:items-center"><span className="font-mono text-[10px] text-[#857C6E]">0{index+1}</span><div><h4 className="font-bold">{title}</h4><p className="mt-1 text-xs leading-5 text-[#625B50]">{body}</p></div><span className={`w-fit font-mono text-[9px] font-black tracking-[.12em] ${actor==='IA'?'text-[#2E7D4F]':actor==='ALERTE'?'text-[#C05A24]':'text-[#B00C54]'}`}>{actor}</span></article>)}</div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#CFC5B5] px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell">
          <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">Trois interventions humaines</p>
          <h2 className="mt-5 max-w-3xl font-sf text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[.92] tracking-[-.06em]">Même mission.<br/>Trois responsabilités différentes.</h2>
          <div className="mt-12 grid gap-px bg-[#CFC5B5] lg:grid-cols-3">{ROLES.map((role,index)=><article key={role.code} className={`${index===1?'bg-[#D10E63] text-white':'bg-[#FBF9F3]'} flex min-h-[390px] flex-col p-7`}><p className={`font-mono text-[10px] font-black tracking-[.16em] ${index===1?'text-white/65':'text-[#B00C54]'}`}>{role.code}</p><h3 className="mt-10 font-sf text-3xl font-bold tracking-[-.04em]">{role.title}</h3><p className={`mt-5 text-sm leading-7 ${index===1?'text-white/80':'text-[#4E483F]'}`}>{role.body}</p><p className={`mt-6 border-t pt-5 text-xs font-bold ${index===1?'border-white/20':'border-[#D8D0C2]'}`}>{role.output}</p><Link href={role.href} className={`mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold ${index===1?'text-white':'text-[#B00C54]'}`}>{role.cta}<ArrowRight className="size-4"/></Link></article>)}</div>
        </div>
      </section>

      <section className="bg-[#181615] px-5 py-20 text-[#FAF8F3] sm:px-8 sm:py-28">
        <div className="editorial-shell grid gap-14 lg:grid-cols-[.82fr_1.18fr]">
          <div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">Dossier de livraison</p><h2 className="mt-5 font-sf text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[.92] tracking-[-.06em]">Ne payez pas pour des réunions. Récupérez une capacité.</h2><p className="mt-6 text-[16px] leading-8 text-[#CFC6B8]">Le bon accompagnement laisse des objets vérifiables que votre équipe peut reprendre.</p></div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-2">{DELIVERABLES.map((item,index)=><article key={item} className="min-h-32 bg-[#181615] p-5"><FileCheck2 className="size-4 text-[#F2A4C5]"/><span className="mt-5 block font-mono text-[9px] text-[#8F8579]">LIVRABLE {String(index+1).padStart(2,'0')}</span><h3 className="mt-2 text-sm font-bold">{item}</h3></article>)}</div>
        </div>
      </section>

      <Governance />

      <section id="devenir-expert" className="scroll-mt-24 border-t border-[#CFC5B5] bg-[#D10E63] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="editorial-shell">
          <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-white/65">Pour les professionnels</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><h2 className="font-sf text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[.88] tracking-[-.07em]">Votre méthode peut devenir une capacité.</h2><p className="max-w-xl text-[17px] leading-8 text-white/80">Vous pouvez transmettre votre expertise, apprendre à construire des Collaborateurs IA ou les déployer chez vos clients. Ce ne sont pas les mêmes métiers.</p></div>
          <div className="mt-12 grid gap-px bg-white/25 lg:grid-cols-3">
            <ProfessionalPath icon={<Fingerprint/>} title="Transmettre une méthode" body="Documentez un savoir-faire et contribuez aux missions pédagogiques de l’Academy." href="/academy/experts" cta="Contribuer à l’Academy"/>
            <ProfessionalPath icon={<Sparkles/>} title="Rejoindre le réseau" body="Formez-vous, faites évaluer une création, puis progressez vers l’agrément Co-créateur." href="/reseau-co-createurs" cta="Découvrir le programme pilote"/>
            <ProfessionalPath icon={<Gauge/>} title="Déployer chez des clients" body="Prenez en charge la vente, la configuration, les accès et l’accompagnement." href="/partenaires/deployer" cta="Voir le programme Partenaire"/>
          </div>
        </div>
      </section>
    </main>
  )
}

function MissionStack(){return <div className="relative mx-auto w-full max-w-xl pb-10 pt-8"><div className="absolute inset-x-10 top-3 h-[82%] rotate-3 border border-[#CFC5B5] bg-[#EAE3D4]"/><div className="absolute inset-x-5 top-6 h-[82%] -rotate-2 border border-[#CFC5B5] bg-[#FBF9F3]"/><div className="relative border border-[#1C1A17] bg-[#181615] p-6 text-white shadow-[0_34px_80px_-42px_rgba(24,22,21,.8)] sm:p-8"><div className="flex items-center justify-between border-b border-white/15 pb-5"><span className="font-mono text-[10px] font-black tracking-[.18em] text-[#F2A4C5]">DOSSIER M—017</span><span className="flex items-center gap-2 text-[10px] font-bold"><i className="size-2 rounded-full bg-[#45C578]"/>EN CADRAGE</span></div><p className="mt-7 font-mono text-[9px] uppercase tracking-[.16em] text-[#8F8579]">Mission</p><h2 className="mt-2 font-sf text-3xl font-bold tracking-[-.04em]">Traiter les réclamations clients</h2><div className="mt-7 space-y-3"><StackRow icon={<Bot/>} label="Collaborateur IA" value="Prépare, vérifie, signale"/><StackRow icon={<Scale/>} label="Jugement expert" value="Arbitre les exceptions"/><StackRow icon={<ShieldCheck/>} label="Validation humaine" value="Autorise l’action sensible"/></div><div className="mt-7 border-l-2 border-[#D10E63] bg-white/[.05] p-4"><p className="text-xs leading-6 text-[#CFC6B8]">L’expert ne reçoit pas toute la mission. Il intervient uniquement lorsque la règle ne suffit plus.</p></div></div></div>}

function StackRow({icon,label,value}:{icon:React.ReactNode;label:string;value:string}){return <div className="grid grid-cols-[28px_1fr] gap-3 border-b border-white/10 pb-3"><span className="[&>svg]:size-4 text-[#F2A4C5]">{icon}</span><div className="flex flex-wrap justify-between gap-2"><span className="text-xs text-[#8F8579]">{label}</span><strong className="text-xs">{value}</strong></div></div>}

function Governance(){return <section className="bg-[#FBF9F3] px-5 py-20 sm:px-8 sm:py-28"><div className="editorial-shell grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">Accès gouverné</p><h2 className="mt-5 font-sf text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[.93] tracking-[-.06em]">L’expert entre.<br/>Puis il ressort.</h2><p className="mt-6 text-[16px] leading-8 text-[#4E483F]">Son accès peut être limité à une mission, à quelques ressources et à une durée précise. Le travail transmis reste dans votre entreprise.</p></div><div className="border border-[#CFC5B5] bg-white"><div className="flex items-center justify-between border-b border-[#D8D0C2] p-5"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-[#1C1A17] text-white"><UserRoundCheck className="size-4"/></span><div><strong className="block text-sm">Rôle temporaire</strong><small className="text-[#857C6E]">Expert externe · Mission M—017</small></div></div><span className="flex items-center gap-1 text-[10px] font-bold text-[#2E7D4F]"><ShieldCheck className="size-4"/>LIMITÉ</span></div><div className="grid gap-px bg-[#D8D0C2] sm:grid-cols-2"><AccessBlock icon={<Eye/>} title="Peut consulter" items={['Dossier de la mission','Méthode et cas de test','Commentaires de validation']}/><AccessBlock icon={<Ban/>} title="Ne peut pas" items={['Voir les autres espaces','Lancer une action sensible','Exporter les données']}/></div><div className="flex flex-wrap justify-between gap-4 border-t border-[#D8D0C2] p-5"><span className="flex items-center gap-2 text-xs font-bold"><Clock3 className="size-4 text-[#B00C54]"/>Accès : 30 jours</span><span className="flex items-center gap-2 text-xs font-bold text-[#B0483C]"><LockKeyhole className="size-4"/>Révocable à tout moment</span></div></div></div></section>}

function AccessBlock({icon,title,items}:{icon:React.ReactNode;title:string;items:readonly string[]}){return <article className="bg-white p-5"><span className="[&>svg]:size-4 text-[#B00C54]">{icon}</span><h3 className="mt-4 text-sm font-bold">{title}</h3><ul className="mt-3 space-y-2 text-xs text-[#625B50]">{items.map(item=><li key={item}>• {item}</li>)}</ul></article>}

function ProfessionalPath({icon,title,body,href,cta}:{icon:React.ReactNode;title:string;body:string;href:string;cta:string}){return <article className="flex min-h-72 flex-col bg-[#D10E63] p-6 sm:p-8"><span className="[&>svg]:size-5 text-white/70">{icon}</span><h3 className="mt-8 font-sf text-2xl font-bold">{title}</h3><p className="mt-4 text-sm leading-7 text-white/75">{body}</p><Link href={href} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold">{cta}<ArrowRight className="size-4"/></Link></article>}
