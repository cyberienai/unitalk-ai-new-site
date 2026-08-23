"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Mail, MessageCircle, Mic, Phone, ShieldCheck, Square } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const SIGNUP = "/inscription?source=alma-profile&intent=nouvelle-mission";

type SpeechResultEvent = { results: ArrayLike<{ 0: { transcript: string } }> };
type SpeechRecognitionInstance = { lang: string; continuous: boolean; interimResults: boolean; onresult: ((event: SpeechResultEvent) => void) | null; onend: (() => void) | null; onerror: (() => void) | null; start: () => void; stop: () => void; abort: () => void };

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === "undefined") return null;
  const speechWindow = window as typeof window & { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
}

export function AlmaFinalContent() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const router = useRouter();
  const [need, setNeed] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return;
    setVoiceSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "fr" ? "fr-FR" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = event => {
      let transcript = "";
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript;
      setNeed(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    return () => { recognition.abort(); recognitionRef.current = null; };
  }, [lang]);

  function toggleListening() {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (listening) { recognition.stop(); return; }
    setListening(true);
    try { recognition.start(); } catch { setListening(false); }
  }

  function startConversation() {
    const clean = need.trim();
    if (!clean) { router.push(SIGNUP); return; }
    const draftId = `draft_${crypto.randomUUID()}`;
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })); } catch {}
    router.push(`/decouvrir?source=alma-profile&draft=${encodeURIComponent(draftId)}`);
  }

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="relative border-b border-[#D8D0C2] px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="editorial-shell relative grid gap-10 lg:grid-cols-[1.12fr_.88fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">Alma / {t.role}</p>
            <h1 className="mt-6 max-w-[900px] text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[.9] tracking-[-.07em]"><span className="block">{t.title[0]}</span><span className="block text-[#D10E63]">{t.title[1]}</span></h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#parler" className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white">{t.primary}<ArrowRight className="ml-2 size-4" /></a><Link href="/@unitalk/alma" className="inline-flex min-h-12 items-center rounded-full border border-[#BFB5A5] bg-[#FAF8F3] px-7 text-sm font-bold">{t.profile}</Link></div>
            <p className="mt-4 text-xs font-semibold text-[#6E665A]">{t.heroNote}</p>
          </div>
          <div className="relative min-h-[410px] overflow-hidden rounded-t-[9rem] bg-[#D8D0C2]">
            <Image src="/alma-avatar.png" alt={t.alt} fill priority className="object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#181615] via-[#181615]/85 to-transparent px-7 pb-7 pt-28 text-white"><p className="text-3xl font-semibold">Alma</p><p className="mt-1 text-sm text-white/70">{t.verified}</p></div>
          </div>
        </div>
        <div className="editorial-shell relative mt-10 grid border-y border-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">{t.proofs.map((proof, index) => <p key={proof} className="flex min-h-16 items-center gap-4 border-b border-[#CFC5B5] py-3 text-sm font-bold sm:border-r lg:border-b-0 lg:last:border-r-0"><span className="font-mono text-[9px] text-[#B00C54]">0{index + 1}</span>{proof}</p>)}</div>
      </section>

      <section id="parler" className="bg-[#181615] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="editorial-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><Kicker dark>{t.liveKicker}</Kicker><h2 className="mt-5 text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.liveTitle}</h2><p className="mt-6 max-w-lg text-[16px] leading-8 text-[#CFC6B8]">{t.liveLead}</p></div>
          <div className="rounded-[2rem] border border-white/10 bg-[#211E1B] p-6 sm:p-9">
            <div className="flex items-center gap-3"><Image src="/alma-avatar.png" alt="" width={48} height={48} aria-hidden className="size-12 rounded-full object-cover ring-2 ring-[#D10E63]/40"/><div><p className="font-bold">Alma</p><p className="text-xs text-[#AFA397]">{t.available}</p></div></div>
            <label htmlFor="alma-need" className="mt-8 block font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.prompt}</label>
            <div className="relative mt-3"><textarea id="alma-need" value={need} onChange={event => setNeed(event.target.value)} rows={5} placeholder={listening ? t.listening : t.placeholder} className="w-full resize-none border-b border-white/20 bg-transparent py-4 pr-14 text-xl leading-8 text-white outline-none placeholder:text-[#756E65] focus:border-[#F2A4C5]" />{voiceSupported && <button type="button" onClick={toggleListening} aria-label={listening ? t.voiceStop : t.voiceStart} aria-pressed={listening} className={`absolute right-0 top-3 flex size-11 items-center justify-center rounded-full ${listening ? "bg-[#D10E63]" : "bg-white/10 text-[#F2A4C5]"}`}>{listening ? <Square className="size-3.5" fill="currentColor"/> : <Mic className="size-4"/>}</button>}</div>
            <div className="mt-5 flex flex-wrap gap-2">{t.examples.map(example => <button key={example} type="button" onClick={() => setNeed(example)} className="rounded-full border border-white/15 px-3.5 py-2 text-left text-xs font-semibold text-[#CFC6B8] hover:border-[#F2A4C5] hover:text-white">{example}</button>)}</div>
            <button type="button" onClick={startConversation} className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#D10E63] px-7 text-sm font-bold">{need.trim() ? t.continue : t.start}<ArrowRight className="ml-2 size-4" /></button>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28"><div className="editorial-shell"><Kicker>{t.lifecycleKicker}</Kicker><h2 className="mt-5 max-w-5xl text-[clamp(2.7rem,5vw,5.2rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.lifecycleTitle}</h2><div className="mt-14 border-t border-[#C8BDAC]">{t.lifecycle.map(([title, body], index) => <article key={title} className="grid gap-3 border-b border-[#C8BDAC] py-7 sm:grid-cols-[70px_.7fr_1.3fr] sm:items-center"><p className="font-mono text-[10px] font-black text-[#B00C54]">0{index + 1}</p><h3 className="text-2xl font-semibold tracking-[-.035em]">{title}</h3><p className="text-sm leading-7 text-[#625B50]">{body}</p></article>)}</div></div></section>

      <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-20 sm:px-8 sm:py-28"><div className="editorial-shell grid gap-12 lg:grid-cols-[.78fr_1.22fr]"><div><Kicker>{t.channelsKicker}</Kicker><h2 className="mt-5 text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.channelsTitle}</h2><p className="mt-6 text-[16px] leading-8 text-[#4E483F]">{t.channelsLead}</p><p className="mt-5 text-xs font-bold text-[#B00C54]">{t.channelsNote}</p></div><div className="grid gap-px overflow-hidden rounded-[2rem] border border-[#CFC5B5] bg-[#CFC5B5] sm:grid-cols-2">{t.channels.map(([name, body], index) => { const Icon = index === 0 ? MessageCircle : index === 1 ? Phone : index === 2 ? Mail : MessageCircle; return <article key={name} className="min-h-44 bg-[#FAF8F3] p-6"><Icon className="size-5 text-[#D10E63]"/><h3 className="mt-8 text-xl font-semibold">{name}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{body}</p></article> })}</div></div></section>

      <section className="bg-[#D10E63] px-5 py-20 text-white sm:px-8 sm:py-28"><div className="editorial-shell"><Kicker dark>{t.scaleKicker}</Kicker><div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><h2 className="max-w-5xl text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.07em]">{t.scaleTitle}</h2><p className="text-[17px] leading-8 text-white/80">{t.scaleLead}</p></div><div className="mt-14 grid border-y border-white/25 sm:grid-cols-2 lg:grid-cols-4">{t.scaleItems.map(([title, body]) => <article key={title} className="border-b border-white/20 py-7 sm:border-r sm:px-6 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-white/75">{body}</p></article>)}</div></div></section>

      <section className="bg-[#181615] px-5 py-20 text-white sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><Kicker dark>{t.handoffKicker}</Kicker><h2 className="mt-5 max-w-4xl text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.handoffTitle}</h2><p className="mt-6 max-w-2xl text-[16px] leading-8 text-[#CFC6B8]">{t.handoffLead}</p></div><div className="flex min-w-64 flex-col gap-3"><Link href={SIGNUP} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold">{t.primary}<ArrowRight className="ml-2 size-4" /></Link><Link href="/@unitalk/alma" className="text-center text-sm font-bold underline decoration-white/30 underline-offset-4">{t.verify}</Link></div></div></section>
    </main>
  );
}

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <p className={`font-mono text-[10px] font-black uppercase tracking-[.2em] ${dark ? "text-[#F2A4C5]" : "text-[#B00C54]"}`}>{children}</p>; }

const COPY = {
  fr: {
    role: "Responsable IA de la relation client",
    title: ["Une relation client qui", "ne repart jamais de zéro."],
    lead: "Alma informe, qualifie, recommande, forme et accompagne chaque client Unitalk. Elle poursuit la même relation sur les canaux autorisés et transmet le contexte à un humain lorsqu’une décision ou une expertise l’exige.",
    primary: "Parler à Alma", profile: "Voir son identité vérifiée", heroNote: "Une Collaboratrice IA réelle, opérée par Unitalk · Actions sensibles sous contrôle humain",
    alt: "Alma, responsable IA de la relation client Unitalk", verified: "Identité IA vérifiée · Rattachée à Unitalk",
    proofs: ["Disponible à chaque étape", "Mémoire relationnelle gouvernée", "Plusieurs canaux, un même contexte", "Relais humain préparé"],
    liveKicker: "Alma en action", liveTitle: "Commencez par une vraie demande.", liveLead: "Posez une question, décrivez un besoin ou demandez une démonstration. Alma qualifie votre intention et prépare la prochaine étape sans vous imposer un formulaire.", available: "Disponible sur le site Unitalk", prompt: "Que voulez-vous accomplir ?", placeholder: "Ex. Évaluez nos besoins et recommandez-nous un premier cas d’usage…", listening: "Je vous écoute…", voiceStart: "Parler à Alma", voiceStop: "Arrêter l’écoute", examples: ["Évaluer notre maturité IA", "Organiser une démonstration", "Former mon équipe", "Parler à un ingénieur IA"], continue: "Continuer avec Alma", start: "Créer mon espace et parler à Alma",
    lifecycleKicker: "Relation continue", lifecycleTitle: "Du premier contact au développement du compte.", lifecycle: [["Informer", "Répondre aux questions produit, techniques, tarifaires et de sécurité."], ["Évaluer", "Conduire un entretien écrit ou vocal, comprendre le contexte et qualifier le besoin."], ["Recommander", "Proposer une mission, une démonstration, une formation ou le bon Collaborateur IA."], ["Activer", "Préparer les accès, rendez-vous, validations et prochaines étapes."], ["Accompagner", "Former les utilisateurs, suivre les usages et résoudre les difficultés courantes."], ["Développer", "Partager la veille utile, détecter les nouveaux besoins et mobiliser un expert humain."]],
    channelsKicker: "Présence omnicanale", channelsTitle: "Une relation. Plusieurs points de contact.", channelsLead: "Alma peut poursuivre une conversation sans perdre son objectif, les informations autorisées ni les engagements déjà pris. Chaque canal conserve ses propres permissions.", channelsNote: "Canaux activés selon votre configuration et vos consentements.", channels: [["Web et Workspace", "Questions, qualification, recommandations et suivi dans Unitalk."], ["Voix et téléphone", "Entretiens, appels entrants ou sortants et préparation de rendez-vous."], ["E-mail", "Suivi asynchrone, synthèses et relances dans un cadre autorisé."], ["Slack, WhatsApp, Telegram", "Présence dans les canaux choisis par l’entreprise, avec droits explicites."]],
    scaleKicker: "La preuve Unitalk", scaleTitle: "Alma ne présente pas la technologie. Elle la met au travail.", scaleLead: "Son identité durable, sa mémoire gouvernée et ses connexions démontrent comment une entreprise peut servir davantage de clients avec une qualité constante, sans masquer les décisions qui doivent rester humaines.", scaleItems: [["Identité", "Une interlocutrice identifiable, avec un rôle et un rattachement publics."], ["Mémoire", "Une continuité utile, séparée selon les personnes, entreprises et espaces."], ["Actions", "Des applications et canaux mobilisés uniquement selon les droits accordés."], ["Supervision", "Traçabilité, validations et escalade au bon interlocuteur humain."]],
    handoffKicker: "Humain quand il le faut", handoffTitle: "Alma traite la continuité. L’expert prend la décision.", handoffLead: "Lorsqu’une demande exige un engagement commercial, une architecture, une intervention complexe ou une décision sensible, Alma prépare le dossier et transmet le contexte à l’ingénieur IA ou au responsable adapté.", verify: "Vérifier l’identité et les règles d’Alma",
  },
  en: {
    role: "AI Customer Relationship Lead",
    title: ["A customer relationship that", "never starts over."],
    lead: "Alma informs, qualifies, recommends, trains and supports every Unitalk customer. She continues the same relationship across authorized channels and hands context to a human when a decision or expertise requires it.",
    primary: "Talk to Alma", profile: "View her verified identity", heroNote: "A real AI Collaborator operated by Unitalk · Sensitive actions remain under human control",
    alt: "Alma, Unitalk AI Customer Relationship Lead", verified: "Verified AI identity · Assigned to Unitalk",
    proofs: ["Available at every stage", "Governed relationship memory", "Many channels, one context", "Prepared human handoff"],
    liveKicker: "Alma in action", liveTitle: "Start with a real request.", liveLead: "Ask a question, describe a need or request a demo. Alma qualifies your intent and prepares the next step without forcing you through a form.", available: "Available on the Unitalk website", prompt: "What do you want to accomplish?", placeholder: "E.g. Assess our AI maturity and recommend a first use case…", listening: "I’m listening…", voiceStart: "Talk to Alma", voiceStop: "Stop listening", examples: ["Assess our AI maturity", "Arrange a demo", "Train my team", "Talk to an AI engineer"], continue: "Continue with Alma", start: "Create my workspace and talk to Alma",
    lifecycleKicker: "Continuous relationship", lifecycleTitle: "From first contact to account development.", lifecycle: [["Inform", "Answer product, technical, pricing and security questions."], ["Assess", "Run a written or voice interview, understand context and qualify the need."], ["Recommend", "Suggest a mission, demo, training course or the right AI Collaborator."], ["Activate", "Prepare access, meetings, approvals and next steps."], ["Support", "Train users, monitor adoption and resolve common issues."], ["Develop", "Share relevant AI intelligence, detect new needs and involve a human expert."]],
    channelsKicker: "Omnichannel presence", channelsTitle: "One relationship. Multiple touchpoints.", channelsLead: "Alma can continue a conversation without losing its objective, authorized information or prior commitments. Each channel retains its own permissions.", channelsNote: "Channels enabled according to your configuration and consent.", channels: [["Web and Workspace", "Questions, qualification, recommendations and follow-up in Unitalk."], ["Voice and phone", "Interviews, inbound or outbound calls and meeting preparation."], ["Email", "Asynchronous follow-up, summaries and authorized reminders."], ["Slack, WhatsApp, Telegram", "Presence in company-selected channels, with explicit permissions."]],
    scaleKicker: "The Unitalk proof", scaleTitle: "Alma does not present the technology. She puts it to work.", scaleLead: "Her durable identity, governed memory and connections demonstrate how a company can serve more customers with consistent quality without hiding decisions that must remain human.", scaleItems: [["Identity", "An identifiable contact with a public role and affiliation."], ["Memory", "Useful continuity separated by person, organization and workspace."], ["Actions", "Applications and channels used only within granted permissions."], ["Supervision", "Traceability, approvals and escalation to the right human contact."]],
    handoffKicker: "Human when it matters", handoffTitle: "Alma handles continuity. The expert makes the decision.", handoffLead: "When a request requires a commercial commitment, architecture decision, complex intervention or sensitive choice, Alma prepares the case and transfers the context to the appropriate AI engineer or owner.", verify: "Verify Alma’s identity and rules",
  },
} as const;
