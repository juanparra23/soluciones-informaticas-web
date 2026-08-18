import React from "react";

type Props = {
  id: string;
  titulo: string | null;
  imageUrl: string;
  tipo: string;
  activo: boolean;
  orden: number;
  fechaInicio?: string | null;
  fechaFin?: string | null;
  onDelete: (id: string) => void;
  onToggleActivo?: (id: string, activo: boolean) => void;
};

export default function PromotionCard({
  id,
  titulo,
  imageUrl,
  tipo,
  activo,
  orden,
  fechaInicio,
  fechaFin,
  onDelete,
  onToggleActivo,
}: Props) {
  const formatDate = (date?: string | null) => {
    if (!date) return null;

    return new Date(date).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/[0.07]">
      
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-black/20">
        <img
          src={imageUrl}
          alt={titulo || "Novedad o promoción"}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Tipo */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur">
            {tipo}
          </span>
        </div>

        {/* Estado */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold shadow-lg backdrop-blur ${
              activo
                ? "bg-emerald-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {activo ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>

      {/* Información */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">
              {titulo || "Sin título"}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Orden: {orden}
            </p>
          </div>
        </div>

        {(fechaInicio || fechaFin) && (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
            {fechaInicio && (
              <p className="text-xs text-gray-300">
                Inicio:{" "}
                <span className="text-white">
                  {formatDate(fechaInicio)}
                </span>
              </p>
            )}

            {fechaFin && (
              <p className="mt-1 text-xs text-gray-300">
                Fin:{" "}
                <span className="text-white">
                  {formatDate(fechaFin)}
                </span>
              </p>
            )}
          </div>
        )}

        {/* Acciones */}
        <div className="mt-4 flex gap-2">
          {onToggleActivo && (
            <button
              type="button"
              onClick={() => onToggleActivo(id, !activo)}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activo
                  ? "border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20"
                  : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
              }`}
            >
              {activo ? "Desactivar" : "Activar"}
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(id)}
            className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}