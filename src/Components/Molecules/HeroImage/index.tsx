import React from 'react'

const HeroImage = () => {
  return (
    <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <img
        src="/logo-solo.png"
        alt="Logo Soluciones Informáticas"
        className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto object-contain
                   drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
      />
    </div>
  )
}

export default HeroImage