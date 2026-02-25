"use client"
import { useEffect, useState } from "react"

const images = [
  "/camara.png",
  "/domotica.png",
  "/Redes.png",
  "/Soporte.png",
  "/impresora.png"
]

export default function BackgroundSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000) // 5 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute inset-0 transition-all duration-1000 bg-center bg-cover"
      style={{ backgroundImage: `url(${images[index]})` }}
    />
  )
}
