'use client'

import { motion } from 'framer-motion'
import { UnitalkLogo } from './unitalk-logo'
import { useState, useEffect } from 'react'

type AlmaState = 'idle' | 'listening' | 'speaking' | 'thinking' | 'offline'

interface AlmaAvatarProps {
  state?: AlmaState
  size?: number
  showGlow?: boolean
}

export function AlmaAvatar({ state = 'idle', size = 120, showGlow = true }: AlmaAvatarProps) {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  // Idle: slow rotation 20s
  const idleRotation = prefersReducedMotion ? 0 : 360
  const idleTransition = prefersReducedMotion ? { duration: 0 } : { duration: 20, repeat: Infinity, ease: 'linear' }

  // Listening: faster rotation 4s, stronger glow
  const listeningRotation = prefersReducedMotion ? 0 : 360
  const listeningTransition = prefersReducedMotion ? { duration: 0 } : { duration: 4, repeat: Infinity, ease: 'linear' }

  // Speaking: individual U-shapes pulse sequentially
  const speakingVariants = prefersReducedMotion ? {} : {
    pulse: {
      opacity: [1, 0.5, 1],
      transition: { duration: 0.6, repeat: Infinity },
    },
  }

  // Thinking: slow pulse + subtle rotation
  const thinkingVariants = prefersReducedMotion ? {} : {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow background */}
      {showGlow && state !== 'offline' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: state === 'listening' 
              ? 'radial-gradient(circle, rgba(255,0,153,0.4) 0%, rgba(160,117,232,0.2) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,0,153,0.2) 0%, rgba(160,117,232,0.1) 50%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={state === 'listening' ? { scale: [1, 1.1, 1] } : {}}
          transition={state === 'listening' ? { duration: 2, repeat: Infinity } : {}}
        />
      )}

      {/* Main logo container */}
      <motion.div
        style={{ opacity: state === 'offline' ? 0.3 : 1, filter: state === 'offline' ? 'grayscale(100%)' : 'none' }}
        animate={
          state === 'idle' ? { rotate: idleRotation } :
          state === 'listening' ? { rotate: listeningRotation } :
          state === 'thinking' ? 'pulse' :
          {}
        }
        transition={
          state === 'idle' ? idleTransition :
          state === 'listening' ? listeningTransition :
          state === 'thinking' ? thinkingVariants.pulse.transition :
          {}
        }
        variants={state === 'thinking' ? thinkingVariants : {}}
      >
        <UnitalkLogo size={size} />
      </motion.div>

      {/* Speaking state: U-shapes pulse sequentially */}
      {state === 'speaking' && !prefersReducedMotion && (
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="unitalk-gradient-speaking" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5D9CEC" />
              <stop offset="50%" stopColor="#A075E8" />
              <stop offset="100%" stopColor="#EC5D9C" />
            </linearGradient>
          </defs>
          
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
            <motion.g
              key={rotation}
              transform={`rotate(${rotation} 50 50)`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            >
              <path
                d="M 43,16 L 43,26 A 7,7 0 0,0 57,26 L 57,16"
                stroke="url(#unitalk-gradient-speaking)"
                strokeWidth="7.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
          ))}
        </svg>
      )}
    </div>
  )
}
