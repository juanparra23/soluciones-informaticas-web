import React, { useMemo, useState } from "react"
import { useInView } from "@/hooks/useInView"

type Props = {
  title: string
  text: string
  tag?: string
  index?: number
  onRequest?: () => void
}

export default function ChooseCard({
  title,
  text,
  tag = "Destacado",
  index = 0,
  onRequest,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, once: true })
  const [open, setOpen] = useState(false)

  const delay = useMemo(() => {
    // escalonado bonito (stagger)
    const d = Math.min(index * 120, 500)
    return `${d}ms`
  }, [index])

  return (
    <>
      <div
        ref={ref}
        className={[
          "group relative w-full",
          "rounded-3xl border border-white/10 bg-white/5",
          "shadow-[0_10px_35px_rgba(0,0,0,0.35)]",
          "backdrop-blur-md",
          "transition-all duration-500",
          "hover:-translate-y-1 hover:border-white/20 hover:bg-white/7",
          "hover:shadow-[0_18px_55px_rgba(0,0,0,0.45)]",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
        style={{ transitionDelay: delay }}
      >
        {/* brillo superior sutil */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-3xl bg-gradient-to-b from-cyan-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="p-7 sm:p-8">
          {/* tag */}
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80">
              {tag}
            </span>

            {/* mini barra */}
            <span className="h-[2px] w-16 rounded-full bg-gradient-to-r from-emerald-400/60 via-cyan-400/60 to-indigo-400/60 opacity-70" />
          </div>

          {/* título */}
          <h3 className="mt-5 text-[26px] leading-tight sm:text-[28px] font-semibold tracking-tight text-white">
            {title}
          </h3>

          {/* texto */}
          <p className="mt-4 text-sm sm:text-[15px] leading-7 text-white/70">
            {text.length > 140 ? text.slice(0, 140) + "..." : text}
          </p>

          {/* acciones */}
          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={onRequest}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white
                         bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98]
                         transition-all duration-200 shadow-[0_10px_30px_rgba(16,185,129,0.25)]"
            >
              Solicitar info
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold
                         text-cyan-300 hover:text-cyan-200
                         bg-white/5 hover:bg-white/10 border border-white/10
                         transition-all duration-200"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          />

          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0b1624]/95 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">{title}</h4>
                <p className="mt-2 text-sm text-white/70">
                  Información detallada del servicio.
                </p>
              </div>

              <button
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Cerrar
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm sm:text-[15px] leading-7 text-white/75">{text}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onRequest}
                className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 active:scale-[0.98] transition"
              >
                Solicitar info
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
