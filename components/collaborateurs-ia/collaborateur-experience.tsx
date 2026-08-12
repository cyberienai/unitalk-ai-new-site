'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const HERO_STEPS = ['Identité', 'Communication', 'Organisation', 'Environnement', 'Prêt'] as const
const HERO_STEPS_EN = ['Identity', 'Communication', 'Organization', 'Environment', 'Ready'] as const

export function CollaborateurExperience() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <main>
      <section className="px-5 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)] lg:gap-12">
          <div>
            <h1 className="hero-heading">{t.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#4E483F]">{t.heroBody}</p>
            <p className="mt-3 max-w-xl text-[16px] font-semibold text-[#1C1A17]">{t.heroMemory}</p>
            <Link href="/decouvrir" className="mt-7 inline-flex rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-bold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.create} →</Link>
            <p className="mt-3 text-[12px] text-[#6E665A]">{t.trial}</p>
          </div>
          <LucasSetup lang={lang} />
        </div>
      </section>

      <LightSection kicker={t.presenceKicker} title={t.presenceTitle} body={[t.presenceBody1, t.presenceBody2]}>
        <div className="grid gap-4 lg:grid-cols-2"><ProfessionalProfile lang={lang} /><PublicProfile lang={lang} /></div>
        <Organization lang={lang} />
      </LightSection>

      <DarkEnvironment />
      <GatewaySection lang={lang} />
      <MemorySection lang={lang} />
      <EvolutionSection lang={lang} />

      <section className="px-5 py-16 text-center sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-sf text-[32px] font-bold tracking-[-0.03em] sm:text-[42px]">{t.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4E483F]">{t.finalBody}</p>
          <Link href="/decouvrir" className="mt-7 inline-flex rounded-full bg-[#D10E63] px-7 py-3.5 text-sm font-bold text-white outline-none transition-all hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.create} →</Link>
          <p className="mt-3 text-[12px] text-[#6E665A]">{t.trial}</p>
        </div>
      </section>
    </main>
  )
}

function LucasSetup({ lang }: { lang: 'fr' | 'en' }) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(reduce ? 4 : 0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (reduce || paused) return
    const timer = window.setInterval(() => setStep((current) => (current + 1) % 5), 1900)
    return () => window.clearInterval(timer)
  }, [paused, reduce])
  const rows = SETUP_ROWS[lang][step]
  return (
    <div className="min-h-[350px] rounded-3xl border border-[#DED6C8] bg-[#FAF8F3] p-5 shadow-[0_28px_65px_-48px_rgba(28,26,23,0.5)] sm:p-6">
      <div className="flex items-start justify-between gap-4"><div><p className="font-sf text-xl font-bold">Lucas</p><p className="text-xs text-[#6E665A]">Collaborateur IA · {lang === 'fr' ? 'Nature IA explicite' : 'Explicit AI nature'}</p></div><button type="button" onClick={() => setPaused((v) => !v)} aria-label={paused ? (lang === 'fr' ? 'Reprendre l’animation' : 'Resume animation') : (lang === 'fr' ? 'Mettre l’animation en pause' : 'Pause animation')} className="rounded-full px-2 py-1 text-xs font-semibold text-[#B00C54] outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50">{paused ? (lang === 'fr' ? 'Reprendre' : 'Resume') : 'Pause'}</button></div>
      <div className="mt-5 flex flex-wrap gap-1.5">{HERO_STEPS.map((label, i) => <button key={label} type="button" onClick={() => setStep(i)} aria-pressed={step === i} className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50 ${step === i ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#DED6C8] text-[#6E665A]'}`}>{lang === 'fr' ? label : HERO_STEPS_EN[i]}</button>)}</div>
      <div className="mt-5 border-t border-[#DED6C8] pt-4"><AnimatePresence mode="wait"><motion.dl key={step} initial={reduce ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -4 }} transition={{ duration: reduce ? 0 : 0.2 }} className="space-y-1">{rows.map(([label, value]) => <Row key={label} label={label} value={value} />)}</motion.dl></AnimatePresence></div>
    </div>
  )
}

function LightSection({ kicker, title, body, children }: { kicker: string; title: string; body: string[]; children: React.ReactNode }) {
  return <section className="px-5 py-14 sm:px-8 sm:py-20"><div className="mx-auto max-w-[1200px]"><Eyebrow>{kicker}</Eyebrow><h2 className="mt-3 max-w-4xl text-balance font-sf text-[30px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">{title}</h2>{body.map((p) => <p key={p} className="mt-3 max-w-3xl text-pretty text-[15px] leading-relaxed text-[#4E483F]">{p}</p>)}<div className="mt-7 sm:mt-8">{children}</div></div></section>
}

function ProfessionalProfile({ lang }: { lang: 'fr' | 'en' }) {
  const rows = lang === 'fr' ? [['Prénom','Lucas'],['Visage','Choisi par Solvea'],['Voix','Française · Claire'],['Nature','Intelligence artificielle'],['Email','Actif'],['Calendrier','Disponible'],['Téléphone','Actif'],['Profil public','Publié']] : [['First name','Lucas'],['Face','Chosen by Solvea'],['Voice','French · Clear'],['Nature','Artificial intelligence'],['Email','Active'],['Calendar','Available'],['Phone','Active'],['Public profile','Published']]
  return <Proof title="Lucas" subtitle="Collaborateur IA · Relation client · Solvea">{rows.map(([a,b]) => <Row key={a} label={a} value={b} />)}</Proof>
}

function PublicProfile({ lang }: { lang: 'fr' | 'en' }) {
  return <Proof title="unitalk.ai/lucas" subtitle={lang === 'fr' ? 'Lucas · Collaborateur IA · Nature IA explicite' : 'Lucas · AI Collaborator · Explicit AI nature'}><p className="text-sm font-semibold">{lang === 'fr' ? 'Je peux vous aider à :' : 'I can help you:'}</p><ul className="mt-3 space-y-2 text-sm text-[#4E483F]"><li>• {lang === 'fr' ? 'suivre une réclamation' : 'track a complaint'}</li><li>• {lang === 'fr' ? 'préparer un rendez-vous' : 'prepare a meeting'}</li><li>• {lang === 'fr' ? 'retrouver l’état d’un dossier' : 'find a case status'}</li></ul><div aria-label={lang === 'fr' ? 'Canaux disponibles dans cette maquette' : 'Channels available in this mockup'} className="mt-5 flex flex-wrap gap-2 text-xs text-[#6E665A]"><span>Email</span><span>·</span><span>{lang === 'fr' ? 'Rendez-vous' : 'Meetings'}</span><span>·</span><span>{lang === 'fr' ? 'Appel' : 'Call'}</span></div></Proof>
}

function Organization({ lang }: { lang: 'fr' | 'en' }) {
  const [scope, setScope] = useState('team')
  return <div className="mt-8 grid gap-5 rounded-3xl border border-[#DED6C8] bg-[#FAF8F3] p-5 lg:grid-cols-[1fr_20rem]"><div><h3 className="font-sf text-xl font-bold">{lang === 'fr' ? 'Il sait où se trouve sa place dans l’entreprise.' : 'It knows its place in the company.'}</h3><div className="mt-5 border-l-2 border-[#DED6C8] pl-5"><p className="font-bold">Solvea</p><p className="mt-3 text-sm">Sophie Martin · Humain</p><div className="mt-3 rounded-xl bg-white p-3 text-sm"><b>Lucas · IA</b><br />Relation client · {scope}</div><p className="mt-3 text-sm">Emma · IA · Planification</p></div></div><fieldset><legend className="text-xs font-bold uppercase text-[#6E665A]">Rattacher Lucas à</legend>{['person','team','department','organization'].map((s) => <label key={s} className="mt-3 flex gap-2 text-sm"><input type="radio" name="scope" checked={scope === s} onChange={() => setScope(s)} />{s}</label>)}<p className="mt-5 text-sm font-semibold">Ses responsabilités peuvent évoluer. Son identité reste.</p><p className="mt-3 text-xs text-[#6E665A]">Identités, organisations et appartenances gérées avec Clerk.</p></fieldset></div>
}

function DarkEnvironment() {
  return <section className="bg-[#1C1A17] px-5 py-16 text-[#F3EFE6] sm:px-8 sm:py-20"><div className="mx-auto max-w-[1200px]"><Eyebrow dark>Son propre environnement</Eyebrow><h2 className="mt-3 font-sf text-[30px] font-bold sm:text-[40px]">Son propre environnement. Les outils de votre entreprise.</h2><p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#C9C0B5]">Chaque Collaborateur IA repose sur un agent Hermes isolé dans son propre environnement, avec des ressources non partagées.</p><div className="mt-8 grid gap-5 lg:grid-cols-2"><Proof dark title="Serveur privé de Lucas" subtitle="Actif">{[['Stockage','Dédié'],['Mémoire vive','RAM dédiée'],['Processeur','CPU dédié'],['Fichiers','Disponibles'],['Navigateur Internet','Autorisé'],['Exécution de code','Disponible'],['Tâches planifiées','Actives'],['Secrets','Protégés'],['Hermes','Open source']].map(([a,b]) => <Row key={a} label={a} value={b} dark />)}</Proof><div className="space-y-3"><Activity title="Code" body="analyse_clients.py · 842 dossiers analysés · 17 anomalies détectées" /><Activity title="Navigateur" body="Recherche autorisée · 12 sources consultées · Résultat documenté" /><Activity title="Planification" body="Relancer les dossiers sans réponse · Demain · 09:00" /></div></div><Applications /><div className="mt-10 border-t border-white/15 pt-6"><p className="font-sf text-xl font-bold">Propulsé par Hermes, l’agent autonome open source de Unitalk.</p><p className="mt-2 text-sm text-[#C9C0B5]">Hermes lui donne sa capacité d’action. Unitalk lui donne son identité et sa place dans l’entreprise.</p><Link href="/agent-hermes" className="mt-4 inline-flex text-sm font-bold text-[#F2A4C5]">Découvrir Hermes →</Link></div></div></section>
}

function Applications() {
  return <div className="mt-10"><h3 className="font-sf text-2xl font-bold">Plus de 3 000 applications dans lesquelles agir.</h3><p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#C9C0B5]">Les applications sont connectées par OAuth. L’entreprise choisit les données consultables et les actions autorisées.</p><div className="mt-5 flex flex-wrap gap-2 text-sm text-[#E7DED3]">CRM · Email · Calendrier · Messageries · Documents · Stockage · Finance · Support · + Plus de 3 000 applications</div><div className="mt-5 grid gap-3 sm:grid-cols-3"><Activity title="Connexion OAuth" body="Validation humaine" /><Activity title="Connecteurs d’applications" body="Actions disponibles" /><Activity title="Droits" body="Définis par l’organisation" /></div><Proof dark title="Email" subtitle="Permissions"><Row label="Lire les messages" value="Autorisé" dark /><Row label="Préparer une réponse" value="Autorisé" dark /><Row label="Envoyer" value="Validation requise" dark /><Row label="Supprimer" value="Interdit" dark /></Proof><p className="mt-5 font-semibold">Il n’accède pas à tout. Il accède à ce dont son travail a besoin.</p><Link href="/collaborateurs-ia/applications" className="mt-5 inline-flex text-sm font-bold text-[#F2A4C5]">Explorer les applications →</Link></div>
}

function GatewaySection({ lang }: { lang: 'fr' | 'en' }) {
  const [reviewing, setReviewing] = useState(false)
  return <LightSection kicker="Unitalk AI Gateway" title="Il ne dépend pas d’un seul modèle." body={[`L’AI Gateway donne à Lucas accès aux modèles disponibles et autorisés : GPT, Claude, Gemini, DeepSeek et modèles privés.`, 'Le Collaborateur reste. Le modèle peut changer.']}><div className="grid gap-5 lg:grid-cols-2"><Proof title="AI Gateway · Lucas" subtitle="Texte · Images · Audio · Vidéo">{[['GPT','Actif'],['Claude','Actif'],['Gemini','Actif'],['DeepSeek','Actif'],['Modèles privés','Selon configuration'],['Paiement','Crédits · Clés API · Hybride']].map(([a,b]) => <Row key={a} label={a} value={b} />)}</Proof><Proof title="Mixture of Agents" subtitle="Optionnel · Selon la configuration et la mission"><motion.div animate={reviewing ? { opacity: [0.65, 1], y: [4, 0] } : { opacity: 1 }} className="text-center text-sm">GPT　 Claude　 Gemini<br />↓<br /><b>Modèle de revue</b><br />Compare · vérifie · synthétise<br />↓<br /><b>Lucas · Résultat proposé</b></motion.div><button type="button" onClick={() => setReviewing((value) => !value)} className="mx-auto mt-4 block rounded-full border border-[#DED6C8] px-3 py-1.5 text-xs font-semibold text-[#B00C54] outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]/50">{reviewing ? 'Réinitialiser la revue' : 'Examiner avec plusieurs modèles'}</button><p className="mt-5 text-sm text-[#4E483F]">Plusieurs modèles proposent. Un modèle de revue vérifie. Le Collaborateur IA restitue.</p></Proof></div><Link href="/ai-gateway" className="mt-5 inline-flex text-sm font-bold text-[#D10E63]">Découvrir AI Gateway →</Link></LightSection>
}

function MemorySection({ lang }: { lang: 'fr' | 'en' }) {
  return <LightSection kicker="Mémoire gouvernée" title="Il partage ce que votre entreprise sait. Il conserve ce que son travail lui apprend." body={['Lucas accède au contexte partagé autorisé par Solvea. Son expérience propre conserve uniquement les éléments validés.']}><div className="grid gap-4 lg:grid-cols-2"><Proof title="Contexte de Solvea" subtitle="Partagé selon les droits"><p className="text-sm leading-7">Produits et services<br />Clients<br />Procédures<br />Documents<br />Décisions<br />Terminologie</p></Proof><Proof title="Expérience de Lucas" subtitle="Gouvernée"><p className="text-sm leading-7">Dossiers suivis<br />Préférences confirmées<br />Méthodes éprouvées<br />Corrections validées<br />Contexte de ses responsabilités</p><p className="mt-3 rounded-lg bg-[#E8F5EC] p-2 text-xs text-[#257A43]">Claire préfère être rappelée avant 10 h · Validée</p></Proof></div><div className="mt-4 rounded-2xl border border-[#DED6C8] bg-white p-4"><p className="text-xs font-bold uppercase text-[#6E665A]">Exemple de proposition gouvernée</p><p className="mt-2 text-sm">Claire préfère être rappelée avant 10 h.</p><p className="mt-3 text-xs text-[#6E665A]">Ne pas mémoriser · Corriger · Conserver</p></div></LightSection>
}

function EvolutionSection({ lang }: { lang: 'fr' | 'en' }) {
  const [tab, setTab] = useState<'profile'|'skill'>('profile')
  const [added, setAdded] = useState<string[]>([])
  return <LightSection kicker="Prêt dès le premier jour" title="Des capacités déjà installées. De nouvelles responsabilités à la demande." body={['Réunions, documents, images et vidéo rejoignent Lucas avec une identité inchangée. Les profils métier et les compétences sont illimités.']}><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{['Réunions','Documents','Images','Vidéo'].map((x) => <Proof key={x} title={x} subtitle="Identité inchangée"><p className="text-sm text-[#4E483F]">Analyser · Créer · Résumer · Transformer</p></Proof>)}</div><h3 className="mt-10 font-sf text-2xl font-bold">Ajoutez-lui un rôle ou un savoir-faire quand vous en avez besoin.</h3><div role="tablist" className="mt-5 flex gap-2"><button role="tab" aria-selected={tab==='profile'} onClick={() => setTab('profile')} className="rounded-full border px-4 py-2 text-sm">Profils métier</button><button role="tab" aria-selected={tab==='skill'} onClick={() => setTab('skill')} className="rounded-full border px-4 py-2 text-sm">Compétences</button></div><Proof title={tab==='profile'?'Chargé de fidélisation':'Préparer un suivi personnalisé'} subtitle={tab==='profile'?'Une responsabilité durable.':'Un savoir-faire applicable.'}><p className="text-sm leading-7">• réunir l’historique utile<br />• identifier les attentes<br />• préparer le prochain contact</p><button onClick={() => setAdded((a) => [...new Set([...a, tab])])} className="mt-4 rounded-full bg-[#D10E63] px-4 py-2 text-xs font-bold text-white">Ajouter à Lucas</button><Link href={tab==='profile'?'/collaborateurs-ia/profils-metier':'/collaborateurs-ia/competences'} className="mt-3 block text-sm font-bold text-[#D10E63]">Explorer →</Link></Proof>{added.length > 0 && <p className="mt-4 text-sm font-semibold">Lucas · Identité inchangée · Mémoire conservée · Rattachement inchangé</p>}</LightSection>
}

function Proof({ title, subtitle, dark = false, children }: { title: string; subtitle: string; dark?: boolean; children: React.ReactNode }) {
  return <div className={`rounded-2xl border p-5 ${dark ? 'border-white/15 bg-white/[0.04]' : 'border-[#DED6C8] bg-[#FAF8F3]'}`}><p className="font-sf text-lg font-bold">{title}</p><p className={`mt-1 text-xs ${dark ? 'text-[#C9C0B5]' : 'text-[#6E665A]'}`}>{subtitle}</p><div className="mt-4">{children}</div></div>
}
function Row({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) { return <div className={`flex items-baseline justify-between gap-3 border-b py-2 text-sm last:border-0 ${dark ? 'border-white/10' : 'border-[#E5DED2]'}`}><dt className={dark?'text-[#C9C0B5]':'text-[#6E665A]'}>{label}</dt><dd className="text-right font-semibold">{value}</dd></div> }
function Activity({ title, body }: { title: string; body: string }) { return <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4"><p className="text-xs font-bold uppercase text-[#F2A4C5]">{title}</p><p className="mt-2 text-sm leading-relaxed text-[#E7DED3]">{body}</p></div> }
function Eyebrow({ children, dark=false }: { children: React.ReactNode; dark?: boolean }) { return <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${dark?'text-[#F2A4C5]':'text-[#B00C54]'}`}>{children}</p> }

const SETUP_ROWS = {
  fr: [
    [['Prénom','Lucas'],['Visage','Défini'],['Voix','Définie']],
    [['Email','Actif'],['Calendrier','Disponible'],['Téléphone','Actif'],['Profil public','Publié']],
    [['Entreprise','Solvea'],['Rattachement','Équipe Relation client'],['Référente','Sophie Martin'],['Statut','Membre actif']],
    [['Stockage','Dédié'],['RAM','Dédiée'],['CPU','Dédié'],['Navigateur','Disponible'],['Code','Disponible'],['Planification','Active']],
    [['Identité','Active'],['Communication','Active'],['Serveur privé','Actif'],['AI Gateway','Connectée'],['Applications','Autorisées']],
  ],
  en: [
    [['First name','Lucas'],['Face','Defined'],['Voice','Defined']],
    [['Email','Active'],['Calendar','Available'],['Phone','Active'],['Public profile','Published']],
    [['Company','Solvea'],['Team','Customer relations'],['Manager','Sophie Martin'],['Status','Active member']],
    [['Storage','Dedicated'],['RAM','Dedicated'],['CPU','Dedicated'],['Browser','Available'],['Code','Available'],['Scheduling','Active']],
    [['Identity','Active'],['Communication','Active'],['Private server','Active'],['AI Gateway','Connected'],['Applications','Authorized']],
  ],
} as const

const COPY = {
  fr: { heroTitle:'Prêt à accomplir vos missions.', heroBody:'Un Collaborateur IA possède une identité professionnelle, appartient à votre organisation et travaille depuis son propre environnement avec les modèles et les applications que vous autorisez.', heroMemory:'Il développe ses compétences au fil de vos missions.', create:'Créer mon Collaborateur IA', trial:'Sept jours pour une première mission · 1 million de tokens préchargés · Sans carte bancaire', presenceKicker:'Une présence professionnelle', presenceTitle:'Une identité que vos équipes et vos contacts reconnaissent.', presenceBody1:'Chaque Collaborateur IA possède un prénom, un visage et une voix choisis par l’entreprise. Sa nature artificielle reste toujours explicite.', presenceBody2:'Son email, son calendrier, son téléphone et son profil public permettent à vos contacts d’interagir selon vos règles.', finalTitle:'Confiez-lui une première mission.', finalBody:'Donnez-lui un prénom, décrivez le travail à accomplir et laissez Alma préparer la suite. Votre Collaborateur IA rejoint votre organisation avec son identité et son propre environnement.' },
  en: { heroTitle:'Ready to accomplish your missions.', heroBody:'An AI Collaborator has a professional identity, belongs to your organization and works from its own environment with the models and applications you authorize.', heroMemory:'It develops its skills through your missions.', create:'Create my AI Collaborator', trial:'Seven days for a first mission · 1 million tokens preloaded · No credit card', presenceKicker:'A professional presence', presenceTitle:'An identity your teams and contacts recognize.', presenceBody1:'Each AI Collaborator has a first name, face and voice chosen by the company. Its artificial nature always remains explicit.', presenceBody2:'Its email, calendar, phone and public profile let contacts interact according to your rules.', finalTitle:'Assign a first mission.', finalBody:'Give it a first name, describe the work and let Alma prepare the rest. Your AI Collaborator joins your organization with its identity and own environment.' },
} as const
