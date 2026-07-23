import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const WHATSAPP_NUMBER = '573137955864'

type Product = {
  id: string
  title: string
  descripcion: string
  category: string
  image_url: string | null
}

export default function ProductosPorCategoria() {
  const router = useRouter()
  const { categoria } = router.query

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Product | null>(null)

  const categoriaText = useMemo(() => {
    const c = String(categoria || '')

    const map: Record<string, string> = {
      camaras: 'Cámaras',
      tintas: 'Tintas',
      toners: 'Toners',
      impresoras: 'Impresoras',
      computadores: 'Computadores',
    }

    return map[c] || c
  }, [categoria])

  useEffect(() => {
    if (!categoria) return

    const load = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('Productos')
        .select('id, title, descripcion, category, image_url')
        .eq('category', categoria)
        .order('id', { ascending: false })

      if (error) {
        console.error('Error cargando productos:', error)
        setProducts([])
      } else {
        setProducts(Array.isArray(data) ? (data as Product[]) : [])
      }

      setLoading(false)
    }

    load()
  }, [categoria])

  const buildWhatsappLink = (product: Product) => {
    const message = `Hola 👋, quiero comprar este producto:

• Producto: ${product.title}
• Categoría: ${categoriaText}

Descripción:
${product.descripcion}

¿Me puedes confirmar el precio y la disponibilidad?`

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`
  }

  return (
    <main className="min-h-screen bg-[#050B18] px-6 pt-28">
      <div className="mx-auto max-w-7xl">
        {/* Encabezado */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/5 to-blue-500/10 p-8">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <p className="text-xs text-gray-200">
                Catálogo · {categoriaText}
              </p>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {categoriaText}
            </h1>

            <p className="mt-3 max-w-2xl text-gray-200">
              Conoce nuestros productos. Presiona{' '}
              <strong>Ver más</strong> para conocer todos sus detalles o{' '}
              <strong>Comprar por WhatsApp</strong> para comunicarte con
              nosotros.
            </p>
          </div>
        </section>

        {/* Estado de carga */}
        {loading && (
          <p className="mt-8 text-gray-300">Cargando productos...</p>
        )}

        {/* Sin productos */}
        {!loading && products.length === 0 && (
          <p className="mt-8 text-gray-300">
            No hay productos disponibles en esta categoría.
          </p>
        )}

        {/* Productos */}
        <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="
                group
                relative
                flex h-full flex-col
                overflow-hidden
                rounded-2xl
                border border-white/10
                bg-[#0B1324]
                shadow-lg shadow-black/10
                transition-all duration-300
                hover:-translate-y-1
                hover:border-blue-400/30
                hover:shadow-xl
                hover:shadow-blue-500/10
              "
            >
              {/* Brillo decorativo */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-white/[0.06] to-black/10 p-4">
                {/* Categoría */}
                <span className="absolute left-4 top-4 z-10 rounded-full border border-blue-400/20 bg-[#071022]/90 px-3 py-1 text-xs font-medium text-blue-200 backdrop-blur-md">
                  {categoriaText}
                </span>

                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-white p-4">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      loading="lazy"
                      className="block h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                      Sin imagen disponible
                    </div>
                  )}
                </div>
              </div>

              {/* Información */}
              <div className="relative flex flex-1 flex-col p-5">
                <h2 className="line-clamp-2 text-xl font-bold leading-snug text-white">
                  {product.title}
                </h2>

                <p className="mt-2 min-h-[48px] line-clamp-2 text-sm leading-6 text-slate-300">
                  {product.descripcion}
                </p>

                {/* Botones */}
                <div className="mt-auto grid grid-cols-[0.7fr_1.3fr] gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => setSelected(product)}
                    className="
                      flex h-11
                      items-center justify-center
                      rounded-lg
                      border border-white/10
                      bg-white/[0.04]
                      px-3
                      text-sm font-semibold text-white
                      transition-all duration-300
                      hover:border-white/20
                      hover:bg-white/10
                      active:scale-[0.98]
                    "
                  >
                    Ver más
                  </button>

                  <a
                    href={buildWhatsappLink(product)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Comprar ${product.title} por WhatsApp`}
                    className="
                      flex h-11
                      items-center justify-center
                      gap-2
                      rounded-lg
                      bg-emerald-500
                      px-3
                      text-white
                      shadow-md shadow-emerald-500/20
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:bg-emerald-400
                      hover:shadow-lg
                      hover:shadow-emerald-500/30
                      active:scale-[0.98]
                    "
                  >
                    <WhatsAppIcon className="h-5 w-5 shrink-0" />

                    <span className="flex flex-col items-start leading-none">
                      <span className="text-[10px] font-medium text-white/85">
                        Comprar por
                      </span>

                      <span className="mt-1 text-sm font-bold">
                        WhatsApp
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Modal */}
        {selected && (
          <div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-modal-title"
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#071022] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Encabezado modal */}
              <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4">
                <h3
                  id="product-modal-title"
                  className="text-lg font-bold text-white"
                >
                  {selected.title}
                </h3>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Cerrar detalles del producto"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Contenido modal */}
              <div className="p-5">
                {selected.image_url && (
                  <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl bg-white p-5">
                    <img
                      src={selected.image_url}
                      alt={selected.title}
                      className="block h-full w-full object-contain"
                    />
                  </div>
                )}

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="w-fit rounded-full border border-blue-500/20 bg-blue-500/15 px-3 py-1 text-xs text-blue-200">
                    {categoriaText}
                  </span>

                  <a
                    href={buildWhatsappLink(selected)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Comprar ${selected.title} por WhatsApp`}
                    className="
                      flex h-11
                      items-center justify-center
                      gap-2
                      rounded-lg
                      bg-emerald-500
                      px-5
                      text-sm font-bold text-white
                      shadow-md shadow-emerald-500/20
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:bg-emerald-400
                      hover:shadow-lg
                      hover:shadow-emerald-500/30
                      active:scale-[0.98]
                    "
                  >
                    <WhatsAppIcon className="h-5 w-5 shrink-0" />

                    <span>Comprar por WhatsApp</span>
                  </a>
                </div>

                <p className="mt-5 whitespace-pre-line leading-relaxed text-gray-200">
                  {selected.descripcion}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="h-12" />
      </div>
    </main>
  )
}

type WhatsAppIconProps = {
  className?: string
}

function WhatsAppIcon({ className }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.93L2 22l5.22-1.58A9.96 9.96 0 1 0 12.04 2Zm0 17.93a8.04 8.04 0 0 1-4.1-1.12l-.3-.18-3.1.94.96-3.02-.2-.31a7.9 7.9 0 1 1 6.74 3.69Zm4.4-5.92c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.19a7.22 7.22 0 0 1-1.34-1.66c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}