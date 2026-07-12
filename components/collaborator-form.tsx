'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Sparkles } from 'lucide-react'

const T = {
  fr: {
    title: 'Créez votre collaborateur IA',
    subtitle: 'Déployé en moins de 60 secondes',
    domainLabel: 'Votre domaine',
    domainPlaceholder: 'votreentreprise.com',
    nameLabel: 'Nom de votre collaborateur',
    namePlaceholder: 'Emma',
    roleLabel: 'Rôle',
    roleOptions: ['Assistant Exécutif', 'Gestionnaire de Projets', 'Agent Commercial', 'Support Client'],
    hostedLabel: 'Hébergé sur Unitalk Cloud',
    recommended: 'Recommandé',
    ctaButton: 'Déployer mon collaborateur',
    terms: 'En cliquant, vous acceptez nos Conditions d\'utilisation et notre Politique de confidentialité.',
  },
  en: {
    title: 'Create your AI collaborator',
    subtitle: 'Deployed in under 60 seconds',
    domainLabel: 'Your domain',
    domainPlaceholder: 'yourcompany.com',
    nameLabel: 'Your collaborator\'s name',
    namePlaceholder: 'Emma',
    roleLabel: 'Role',
    roleOptions: ['Executive Assistant', 'Project Manager', 'Sales Agent', 'Customer Support'],
    hostedLabel: 'Hosted on Unitalk Cloud',
    recommended: 'Recommended',
    ctaButton: 'Deploy my collaborator',
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

  return (
    <motion.div
      className="relative w-full max-w-sm rounded-2xl border border-[#E6DFD1] bg-[#F5F1E8] p-8 shadow-xl"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Header */}
      <div className="mb-8 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D10E63]/10">
          <Globe className="h-5 w-5 text-[#D10E63]" />
        </div>
        <div>
          <h3 className="font-bold text-[#1C1A17]">{t.title}</h3>
          <p className="text-sm text-[#8A8175]">{t.subtitle}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5 mb-6">
        {/* Domain */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#1C1A17]">
            {t.domainLabel}
            <span className="ml-1 text-xs font-normal text-[#8A8175]">(optionnel)</span>
          </label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder={t.domainPlaceholder}
            className="w-full rounded-lg border border-[#DDD5CA] bg-white px-4 py-3 text-sm text-[#1C1A17] placeholder-[#B8B0A2] focus:border-[#D10E63] focus:outline-none focus:ring-1 focus:ring-[#D10E63]/30"
          />
        </div>

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#1C1A17]">
            {t.nameLabel}
            <span className="ml-1 text-xs font-normal text-[#8A8175]">*</span>
          </label>
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
          <label className="mb-2 block text-sm font-semibold text-[#1C1A17]">
            {t.roleLabel}
            <span className="ml-1 text-xs font-normal text-[#8A8175]">*</span>
          </label>
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

      {/* Hosted Badge */}
      <div className="mb-6 flex items-center gap-2 rounded-lg bg-[#2E7D4F]/10 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-[#2E7D4F]" />
        <span className="text-xs font-medium text-[#2E7D4F]">{t.hostedLabel}</span>
        <span className="ml-auto text-xs font-semibold text-[#2E7D4F]">{t.recommended}</span>
      </div>

      {/* CTA Button */}
      <button className="w-full rounded-full bg-[#D10E63] py-3 text-center font-semibold text-white hover:bg-[#B00B52] transition-colors flex items-center justify-center gap-2 mb-4">
        {t.ctaButton}
        <span>›</span>
      </button>

      {/* Terms */}
      <p className="text-xs text-center text-[#8A8175]">{t.terms}</p>
    </motion.div>
  )
}
