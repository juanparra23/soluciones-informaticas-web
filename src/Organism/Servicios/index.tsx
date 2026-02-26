import React from "react";
import SplitServices from "@/Components/Molecules/SplitServices";
import { HeroTitle3, SubText, SubText3 } from "@/Components/Atoms/Titles";
import SectionHeader from "@/Components/Atoms/SectionHeader";
const Servicio = [
  {
    title: "Camaras y Seguridad",
    text: "Diseñamos e instalamos sistemas de videovigilancia confiables para proteger tu empresa, hogar o negocio. Implementamos cámaras de alta definición, monitoreo remoto y soluciones de seguridad adaptadas a tus necesidades.",
    img: "/Camara.png",
    alt: "Cámara de seguridad",
    reverse: false,
  },
  {
    title: "Impresoras y Toner",
    text: "Ofrecemos venta, mantenimiento y suministro de impresoras y consumibles. Garantizamos impresión eficiente, reducción de costos operativos y soporte técnico especializado.",
    img: "/impresora.png",
    alt: "Impresoras y tóner",
    reverse: true,
  },
  {
    title: "Redes y Cableado",
    text: "Implementamos redes seguras y eficientes para garantizar una conectividad estable. Realizamos cableado estructurado, configuración de equipos de red y optimización del rendimiento.",
    img: "/Redes.png",
    alt: "Redes y cableado",
    reverse: false,
  },
  {
    title: "Soporte Técnico",
    text: "Brindamos soporte técnico preventivo y correctivo para equipos de cómputo e impresoras. Nuestro objetivo es mantener la continuidad operativa y minimizar tiempos de inactividad.",
    img: "/Soporte.png",
    alt: "Soporte técnico",
    reverse: true,
  },
  {
    title: "Mantenimiento de Equipos",
    text: "Mantenimiento preventivo para prolongar la vida útil de tus equipos, mejorar el rendimiento y evitar fallas que afecten tu operación.",
    img: "/domotica.png",
    alt: "Mantenimiento de equipos",
    reverse: false,
  },
];

export default function Servicios() {
  return (
    <div className="w-full py-16">
      <SectionHeader
                kicker="Nuestros servicios"
                title="Servicios"
                subtitle="Soluciones tecnológicas confiables diseñadas para impulsar la eficiencia y seguridad de tu empresa."
                center
              />
      

      <div className="flex flex-col w-full gap-4">
        {Servicio.map((f) => (
          <SplitServices
            key={f.title}
            title={f.title}
            text={f.text}
            img={f.img}
            alt={f.alt}
            reverse={f.reverse}
          />
        ))}
      </div>
    </div>
  );
}

