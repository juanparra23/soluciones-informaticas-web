import { useEffect, useRef, useState } from "react"

type Options = {
  threshold?: number
  rootMargin?: string
}

export function useInViewOnce<T extends HTMLElement>(options: Options = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = options
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}