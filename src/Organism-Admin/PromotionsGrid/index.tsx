import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PromotionCard from "@/Components-Admin/Molecules/PromotionCard";

export type Publicacion = {
  id: string;
  titulo: string | null;
  imagen_url: string;
  tipo_id: number;
  activo: boolean;
  orden: number;
  enlace_whatsapp: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;

  tipos_publicacion: {
    id: number;
    nombre: string;
    slug: string;
  } | null;
};

type Props = {
  refreshKey?: number;
  filter?: string | null;
  onData?: (rows: Publicacion[]) => void;
};

export default function PromotionsGrid({
  refreshKey = 0,
  filter = null,
  onData,
}: Props) {
  const [items, setItems] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("novedades_promociones")
        .select(`
          id,
          titulo,
          imagen_url,
          tipo_id,
          activo,
          orden,
          enlace_whatsapp,
          fecha_inicio,
          fecha_fin,
          tipos_publicacion (
            id,
            nombre,
            slug
          )
        `)
        .order("orden", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error cargando publicaciones:", error);
        setItems([]);
        onData?.([]);
        return;
      }

      const allRows = (data || []) as unknown as Publicacion[];

      onData?.(allRows);

      let filteredRows = allRows;

      if (filter === "activos") {
        filteredRows = allRows.filter((p) => p.activo);
      } else if (filter) {
        filteredRows = allRows.filter(
          (p) => p.tipos_publicacion?.slug === filter
        );
      }

      setItems(filteredRows);
    } catch (error) {
      console.error("Error inesperado:", error);
      setItems([]);
      onData?.([]);
    } finally {
      setLoading(false);
    }
  }, [filter, onData]);

  const onDelete = async (id: string) => {
    const ok = window.confirm(
      "¿Seguro que deseas eliminar esta publicación?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("novedades_promociones")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await load();
  };

  const onToggleActivo = async (
    id: string,
    nuevoEstado: boolean
  ) => {
    const { error } = await supabase
      .from("novedades_promociones")
      .update({
        activo: nuevoEstado,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await load();
  };

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  if (loading) {
    return (
      <p className="text-gray-200">
        Cargando novedades y promociones...
      </p>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-gray-200">
          No hay publicaciones para mostrar.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Puedes agregar una publicación desde el formulario.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((publicacion) => (
        <PromotionCard
          key={publicacion.id}
          id={publicacion.id}
          titulo={publicacion.titulo}
          imageUrl={publicacion.imagen_url}
          tipo={
            publicacion.tipos_publicacion?.nombre ||
            "Sin tipo"
          }
          activo={publicacion.activo}
          orden={publicacion.orden}
          fechaInicio={publicacion.fecha_inicio}
          fechaFin={publicacion.fecha_fin}
          onDelete={onDelete}
          onToggleActivo={onToggleActivo}
        />
      ))}
    </div>
  );
}