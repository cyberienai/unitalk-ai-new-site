"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Kicker } from "@/components/home/section-kicker";
import { useLanguage, type Lang } from "@/lib/language-context";

const SIGNUP = "/inscription?source=alma-profile&intent=nouvelle-mission";

export function AlmaFinalContent() {
  const { lang } = useLanguage();
  const t = COPY[lang];
  return (
    <main className="overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="relative px-5 pb-10 pt-20 sm:px-8 sm:pt-20">
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
            <p className="mt-5 text-sm font-semibold text-[#B00C54]">
              Alma · {t.role}
            </p>
            <p className="mt-1 text-sm text-[#6E665A]">{t.included}</p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href={SIGNUP}
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white"
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
          </div>
          <IdentityCard lang={lang} />
        </div>
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

      <section className="px-5 py-14 sm:px-8">
        <div className="editorial-shell flex flex-col items-start justify-between gap-8 rounded-[18px] border border-[#DED6C8] bg-[#FAF8F3] p-7 sm:p-10 lg:flex-row lg:items-end">
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
    title: "Décrivez le travail.\nAlma prépare la mission.",
    lead: "Alma clarifie le résultat attendu, les règles, les sources et les validations humaines. Elle prépare ensuite le Collaborateur IA qui pourra accomplir la mission.",
    role: "Coordinatrice de missions",
    included:
      "Son profil de Coordinatrice de missions est inclus avec la Licence Organisation.",
    primary: "Confier une mission à Alma",
    store: "Explorer son Store",
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
    title: "Describe the work.\nAlma prepares the mission.",
    lead: "Alma clarifies the expected result, rules, sources and human approvals. She then prepares the AI Collaborator that can accomplish the mission.",
    role: "Mission coordinator",
    included:
      "Her Mission coordinator profile is included with the Organization License.",
    primary: "Entrust a mission to Alma",
    store: "Explore her Store",
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
