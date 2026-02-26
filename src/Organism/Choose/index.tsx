import React from "react"
import ChooseCard from "@/Components/Molecules/FeaturesChoose"

const PHONE = "573137955864" 

const CHOOSE = [
  {
    title: "10 Años de Experiencia",
    tag: "10+ años",
    text:
      "Con más de 10 años de experiencia, entendemos las necesidades tecnológicas de nuestros clientes y brindamos soluciones confiables para hogares, negocios y empresas.",
  },
  {
    title: "Soporte Rápido",
    tag: "Respuesta ágil",
    text:
      "Nuestro equipo atiende incidencias técnicas con rapidez y eficiencia, reduciendo al mínimo los tiempos de inactividad. Te acompañamos antes, durante y después del servicio.",
  },
  {
    title: "Garantía de Satisfacción",
    tag: "Calidad",
    text:
      "Trabajamos con altos estándares y buenas prácticas. Cuidamos cada detalle para que recibas un servicio profesional, claro y con resultados que se notan.",
  },
  {
    title: "Servicio Personalizado",
    tag: "A tu medida",
    text:
      "Cada empresa y cada hogar son distintos. Por eso ajustamos la solución a tu necesidad y presupuesto: asesoría, instalación, mantenimiento y soporte con enfoque real.",
  },
]

export default function ChooseSection() {

  const handleWhatsApp = (service: string) => {
    const message = `Hola 👋 estoy interesado en el servicio: *${service}*. 
Me gustaría recibir más información.`
    
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">

      {/* HEADER */}
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-cyan-300/80">
          Confianza • Calidad • Soporte
        </p>

        <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white tracking-tight">
          ¿Por qué elegirnos?
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-white/60 leading-7">
          Somos una empresa que ofrece soluciones tecnológicas confiables para mejorar la eficiencia y seguridad de tu negocio.
        </p>
      </div>

      {/* CARDS */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CHOOSE.map((c, i) => (
          <ChooseCard
            key={c.title}
            title={c.title}
            text={c.text}
            tag={c.tag}
            index={i}
            onRequest={() => handleWhatsApp(c.title)}
          />
        ))}
      </div>
    </section>
  )
}
