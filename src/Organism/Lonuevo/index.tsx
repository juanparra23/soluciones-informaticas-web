import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Publicacion = {
  id: string;
  titulo: string | null;
  imagen_url: string;
  enlace_whatsapp: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  orden: number;

  tipos_publicacion: {
    nombre: string;
    slug: string;
  } | null;
};

export default function LoNuevo() {
  const [items, setItems] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);

  // =====================================================
  // CARGAR PUBLICACIONES
  // =====================================================
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("novedades_promociones")
          .select(`
            id,
            titulo,
            imagen_url,
            enlace_whatsapp,
            fecha_inicio,
            fecha_fin,
            orden,
            tipos_publicacion (
              nombre,
              slug
            )
          `)
          .eq("activo", true)
          .order("orden", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error cargando novedades:", error);
          setItems([]);
          return;
        }

        const ahora = new Date();

        const rows = ((data || []) as unknown as Publicacion[]).filter(
          (item) => {
            const inicio = item.fecha_inicio
              ? new Date(item.fecha_inicio)
              : null;

            const fin = item.fecha_fin
              ? new Date(item.fecha_fin)
              : null;

            if (inicio && ahora < inicio) return false;
            if (fin && ahora > fin) return false;

            return true;
          }
        );

        setItems(rows);
      } catch (error) {
        console.error("Error cargando carrusel:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // =====================================================
  // MOVER CARRUSEL
  // =====================================================
  const moveSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (!slider) return;

    const firstCard = slider.firstElementChild as HTMLElement | null;

    if (!firstCard) return;

    const gap = 24;
    const distance = firstCard.offsetWidth + gap;

    slider.scrollBy({
      left: direction === "right" ? distance : -distance,
      behavior: "smooth",
    });
  };

  // =====================================================
  // AUTOPLAY
  // =====================================================
  useEffect(() => {
    if (items.length <= 1) return;

    const interval = window.setInterval(() => {
      const slider = sliderRef.current;

      if (!slider) return;

      const reachedEnd =
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10;

      if (reachedEnd) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        moveSlider("right");
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [items]);

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <section className="bg-[#050B18] py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[420px] rounded-2xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) {
    return null;
  }

  // =====================================================
  // CARRUSEL
  // =====================================================
  return (
    <section className="relative bg-[#050B18] py-14 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.18em]">
              Descubre
            </span>

            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Novedades y Promociones
            </h2>

            <p className="mt-3 max-w-2xl text-gray-300 text-sm sm:text-base">
              Conoce nuestros nuevos productos, combos, promociones y
              recomendaciones especiales.
            </p>
          </div>

          {/* Flechas */}
          {items.length > 1 && (
            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={() => moveSlider("left")}
                aria-label="Anterior"
                className="
                  h-11 w-11
                  rounded-full
                  border border-white/15
                  bg-white/5
                  text-white text-xl
                  hover:bg-white/10
                  hover:border-white/30
                  transition
                "
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => moveSlider("right")}
                aria-label="Siguiente"
                className="
                  h-11 w-11
                  rounded-full
                  bg-blue-600
                  text-white text-xl
                  hover:bg-blue-500
                  transition
                  shadow-lg
                  shadow-blue-600/20
                "
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Carrusel */}
        <div
          ref={sliderRef}
          className="
            flex
            gap-6
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory
            pb-3
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
         {items.map((item) => {
  const content = (
    <div
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-transparent
        shadow-xl
        transition-all
        duration-300
        hover:border-blue-400/40
        hover:-translate-y-1
      "
    >
      <img
        src={item.imagen_url}
        alt={item.titulo || "Novedad o promoción"}
        loading="lazy"
        className="
          block
          w-full
          h-auto
          transition-transform
          duration-500
          group-hover:scale-[1.015]
        "
      />
    </div>
  );

  return (
    <article
      key={item.id}
      className="
        snap-start
        flex-none
        w-[88%]
        sm:w-[calc(50%-12px)]
        lg:w-[calc(33.333%-16px)]
      "
    >
      {item.enlace_whatsapp ? (
        <a
          href={item.enlace_whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label={item.titulo || "Ver promoción"}
          className="block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  );
})}
        </div>

        {/* Indicador móvil */}
        {items.length > 1 && (
          <div className="mt-4 flex sm:hidden items-center justify-center gap-2">
            <span className="h-1.5 w-8 rounded-full bg-blue-500" />
            <span className="h-1.5 w-2 rounded-full bg-white/20" />
            <span className="h-1.5 w-2 rounded-full bg-white/20" />
          </div>
        )}
      </div>
    </section>
  );
}