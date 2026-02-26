

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import FeatureCard from "@/Components/Molecules/FeaturesCard";

const Features = () => {
  const router = useRouter();

  const features = [
    {
      title: "Cámaras de Seguridad",
      img: "/Camara.webp",
      alt: "Cámaras de seguridad",
      href: "/Servicios",
    },
    {
      title: "Impresoras y Tóner",
      img: "/impresora.webp",
      alt: "Impresoras y tóner",
      href: "/Servicios",
    },
    {
      title: "Redes y Cableado",
      img: "/Redes.webp",
      alt: "Redes y cableado",
      href: "/Servicios",
    },
    {
      title: "Soporte Técnico",
      img: "/Soporte.webp",
      alt: "Soporte técnico",
      href: "/Servicios",
    },
    {
      title: "Alarmas y Seguridad",
      img: "/domotica.webp",
      alt: "Alarmas y seguridad",
      href: "/Servicios",
    },
  ];

  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 from-[#0B1220] via-[#0B1220] to-[#0A0F1A]" />
        <div className="absolute -top-24 left-1/2 h-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className={`text-center reveal ${visible ? "is-visible" : ""}`}>
          <p className="text-cyan-300/90 text-sm font-medium tracking-wide">
            Servicios Principales
          </p>

          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Soluciones tecnológicas <span className="gradient2">a tu alcance</span>
          </h2>

          <p className="mt-4 text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Cámaras, impresoras, redes y soporte técnico profesional para impulsar
            la eficiencia y seguridad de tu empresa.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className={`reveal ${visible ? "is-visible" : ""}`}
              style={{
                animationDelay: visible ? `${idx * 0.08}s` : "0s",
              }}
            >
              <div className="w-[320px] sm:w-[340px] lg:w-[320px] xl:w-[280px]">
                <FeatureCard
                  img={f.img}
                  title={f.title}
                  alt={f.alt}
                  onClick={() => router.push(f.href)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;