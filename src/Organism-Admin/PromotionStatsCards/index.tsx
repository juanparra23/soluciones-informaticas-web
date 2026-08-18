import React, { useMemo } from "react";
import { Publicacion } from "@/Organism-Admin/PromotionsGrid";

type Props = {
  publicaciones: Publicacion[];
  activeFilter: string | null;
  onFilter: (tipo: string | null) => void;
};

export default function PromotionStatsCards({
  publicaciones,
  activeFilter,
  onFilter,
}: Props) {
  const stats = useMemo(() => {
    const countBySlug = (slug: string) =>
      publicaciones.filter(
        (p) => p.tipos_publicacion?.slug === slug
      ).length;

    return {
      total: publicaciones.length,
      nuevos: countBySlug("nuevo"),
      promociones: countBySlug("promocion"),
      combos: countBySlug("combo"),
      destacados: countBySlug("destacado"),
      activos: publicaciones.filter((p) => p.activo).length,
    };
  }, [publicaciones]);

  const Card = ({
    title,
    value,
    active,
    onClick,
  }: {
    title: string;
    value: number;
    active: boolean;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border
        ${
          active
            ? "bg-blue-600 border-blue-400 shadow-lg"
            : "bg-white/5 border-white/10 hover:bg-white/10"
        }`}
    >
      <p className="text-gray-200 text-sm">{title}</p>
      <p className="text-white text-2xl font-bold mt-1">{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      <Card
        title="Total"
        value={stats.total}
        active={activeFilter === null}
        onClick={() => onFilter(null)}
      />

      <Card
        title="Nuevos"
        value={stats.nuevos}
        active={activeFilter === "nuevo"}
        onClick={() => onFilter("nuevo")}
      />

      <Card
        title="Promociones"
        value={stats.promociones}
        active={activeFilter === "promocion"}
        onClick={() => onFilter("promocion")}
      />

      <Card
        title="Combos"
        value={stats.combos}
        active={activeFilter === "combo"}
        onClick={() => onFilter("combo")}
      />

      <Card
        title="Destacados"
        value={stats.destacados}
        active={activeFilter === "destacado"}
        onClick={() => onFilter("destacado")}
      />

      <Card
        title="Activos"
        value={stats.activos}
        active={activeFilter === "activos"}
        onClick={() => onFilter("activos")}
      />
    </div>
  );
}