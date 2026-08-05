import { ImageResponse } from 'next/og'

// Shared Open Graph / social share image (1200x630) for Unitalk.
// Rendered by code so text stays crisp and correctly sized.
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#F3EFE6',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Faint grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(to right, rgba(28,26,23,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,26,23,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Magenta halo behind card */}
        <div
          style={{
            position: 'absolute',
            top: 150,
            right: 90,
            width: 460,
            height: 360,
            display: 'flex',
            background: 'radial-gradient(closest-side, rgba(209,14,99,0.42), rgba(209,14,99,0))',
          }}
        />

        {/* Left column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 64px',
            width: 660,
            height: '100%',
          }}
        >
          {/* Wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: 'linear-gradient(135deg, #F0658F, #D10E63)',
                display: 'flex',
                marginRight: 12,
              }}
            />
            <div style={{ fontSize: 30, fontWeight: 700, color: '#1C1A17', letterSpacing: -0.5 }}>
              Unitalk
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 62,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#1C1A17',
            }}
          >
            Recrutez votre premier Collaborateur IA
          </div>

          <div style={{ display: 'flex', marginTop: 26, fontSize: 27, color: '#D10E63', fontWeight: 600 }}>
            Analyse, prépare, travaille — hébergé en France.
          </div>
        </div>

        {/* Right: Emma cockpit card */}
        <div
          style={{
            position: 'absolute',
            top: 165,
            right: 80,
            width: 420,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.10)',
            backgroundColor: '#17130F',
            boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: 22,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 999,
                display: 'flex',
                background: 'linear-gradient(135deg, #F0658F, #D10E63)',
                border: '2px solid rgba(240,101,143,0.5)',
                marginRight: 14,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 700, color: '#F6F1E8' }}>Emma</div>
              <div style={{ display: 'flex', fontSize: 15, color: '#A49E92' }}>Collaboratrice IA</div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 999,
                border: '1px solid rgba(74,222,128,0.3)',
                backgroundColor: 'rgba(74,222,128,0.12)',
                color: '#5FE38F',
                fontSize: 13,
                fontWeight: 700,
                padding: '6px 12px',
              }}
            >
              EN POSTE
            </div>
          </div>

          {/* Task rows */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: 20, gap: 14 }}>
            {['Prépare le comité de direction', 'A répondu à 3 demandes clients', 'Planifie un point prospect'].map(
              (task) => (
                <div key={task} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(74,222,128,0.15)',
                      marginRight: 14,
                    }}
                  >
                    {/* Checkmark drawn with a rotated box (Satori-safe) */}
                    <div
                      style={{
                        width: 6,
                        height: 11,
                        marginTop: -2,
                        borderRight: '2.5px solid #5FE38F',
                        borderBottom: '2.5px solid #5FE38F',
                        transform: 'rotate(45deg)',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', fontSize: 17, color: '#D8D2C6' }}>{task}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
