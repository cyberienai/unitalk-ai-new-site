import type { Metadata } from 'next'
import { HomeNew } from '@/components/home-new'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeNew />
}
