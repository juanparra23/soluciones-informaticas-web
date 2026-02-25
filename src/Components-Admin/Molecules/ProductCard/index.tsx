import Button from '@/Components-Admin/Atoms/Buttom'

type Props = {
  id: string
  titulo: string
  categoria: string | null
  descripcion: string | null
  imageUrl?: string | null
  onDelete?: (id: string) => void
}

export default function ProductCard({
  id,
  titulo,
  categoria,
  descripcion,
  imageUrl,
  onDelete,
}: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
      <div className="h-44 bg-black/20">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-semibold leading-tight line-clamp-2">
            {titulo}
          </h3>

          <span className="shrink-0 text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30">
            {categoria ?? "Sin categoría"}
          </span>
        </div>

        <p className="text-sm text-gray-200 line-clamp-3">
          {descripcion ?? "Sin descripción"}
        </p>

        {onDelete && (
          <div className="mt-auto">
            <Button
              type="button"
              onClick={() => onDelete(id)}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}