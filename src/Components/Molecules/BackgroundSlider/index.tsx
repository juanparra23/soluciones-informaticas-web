import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/t.webp",
  "/red.webp",
  "/Camara.webp",
  "/computadores.webp",
  "/mantenimiento-impresora.webp",
  "/domotica.webp"
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
      }, 300); 

    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0.5 z-10 overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={images[index]}
          alt="Soluciones Informáticas Uraba"
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay oscuro elegante */}
      <div className="absolute inset-16 " />
    </div>
  );
}