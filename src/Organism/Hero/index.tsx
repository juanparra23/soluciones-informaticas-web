import Link from "next/link";
import BackgroundSlider from "@/Components/Molecules/BackgroundSlider";
import HeroTitle from "@/Components/Molecules/HeroTitle";
import HeroImage from "@/Components/Molecules/HeroImage";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[100svh]">
      
      <BackgroundSlider />

      
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-black/35 to-black/60" />

     
      <HeroImage />

      
      <div className="relative z-20 flex min-h-[100svh] items-center justify-center px-4 sm:px-6 pt-24">
        <div className="w-full max-w-3xl text-center">
          <HeroTitle />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/Productos/impresoras"
              className="w-full sm:w-auto px-7 py-3 rounded-xl gradient3 text-white font-semibold shadow-lg
                         hover:scale-105 transition-transform active:scale-[0.99]"
            >
              Ver Productos
            </Link>

            <a
              href="https://wa.me/573137955864"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-3 rounded-xl border border-white/30 text-white font-semibold
                         hover:bg-white/10 transition active:scale-[0.99]"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
