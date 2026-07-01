'use client'

import { motion } from 'framer-motion'
import { UnitalkLogo } from './unitalk-logo'

type AlmaState = 'idle' | 'listening' | 'speaking' | 'thinking' | 'offline'

const STATE_LABELS: Record<AlmaState, string> = {
  idle: 'Alma, disponible',
  listening: 'Alma écoute',
  speaking: 'Alma répond',
  thinking: 'Alma réfléchit',
  offline: 'Alma hors ligne',
}

export function AlmaAvatar({ state = 'idle', size = 36, showGlow = true }: { state?: AlmaState; size?: number; showGlow?: boolean }) {
  const glowColor = state === 'offline' ? 'rgba(100, 100, 100, 0.25)' : 'rgba(255, 0, 153, 0.25)'
  const glowOpacity = state === 'offline' ? 0.3 : 1

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: glowOpacity }}
      transition={{ duration: 0.3 }}
      role="img"
      aria-label={STATE_LABELS[state]}
    >
      {/* Glow background */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${glowColor}, transparent)`,
            filter: 'blur(20px)',
          }}
          animate={{
            scale: state === 'listening' ? [1, 1.2, 1] : state === 'speaking' ? [1, 1.15, 1] : 1,
          }}
          transition={{
            duration: state === 'listening' ? 1.5 : state === 'speaking' ? 0.8 : 3,
            repeat: Infinity,
          }}
        />
      )}

      {/* Logo container */}
      <motion.div
        className="relative z-10"
        style={{ width: size, height: size, filter: state === 'offline' ? 'grayscale(1)' : 'grayscale(0)' }}
        animate={
          state === 'idle'
            ? { rotate: 360 }
            : state === 'listening'
              ? { rotate: 360 }
              : state === 'thinking'
                ? { scale: [1, 1.05, 1] }
                : state === 'speaking'
                  ? { rotate: 360 }
                  : {}
        }
        transition={
          state === 'idle'
            ? { duration: 20, repeat: Infinity, ease: 'linear' }
            : state === 'listening'
              ? { duration: 4, repeat: Infinity, ease: 'linear' }
              : state === 'thinking'
                ? { duration: 2, repeat: Infinity }
                : state === 'speaking'
                  ? { duration: 3, repeat: Infinity, ease: 'linear' }
                  : {}
        }
      >
        <UnitalkLogo size={size} />
      </motion.div>

      {/* Pulsing rings for listening/speaking */}
      {(state === 'listening' || state === 'speaking') && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full border"
              style={{
                width: size,
                height: size,
                borderColor: 'rgba(255, 0, 153, 0.3)',
              }}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.6, 0.3, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}
