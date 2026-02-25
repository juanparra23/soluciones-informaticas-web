import React from "react"
import { useInViewOnce } from "@/hooks/useInViewOnce"

type Props = {
  values: string[]
}

export default function ValuesGrid({ values }: Props) {
  const { ref, isVisible } = useInViewOnce<HTMLDivElement>({ threshold: 0.15 })

  return (
    <div
      ref={ref}
      className={[
        "relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]",
        "p-5 sm:p-7 lg:p-8",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <h3 className="text-xl sm:text-2xl font-bold gradient2">Nuestros Valores</h3>
        <div className="h-[2px] flex-1 bg-white/10" />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {values.map((v) => (
          <div
            key={v}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
          >
            <span className="text-white/85 text-sm sm:text-base">{v}</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  )
}