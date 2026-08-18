import React, { useEffect, useState } from "react";
import Input from "@/Components-Admin/Atoms/Input";
import Select from "@/Components-Admin/Atoms/Select";
import Button from "@/Components-Admin/Atoms/Buttom";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  onCreated?: () => void;
};

type TipoPublicacion = {
  id: number;
  nombre: string;
  slug: string;
};

export default function PromotionForm({ onCreated }: Props) {
  const [titulo, setTitulo] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [orden, setOrden] = useState("0");
  const [activo, setActivo] = useState(true);
  const [enlaceWhatsapp, setEnlaceWhatsapp] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [tipos, setTipos] = useState<TipoPublicacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTipos, setLoadingTipos] = useState(true);

  useEffect(() => {
    const loadTipos = async () => {
      setLoadingTipos(true);

      const { data, error } = await supabase
        .from("tipos_publicacion")
        .select("id, nombre, slug")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error cargando tipos:", error);
        setTipos([]);
        setLoadingTipos(false);
        return;
      }

      setTipos(data || []);
      setLoadingTipos(false);
    };

    loadTipos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Debes seleccionar una imagen.");
      return;
    }

    if (!tipoId) {
      alert("Debes seleccionar un tipo.");
      return;
    }

    setLoading(true);

    try {
      const ext = file.name.split(".").pop() || "jpg";

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}.${ext}`;

      const filePath = `publicaciones/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("novedades-promociones")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error Storage:", uploadError);
        alert(`Error Storage:\n${uploadError.message}`);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("novedades-promociones")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase
        .from("novedades_promociones")
        .insert([
          {
            titulo: titulo.trim() || null,
            imagen_url: imageUrl,
            tipo_id: Number(tipoId),
            activo,
            orden: Number(orden) || 0,
            enlace_whatsapp: enlaceWhatsapp.trim() || null,

            fecha_inicio: fechaInicio
              ? new Date(fechaInicio).toISOString()
              : null,

            fecha_fin: fechaFin
              ? new Date(fechaFin).toISOString()
              : null,
          },
        ]);

      if (insertError) {
        console.error("Error insertando publicación:", insertError);
        alert(insertError.message);
        return;
      }

      setTitulo("");
      setTipoId("");
      setOrden("0");
      setActivo(true);
      setEnlaceWhatsapp("");
      setFechaInicio("");
      setFechaFin("");
      setFile(null);

      onCreated?.();
    } catch (error) {
      console.error("Error guardando publicación:", error);

      alert(
        "Ocurrió un error al guardar la publicación."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-white text-xl font-semibold">
        Nueva publicación
      </h2>

      <p className="text-gray-300 text-sm mt-1">
        Agrega una imagen al carrusel de novedades y promociones.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm text-gray-200">
            Título interno
          </label>

          <Input
            placeholder="Ej: Combo cámaras agosto"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <p className="mt-1 text-xs text-gray-400">
            Solo sirve para identificar la publicación en el panel.
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-200">
            Tipo
          </label>

          <Select
            value={tipoId}
            onChange={(e) => setTipoId(e.target.value)}
            required
            disabled={loadingTipos}
          >
            <option value="">
              {loadingTipos
                ? "Cargando..."
                : "Selecciona"}
            </option>

            {tipos.map((tipo) => (
              <option
                key={tipo.id}
                value={tipo.id}
              >
                {tipo.nombre}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="text-sm text-gray-200">
            Orden de aparición
          </label>

          <Input
            type="number"
            min="0"
            value={orden}
            onChange={(e) =>
              setOrden(e.target.value)
            }
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <input
            id="activo"
            type="checkbox"
            checked={activo}
            onChange={(e) =>
              setActivo(e.target.checked)
            }
            className="h-4 w-4"
          />

          <label
            htmlFor="activo"
            className="text-sm text-gray-200 cursor-pointer"
          >
            Mostrar publicación en la página
          </label>
        </div>

        <div>
          <label className="text-sm text-gray-200">
            Enlace de WhatsApp
          </label>

          <Input
            placeholder="https://wa.me/573137955864"
            value={enlaceWhatsapp}
            onChange={(e) =>
              setEnlaceWhatsapp(e.target.value)
            }
          />
        </div>

        <div>
          <label className="text-sm text-gray-200">
            Fecha de inicio
          </label>

          <Input
            type="datetime-local"
            value={fechaInicio}
            onChange={(e) =>
              setFechaInicio(e.target.value)
            }
          />

          <p className="mt-1 text-xs text-gray-400">
            Opcional. Si la dejas vacía, se mostrará inmediatamente.
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-200">
            Fecha de finalización
          </label>

          <Input
            type="datetime-local"
            value={fechaFin}
            onChange={(e) =>
              setFechaFin(e.target.value)
            }
          />

          <p className="mt-1 text-xs text-gray-400">
            Opcional. Si la dejas vacía, no tendrá fecha de vencimiento.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <label className="text-sm text-gray-200">
            Imagen de la publicación
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
            className="mt-2 text-sm text-gray-200"
            required
          />

          <p className="text-xs text-gray-300 mt-2">
            Formatos permitidos: PNG, JPG, JPEG y WebP.
          </p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Guardando..."
            : "Guardar publicación"}
        </Button>
      </div>
    </form>
  );
}