'use client'

export function UnitalkLogo({
  size = 32,
  className = '',
  activeSegment,
  color = '#D10E63',
  inactiveColor = '#D10E63',
}: {
  size?: number
  className?: string
  activeSegment?: number
  color?: string
  inactiveColor?: string
}) {
  const viewBoxSize = 100

  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Unitalk Logo"
    >
      {/* 8 U-shapes arranged radially */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M 43,16 L 43,26 A 7,7 0 0,0 57,26 L 57,16"
            stroke={activeSegment === undefined || activeSegment === index ? color : inactiveColor}
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
