'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mic, Square } from 'lucide-react'

type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  title: string
  body?: string
  role: string
  placeholder: string
  submitLabel: string
  starters: readonly string[]
  listening: boolean
  onToggleListening: () => void
  voiceSupported?: boolean
  voiceStartLabel: string
  voiceStopLabel: string
  listeningLabel?: string
  help?: string
  error?: string
  status?: string
  textareaRef?: React.Ref<HTMLTextAreaElement>
  preview?: React.ReactNode
  previewVisible?: boolean
  attention?: boolean
  compactMobile?: boolean
  compactDesktop?: boolean
}

export function AlmaMissionComposer({
  value,
  onChange,
  onSubmit,
  title,
  body,
  role,
  placeholder,
  submitLabel,
  starters,
  listening,
  onToggleListening,
  voiceSupported = true,
  voiceStartLabel,
  voiceStopLabel,
  listeningLabel,
  help,
  error,
  status,
  textareaRef,
  preview,
  previewVisible = false,
  attention = false,
  compactMobile = false,
  compactDesktop = false,
}: Props) {
  const reduce = useReducedMotion()
  const clean = value.trim()

  return (
    <div className={`relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#17130F] text-[#F8F1E7] shadow-[0_34px_80px_-28px_rgba(23,19,15,0.65)] sm:min-h-[480px] sm:p-7 lg:min-h-0 lg:p-5 ${compactMobile ? 'min-h-[390px] p-4' : 'min-h-[430px] p-5'} ${compactDesktop ? '[@media(min-width:1024px)_and_(max-height:850px)]:p-4' : ''}`}>
      <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F15B9B] to-transparent" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/alma-avatar.png" alt="Alma" width={44} height={44} className={`size-11 rounded-full object-cover ring-2 ring-[#D10E63]/35 ${compactDesktop ? '[@media(min-width:1024px)_and_(max-height:850px)]:size-10' : ''}`} />
          <div><p className="font-sf font-semibold">Alma</p><p className="text-xs text-[#D6CABD]">{role}</p></div>
        </div>
        {status && <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#F3B4CF]"><span className="size-1.5 rounded-full bg-[#45C578]" />{status}</span>}
      </div>

      <div className={`flex min-h-[94px] items-center py-4 ${compactDesktop ? '[@media(min-width:1024px)_and_(max-height:850px)]:min-h-[72px] [@media(min-width:1024px)_and_(max-height:850px)]:py-2' : ''}`}>
        <AnimatePresence mode="wait" initial={false}>
          {previewVisible && preview ? (
            <motion.div key="preview" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full">{preview}</motion.div>
          ) : (
            <motion.div key="prompt" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className={`text-balance font-sf text-[24px] font-semibold tracking-[-0.025em] ${compactDesktop ? '[@media(min-width:1024px)_and_(max-height:850px)]:text-[21px]' : ''}`}>{title}</h2>
              {body && <p className="mt-2 max-w-md text-[13px] leading-5 text-[#D6CABD]">{body}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && clean) {
              event.preventDefault()
              onSubmit()
            }
          }}
          rows={compactDesktop ? 2 : 3}
          placeholder={placeholder}
          aria-label={placeholder}
          className={`w-full resize-none rounded-2xl border bg-white/[0.07] px-4 py-3 pr-16 text-[15px] leading-6 text-white outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-[#AFA397] focus:border-[#D10E63] focus:bg-white/[0.09] ${attention ? 'border-[#F15B9B] shadow-[0_0_0_4px_rgba(209,14,99,0.16)]' : 'border-white/15'}`}
        />
        {voiceSupported && (
          <button type="button" onClick={onToggleListening} aria-pressed={listening} aria-label={listening ? voiceStopLabel : voiceStartLabel} className={`absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F15B9B] ${listening ? 'bg-[#D10E63] text-white' : 'bg-white/10 text-[#F15B9B] hover:bg-white/15'}`}>
            {listening ? <Square className="size-3.5" fill="currentColor" /> : <Mic className="size-4" />}
          </button>
        )}
      </div>

      <div className="mt-3 min-h-7">
        {listening && listeningLabel ? <p className="text-xs font-medium text-[#F3B4CF]">{listeningLabel}</p> : !previewVisible && (
          <div className="flex flex-wrap gap-2">
            {starters.map((starter) => <button key={starter} type="button" onClick={() => onChange(starter)} className={`rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-[11px] font-medium text-[#D6CABD] transition-colors hover:border-[#D10E63]/50 hover:text-white ${compactDesktop ? '[@media(min-width:1024px)_and_(max-height:850px)]:px-2.5 [@media(min-width:1024px)_and_(max-height:850px)]:py-1 [@media(min-width:1024px)_and_(max-height:850px)]:text-[10px]' : ''}`}>{starter}</button>)}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {clean && (
          <motion.button type="button" onClick={onSubmit} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }} transition={{ duration: reduce ? 0 : 0.2 }} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#E51872] px-6 text-sm font-bold text-white shadow-[0_8px_24px_-12px_rgba(229,24,114,.8)] transition-colors hover:bg-[#F02A82]">
            {submitLabel}<ArrowRight className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {(error || help) && <p role={error ? 'alert' : undefined} className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-5 text-[#AFA397]">{error || help}</p>}
    </div>
  )
}
