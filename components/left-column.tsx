'use client'

import { useState } from 'react'
import { Globe, ArrowRight, Check } from 'lucide-react'

export function LeftColumn() {
  const [domain, setDomain] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (domain) {
      setSubmitted(true)
    }
  }

  return (
    <div className="flex flex-col justify-center gap-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 w-fit">
        <span className="text-[#555555] text-xs uppercase tracking-widest">✧ Propulsé par Hermes (open source)</span>
      </div>

      {/* Overline */}
      <div className="text-[#8E8E93] text-sm leading-relaxed">
        Vous gérez tout, tout seul. Sans pouvoir embaucher.
      </div>

      {/* Main H1 */}
      <h1 className="text-[72px] md:text-[96px] font-playfair-display font-normal leading-[0.95] tracking-[-0.03em]">
        Lancez votre{' '}
        <span className="text-[#FF0099] italic">agent IA</span>.
      </h1>

      {/* Subtitle */}
      <p className="text-[#8E8E93] text-base leading-relaxed max-w-md">
        Il apprend votre métier, travaille dans vos outils
        et n&apos;oublie jamais rien.
      </p>

      {/* HITL Reassurance */}
      <div className="text-[#555555] text-xs uppercase tracking-widest">
        Vous restez le patron.
      </div>

      {/* Domain Input */}
      <form onSubmit={handleSubmit} className="max-w-md">
        {!submitted ? (
          <div className="flex items-center gap-2 bg-[#111111] border border-[#333333] rounded-full px-4 py-3 focus-within:border-[#FF0099] transition-colors">
            <Globe size={18} className="text-[#8E8E93]" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="votre-domaine.fr"
              className="flex-1 bg-transparent text-white placeholder-[#555555] text-sm outline-none"
              aria-label="Domain input"
            />
            <button
              type="submit"
              className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors"
              aria-label="Submit domain"
            >
              <ArrowRight size={18} className="text-[#FF0099]" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-[#111111] border border-[#22C55E] rounded-full px-4 py-3">
            <Check size={18} className="text-[#22C55E]" />
            <span className="text-[#22C55E] text-sm">
              ✅ Alma analyse {domain} et prépare votre diagnostic.
            </span>
          </div>
        )}
      </form>

      {/* Primary CTA */}
      <button
        className="max-w-md px-9 py-4 bg-[#FF0099] text-white font-medium rounded-full hover:bg-[#E00085] transition-colors text-base"
        aria-label="Start free trial"
      >
        Essayer gratuitement
      </button>

      {/* Micro-copy */}
      <p className="text-[#555555] text-xs">
        Essai limité · 1 modèle IA · sans carte bancaire.
      </p>
    </div>
  )
}
