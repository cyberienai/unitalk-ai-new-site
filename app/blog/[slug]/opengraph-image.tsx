import { ImageResponse } from 'next/og'
import { getBlogArticle } from '@/lib/blog-articles'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getBlogArticle(slug)
  const prospects = slug === 'trouver-prospects-qualifies-ia'
  const email = slug === 'repondre-demandes-email-ia'
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 72, background: '#F3EFE6', color: '#1C1A17', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', fontSize: 22, color: '#D10E63', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>{prospects ? 'Prospection B2B' : email ? 'Mission · Service client' : article?.category.fr ?? 'Blog Unitalk'}</div>
      <div style={{ display: 'flex', maxWidth: 980, marginTop: 28, fontSize: 60, lineHeight: 1.06, fontWeight: 800 }}>{prospects ? 'Trouver des prospects qualifiés avec l’IA' : email ? 'Répondre aux emails clients avec l’IA' : article?.title.fr ?? 'Unitalk'}</div>
      <div style={{ display: 'flex', marginTop: 28, fontSize: 30, color: '#4E483F' }}>{prospects ? 'Une liste ne vaut pas une bonne sélection.' : email ? 'Sans perdre le contexte.' : article?.excerpt.fr ?? ''}</div>
      <div style={{ display: 'flex', marginTop: 52, fontSize: 26, fontWeight: 700 }}>Unitalk</div>
    </div>,
    size,
  )
}
