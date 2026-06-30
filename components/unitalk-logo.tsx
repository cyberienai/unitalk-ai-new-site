'use client'

interface UnitalkLogoProps {
  size?: number
  className?: string
}

export function UnitalkLogo({ size = 32, className = '' }: UnitalkLogoProps) {
  const viewBoxSize = size
  
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label="Unitalk logo"
    >
      <defs>
        <linearGradient id="unitalk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5D9CEC" />
          <stop offset="50%" stopColor="#A075E8" />
          <stop offset="100%" stopColor="#EC5D9C" />
        </linearGradient>
      </defs>
      
      {/* 8 U-shapes rotated around the center */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
        <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
          <path
            d="M 43,16 L 43,26 A 7,7 0 0,0 57,26 L 57,16"
            stroke="url(#unitalk-gradient)"
            strokeWidth="7.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  )
}
