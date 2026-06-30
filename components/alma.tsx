'use client'

import { motion } from 'framer-motion'

type AlmaState = 'idle' | 'listening' | 'speaking' | 'thinking' | 'offline'

interface AlmaProps {
  state: AlmaState
}

export function Alma({ state }: AlmaProps) {
  // Animation variants for different states
  const pulseVariants = {
    idle: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
    },
    listening: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
    },
    speaking: {
      scale: [1, 1.15, 1],
      opacity: [0.6, 1, 0.6],
    },
    thinking: {
      scale: [1, 1.08, 1],
      opacity: [0.75, 1, 0.75],
    },
    offline: {
      scale: 1,
      opacity: 0.5,
    },
  }

  const orbitVariants = {
    idle: {
      rotate: 0,
    },
    listening: {
      rotate: 360,
    },
    speaking: {
      rotate: [0, 180, 360],
    },
    thinking: {
      rotate: [-10, 10, -10],
    },
    offline: {
      rotate: 0,
    },
  }

  const stateColors = {
    idle: '#FF0099',
    listening: '#FF0099',
    speaking: '#FF0099',
    thinking: '#FF0099',
    offline: '#666666',
  }

  const stateLabels = {
    idle: 'Prêt',
    listening: 'À l\'écoute',
    speaking: 'En train de parler',
    thinking: 'Réflexion',
    offline: 'Hors ligne',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      {/* Main Avatar Container */}
      <motion.div
        className="relative w-32 h-32 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        {/* Outer Ring - Animated */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent/30"
          animate={orbitVariants[state]}
          transition={{
            duration: state === 'listening' ? 3 : state === 'speaking' ? 2 : state === 'thinking' ? 1.5 : 0,
            repeat: state !== 'offline' ? Infinity : 0,
            ease: 'linear',
          }}
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-accent/20"
          animate={orbitVariants[state]}
          transition={{
            duration: state === 'listening' ? 4 : state === 'speaking' ? 3 : state === 'thinking' ? 2 : 0,
            repeat: state !== 'offline' ? Infinity : 0,
            ease: 'linear',
            delay: 0.1,
          }}
          style={{
            animation: state === 'offline' ? 'none' : undefined,
          }}
        />

        {/* Center Circle - Pulsing */}
        <motion.div
          className="absolute inset-8 rounded-full flex items-center justify-center"
          animate={pulseVariants[state]}
          transition={{
            duration: 2,
            repeat: state !== 'offline' ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{
            background: `radial-gradient(circle, ${stateColors[state]}, ${stateColors[state]}40)`,
          }}
        >
          {/* Avatar Letter */}
          <span className="text-4xl font-bold text-white">A</span>
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={pulseVariants[state]}
          transition={{
            duration: 2,
            repeat: state !== 'offline' ? Infinity : 0,
            ease: 'easeInOut',
          }}
          style={{
            background: state === 'offline' ? 'transparent' : `${stateColors[state]}40`,
            filter: 'blur(12px)',
          }}
        />
      </motion.div>

      {/* Status Badge */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="px-3 py-1 rounded-full border border-border bg-card/50"
          animate={{ borderColor: stateColors[state] }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-medium text-foreground flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: state !== 'offline' ? Infinity : 0,
              }}
              style={{ backgroundColor: stateColors[state] }}
            />
            {stateLabels[state]}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
