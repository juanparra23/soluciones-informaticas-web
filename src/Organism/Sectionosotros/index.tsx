import React from "react"
import SectionHeader from "@/Components/Atoms/SectionHeader"
import GlassCard from "@/Components/Molecules/Glasscard"
import ValuesGrid from "@/Components/Molecules/Valuesgrid"

export default function NosotrosSection() {
  return (
    <section className="relative w-full py-14 sm:py-16 lg:py-20">
      {/* fondo suave (el color gris lo cambias tú en tu index si quieres) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 via-[#0b1424] to-slate-900" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Nuestra empresa"
          title="Nosotros"
          subtitle="Conoce quiénes somos, cómo trabajamos y qué nos mueve a darte soluciones tecnológicas de calidad."
          center
        />

        
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <GlassCard
            title="Nuestra Misión"
            text=" Ofrecer soluciones integrales en suministros de cámaras de seguridad, alarmas, computadoras, mantenimiento y reparación de impresoras. Garantizando productos confiables y un servicio eficiente que contribuya al buen funcionamiento y protección de hogares y empresas."
            accent="emerald"
          />
          <GlassCard
            title="Nuestra Visión"
            text=" Ser una empresa lider y reconocida en el mercado local y regional por la excelencia en la comercialización de suministros para pc, impresoras y soluciones de seguridad; destacandonos por nuestra innovación, responsabilidad, precios competitivos y comprometidos en la satisfacción total de nuestros clientes."
            accent="sky"
          />
        </div>

        {/* Valores */}
        <div className="mt-10 sm:mt-14">
          <ValuesGrid
            values={[
              "Compromiso",
              "Calidad",
              "Innovación",
              "Responsabilidad",
              "Honestidad",
              "Servicio al cliente",
            ]}
          />
        </div>
      </div>
    </section>
  )
}