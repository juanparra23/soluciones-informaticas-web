import React from "react"
import { useRouter } from "next/router"
import { HeroTitle2, SubText } from "@/Components/Atoms/Titles"

import { useReveal } from "@/hooks/useReveal"

type Props = {
  title: string
  text: string
  img: string
  alt: string
  reverse?: boolean
}

export default function SplitServices({
  title,
  text,
  img,
  alt,
  reverse,
}: Props) {
  const router = useRouter()
  const { ref, isReveal } = useReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="w-full">
      <div
        ref={ref}
        className={[
          "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
          "py-16",
          "grid grid-cols-1 md:grid-cols-2 items-center gap-12",
          reverse ? "md:[&>*:first-child]:order-2" : "",
          "transition-all duration-700 ease-out",
          isReveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        ].join(" ")}
      >
        
        <div className="w-full">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
  
            {/* Fondo oscuro */}
            <div className="absolute inset-0 bg-gradient-to-br  from-slate-800/60 to-slate-900/80 rounded-xl" />

            {/* Imagen */}
            <img
              src={img}
              alt={alt}
              className="relative w-full h-full object-contain p-10 transition-transform duration-700 hover:scale-105 rounded-xl"
            />

          </div>
        </div>

        <div className="w-full">
          <div className="max-w-xl text-center md:text-left">
            <HeroTitle2 text2={title} />

            <div className="mt-4 flex justify-center ">
              <span className="h-[3px] w-16 rounded-full bg-gradient-to-r from-[#0061ff] to-[#60efff]" />
            </div>

            <div className="mt-6">
              <SubText text={text} />
            </div>

           <div className="mt-8 flex justify-center items-center ">
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/573137955864?text=${encodeURIComponent(
                    `Hola 👋 estoy interesado en el servicio: ${title}. ¿Me puedes brindar más información?`
                  )}`,
                  "_blank"
                )
              }
              className="
                px-8 py-3 rounded-xl
                bg-gradient-to-r from-[#0061ff] to-[#091970]
                hover:from-blue-800 hover:to-blue-400
                text-white font-semibold
                transition-all duration-300
                hover:scale-105
                shadow-lg shadow-emerald-500/20 flex justify-center
              "
            >
              Solicitar servicio
            </button>
            </div>
            </div>
          </div>
        </div>
    </section>
  )
}