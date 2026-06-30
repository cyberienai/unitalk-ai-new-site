'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from './navbar'
import { LeftColumn } from './left-column'
import { CenterColumn } from './center-column'
import { RightColumn } from './right-column'

export function HeroSection() {
  const [selectedSlide, setSelectedSlide] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Grid */}
      <main className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto min-h-[calc(100vh-120px)]">
          {/* Left Column */}
          <LeftColumn />

          {/* Center Column */}
          <CenterColumn selectedSlide={selectedSlide} />

          {/* Right Column */}
          <RightColumn selectedSlide={selectedSlide} onSelectSlide={setSelectedSlide} />
        </div>
      </main>
    </div>
  )
}
