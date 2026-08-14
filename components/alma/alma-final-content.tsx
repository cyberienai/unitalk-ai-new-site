"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CircleCheck, Mic, ShieldCheck, Square } from "lucide-react";
import { Kicker } from "@/components/home/section-kicker";
import { useLanguage, type Lang } from "@/lib/language-context";

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
      <section className="relative px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <div className="editorial-shell relative grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <div className="max-w-xl">
            <Kicker>Alma · Unitalk</Kicker>
            <h1 className="hero-heading mt-5 whitespace-pre-line [font-size:46px]">{t.title}</h1>
            <p className="mt-5 text-[17px] leading-8 text-[#4E483F]">
              {t.lead}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.heroBenefits.map((benefit) => <li key={benefit} className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-[#3F3A33]"><CircleCheck className="mt-0.5 size-4 shrink-0 text-[#D10E63]" />{benefit}</li>)}
            </ul>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href={SIGNUP}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(209,14,99,.55)] sm:w-auto"
              >
                {t.primary}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/unitalk/@alma/store"
                className="text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-4"
              >
                {t.store}
              </Link>
            </div>
            <p className="mt-4 text-xs font-semibold text-[#6E665A]">{t.trial}</p>
            <Link href="/documentation/alma-organisation" className="mt-4 inline-flex text-xs font-bold text-[#B00C54] underline-offset-4 hover:underline">{t.documentation}</Link>
          </div>
          <IdentityCard lang={lang} />
        </div>
      </section>

      <section aria-label={t.reassuranceLabel} className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 sm:px-8">
        <div className="editorial-shell grid divide-y divide-[#D2C8B8] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {t.reassurances.map(([title, body]) => <div key={title} className="py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0"><h2 className="text-sm font-bold">{title}</h2><p className="mt-1 text-xs leading-5 text-[#625B50]">{body}</p></div>)}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-10 rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-6 sm:p-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <Kicker>{t.composerKicker}</Kicker>
            <h2 className="mt-5 text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[42px]">{t.composerTitle}</h2>
            <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#4E483F]">{t.composerLead}</p>
            <div className="mt-6 flex flex-wrap gap-2">{t.examples.map(example => <button key={example} type="button" onClick={() => setNeed(example)} className="rounded-full border border-[#D8D0C2] bg-white px-3.5 py-2 text-left text-xs font-semibold text-[#625B50] hover:border-[#D10E63]/50 hover:text-[#B00C54]">{example}</button>)}</div>
          </div>
          <div className="rounded-3xl bg-[#181615] p-5 text-[#FAF8F3] sm:p-7">
            <div className="flex items-center gap-3"><Image src="/alma-avatar.png" alt="Alma" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-[#D10E63]/30"/><div><p className="font-bold">Alma</p><p className="text-xs text-[#AFA397]">{t.role}</p></div></div>
            <label htmlFor="alma-need" className="mt-6 block text-sm font-bold">{t.composerLabel}</label>
            <div className="relative mt-3"><textarea id="alma-need" value={need} onChange={event => setNeed(event.target.value)} rows={5} placeholder={listening ? t.listening : t.composerPlaceholder} className="w-full resize-none rounded-2xl border border-white/15 bg-white/[.06] p-4 pr-14 text-sm leading-6 text-white outline-none placeholder:text-[#887D72] focus:border-[#F2A4C5] focus:ring-2 focus:ring-[#D10E63]/25" />{voiceSupported && <button type="button" onClick={toggleListening} aria-label={listening ? t.voiceStop : t.voiceStart} aria-pressed={listening} className={`absolute right-3 top-3 flex size-10 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5] ${listening ? 'bg-[#D10E63] text-white' : 'bg-white/10 text-[#F2A4C5] hover:bg-white/15'}`}>{listening ? <Square className="size-3.5" fill="currentColor"/> : <Mic className="size-4"/>}</button>}</div>
            <button type="button" onClick={startWithNeed} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{need.trim() ? t.composerCta : t.composerEmptyCta}<ArrowRight className="ml-2 size-4" /></button>
            <p className="mt-3 text-center text-[11px] text-[#887D72]">{t.composerNote}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#D8D0C2] bg-[#FAF8F3] px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell"><Kicker>{t.howKicker}</Kicker><h2 className="mt-5 max-w-3xl text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[44px]">{t.howTitle}</h2><div className="mt-10 grid gap-4 md:grid-cols-3">{t.howSteps.map(([title, body], index) => <article key={title} className="rounded-3xl border border-[#D8D0C2] bg-[#F3EFE6] p-6"><p className="font-mono text-[10px] font-black text-[#B00C54]">0{index + 1}</p><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{body}</p></article>)}</div></div>
      </section>

      <section className="border-y border-[#DED6C8] bg-[#FAF8F3] px-5 py-14 sm:px-8">
        <div className="editorial-shell">
          <Kicker>{t.proofKicker}</Kicker>
          <h2 className="mt-5 max-w-3xl text-[32px] font-semibold tracking-[-.035em] sm:text-[40px]">
            {t.proofTitle}
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[18px] border border-[#DED6C8] bg-[#DED6C8] lg:grid-cols-[.8fr_1.2fr_.8fr]">
            <Proof label={t.need} value={t.needValue} />
            <div className="bg-[#F3EFE6] p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#B00C54]">
                {t.prepares}
              </p>
              <dl className="mt-5 space-y-4">
                <Mini label={t.expected} value={t.expectedValue} />
                <Mini label={t.rules} value={t.rulesValue} />
                <Mini label={t.sources} value={t.sourcesValue} />
                <Mini label={t.validation} value={t.validationValue} />
              </dl>
            </div>
            <Proof label={t.missionReady} value={t.missionValue} />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8"><div className="editorial-shell flex flex-col justify-between gap-6 rounded-3xl bg-[#EAE3D4] p-7 sm:flex-row sm:items-center sm:p-9"><div><h2 className="text-2xl font-bold tracking-[-.03em]">{t.midTitle}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#625B50]">{t.midBody}</p></div><a href="#alma-need" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white">{t.midCta}<ArrowRight className="ml-2 size-4" /></a></div></section>

      <section className="bg-[#151310] px-5 py-14 text-[#FAF8F3] sm:px-8">
        <div className="editorial-shell">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#F2A4C5]">
            {t.progressKicker}
          </p>
          <h2 className="mt-5 max-w-3xl text-[32px] font-semibold tracking-[-.035em] sm:text-[40px]">
            {t.progressTitle}
          </h2>
          <div className="scrollbar-hide mt-9 flex items-center gap-3 overflow-x-auto pb-2 text-xs font-bold uppercase tracking-[.1em]">
            {t.progress.map((item, index) => (
              <span key={item} className="flex shrink-0 items-center gap-3">
                <span
                  className={`rounded-full border px-4 py-2 ${index === 0 ? "border-[#F2A4C5] text-[#F2A4C5]" : "border-white/20 text-[#E7E0D5]"}`}
                >
                  {item}
                </span>
                {index < t.progress.length - 1 && (
                  <ArrowRight className="size-4 text-[#F2A4C5]" />
                )}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[16px] leading-8 text-[#CFC6B8]">
            {t.progressBody}
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
          <div>
            <Kicker>{t.storeKicker}</Kicker>
            <h2 className="mt-5 max-w-xl text-[32px] font-semibold tracking-[-.035em] sm:text-[40px]">
              {t.storeTitle}
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-[#4E483F]">
              {t.storeLead}
            </p>
            <Link
              href="/unitalk/@alma/store"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54] underline-offset-4 hover:underline"
            >
              {t.storeCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Extension title={t.baseTitle} body={t.baseBody} included />
            <Extension
              title={t.transformationTitle}
              body={t.transformationBody}
            />
            <Extension title={t.skillTitle} body={t.skillBody} />
          </div>
          <div className="mt-8 rounded-3xl border border-[#D8D0C2] bg-[#EAE3D4] p-6 sm:p-8 lg:col-span-2"><p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#B00C54]">Unitalk Academy</p><h3 className="mt-4 text-2xl font-bold">{t.academyTitle}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-[#4E483F]">{t.academyBody}</p><a href="https://unitalk.fr/alma?source=alma-profile" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.academyCta}<ArrowRight className="size-4"/></a></div>
        </div>
      </section>

      <section className="border-y border-[#DED6C8] bg-[#EAE3D4] px-5 py-12 sm:px-8">
        <div className="editorial-shell grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">
              {t.privacyKicker}
            </p>
            <h2 className="mt-4 text-[30px] font-semibold tracking-[-.03em] sm:text-[36px]">
              {t.privacyTitle}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Privacy title={t.publicTitle} items={t.publicItems} />
            <Privacy title={t.privateTitle} items={t.privateItems} />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20">
        <div className="editorial-shell flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#B00C54]">
              {t.finalKicker}
            </p>
            <h2 className="mt-5 text-[34px] font-semibold tracking-[-.04em] sm:text-[40px]">
              {t.finalTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F]">
              {t.finalBody}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link
              href={SIGNUP}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white"
            >
              {t.primary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/missions"
              className="text-sm font-bold underline decoration-[#D10E63]/30 underline-offset-4"
            >
              {t.missions}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function IdentityCard({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <article className="overflow-hidden rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] shadow-[0_24px_70px_-50px_rgba(28,26,23,.55)]">
      <div className="grid sm:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[300px] bg-[#DED6C8] sm:min-h-[390px]">
          <Image
            src="/alma-avatar.png"
            alt={t.alt}
            fill
            priority
            className="object-cover object-top"
          />
        </div>
        <div className="p-6">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[.16em] text-[#B00C54]">
            {t.verified}
          </p>
          <h2 className="mt-5 text-3xl font-semibold">Alma</h2>
          <p className="mt-2 text-sm font-semibold">{t.role}</p>
          <dl className="mt-6 border-t border-[#DED6C8]">
            <Fact label={t.organization} value="Unitalk" />
            <Fact label={t.nature} value={t.ai} />
            <Fact label={t.supervised} value="Patrick Chassany" />
            <Fact label={t.baseProfile} value={t.baseValue} />
          </dl>
        </div>
      </div>
    </article>
  );
}
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#DED6C8] py-3">
      <dt className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#857C6E]">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-semibold">{value}</dd>
    </div>
  );
}
function Proof({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#F3EFE6] p-6">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#B00C54]">
        {label}
      </p>
      <p className="mt-5 text-[18px] font-semibold leading-8">{value}</p>
    </div>
  );
}
function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#857C6E]">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold leading-6">{value}</dd>
    </div>
  );
}
function Extension({
  title,
  body,
  included = false,
}: {
  title: string;
  body: string;
  included?: boolean;
}) {
  return (
    <article className="rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-5">
      <p
        className={`font-mono text-[9px] font-bold uppercase tracking-[.14em] ${included ? "text-[#257A43]" : "text-[#B00C54]"}`}
      >
        {included ? "Inclus" : "Extension"}
      </p>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#4E483F]">{body}</p>
    </article>
  );
}
function Privacy({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <article className="rounded-[18px] border border-[#D8D0C2] bg-[#FAF8F3] p-5">
      <ShieldCheck className="size-5 text-[#D10E63]" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-6 text-[#4E483F]"
          >
            <Check className="mt-1 size-4 shrink-0 text-[#D10E63]" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

const COPY = {
  fr: {
    title: "Dites ce qu’il faut accomplir.\nAlma prépare la bonne équipe IA.",
    lead: "Décrivez un travail concret avec vos propres mots. Alma le transforme en mission claire, identifie le Collaborateur IA adapté et prépare les compétences, les applications et les validations nécessaires.",
    heroBenefits: ["Part de votre besoin réel", "Recherche d’abord dans votre équipe", "Cadre les accès et validations", "Prépare un résultat vérifiable"],
    role: "Coordinatrice de missions",
    included:
      "Son profil de Coordinatrice de missions est inclus avec la Licence Organisation.",
    primary: "Confier une mission à Alma",
    store: "Explorer son Store",
    trial: "7 jours gratuits · Sans carte bancaire · Rien n’est activé sans votre validation",
    documentation: "Comprendre la Licence Alma Organisation →",
    reassuranceLabel: "Garanties Alma",
    reassurances: [["Pas besoin de connaître le bon profil", "Décrivez simplement le travail ou le résultat attendu."], ["Vous gardez les décisions sensibles", "Alma identifie les validations qui doivent rester humaines."], ["Elle évite les créations inutiles", "Alma fait d’abord progresser un Collaborateur IA existant."]],
    composerKicker: "Commencer maintenant",
    composerTitle: "Quel travail voulez-vous déléguer ?",
    composerLead: "Une phrase suffit pour commencer. Alma précisera ensuite le résultat, le contexte, les règles et les applications nécessaires.",
    composerLabel: "Décrivez le travail à accomplir",
    composerPlaceholder: "Ex. Je veux qualifier les demandes entrantes et préparer une réponse avant validation…",
    composerCta: "Préparer cette mission avec Alma",
    composerEmptyCta: "Créer mon compte et parler à Alma",
    composerNote: "Votre demande est conservée pour poursuivre après l’authentification.",
    voiceStart: "Décrire le travail avec votre voix",
    voiceStop: "Arrêter la dictée",
    listening: "Je vous écoute…",
    examples: ["Répondre aux demandes clients", "Qualifier de nouveaux prospects", "Préparer mes réunions", "Relancer les factures impayées"],
    howKicker: "Le rôle d’Alma",
    howTitle: "Du besoin flou à une mission prête à confier.",
    howSteps: [["Elle clarifie", "Résultat attendu, fréquence, sources et exceptions."], ["Elle équipe", "Collaborateur IA, profil métier, compétences et applications."], ["Elle sécurise", "Droits, validations humaines et critères de résultat."]],
    alt: "Portrait professionnel d’Alma",
    verified: "Identité IA vérifiée par Unitalk",
    organization: "Organisation",
    nature: "Nature",
    ai: "Intelligence artificielle",
    supervised: "Créée et supervisée par",
    baseProfile: "Profil socle",
    baseValue: "Inclus avec la Licence Organisation",
    proofKicker: "Preuve de travail",
    proofTitle: "Une demande devient un livrable structuré.",
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
    progressKicker: "Faire progresser avant de créer",
    progressTitle: "Alma cherche d’abord qui peut accomplir la mission.",
    progress: [
      "Mission",
      "Identité existante",
      "Profil métier",
      "Compétence",
      "Validation",
    ],
    progressBody:
      "Alma fait d’abord progresser un Collaborateur IA existant. Elle ne propose une nouvelle identité que lorsque la mission exige réellement une présence ou des ressources distinctes.",
    storeKicker: "Équiper Alma",
    storeTitle: "Un socle inclus. Des expertises à ajouter selon vos besoins.",
    storeLead:
      "La coordination des missions est incluse avec votre Organisation. Les profils et compétences spécialisés restent des extensions distinctes, installées avec leurs droits et validations.",
    storeCta: "Explorer le Store Alma",
    baseTitle: "Coordinatrice de missions",
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
    academyCta: "Découvrir Alma dans Unitalk Academy",
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
      "Décrivez le travail. Alma vous aide à en faire une mission claire.",
    finalBody:
      "Vous n’avez pas besoin de choisir une mission avant de créer votre compte. Le contexte Alma est conservé après votre authentification.",
    missions: "Explorer les missions",
  },
  en: {
    title: "Say what needs to be done.\nAlma prepares the right AI team.",
    lead: "Describe concrete work in your own words. Alma turns it into a clear mission, identifies the right AI Collaborator and prepares the required skills, applications and approvals.",
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
    composerTitle: "What work do you want to delegate?",
    composerLead: "One sentence is enough to start. Alma then clarifies the outcome, context, rules and required applications.",
    composerLabel: "Describe the work to be done",
    composerPlaceholder: "E.g. I want to qualify inbound requests and prepare a response for approval…",
    composerCta: "Prepare this mission with Alma",
    composerEmptyCta: "Create my account and talk to Alma",
    composerNote: "Your request is retained so you can continue after authentication.",
    voiceStart: "Describe the work with your voice",
    voiceStop: "Stop dictation",
    listening: "Listening…",
    examples: ["Answer customer requests", "Qualify new prospects", "Prepare my meetings", "Follow up unpaid invoices"],
    howKicker: "Alma’s role",
    howTitle: "From a vague need to a mission ready to assign.",
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
    proofTitle: "A request becomes a structured deliverable.",
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
    progressKicker: "Develop before creating",
    progressTitle: "Alma first looks for who can accomplish the mission.",
    progress: [
      "Mission",
      "Existing identity",
      "Job profile",
      "Skill",
      "Approval",
    ],
    progressBody:
      "Alma first develops an existing AI Collaborator. She only proposes a new identity when the mission genuinely requires a distinct presence or resources.",
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
    academyCta: "Discover Alma in Unitalk Academy",
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
    finalTitle: "Describe the work. Alma helps turn it into a clear mission.",
    finalBody:
      "You do not need to select a mission before creating your account. The Alma context is retained after authentication.",
    missions: "Explore missions",
  },
} as const;
