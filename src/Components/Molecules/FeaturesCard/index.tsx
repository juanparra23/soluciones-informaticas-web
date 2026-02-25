
import React from 'react'
import { SubText, SubTitle } from '@/Components/Atoms/Titles'
import Image from "@/Components/Atoms/Image"

const index = ({img, alt, title, onClick}: {img: string, alt: string, title:string, onClick: () =>void}) => {
  return (
  
     <button
      onClick={onClick}
      className="
        group relative w-full overflow-hidden rounded-2xl
        border border-white/10 bg-white/5
        shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]
        transition-all duration-300
        hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10
        focus:outline-none focus:ring-2 focus:ring-cyan-400/40
      "
    >
      
      <div className="relative h-52 w-full overflow-hidden">
        <Image src={img} alt={alt} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* texto */}
      <div className="p-5 text-left">
        <h3 className="text-white font-semibold text-lg leading-tight">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-300">
          Ver detalles y cotizar por WhatsApp
        </p>

        <div className="mt-4 inline-flex items-center gap-2 text-cyan-300 text-sm font-medium">
          Explorar
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </button>

    
  )
}

export default index