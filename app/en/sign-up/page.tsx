import type { Metadata } from 'next'
import { AuthCard } from '@/components/auth/auth-card'

export const metadata: Metadata = { title: 'Sign up · Unitalk', description: 'Create your Unitalk account with Google, Microsoft or your email.', robots: { index: false, follow: false } }

function firstParam(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] : value }

export default async function EnglishSignUpPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  return <main className="flex min-h-screen items-center justify-center bg-[#F3EFE6] px-4 py-16"><AuthCard mode="sign-up" redirectTo={firstParam(params.redirect) ?? '/en/get-started'}/></main>
}
