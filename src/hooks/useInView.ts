import { useEffect, useRef, useState } from "react"

type Options = IntersectionObserverInit & {
  once?: boolean
}

export function useInView<T extends HTMLElement>(options: Options = {}) {
  const { threshold = 0.15, root = null, rootMargin = "0px", once = true } = options

  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, root, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, root, rootMargin, once])

  return { ref, inView }
}
