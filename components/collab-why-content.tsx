'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Boxes, Building2, Fingerprint, Brain, Lock, Network, Server, ShieldCheck, Sparkles } from 'lucide-react'
import { useT } from '@/lib/language-context'
import { CollabSubNav } from './collab-subnav'

const ICONS = [Sparkles, Network, Boxes, Server, Brain, ShieldCheck, Lock, Building2, Fingerprint]

export function CollabWhyContent() {
  const t = useT({
    fr: {
      eyebrow: 'Pourquoi Unitalk',
      title: 'La plateforme qui rend les Collaborateurs IA possibles.',
      subtitle: 'Une infrastructure pensée pour l\'entreprise : souveraine, ouverte et sécurisée.',
      pillars: [
        { title: 'Hermes', body: "Notre moteur d'orchestration qui donne aux Collaborateurs IA leur capacité à raisonner et à agir." },
        { title: 'Gateway', body: 'Une passerelle unique vers vos applications et vos modèles, sans dépendance à un seul fournisseur.' },
        { title: 'Open Source', body: 'Une base ouverte et auditable : pas de boîte noire, pas de verrouillage propriétaire.' },
        { title: 'Serveur privé', body: 'Déployez sur votre propre serveur ou dans notre cloud souverain, selon vos règles.' },
        { title: 'Mémoire', body: 'Une mémoire d\'entreprise permanente qui appartient à vos équipes, pas au modèle.' },
        { title: 'RGPD', body: 'Hébergement européen et conformité RGPD par conception.' },
        { title: 'Sécurité', body: 'Chiffrement, contrôle des accès et traçabilité des actions de chaque collaborateur.' },
        { title: 'Organisation', body: 'Chaque Collaborateur IA prend sa place dans votre organigramme, avec ses droits.' },
        { title: 'Identité', body: 'Un nom, un rôle et une continuité : vos collaborateurs deviennent durables.' },
      ],
      ctaTitle: 'Construisez votre organisation augmentée.',
      ctaBtn: 'Créer mon Collaborateur IA',
    },
    en: {
      eyebrow: 'Why Unitalk',
      title: 'The platform that makes AI Collaborators possible.',
      subtitle: 'Infrastructure built for the enterprise: sovereign, open and secure.',
      pillars: [
        { title: 'Hermes', body: 'Our orchestration engine that gives AI Collaborators their ability to reason and act.' },
        { title: 'Gateway', body: 'A single gateway to your apps and models, with no lock-in to one provider.' },
        { title: 'Open Source', body: 'An open, auditable foundation: no black box, no proprietary lock-in.' },
        { title: 'Private server', body: 'Deploy on your own server or in our sovereign cloud, your rules.' },
        { title: 'Memory', body: 'A permanent company context that belongs to your teams, not to the model.' },
        { title: 'GDPR', body: 'European hosting and GDPR compliance by design.' },
        { title: 'Security', body: 'Encryption, access control and traceability of every collaborator\'s actions.' },
        { title: 'Organization', body: 'Every AI Collaborator takes its place in your org chart, with its own rights.' },
        { title: 'Identity', body: 'A name, a role and continuity: your collaborators become durable.' },
      ],
      ctaTitle: 'Build your augmented organization.',
      ctaBtn: 'Create my AI Collaborator',
    },
  })

  return (
    <main className="w-full bg-[#F3EFE6]">
      <CollabSubNav active="/collaborateurs-ia/pourquoi-unitalk" />

      {/* Hero */}
      <section className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#D10E63]">{t.eyebrow}</p>
          <h1 className="text-balance font-sf text-4xl font-bold leading-[1.05] text-[#1C1A17] [letter-spacing:-0.04em] sm:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-[#4E483F]">{t.subtitle}</p>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-[#DDD5CA] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.pillars.map((pillar, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={pillar.title}
                className="rounded-2xl border border-[#DDD5CA] bg-[#FBF9F3] p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C1A17]">
                  <Icon className="h-6 w-6 text-[#FBF9F3]" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-[#1C1A17]">{pillar.title}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-[#6B6560]">{pillar.body}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D10E63] px-5 py-24 text-center text-[#FBF9F3] sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance font-sf text-4xl font-semibold [letter-spacing:-0.04em] md:text-5xl">{t.ctaTitle}</h2>
          <a href="/signup" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FBF9F3] px-7 py-3.5 font-bold text-[#1C1A17] transition-transform hover:-translate-y-0.5">
            {t.ctaBtn}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
