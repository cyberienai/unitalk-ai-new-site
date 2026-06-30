'use client'

import { motion } from 'framer-motion'
import { UnitalkLogo } from './unitalk-logo'
import { Check, AlertCircle, MessageCircle, Phone, Send } from 'lucide-react'

export function CenterColumn() {
  const items = [
    { label: 'Agence Thomas · Paris', icon: '✓' },
    { label: '3 personnes · fondée 2019', icon: '✓' },
    { label: 'Gmail · HubSpot · GA4', icon: '✓' },
    { label: 'DMARC absent', icon: '⚠' },
    { label: 'Score mobile 38/100', icon: '⚠' }
  ]

  return (
    <motion.div
      className="relative h-[520px] bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-[28px] p-[18px] overflow-hidden"
      whileHover={{ boxShadow: '0 0 60px rgba(255, 0, 153, 0.15)' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 153, 0.25) 0%, rgba(160, 117, 232, 0.1) 50%, transparent 70%)',
        filter: 'blur(80px)',
        opacity: 0.5
      }} />

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2">
            <UnitalkLogo size={20} />
            <span className="text-xs text-[#8E8E93] font-medium">Alma · en direct</span>
          </div>
          <div className="w-2 h-2 bg-[#22C55E] rounded-full" />
        </div>

        {/* Chat Area */}
        <div className="flex-1 py-4 space-y-3 overflow-hidden">
          {/* Message 1 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="max-w-[90%]"
          >
            <div className="bg-[#1A1A1A] rounded-lg px-3 py-2 inline-block">
              <p className="text-xs text-[#FFFFFF]">
                Bonjour Thomas.<br />
                J&apos;ai analysé agence-thomas.fr.
              </p>
            </div>
          </motion.div>

          {/* Message 2 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-[90%]"
          >
            <div className="bg-[#1A1A1A] rounded-lg px-3 py-2 inline-block">
              <p className="text-xs text-[#FFFFFF]">
                Agence digitale à Paris.<br />
                3 personnes.<br />
                Gmail, HubSpot et GA4 détectés.
              </p>
            </div>
          </motion.div>

          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-[90%]"
          >
            <div className="bg-[#1A1A1A] rounded-lg px-3 py-2 inline-block">
              <p className="text-xs text-[#FFFFFF]">
                Quelle tâche vous prend le plus de temps aujourd&apos;hui ?
              </p>
            </div>
          </motion.div>
        </div>

        {/* Context Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1A1A1A] rounded-lg p-3 mb-3 border border-[rgba(255,255,255,0.08)]"
        >
          <p className="text-xs font-semibold text-[#FFFFFF] mb-2">Ce qu&apos;Alma comprend</p>
          <div className="space-y-1">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2 text-xs text-[#8E8E93]"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-lg px-3 py-2 border border-[rgba(255,255,255,0.08)]">
          <input
            type="text"
            placeholder="Répondre à Alma..."
            className="flex-1 bg-transparent text-xs text-white placeholder-[#555555] outline-none"
            disabled
          />
          <button disabled className="p-1 text-[#8E8E93]">
            <Phone size={14} />
          </button>
          <button disabled className="p-1 text-[#FF0099]">
            <Send size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
