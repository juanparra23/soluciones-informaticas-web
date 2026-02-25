"use client"

import BackgroundSlider from "@/Components/Molecules/BackgroundSlider"
import HeroTitle from "@/Components/Molecules/HeroTitle"
import HeroImage from "@/Components/Molecules/HeroImage"
import Button from "@/Components/Atoms/Buttom"

const Hero = () => {
  return (
 <section className="relative h-screen w-full overflow-hidden">
  <BackgroundSlider />

  <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-black/35 to-black/60" />

  <HeroImage />

  <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center pt-24">
    <HeroTitle />


    <div className="mt-8 flex flex-col sm:flex-row gap-4">
      <a
        href="/Productos/impresoras"
        className="px-7 py-3 rounded-xl gradient3 text-white font-semibold shadow-lg
                  hover:scale-105 transition-transformactive:scale-[0.99]"
      >
        Ver Productos
      </a>

      <a
        href="https://wa.me/573137955864"
        target="_blank"
        rel="noreferrer"
        className="px-7 py-3 rounded-xl border border-white/30 text-white font-semibold
                   hover:bg-white/10 transition active:scale-[0.99]"
      >
        Contactar por WhatsApp
      </a>
    </div>
  </div>
</section>


  )
}

export default Hero

