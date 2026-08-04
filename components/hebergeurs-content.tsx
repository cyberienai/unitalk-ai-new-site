'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-context'

const ease = [0.21, 0.47, 0.32, 0.98] as const

type Host = { name: string; logo: string; descFr: string; descEn: string }
type Country = { fr: string; en: string; code: string; hosts: Host[] }

const COUNTRIES: Country[] = [
  {
    fr: 'France',
    en: 'France',
    code: 'FR',
    hosts: [
      {
        name: 'OVHcloud',
        logo: '/logos/ovhcloud.svg',
        descFr: 'Leader européen du cloud, data centers en France et en Europe, certifié SecNumCloud.',
        descEn: 'European cloud leader, data centers in France and Europe, SecNumCloud certified.',
      },
      {
        name: 'Scaleway',
        logo: '/logos/scaleway.svg',
        descFr: 'Cloud français du groupe Iliad, infrastructure souveraine et bas carbone.',
        descEn: 'French cloud from the Iliad group, sovereign and low-carbon infrastructure.',
      },
      {
        name: 'Clever Cloud',
        logo: '/logos/clever-cloud.svg',
        descFr: 'Plateforme PaaS française, hébergement 100 % européen et conforme RGPD.',
        descEn: 'French PaaS platform, 100% European hosting and GDPR compliant.',
      },
    ],
  },
  {
    fr: 'Allemagne',
    en: 'Germany',
    code: 'DE',
    hosts: [
      {
        name: 'IONOS',
        logo: '/logos/ionos.svg',
        descFr: 'Cloud allemand, data centers certifiés et données soumises au droit européen.',
        descEn: 'German cloud, certified data centers and data governed by European law.',
      },
      {
        name: 'Hetzner',
        logo: '/logos/hetzner.svg',
        descFr: 'Hébergeur allemand reconnu, infrastructure performante en Allemagne et en Finlande.',
        descEn: 'Well-known German host, high-performance infrastructure in Germany and Finland.',
      },
      {
        name: 'Open Telekom Cloud',
        logo: '/logos/deutsche-telekom.svg',
        descFr: 'Cloud souverain de Deutsche Telekom, hébergé en Allemagne, conforme RGPD.',
        descEn: 'Sovereign cloud by Deutsche Telekom, hosted in Germany, GDPR compliant.',
      },
    ],
  },
  {
    fr: 'Suisse',
    en: 'Switzerland',
    code: 'CH',
    hosts: [
      {
        name: 'Infomaniak',
        logo: '/logos/infomaniak.svg',
        descFr: 'Cloud suisse indépendant, data centers en Suisse et engagement écologique fort.',
        descEn: 'Independent Swiss cloud, data centers in Switzerland and a strong ecological commitment.',
      },
      {
        name: 'Exoscale',
        logo: '/logos/exoscale.svg',
        descFr: 'Cloud européen basé en Suisse, data centers répartis dans plusieurs pays de l’UE.',
        descEn: 'European cloud based in Switzerland, data centers across several EU countries.',
      },
    ],
  },
  {
    fr: 'Finlande',
    en: 'Finland',
    code: 'FI',
    hosts: [
      {
        name: 'UpCloud',
        logo: '/logos/upcloud.svg',
        descFr: 'Cloud finlandais haute performance, infrastructure européenne et conforme RGPD.',
        descEn: 'High-performance Finnish cloud, European infrastructure and GDPR compliant.',
      },
    ],
  },
  {
    fr: 'Luxembourg',
    en: 'Luxembourg',
    code: 'LU',
    hosts: [
      {
        name: 'Gcore',
        logo: '/logos/gcore.svg',
        descFr: 'Cloud et edge européen basé au Luxembourg, réseau mondial à faible latence.',
        descEn: 'European cloud and edge based in Luxembourg, low-latency global network.',
      },
    ],
  },
  {
    fr: 'Lituanie',
    en: 'Lithuania',
    code: 'LT',
    hosts: [
      {
        name: 'Hostinger',
        logo: '/logos/hostinger.svg',
        descFr: 'Hébergeur européen basé en Lituanie, data centers dans l’UE et conforme RGPD.',
        descEn: 'European host based in Lithuania, data centers in the EU and GDPR compliant.',
      },
    ],
  },
]

const T = {
  fr: {
    eyebrow: 'Hébergeurs',
    title1: 'Vos données, hébergées ',
    title2: 'en Europe.',
    subtitle:
      'Unitalk s’appuie exclusivement sur des hébergeurs souverains européens. Vous choisissez où vivent vos données — en France ou dans un pays de l’Union — sous protection du droit européen, jamais soumises au Cloud Act.',
    ctaCreate: 'Créer mon agent',
    ctaSecurity: 'En savoir plus sur la sécurité',
    calloutTitle: 'Aucune donnée hors d’Europe.',
    calloutBody:
      'Vos conversations, fichiers et mémoires restent chez l’hébergeur souverain que vous choisissez. Ils ne sont ni lus, ni revendus, ni utilisés pour entraîner des modèles.',
    hostedIn: 'Hébergé en',
    importEyebrow: 'Vous avez déjà un agent Hermès ?',
    importTitle: 'Importez un profil de Collaborateur IA dans votre Hermès, en un clic.',
    importBody:
      'Vous faites déjà tourner votre propre agent Hermès chez votre hébergeur ? Prenez le meilleur profil métier de nos Collaborateurs IA et importez-le directement dans votre Hermès existant. Pas de migration, pas de reconfiguration : vous partez du savoir-faire, pas de zéro.',
    importSteps: [
      { q: 'J’ai déjà un agent Hermès', a: 'Livré en un clic, sur votre infrastructure.' },
      { q: 'Puis-je importer le profil d’un Collaborateur IA dans mon Hermès ?', a: 'Oui, en un clic.' },
    ],
    importHostsLabel: 'Compatible avec votre hébergeur',
    importCta: 'Importer un profil',
  },
  en: {
    eyebrow: 'Hosting',
    title1: 'Your data, hosted ',
    title2: 'in Europe.',
    subtitle:
      'Unitalk relies exclusively on sovereign European hosting providers. You choose where your data lives — in France or another EU country — protected by European law, never subject to the Cloud Act.',
    ctaCreate: 'Create my agent',
    ctaSecurity: 'Learn more about security',
    calloutTitle: 'No data outside Europe.',
    calloutBody:
      'Your conversations, files and memories stay with the sovereign host you choose. They are never read, resold, or used to train models.',
    hostedIn: 'Hosted in',
    importEyebrow: 'Already running a Hermès agent?',
    importTitle: 'Import an AI Collaborator profile into your Hermès, in one click.',
    importBody:
      'Already running your own Hermès agent at your host? Take the best job profile from our AI Collaborators and import it straight into your existing Hermès. No migration, no reconfiguration: you start from the know-how, not from scratch.',
    importSteps: [
      { q: 'I already have a Hermès agent', a: 'Delivered in one click, on your infrastructure.' },
      { q: 'Can I import an AI Collaborator profile into my Hermès?', a: 'Yes, in one click.' },
    ],
    importHostsLabel: 'Works with your host',
    importCta: 'Import a profile',
  },
}

export function HebergeursContent() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <main className="bg-[#FBF9F3]">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-32 pb-16 text-center sm:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]"
        >
          {t.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="mt-3 font-sf text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[#1C1A17] text-balance"
          style={{ letterSpacing: '-0.03em' }}
        >
          {t.title1}
          <span className="text-[#D10E63]">{t.title2}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#4E483F]"
        >
          {t.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-[#D10E63] px-6 py-3 text-sm font-medium text-[#FBF9F3] transition-colors hover:bg-[#B00B52]"
          >
            {t.ctaCreate}
          </a>
          <a
            href="/#confiance"
            className="inline-flex items-center justify-center rounded-full border border-[#CFC6B4] px-6 py-3 text-sm font-medium text-[#1C1A17] transition-colors hover:border-[#1C1A17]"
          >
            {t.ctaSecurity}
          </a>
        </motion.div>
      </section>

      {/* Countries */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="flex flex-col gap-14">
          {COUNTRIES.map((country, ci) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: ci * 0.05, ease }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-7 items-center rounded-md border border-[#CFC6B4] bg-white px-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1C1A17]">
                  {country.code}
                </span>
                <h2 className="font-sf text-xl font-bold text-[#1C1A17]" style={{ letterSpacing: '-0.02em' }}>
                  {lang === 'fr' ? country.fr : country.en}
                </h2>
                <span className="h-px flex-1 bg-[#E6DFD0]" aria-hidden="true" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {country.hosts.map((host) => (
                  <div
                    key={host.name}
                    className="flex flex-col rounded-2xl border border-[#E6DFD0] bg-white p-6 transition-colors hover:border-[#CFC6B4]"
                  >
                    <div className="flex h-12 items-center">
                      <img
                        src={host.logo || '/placeholder.svg'}
                        alt={`Logo ${host.name}`}
                        className="h-8 w-auto max-w-[150px] object-contain object-left"
                      />
                    </div>
                    <h3 className="mt-5 font-sf text-base font-semibold text-[#1C1A17]">{host.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">
                      {lang === 'fr' ? host.descFr : host.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Import into existing Hermès */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="grid gap-10 rounded-3xl border border-[#E6DFD0] bg-white p-8 sm:p-12 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D10E63]">
              {t.importEyebrow}
            </p>
            <h2 className="mt-3 font-sf text-2xl sm:text-3xl font-bold leading-tight text-[#1C1A17] text-balance" style={{ letterSpacing: '-0.02em' }}>
              {t.importTitle}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#4E483F] text-pretty">
              {t.importBody}
            </p>
            <div className="mt-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
                {t.importHostsLabel}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
                {['/logos/ovhcloud.svg', '/logos/scaleway.svg', '/logos/ionos.svg', '/logos/hostinger.svg'].map((src) => (
                  <img
                    key={src}
                    src={src || '/placeholder.svg'}
                    alt=""
                    className="h-6 w-auto max-w-[120px] object-contain object-left opacity-80"
                  />
                ))}
              </div>
            </div>
            <a
              href="/decouvrir"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-colors hover:bg-[#B00B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
            >
              {t.importCta}
            </a>
          </div>

          <ul className="flex flex-col gap-4">
            {t.importSteps.map((step) => (
              <li key={step.q} className="rounded-2xl border border-[#E6DFD0] bg-[#FBF9F3] p-5">
                <p className="text-sm font-semibold text-[#1C1A17]">{step.q}</p>
                <p className="mt-1.5 flex items-center gap-2 text-sm leading-relaxed text-[#D10E63]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-semibold">{step.a}</span>
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Callout */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-[#161311] px-8 py-14 text-center sm:px-14">
          <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(243,239,230,0.16)] bg-[rgba(243,239,230,0.06)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0559B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className="mx-auto max-w-2xl font-sf text-2xl sm:text-3xl font-bold leading-tight text-[#F3EFE6] text-balance" style={{ letterSpacing: '-0.02em' }}>
            {t.calloutTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#A79E8E]">
            {t.calloutBody}
          </p>
        </div>
      </section>
    </main>
  )
}
