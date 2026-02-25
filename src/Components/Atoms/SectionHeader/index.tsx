import React from "react"

type Props = {
  kicker?: string
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionHeader({ kicker, title, subtitle, center = true }: Props) {
  return (
    <div className={`${center ? "text-center" : "text-left"} w-full max-w-[760px] mx-auto`}>
      {kicker ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] sm:text-xs text-white/70">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {kicker}
        </div>
      ) : null}

      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-3 text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed">
          {subtitle}
        </p>
      ) : null}

      <div className={`${center ? "mx-auto" : ""} mt-5 h-[2px] w-20 sm:w-24 rounded-full bg-gradient-to-r from-[#0061ff] to-[#60efff] `} />
    </div>
  )
}