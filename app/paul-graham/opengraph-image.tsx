import { ImageResponse } from 'next/og'

export const alt = 'Votre savoir-faire devrait travailler sans vous - Unitalk'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ position: 'relative', display: 'flex', width: '100%', height: '100%', overflow: 'hidden', background: '#F3EFE6', color: '#181715', fontFamily: 'sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', opacity: .18, backgroundImage: 'linear-gradient(#181715 1px, transparent 1px), linear-gradient(90deg, #181715 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
      <div style={{ position: 'absolute', top: -220, right: -120, display: 'flex', width: 520, height: 520, border: '90px solid #FFD84D', borderRadius: '50%' }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '62px 70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 25, fontWeight: 800 }}>
          <div style={{ display: 'flex', width: 24, height: 24, marginRight: 12, borderRadius: '50%', background: '#D10E63' }} />
          Unitalk
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 950 }}>
          <div style={{ display: 'flex', marginBottom: 22, color: '#D10E63', fontSize: 18, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase' }}>Une mission. Vos règles. Un résultat.</div>
          <div style={{ display: 'flex', fontSize: 78, fontWeight: 900, lineHeight: .92, letterSpacing: -5 }}>Votre savoir-faire devrait travailler sans vous.</div>
        </div>
        <div style={{ display: 'flex', fontSize: 21, color: '#514B42' }}>Un Collaborateur IA qui exécute avec vos méthodes et vos validations.</div>
      </div>
    </div>,
    size,
  )
}
