'use client'

import { useEffect, useRef, useState } from 'react'
import type { Lang } from '@/lib/language-context'
import { Navbar } from './navbar'
import { HeroHybrid } from './home/hero-hybrid'
import { SectionWorkspace } from './home/section-workspace'
import { HomeProcess } from './home/home-process'
import { HomeGuardrails } from './home/home-guardrails'
import { HomeCollaborators } from './home/home-collaborators'
import { HomeIntentDoors } from './home/home-static-sections'
import { HomeFinalCtaValidated } from './home/home-final-cta-validated'
import { HomeFaq } from './home/home-faq'
import { SiteFooter } from './site-footer'

type SpeechResultEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type SpeechRecognitionInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechResultEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as typeof window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

export function HomeNew({ lang }: { lang: Lang }) {
  const [mission, setMission] = useState('')
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const dictationPrefixRef = useRef('')

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = event => {
      setVoiceError('')
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setMission([dictationPrefixRef.current, transcript.trim()].filter(Boolean).join(' '))
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => {
      setListening(false)
      setVoiceError(lang === 'fr' ? 'La dictée vocale a échoué. Vous pouvez continuer par écrit.' : 'Voice dictation failed. You can continue in writing.')
    }
    recognitionRef.current = recognition
    const frame = requestAnimationFrame(() => setVoiceSupported(true))
    return () => {
      cancelAnimationFrame(frame)
      recognition.abort()
      recognitionRef.current = null
    }
  }, [lang])

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      return
    }
    dictationPrefixRef.current = mission.trim()
    setVoiceError('')
    setListening(true)
    try { recognition.start() } catch {
      setListening(false)
      setVoiceError(lang === 'fr' ? 'La dictée vocale ne peut pas démarrer. Vous pouvez continuer par écrit.' : 'Voice dictation cannot start. You can continue in writing.')
    }
  }

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <Navbar />
      <main id="main-content" className="home-page-main">
        <HeroHybrid lang={lang} value={mission} onChange={setMission} listening={listening} onToggleListening={toggleListening} voiceSupported={voiceSupported} voiceError={voiceError} />
        <HomeProcess lang={lang} />
        <SectionWorkspace lang={lang} />
        <HomeIntentDoors lang={lang} />
        <HomeCollaborators lang={lang} />
        <HomeGuardrails lang={lang} />
        <HomeFaq lang={lang} />
        <HomeFinalCtaValidated lang={lang} />
      </main>
      <SiteFooter />
    </div>
  )
}
