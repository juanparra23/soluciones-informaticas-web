import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/Components-Admin/Molecules/ProductCard";

export type Producto = {
  id: string;
  title: string;
  descripcion: string | null;
  category: string | null;
  image_url: string | null;
};

type Props = {
  refreshKey?: number;
  filter?: string | null;
  onData?: (rows: Producto[]) => void;
};

export default function ProductsGrid({
  refreshKey = 0,
  filter = null,
  onData,
}: Props) {
  const [items, setItems] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      let query = supabase
        .from("Productos")
        .select("id, title, descripcion, category, image_url")
        .order("id", { ascending: false });

      if (filter) {
        query = query.eq("category", filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase error:", error);
        setItems([]);
        onData?.([]);
        return;
      }

      const rows: Producto[] = Array.isArray(data) ? (data as Producto[]) : [];
      setItems(rows);
      onData?.(rows);
    } catch (e) {
      console.error("Load failed:", e);
      setItems([]);
      onData?.([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);  //evita loop

  const onDelete = async (id: string) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!ok) return;

    const { error } = await supabase.from("Productos").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      onData?.(next);
      return next;
    });
  };

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  if (loading) return <p className="text-gray-200">Cargando productos...</p>;
  if (!items.length) return <p className="text-gray-200">No hay productos todavía.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          titulo={p.title}
          categoria={p.category}
          descripcion={p.descripcion}
          imageUrl={p.image_url}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}