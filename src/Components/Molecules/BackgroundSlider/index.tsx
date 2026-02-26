import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/Camara.webp",
  "/domotica.webp",
  "/Redes.webp",
  "/Soporte.webp",
  "/impresora.webp",
];

export default function BackgroundSlider() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);


  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400); 

    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={images[index]}
          alt="Fondo"
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay oscuro elegante */}
      <div className="absolute inset-0 bg-black/55" />
    </div>
  );
}