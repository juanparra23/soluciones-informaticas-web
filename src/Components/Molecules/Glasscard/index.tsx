import React from "react"
import { useInViewOnce } from "@/hooks/useInViewOnce"

type Props = {
  title: string
  text: string
  accent?: "emerald" | "sky" | "violet"
}

const accentMap = {
  emerald: "from-emerald-400 to-sky-400",
  sky: "from-sky-400 to-violet-500",
  violet: "from-violet-500 to-sky-400",
} as const

export default function GlassCard({ title, text, accent = "sky" }: Props) {
  const { ref, isVisible } = useInViewOnce<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={[
        "relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]",
        "p-5 sm:p-7 lg:p-8 overflow-hidden",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

      

      <h3 className="mt-5 text-xl sm:text-2xl font-bold gradient2">
        {title}
      </h3>

      <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
        {text}
      </p>
    </div>
  )
}