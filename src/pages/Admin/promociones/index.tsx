import { useCallback, useState } from "react";

import PromotionForm from "@/Components-Admin/Molecules/PromotionForm";
import PromotionsGrid, {
  Publicacion,
} from "@/Organism-Admin/PromotionsGrid";
import PromotionStatsCards from "@/Organism-Admin/PromotionStatsCards";

export default function AdminPromocionesPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  const handlePublicaciones = useCallback((rows: Publicacion[]) => {
    setPublicaciones(rows);
  }, []);

  return (
    <div className="min-h-screen bg-[#050B18] pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              Admin · Novedades y Promociones
            </h1>

            <p className="text-gray-300 mt-2">
              Administra las imágenes que aparecen en el carrusel de la página
              principal.
            </p>
          </div>

          <a
            href="/Admin"
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold
                       hover:bg-white/10 transition"
          >
            Productos
          </a>
        </div>

        <div className="mt-6">
          <PromotionStatsCards
            publicaciones={publicaciones}
            activeFilter={filter}
            onFilter={setFilter}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <PromotionForm
              onCreated={() => {
                setRefreshKey((k) => k + 1);
              }}
            />
          </div>

          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-white font-semibold text-lg">
                  {filter
                    ? filter === "activos"
                      ? "Publicaciones · Activas"
                      : `Publicaciones · ${filter}`
                    : "Todas las publicaciones"}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Ordena, activa, desactiva o elimina publicaciones del carrusel.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {filter && (
                  <button
                    type="button"
                    onClick={() => setFilter(null)}
                    className="text-sm text-gray-200 hover:text-white transition"
                  >
                    Quitar filtro
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setRefreshKey((k) => k + 1)}
                  className="text-sm text-gray-200 hover:text-white transition"
                >
                  Refrescar
                </button>
              </div>
            </div>

            <div className="mt-4">
              <PromotionsGrid
                refreshKey={refreshKey}
                filter={filter}
                onData={handlePublicaciones}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}