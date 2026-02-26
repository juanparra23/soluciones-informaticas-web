import { useEffect, useState } from "react"

const images = [
  "/camara.webp",
  "/domotica.webp",
  "/redes.webp",
  "/soporte.webp",
  "/impresora.webp",
]

export default function BackgroundSlider() {
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)


  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        images.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve()
            img.onerror = () => resolve()
          })
        })
      )
      setLoaded(true)
    }

    preloadImages()
  }, [])


  useEffect(() => {
    if (!loaded) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [loaded])

  if (!loaded) return null

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Imagen actual */}
      <div
        key={index}
        className="absolute inset-0 bg-center bg-cover transition-opacity duration-700"
        style={{
          backgroundImage: `url(${images[index]})`,
        }}
      />

      
      <div className="absolute inset-0 bg-black/50" />
    </div>
  )
}
