'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Sparkles, Check } from 'lucide-react'

const T = {
  fr: {
    title: 'Déployez votre premier collaborateur IA',
    subtitle: 'Prêt en moins de 2 minutes, à partir de votre nom de domaine.',
    domainLabel: 'Nom de domaine',
    domainPlaceholder: 'monentreprise.fr',
    domainHint: "Nous analysons automatiquement votre site web pour créer le contexte partagé de votre organisation.",
    nameLabel: 'Nom du collaborateur',
    namePlaceholder: 'Emma',
    nameHint: 'Vous pourrez le modifier plus tard.',
    suggestName: 'Suggérer',
    roleLabel: 'Rôle',
    roleHint: 'Les compétences seront générées automatiquement.',
    roleOptions: ['Assistante Exécutive', 'Gestionnaire de Projets', 'Agent Commercial', 'Support Client'],
    ctaButton: 'Déployer',
    ctaSuffix: 'gratuitement',
    ctaDuration: 'Aucune carte bancaire • Configuration automatique',
    defaultName: 'Emma',
    terms: "En cliquant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.",
  },
  en: {
    title: 'Deploy your first AI collaborator',
    subtitle: 'Ready in under 2 minutes, using your domain name.',
    domainLabel: 'Domain name',
    domainPlaceholder: 'mycompany.com',
    domainHint: 'We automatically analyze your website to build the shared context for your organization.',
    nameLabel: 'Collaborator name',
    namePlaceholder: 'Emma',
    nameHint: 'You can change it later.',
    suggestName: 'Suggest',
    roleLabel: 'Role',
    roleHint: 'Skills will be generated automatically.',
    roleOptions: ['Executive Assistant', 'Project Manager', 'Sales Agent', 'Customer Support'],
    ctaButton: 'Deploy',
    ctaSuffix: 'for free',
    ctaDuration: 'No credit card • Automatic setup',
    defaultName: 'Emma',
    terms: 'By clicking, you accept our Terms of Use and Privacy Policy.',
  },
}

interface CollaboratorFormProps {
  lang?: 'fr' | 'en'
}

const SUGGESTED_NAMES = ['Emma', 'Léa', 'Nina', 'Alex', 'Noé', 'Maya']

export default function CollaboratorForm({ lang = 'fr' }: CollaboratorFormProps) {
  const t = T[lang]
  const [domain, setDomain] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState(t.roleOptions[0])

  const collaboratorName = name.trim() || t.defaultName

  const suggestName = () => {
    const currentIndex = SUGGESTED_NAMES.indexOf(collaboratorName)
    const nextIndex = (currentIndex + 1) % SUGGESTED_NAMES.length
    setName(SUGGESTED_NAMES[nextIndex])
  }

  return (
    <motion.div
      className="relative w-full max-w-md rounded-2xl border border-[#E6DFD1] bg-[#F5F1E8] p-6 shadow-xl sm:p-7"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-bold leading-snug text-[#1C1A17] text-balance">{t.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#8A8175] text-pretty">{t.subtitle}</p>
      </div>

      {/* Domain — the root of the organization */}
      <div>
        <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-[#6B6560]">
          <Globe className="h-4 w-4 text-[#D10E63]" />
          {t.domainLabel}
        </label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder={t.domainPlaceholder}
          className="w-full rounded-lg border border-[#DDD5CA] bg-white px-4 py-3 text-base font-medium text-[#1C1A17] placeholder-[#B8B0A2] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
        />
        <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-[#8A8175] text-pretty">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2E7D4F]" strokeWidth={2.5} />
          {t.domainHint}
        </p>
      </div>

      {/* First collaborator */}
      <div className="mb-5 mt-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Name */}
          <div className="min-w-0 flex-1">
            <label className="mb-1.5 block text-xs font-semibold text-[#6B6560]">
              {t.nameLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full rounded-lg border border-[#DDD5CA] bg-white py-3 pl-4 pr-28 text-sm text-[#1C1A17] placeholder-[#B8B0A2] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
              />
              <button
                type="button"
                onClick={suggestName}
                className="absolute right-2 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold text-[#D10E63] transition-colors hover:bg-[#D10E63]/10"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {t.suggestName}
              </button>
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#8A8175]">
              <Check className="h-3.5 w-3.5 shrink-0 text-[#2E7D4F]" strokeWidth={2.5} />
              {t.nameHint}
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#6B6560]">{t.roleLabel}</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-[#DDD5CA] bg-white px-4 py-3 text-sm text-[#1C1A17] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
            >
              {t.roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#8A8175]">
              <Check className="h-3.5 w-3.5 shrink-0 text-[#2E7D4F]" strokeWidth={2.5} />
              {t.roleHint}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button — personalized with the collaborator's name */}
      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] py-3 text-center font-semibold text-white transition-colors hover:bg-[#B00B52]">
        {t.ctaButton} {collaboratorName} {t.ctaSuffix}
        <span aria-hidden="true">›</span>
      </button>
      <p className="mb-4 mt-2 text-center text-xs text-[#8A8175]">{t.ctaDuration}</p>

      {/* Terms */}
      <p className="text-center text-xs text-[#8A8175]">{t.terms}</p>
    </motion.div>
  )
}
