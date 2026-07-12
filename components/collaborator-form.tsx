'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Bot, Sparkles } from 'lucide-react'

const T = {
  fr: {
    title: "Créez votre premier collaborateur IA en moins d'une minute",
    subtitle:
      "Commencez par votre domaine. Nous créons ensuite votre premier collaborateur IA en moins d'une minute.",
    orgSection: 'Votre organisation',
    domainLabel: 'Nom de domaine',
    domainPlaceholder: 'monentreprise.fr',
    domainHint: "Le domaine identifie votre organisation et sert de racine à toutes les identités.",
    collabSection: 'Premier collaborateur',
    nameLabel: 'Nom',
    namePlaceholder: 'Emma',
    roleLabel: 'Rôle',
    roleOptions: ['Assistante Exécutive', 'Gestionnaire de Projets', 'Agent Commercial', 'Support Client'],
    hostedLabel: 'Hébergé sur Unitalk Cloud',
    recommended: 'Recommandé',
    ctaButton: 'Déployer',
    ctaDuration: '≈ 30 secondes',
    defaultName: 'Emma',
    terms: "En cliquant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité.",
  },
  en: {
    title: 'Create your first AI collaborator in under a minute',
    subtitle:
      'Start with your domain. We then create your first AI collaborator in under a minute.',
    orgSection: 'Your organization',
    domainLabel: 'Domain name',
    domainPlaceholder: 'mycompany.com',
    domainHint: 'The domain identifies your organization and serves as the root for all identities.',
    collabSection: 'First collaborator',
    nameLabel: 'Name',
    namePlaceholder: 'Emma',
    roleLabel: 'Role',
    roleOptions: ['Executive Assistant', 'Project Manager', 'Sales Agent', 'Customer Support'],
    hostedLabel: 'Hosted on Unitalk Cloud',
    recommended: 'Recommended',
    ctaButton: 'Deploy',
    ctaDuration: '≈ 30 seconds',
    defaultName: 'Emma',
    terms: 'By clicking, you accept our Terms of Use and Privacy Policy.',
  },
}

interface CollaboratorFormProps {
  lang?: 'fr' | 'en'
}

export default function CollaboratorForm({ lang = 'fr' }: CollaboratorFormProps) {
  const t = T[lang]
  const [domain, setDomain] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState(t.roleOptions[0])

  const collaboratorName = name.trim() || t.defaultName

  return (
    <motion.div
      className="relative w-full max-w-md rounded-2xl border border-[#E6DFD1] bg-[#F5F1E8] p-8 shadow-xl"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Header */}
      <div className="mb-7">
        <h3 className="text-lg font-bold leading-snug text-[#1C1A17] text-balance">{t.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#8A8175] text-pretty">{t.subtitle}</p>
      </div>

      {/* Organisation — the root */}
      <div className="mb-2">
        <div className="mb-2 flex items-center gap-2">
          <Globe className="h-4 w-4 text-[#D10E63]" />
          <span className="text-xs font-bold uppercase tracking-wide text-[#1C1A17]">{t.orgSection}</span>
        </div>
        <label className="mb-1.5 block text-xs font-semibold text-[#6B6560]">{t.domainLabel}</label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder={t.domainPlaceholder}
          className="w-full rounded-lg border border-[#DDD5CA] bg-white px-4 py-3 text-base font-medium text-[#1C1A17] placeholder-[#B8B0A2] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
        />
        <p className="mt-2 text-xs leading-relaxed text-[#8A8175] text-pretty">{t.domainHint}</p>
      </div>

      {/* First collaborator */}
      <div className="mt-6 mb-6">
        <div className="mb-3 flex items-center gap-2">
          <Bot className="h-4 w-4 text-[#D10E63]" />
          <span className="text-xs font-bold uppercase tracking-wide text-[#1C1A17]">{t.collabSection}</span>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#6B6560]">{t.nameLabel}</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full rounded-lg border border-[#DDD5CA] bg-white px-4 py-3 text-sm text-[#1C1A17] placeholder-[#B8B0A2] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
              />
              <Sparkles className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#D10E63]/40" />
            </div>
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
          </div>
        </div>
      </div>

      {/* Hosted Badge */}
      <div className="mb-6 flex items-center gap-2 rounded-lg bg-[#2E7D4F]/10 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-[#2E7D4F]" />
        <span className="text-xs font-medium text-[#2E7D4F]">{t.hostedLabel}</span>
        <span className="ml-auto text-xs font-semibold text-[#2E7D4F]">{t.recommended}</span>
      </div>

      {/* CTA Button — personalized with the collaborator's name */}
      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] py-3 text-center font-semibold text-white transition-colors hover:bg-[#B00B52]">
        {t.ctaButton} {collaboratorName}
        <span aria-hidden="true">›</span>
      </button>
      <p className="mb-4 mt-2 text-center text-xs text-[#8A8175]">{t.ctaDuration}</p>

      {/* Terms */}
      <p className="text-center text-xs text-[#8A8175]">{t.terms}</p>
    </motion.div>
  )
}
