'use client'

export function UnitalkLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  const viewBoxSize = 100
  const scale = size / viewBoxSize

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unitalk Logo"
    >
      <defs>
        <linearGradient id="unitalk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5D9CEC" />
          <stop offset="50%" stopColor="#A075E8" />
          <stop offset="100%" stopColor="#EC5D9C" />
        </linearGradient>
      </defs>

      {/* 8 U-shapes arranged radially */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M 43,16 L 43,26 A 7,7 0 0,0 57,26 L 57,16"
            stroke="url(#unitalk-gradient)"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      ))}
    </svg>
  )
}
