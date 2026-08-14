import { redirect } from 'next/navigation'

export default async function LegacyPaulGrahamSignupPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string; mission_auto?: string }>
}) {
  const params = await searchParams
  const next = new URLSearchParams({ source: 'paul-graham' })
  if (params.domain) next.set('domain', params.domain)
  if (params.mission_auto) next.set('q', params.mission_auto)
  redirect(`/decouvrir?${next}`)
}
