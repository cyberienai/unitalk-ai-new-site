import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unitalk — Delegating work to AI is inevitable',
  description:
    'The future belongs to those who delegate to machines. Unitalk AI: autonomous collaborators that work while you sleep.',
  alternates: { canonical: 'https://unitalk.ai/elon-musk' },
  openGraph: {
    title: 'Unitalk — Delegating work to AI is inevitable',
    description: 'Autonomous AI collaborators. Delegate work. Ship faster.',
    url: 'https://unitalk.ai/elon-musk',
  },
}

export default function ElonMuskLayout({ children }: { children: React.ReactNode }) {
  return children
}