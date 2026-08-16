"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Check, Mic, Square } from "lucide-react";
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

  function startWithNeed() {
    const clean = need.trim();
    if (!clean) {
      router.push(SIGNUP);
      return;
    }
    const draftId = `draft_${crypto.randomUUID()}`;
    try {
      localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() }));
    } catch {}
    router.push(`/decouvrir?source=alma-profile&draft=${encodeURIComponent(draftId)}`);
  }

  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="relative border-b border-[#D8D0C2] px-5 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28 lg:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="editorial-shell relative">
          <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">Alma / {t.role}</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.12fr_.88fr] lg:items-center">
            <div>
              <h1 className="max-w-[850px] text-[clamp(3rem,6vw,6.2rem)] font-semibold leading-[.92] tracking-[-.065em]"><span className="block">{t.title.split("\n")[0]}</span><span className="block text-[#D10E63]">{t.title.split("\n")[1]}</span></h1>
              <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F]">{t.lead}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="#alma-need" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white">{t.primary}<ArrowDown className="ml-2 size-4" /></a><Link href="/unitalk/@alma/store" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#BFB5A5] bg-[#FAF8F3] px-7 text-sm font-bold">{t.store}</Link></div>
              <p className="mt-3 text-xs font-semibold text-[#6E665A]">{t.trial}</p>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-t-[8rem] bg-[#D8D0C2] sm:min-h-[420px] lg:min-h-[410px] xl:min-h-[440px]">
              <Image src="/alma-avatar.png" alt={t.alt} fill priority className="object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#181615] via-[#181615]/85 to-transparent px-7 pb-7 pt-24 text-white">
                <p className="text-3xl font-semibold tracking-[-.04em]">Alma</p><p className="mt-1 text-sm text-white/70">{t.verified}</p>
              </div>
            </div>
          </div>
          <div aria-label={t.reassuranceLabel} className="mt-8 grid border-y border-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">{t.heroBenefits.map((benefit, index) => <p key={benefit} className="flex min-h-16 items-center gap-4 border-b border-[#CFC5B5] py-3 text-sm font-bold last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0"><span className="font-mono text-[9px] text-[#B00C54]">0{index + 1}</span>{benefit}</p>)}</div>
        </div>
      </section>

      <section className="bg-[#181615] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="editorial-shell">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><SectionTitle dark kicker={t.composerKicker} title={t.composerTitle} /><p className="max-w-2xl text-[16px] leading-8 text-[#CFC6B8] lg:pt-10">{t.composerLead}</p></div>
          <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#211E1B] lg:grid-cols-[1.05fr_.95fr]">
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-3"><Image src="/alma-avatar.png" alt="" width={48} height={48} aria-hidden className="size-12 rounded-full object-cover ring-2 ring-[#D10E63]/40"/><div><p className="font-bold">Alma</p><p className="text-xs text-[#AFA397]">{t.role}</p></div></div>
              <label htmlFor="alma-need" className="mt-8 block font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.composerLabel}</label>
              <div className="relative mt-3"><textarea id="alma-need" value={need} onChange={event => setNeed(event.target.value)} rows={6} placeholder={listening ? t.listening : t.composerPlaceholder} className="w-full resize-none border-b border-white/20 bg-transparent py-4 pr-14 text-xl leading-8 text-white outline-none placeholder:text-[#756E65] focus:border-[#F2A4C5]" />{voiceSupported && <button type="button" onClick={toggleListening} aria-label={listening ? t.voiceStop : t.voiceStart} aria-pressed={listening} className={`absolute right-0 top-3 flex size-11 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5] ${listening ? "bg-[#D10E63]" : "bg-white/10 text-[#F2A4C5]"}`}>{listening ? <Square className="size-3.5" fill="currentColor"/> : <Mic className="size-4"/>}</button>}</div>
              <div className="mt-5 flex flex-wrap gap-2">{t.examples.map(example => <button key={example} type="button" onClick={() => setNeed(example)} className="rounded-full border border-white/15 px-3.5 py-2 text-left text-xs font-semibold text-[#CFC6B8] hover:border-[#F2A4C5] hover:text-white">{example}</button>)}</div>
              <button type="button" onClick={startWithNeed} className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white">{need.trim() ? t.composerCta : t.composerEmptyCta}<ArrowRight className="ml-2 size-4" /></button>
            </div>
            <div className="border-t border-white/10 bg-[#171514] p-6 sm:p-10 lg:border-l lg:border-t-0">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.prepares}</p>
              <dl className="mt-10 divide-y divide-white/10"><MissionDatum label={t.expected} value={t.expectedValue} /><MissionDatum label={t.rules} value={t.rulesValue} /><MissionDatum label={t.sources} value={t.sourcesValue} /><MissionDatum label={t.validation} value={t.validationValue} /></dl>
              <p className="mt-8 text-xs text-[#887D72]">{t.composerNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="editorial-shell"><SectionTitle kicker={t.proofKicker} title={t.proofTitle} />
          <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-[#CFC5B5] bg-[#FAF8F3] lg:grid-cols-[.9fr_auto_1.1fr] lg:items-stretch">
            <div className="p-7 sm:p-10"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#857C6E]">{t.need}</p><p className="mt-12 text-[clamp(2.2rem,4.5vw,4.6rem)] font-semibold leading-[.98] tracking-[-.055em]">{t.needValue}</p></div>
            <div className="flex items-center justify-center border-y border-[#CFC5B5] bg-[#EAE3D4] p-5 lg:border-x lg:border-y-0"><ArrowRight className="size-8 rotate-90 text-[#D10E63] lg:rotate-0" /></div>
            <div className="bg-[#D10E63] p-7 text-white sm:p-10"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-white/70">{t.missionReady}</p><p className="mt-12 text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.07em]">{t.missionValue}</p><p className="mt-8 text-lg font-semibold text-white/80">{t.expectedValue}</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-20 sm:px-8 sm:py-28"><div className="editorial-shell"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><SectionTitle kicker={t.howKicker} title={t.howTitle} /><p className="max-w-2xl text-[16px] leading-8 text-[#4E483F] lg:pt-10">{t.progressBody}</p></div><div className="mt-14 border-t border-[#C8BDAC]">{t.howSteps.map(([title, body], index) => <article key={title} className="grid gap-3 border-b border-[#C8BDAC] py-7 sm:grid-cols-[70px_.7fr_1.3fr] sm:items-center"><p className="font-mono text-[10px] font-black text-[#B00C54]">0{index + 1}</p><h3 className="text-2xl font-semibold tracking-[-.035em]">{title}</h3><p className="text-sm leading-7 text-[#625B50]">{body}</p></article>)}</div></div></section>

      <section className="bg-[#D10E63] px-5 py-20 text-white sm:px-8 sm:py-28"><div className="editorial-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-white/70">{t.progressKicker}</p><h2 className="mt-5 max-w-4xl text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.progressTitle}</h2></div><div><p className="text-[17px] leading-8 text-white/80">{t.progressBody}</p><div className="mt-8 flex flex-wrap gap-2">{t.progress.map((item, index) => <span key={item} className={`rounded-full border px-4 py-2 text-xs font-bold ${index === 1 ? "border-white bg-white text-[#D10E63]" : "border-white/30"}`}>{item}</span>)}</div></div></div></section>

      <section id="accompagnement" className="scroll-mt-24 bg-[#181615] px-5 py-20 text-white sm:px-8 sm:py-28"><div className="editorial-shell"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><SectionTitle dark kicker={t.supportKicker} title={t.supportTitle} /><p className="max-w-2xl text-[16px] leading-8 text-[#CFC6B8] lg:pt-10">{t.supportLead}</p></div><div className="mt-14 grid border-y border-white/15 sm:grid-cols-2 lg:grid-cols-4">{t.supportSteps.map(([title, body], index) => <article key={title} className="border-b border-white/15 py-7 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0 lg:last:border-r-0"><p className="font-mono text-[10px] font-black text-[#F2A4C5]">0{index + 1}</p><h3 className="mt-8 text-2xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-[#AFA397]">{body}</p></article>)}</div></div></section>

      <section className="px-5 py-20 sm:px-8 sm:py-28"><div className="editorial-shell"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionTitle kicker={t.storeKicker} title={t.storeTitle} /><div className="lg:pt-10"><p className="text-[16px] leading-8 text-[#4E483F]">{t.storeLead}</p><Link href="/unitalk/@alma/store" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.storeCta}<ArrowRight className="size-4" /></Link></div></div><div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-[#D8D0C2] bg-[#D8D0C2] lg:grid-cols-3"><EcosystemItem index="01" title={t.baseTitle} body={t.baseBody} tag="Inclus" /><EcosystemItem index="02" title={t.transformationTitle} body={t.transformationBody} tag="Extension" /><EcosystemItem index="03" title={t.skillTitle} body={t.skillBody} tag="Extension" /></div><div className="mt-5 grid gap-6 rounded-[2rem] bg-[#EAE3D4] p-7 sm:p-9 lg:grid-cols-[.7fr_1.3fr]"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">Unitalk Academy</p><h3 className="mt-4 text-2xl font-semibold">{t.academyTitle}</h3></div><div><p className="text-sm leading-7 text-[#4E483F]">{t.academyBody}</p><Link href="/academy/alma?source=alma-profile" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.academyCta}<ArrowRight className="size-4" /></Link></div></div></div></section>

      <section className="grid lg:grid-cols-2"><div className="bg-[#FAF8F3] px-5 py-20 sm:px-8 sm:py-24 lg:pl-[max(2rem,calc((100vw-72rem)/2))]"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.publicTitle}</p><h2 className="mt-5 max-w-xl text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.95] tracking-[-.06em]">{t.privacyTitle}</h2><PrivacyList items={t.publicItems} /></div><div className="bg-[#211E1B] px-5 py-20 text-white sm:px-8 sm:py-24 lg:pr-[max(2rem,calc((100vw-72rem)/2))]"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.privateTitle}</p><h2 className="mt-5 max-w-xl text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.95] tracking-[-.06em]">{t.privacyKicker}</h2><PrivacyList dark items={t.privateItems} /></div></section>

      <section className="bg-[#D10E63] px-5 py-20 text-white sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-white/70">{t.finalKicker}</p><h2 className="mt-5 max-w-5xl text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.finalTitle}</h2><p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/80">{t.finalBody}</p></div><div className="flex min-w-64 flex-col gap-3"><Link href={SIGNUP} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white">{t.primary}<ArrowRight className="ml-2 size-4" /></Link><Link href="/missions" className="text-center text-sm font-bold underline decoration-white/35 underline-offset-4">{t.missions}</Link></div></div></section>
    </main>
  );
}

function SectionTitle({ kicker, title, dark = false }: { kicker: string; title: string; dark?: boolean }) { return <div><p className={`font-mono text-[10px] font-black uppercase tracking-[.2em] ${dark ? "text-[#F2A4C5]" : "text-[#B00C54]"}`}>{kicker}</p><h2 className="mt-5 max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[.95] tracking-[-.06em]">{title}</h2></div> }

function MissionDatum({ label, value }: { label: string; value: string }) { return <div className="grid gap-2 py-5 sm:grid-cols-[130px_1fr]"><dt className="font-mono text-[9px] font-black uppercase tracking-[.15em] text-[#857C6E]">{label}</dt><dd className="text-sm font-semibold leading-6 text-[#E7E0D5]">{value}</dd></div> }

function EcosystemItem({ index, tag, title, body }: { index: string; tag: string; title: string; body: string }) { return <article className="min-h-[330px] bg-[#FAF8F3] p-7"><div className="flex justify-between font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#B00C54]"><span>{tag}</span><span className="text-[#857C6E]">{index}</span></div><h3 className="mt-20 text-3xl font-semibold leading-tight tracking-[-.04em]">{title}</h3><p className="mt-5 text-sm leading-7 text-[#625B50]">{body}</p></article> }

function PrivacyList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) { return <ul className={`mt-12 max-w-xl border-t ${dark ? "border-white/15" : "border-[#D8D0C2]"}`}>{items.map(item => <li key={item} className={`flex gap-3 border-b py-5 text-sm font-semibold leading-6 ${dark ? "border-white/15 text-[#CFC6B8]" : "border-[#D8D0C2] text-[#4E483F]"}`}><Check className={`mt-1 size-4 shrink-0 ${dark ? "text-[#F2A4C5]" : "text-[#D10E63]"}`} />{item}</li>)}</ul> }

const COPY = {
  fr: {
    title: "Décrivez le travail à accomplir.\nAlma prépare qui s’en charge.",
    lead: "Partez du travail réel. Alma le transforme en mission prête à confier, cherche le Collaborateur IA adapté et prépare ses compétences, ses applications, ses accès et vos validations.",
    heroBenefits: ["Part de votre besoin réel", "Recherche d’abord dans votre équipe", "Cadre les accès et validations", "Prépare un résultat vérifiable"],
    role: "Coordinatrice de missions IA",
    included:
      "Son profil de Coordinatrice de missions est inclus avec la Licence Entreprise.",
    primary: "Confier une mission à Alma",
    store: "Explorer son Store",
    trial: "7 jours gratuits · Sans carte bancaire · Rien n’est activé sans votre validation",
    documentation: "Comprendre la Licence Alma Entreprise →",
    reassuranceLabel: "Garanties Alma",
    reassurances: [["Pas besoin de connaître le bon profil", "Décrivez simplement le travail ou le résultat attendu."], ["Vous gardez les décisions sensibles", "Alma identifie les validations qui doivent rester humaines."], ["Elle évite les créations inutiles", "Alma fait d’abord progresser un Collaborateur IA existant."]],
    composerKicker: "Commencer maintenant",
    composerTitle: "Quel travail voulez-vous confier ?",
    composerLead: "Décrivez le résultat attendu avec vos mots. Alma prépare la mission, les règles, les sources, les accès et les validations nécessaires.",
    composerLabel: "Décrivez le travail à accomplir",
    composerPlaceholder: "Ex. Je veux qualifier les demandes entrantes et préparer une réponse avant validation…",
    composerCta: "Préparer ma mission avec Alma",
    composerEmptyCta: "Créer mon compte et parler à Alma",
    composerNote: "Votre demande est conservée pour poursuivre après l’authentification.",
    voiceStart: "Décrire le travail avec votre voix",
    voiceStop: "Arrêter la dictée",
    listening: "Je vous écoute…",
    examples: ["Répondre aux demandes clients", "Qualifier de nouveaux prospects", "Préparer mes réunions", "Relancer les factures impayées"],
    howKicker: "Le rôle d’Alma",
    howTitle: "Alma prépare la mission avant toute activation.",
    howSteps: [["Elle clarifie", "Résultat attendu, fréquence, sources et exceptions."], ["Elle équipe", "Collaborateur IA, profil métier, compétences et applications."], ["Elle sécurise", "Droits, validations humaines et critères de résultat."]],
    alt: "Portrait professionnel d’Alma",
    verified: "Identité IA vérifiée par Unitalk",
    organization: "Entreprise",
    nature: "Nature",
    ai: "Intelligence artificielle",
    supervised: "Créée et supervisée par",
    baseProfile: "Profil socle",
    baseValue: "Inclus avec la Licence Entreprise",
    proofKicker: "Preuve de travail",
    proofTitle: "Un besoin devient une mission prête à confier.",
    midTitle: "Vous avez déjà un besoin en tête ?",
    midBody: "Décrivez-le maintenant. Alma conserve votre demande et reprend exactement à cet endroit après la création du compte.",
    midCta: "Décrire mon besoin",
    need: "Besoin",
    needValue:
      "Réduire les retards de paiement sans détériorer la relation client.",
    prepares: "Alma prépare",
    expected: "Résultat attendu",
    expectedValue: "Relances prêtes à envoyer",
    rules: "Règles",
    rulesValue: "Ne pas relancer les litiges ouverts",
    sources: "Sources",
    sourcesValue: "Factures et dossier client autorisés",
    validation: "Validation",
    validationValue: "Approbation du responsable financier",
    missionReady: "Mission structurée",
    missionValue: "Relancer les factures impayées",
    progressKicker: "Équiper l’existant avant de créer",
    progressTitle: "Alma cherche d’abord qui peut prendre la mission.",
    progress: [
      "Mission",
      "Identité existante",
      "Profil métier",
      "Compétence",
      "Validation",
    ],
    progressBody:
      "Alma fait d’abord progresser un Collaborateur IA existant. Elle ne propose une nouvelle identité que lorsque la mission exige réellement une présence ou des ressources distinctes.",
    supportKicker: "Accompagnement continu",
    supportTitle: "Alma reste présente. Un expert prend le relais si nécessaire.",
    supportLead: "La préparation de la mission n’est pas la fin du parcours. Alma accompagne les usages, aide votre équipe à progresser et prépare un relais humain lorsque le besoin dépasse son périmètre.",
    supportSteps: [
      ["Préparer", "Alma clarifie le travail, structure la mission et cadre les accès et validations."],
      ["Accompagner", "Elle répond aux questions, suit les usages et aide l’équipe à améliorer ses missions."],
      ["Former", "Elle explique les méthodes et oriente vers Unitalk Academy lorsqu’un parcours pédagogique est utile."],
      ["Transmettre", "Pour une intégration, une gouvernance ou un cas complexe, elle prépare le brief et transmet le contexte à l’expert adapté."],
    ],
    storeKicker: "Équiper Alma",
    storeTitle: "Un socle inclus. Des expertises à ajouter selon vos besoins.",
    storeLead:
      "La coordination des missions est incluse avec votre Entreprise. Les profils et compétences spécialisés restent des extensions distinctes, installées avec leurs droits et validations.",
    storeCta: "Explorer le Store Alma",
    baseTitle: "Coordinatrice de missions IA",
    baseBody:
      "Cadrer une mission, préparer un Collaborateur IA et coordonner les validations.",
    transformationTitle: "Transformation IA",
    transformationBody:
      "Expertise spécialisée pour diagnostiquer, prioriser et préparer une feuille de route.",
    skillTitle: "Transmission de savoir-faire",
    skillBody:
      "Interviewer une personne, formaliser sa méthode et préparer une compétence testable.",
    academyTitle: "La même Alma vous accompagne aussi dans Unitalk Academy.",
    academyBody: "Elle y exerce un profil de guide pédagogique. Les données de formation restent séparées des missions et documents opérationnels de Unitalk AI.",
    academyCta: "Parler à Alma dans Unitalk Academy",
    privacyKicker: "Profil professionnel public",
    privacyTitle: "Visible publiquement. Privé par défaut.",
    publicTitle: "Public",
    publicItems: [
      "Identité, rôle et rattachement à Unitalk",
      "Méthodes et limites présentées ici",
    ],
    privateTitle: "Privé",
    privateItems: [
      "Conversations et missions internes",
      "Documents, mémoire, budgets et infrastructure",
    ],
    finalKicker: "Qu’avez-vous besoin d’accomplir ?",
    finalTitle:
      "Décrivez le travail. Alma prépare la mission, les accès et les validations.",
    finalBody:
      "Commencez avec vos propres mots. Votre demande est conservée pendant la création du compte, puis Alma reprend avec vous sans repartir de zéro.",
    missions: "Explorer les missions",
  },
  en: {
    title: "Describe the work to be done.\nAlma prepares who takes it on.",
    lead: "Start from the real work. Alma turns it into a mission ready to assign, finds the right AI Collaborator and prepares their skills, applications, access and your approvals.",
    heroBenefits: ["Starts from your real need", "Checks your team first", "Scopes access and approvals", "Prepares a verifiable outcome"],
    role: "Mission coordinator",
    included:
      "Her Mission coordinator profile is included with the Organization License.",
    primary: "Entrust a mission to Alma",
    store: "Explore her Store",
    trial: "7 days free · No credit card · Nothing is activated without your approval",
    documentation: "Understand the Alma Organization License →",
    reassuranceLabel: "Alma guarantees",
    reassurances: [["No need to know the right profile", "Simply describe the work or expected outcome."], ["You keep sensitive decisions", "Alma identifies approvals that must remain human."], ["She avoids unnecessary creation", "Alma first develops an existing AI Collaborator."]],
    composerKicker: "Start now",
    composerTitle: "What work do you want to entrust?",
    composerLead: "Describe the expected outcome in your own words. Alma prepares the mission, rules, sources, access and required approvals.",
    composerLabel: "Describe the work to be done",
    composerPlaceholder: "E.g. I want to qualify inbound requests and prepare a response for approval…",
    composerCta: "Prepare my mission with Alma",
    composerEmptyCta: "Create my account and talk to Alma",
    composerNote: "Your request is retained so you can continue after authentication.",
    voiceStart: "Describe the work with your voice",
    voiceStop: "Stop dictation",
    listening: "Listening…",
    examples: ["Answer customer requests", "Qualify new prospects", "Prepare my meetings", "Follow up unpaid invoices"],
    howKicker: "Alma’s role",
    howTitle: "Alma prepares the mission before anything is activated.",
    howSteps: [["She clarifies", "Expected outcome, frequency, sources and exceptions."], ["She equips", "AI Collaborator, job profile, skills and applications."], ["She secures", "Permissions, human approvals and result criteria."]],
    alt: "Professional portrait of Alma",
    verified: "AI identity verified by Unitalk",
    organization: "Organization",
    nature: "Nature",
    ai: "Artificial intelligence",
    supervised: "Created and supervised by",
    baseProfile: "Core profile",
    baseValue: "Included with the Organization License",
    proofKicker: "Work proof",
    proofTitle: "A need becomes a mission ready to assign.",
    midTitle: "Already have a need in mind?",
    midBody: "Describe it now. Alma retains your request and resumes from this exact point after account creation.",
    midCta: "Describe my need",
    need: "Need",
    needValue: "Reduce late payments without damaging customer relationships.",
    prepares: "Alma prepares",
    expected: "Expected result",
    expectedValue: "Reminders ready to send",
    rules: "Rules",
    rulesValue: "Do not remind open disputes",
    sources: "Sources",
    sourcesValue: "Authorized invoices and customer files",
    validation: "Approval",
    validationValue: "Finance manager approval",
    missionReady: "Structured mission",
    missionValue: "Follow up unpaid invoices",
    progressKicker: "Equip what exists before creating",
    progressTitle: "Alma first looks for who can take on the mission.",
    progress: [
      "Mission",
      "Existing identity",
      "Job profile",
      "Skill",
      "Approval",
    ],
    progressBody:
      "Alma first develops an existing AI Collaborator. She only proposes a new identity when the mission genuinely requires a distinct presence or resources.",
    supportKicker: "Ongoing support",
    supportTitle: "Alma stays involved. An expert takes over when needed.",
    supportLead: "Preparing the mission is not the end of the journey. Alma supports adoption, helps your team improve and prepares a human handoff when the need goes beyond her scope.",
    supportSteps: [
      ["Prepare", "Alma clarifies the work, structures the mission and scopes access and approvals."],
      ["Support", "She answers questions, follows usage and helps the team improve its missions."],
      ["Train", "She explains methods and directs people to Unitalk Academy when a learning path is useful."],
      ["Hand off", "For an integration, governance issue or complex case, she prepares the brief and transfers the context to the right expert."],
    ],
    storeKicker: "Equip Alma",
    storeTitle: "An included foundation. Specialized expertise when needed.",
    storeLead:
      "Mission coordination is included with your Organization. Specialized profiles and skills remain distinct extensions installed with their permissions and approvals.",
    storeCta: "Explore the Alma Store",
    baseTitle: "Mission coordinator",
    baseBody:
      "Scope a mission, prepare an AI Collaborator and coordinate approvals.",
    transformationTitle: "AI transformation",
    transformationBody:
      "Specialized expertise to diagnose, prioritize and prepare a roadmap.",
    skillTitle: "Know-how transfer",
    skillBody:
      "Interview a person, formalize their method and prepare a testable skill.",
    academyTitle: "The same Alma also supports you in Unitalk Academy.",
    academyBody: "There she exercises a learning guide profile. Training data remains separate from Unitalk AI missions and operational documents.",
    academyCta: "Talk to Alma in Unitalk Academy",
    privacyKicker: "Public professional profile",
    privacyTitle: "Publicly visible. Private by default.",
    publicTitle: "Public",
    publicItems: [
      "Identity, role and Unitalk affiliation",
      "Methods and limits presented here",
    ],
    privateTitle: "Private",
    privateItems: [
      "Internal conversations and missions",
      "Documents, memory, budgets and infrastructure",
    ],
    finalKicker: "What do you need to accomplish?",
    finalTitle: "Describe the work. Alma prepares the mission, access and approvals.",
    finalBody:
      "Start in your own words. Your request is saved while you create your account, then Alma picks up with you without starting over.",
    missions: "Explore missions",
  },
} as const;
