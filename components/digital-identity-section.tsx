'use client'

import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  Calendar,
  Brain,
  BookOpen,
  Wrench,
  Mic,
  ShieldCheck,
  Globe,
  Sparkles,
  MonitorSmartphone,
  GraduationCap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

type Attribute = {
  icon: LucideIcon
  title: string
  desc: string
}

const T = {
  fr: {
    eyebrow: 'UNE VÉRITABLE IDENTITÉ',
    title: 'Chaque collaborateur IA est une véritable identité numérique.',
    subtitle:
      "Les collaborateurs IA deviennent un actif de l'entreprise, avec leur identité, leur mémoire, leurs compétences et leur historique.",
    attributes: [
      // Intelligence
      {
        icon: Sparkles,
        title: 'Meilleurs modèles IA',
        desc: 'ChatGPT, Claude et Gemini via Unitalk AI Gateway.',
      },
      { icon: Brain, title: 'Mémoire', desc: 'Il retient chaque échange et décision.' },
      { icon: BookOpen, title: 'Connaissances', desc: 'Le contexte complet de votre entreprise.' },
      { icon: GraduationCap, title: 'Compétences', desc: 'Il apprend vos processus et progresse en continu.' },
      // Communication
      { icon: Mail, title: 'Adresse email', desc: 'Sa propre boîte pour écrire et répondre.' },
      { icon: Phone, title: 'Numéro de téléphone', desc: 'Une ligne dédiée pour appeler et être appelé.' },
      { icon: Mic, title: 'Voix', desc: 'Une voix naturelle pour ses appels.' },
      { icon: Calendar, title: 'Calendrier', desc: 'Il planifie et gère ses rendez-vous.' },
      // Intégration
      { icon: Wrench, title: 'Outils', desc: 'Connecté à votre CRM et vos applications.' },
      {
        icon: MonitorSmartphone,
        title: 'Accessible de partout',
        desc: 'Apps de messagerie, desktop, CLI ou interface web collaborative Unitalk.',
      },
      { icon: ShieldCheck, title: 'Permissions', desc: 'Des accès précis, sous votre contrôle.' },
      { icon: Globe, title: 'Identité publique', desc: 'Une page de profil qui lui est propre.' },
    ] as Attribute[],
  },
  en: {
    eyebrow: 'A REAL IDENTITY',
    title: 'Every AI collaborator is a real digital identity.',
    subtitle:
      'AI collaborators become a true business asset, with their own identity, memory, skills, and track record.',
    attributes: [
      // Intelligence
      {
        icon: Sparkles,
        title: 'Best AI models',
        desc: 'ChatGPT, Claude and Gemini via Unitalk AI Gateway.',
      },
      { icon: Brain, title: 'Memory', desc: 'It remembers every exchange and decision.' },
      { icon: BookOpen, title: 'Knowledge', desc: "Your company's full context." },
      { icon: GraduationCap, title: 'Skills', desc: 'It learns your processes and keeps improving.' },
      // Communication
      { icon: Mail, title: 'Email address', desc: 'Its own inbox to write and reply.' },
      { icon: Phone, title: 'Phone number', desc: 'A dedicated line to call and be called.' },
      { icon: Mic, title: 'Voice', desc: 'A natural voice for its calls.' },
      { icon: Calendar, title: 'Calendar', desc: 'It schedules and manages its meetings.' },
      // Integration
      { icon: Wrench, title: 'Tools', desc: 'Connected to your CRM and apps.' },
      {
        icon: MonitorSmartphone,
        title: 'Accessible everywhere',
        desc: 'Messaging apps, desktop, CLI or the Unitalk collaborative web interface.',
      },
      { icon: ShieldCheck, title: 'Permissions', desc: 'Precise access, under your control.' },
      { icon: Globe, title: 'Public identity', desc: 'A profile page of its own.' },
    ] as Attribute[],
  },
}

export function DigitalIdentitySection({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]

  return (
    <section className="w-full bg-[#FBF9F3] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#D10E63]">
            {t.eyebrow}
          </p>
          <h2 className="font-sf text-3xl font-bold leading-tight text-[#1C1A17] text-balance sm:text-4xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6B6560] text-pretty sm:text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.attributes.map((attr, i) => {
            const Icon = attr.icon
            return (
              <motion.li
                key={attr.title}
                className="flex items-start gap-4 rounded-2xl border border-[#E6DFD1] bg-white p-5 shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: (i % 3) * 0.06 }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10 text-[#D10E63]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#1C1A17]">{attr.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#6B6560] text-pretty">{attr.desc}</p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
