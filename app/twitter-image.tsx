import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from '@/lib/og-image'

export const alt = 'Unitalk — Recrutez votre premier Collaborateur IA'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage()
}
