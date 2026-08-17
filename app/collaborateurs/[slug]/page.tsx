import { permanentRedirect } from 'next/navigation'
import { COLLABORATOR_PAGE_SLUGS } from '@/lib/collaborator-pages'

export function generateStaticParams() {
  return COLLABORATOR_PAGE_SLUGS.map((slug) => ({ slug }))
}

export default async function LegacyCollaborateurPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  permanentRedirect(`/@${encodeURIComponent(slug)}`)
}
