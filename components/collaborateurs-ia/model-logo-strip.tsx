import { Anthropic, DeepSeek, Gemini, Mistral, OpenAI } from '@lobehub/icons'
import type { ReactNode } from 'react'

const brands: { provider: string; model: string; logo: ReactNode }[] = [
  { provider: 'OpenAI', model: 'GPT', logo: <OpenAI size={32} /> },
  { provider: 'Anthropic', model: 'Claude', logo: <Anthropic size={32} /> },
  { provider: 'Google', model: 'Gemini', logo: <Gemini size={32} /> },
  { provider: 'DeepSeek', model: 'DeepSeek', logo: <DeepSeek size={32} /> },
  { provider: 'Mistral AI', model: 'Mistral', logo: <Mistral size={32} /> },
]

export function ModelLogoStrip() {
  return (
    <section aria-labelledby="model-logo-strip-title" className="mt-12 w-full text-[#F8F5EE]">
      <h3 id="model-logo-strip-title" className="sr-only">Modèles accessibles via Unitalk AI Gateway</h3>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
        {brands.map(({ provider, model, logo }) => (
          <li key={provider} className="group flex min-h-24 flex-col items-center justify-center text-center">
            <span aria-hidden="true" className="flex h-10 items-center justify-center text-[#F8F5EE]/75 transition-colors group-hover:text-[#F8F5EE]">{logo}</span>
            <span className="mt-4 text-sm font-semibold">{provider}</span>
            <span className="mt-1 text-xs text-[#BDB7AC]">{model}</span>
          </li>
        ))}
        <li className="group flex min-h-24 flex-col items-center justify-center text-center">
          <PrivateModelIcon />
          <span className="mt-4 text-sm font-semibold">Vos modèles</span>
          <span className="mt-1 text-xs text-[#BDB7AC]">Privés</span>
        </li>
      </ul>
    </section>
  )
}

function PrivateModelIcon() {
  return <svg aria-hidden="true" className="h-8 w-8 text-[#F8F5EE]/75" fill="none" viewBox="0 0 32 32"><rect height="22" rx="6" stroke="currentColor" strokeWidth="1.6" width="26" x="3" y="7"/><path d="M10 7V5.8A6 6 0 0 1 16 0a6 6 0 0 1 6 5.8V7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6"/><circle cx="11" cy="16" fill="currentColor" r="1.5"/><circle cx="16" cy="16" fill="currentColor" r="1.5"/><circle cx="21" cy="16" fill="currentColor" r="1.5"/><path d="M10 22h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6"/></svg>
}
