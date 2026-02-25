import React from "react"

export default function Pill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
      <span className="h-2 w-2 rounded-full bg-sky-400" />
      {text}
    </div>
  )
}