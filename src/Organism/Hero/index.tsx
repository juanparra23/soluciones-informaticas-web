import Link from "next/link";
import BackgroundSlider from "@/Components/Molecules/BackgroundSlider";
import HeroTitle from "@/Components/Molecules/HeroTitle";
import HeroImage from "@/Components/Molecules/HeroImage";

const Hero = () => {
  return (
<section className="relative w-full overflow-hidden min-h-[88svh]">
  <BackgroundSlider />

  {/* Overlay suave solo para dar contraste al lado izquierdo */}
  <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/45 via-black/20 to-transparent" />

  <div className="relative z-20 mx-auto flex min-h-[88svh] items-center px-6 sm:px-8 md:px-10 lg:px-16">
    {/* Bloque de texto */}
    <div className="w-full max-w-xl text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
        Soluciones Informáticas
      </h1>

      <h2 className="mt-4 text-3xl sm:text-3xl md:text-3xl lg:text-3xl text-boton font-semibold leading-tight">
        a tu alcance
      </h2>

      <p className="mt-6 max-w-lg mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
        Seguridad, conectividad y soporte tecnológico para tu empresa.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
        <Link
          href="/Productos/impresoras"
          className="w-full sm:w-auto px-8 py-4 rounded-xl gradient3 text-white font-semibold shadow-lg
                     hover:scale-105 transition-transform active:scale-[0.99] text-center"
        >
          Ver Productos
        </Link>

        <a
          href="https://wa.me/573137955864"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/30 text-white font-semibold
                     hover:bg-white/10 hover:border-white/60 transition active:scale-[0.99] text-center"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  </div>

  {/* Card visual lado derecho */}
  <div className="absolute right-6 bottom-8 z-20 hidden md:flex lg:right-12 lg:bottom-12">
    <div className="max-w-sm rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl p-6">
      <p className="text-white text-xl font-bold leading-tight">
        Soluciones tecnológicas confiables
      </p>

      <p className="mt-3 text-white/80 text-sm leading-relaxed">
        Instalación de cámaras, redes, soporte técnico y equipos para empresas y negocios.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/10 p-4 border border-white/10">
          <p className="text-2xl font-extrabold text-white">24/7</p>
          <p className="mt-1 text-xs text-white/70">Soporte técnico</p>
        </div>

        <div className="rounded-xl bg-white/10 p-4 border border-white/10">
          <p className="text-2xl font-extrabold text-white">100%</p>
          <p className="mt-1 text-xs text-white/70">Compromiso</p>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default Hero;
