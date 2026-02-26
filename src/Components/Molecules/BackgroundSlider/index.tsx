
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const images = [
  "/camara.png",
  "/domotica.png",
  "/redes.png",
  "/soporte.png",
  "/impresora.png",
];

export default function BackgroundSlider() {
  const [index, setIndex] = useState(0);
  const [showA, setShowA] = useState(true);

  const current = images[index];
  const next = useMemo(() => images[(index + 1) % images.length], [index]);

 
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  
  useEffect(() => {
    const t = setInterval(() => {
      setShowA((v) => !v);
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0">
      
      <div className={`absolute inset-0 transition-opacity duration-1000 ${showA ? "opacity-100" : "opacity-0"}`}>
        <Image
          src={current}
          alt="Fondo"
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

 
      <div className={`absolute inset-0 transition-opacity duration-1000 ${showA ? "opacity-0" : "opacity-100"}`}>
        <Image
          src={next}
          alt="Fondo"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}