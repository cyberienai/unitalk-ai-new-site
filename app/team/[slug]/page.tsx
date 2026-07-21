import { permanentRedirect } from 'next/navigation'

// Legacy URL: /team/emma → /@emma
export default async function LegacyTeamProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  permanentRedirect(`/@${slug}`)
}
