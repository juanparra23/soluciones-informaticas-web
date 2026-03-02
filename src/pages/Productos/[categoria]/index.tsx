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
        console.error(error)
        setProducts([])
      } else {
        setProducts(Array.isArray(data) ? (data as Product[]) : [])
      }

      setLoading(false)
    }

    load()
  }, [categoria])

  const buildWhatsappLink = (p: Product) => {
    const msg = `Hola 👋, quiero cotizar este producto:\n\n• ${p.title}\n• Categoría: ${categoriaText}\n\nDescripción:\n${p.descripcion}\n\n¿Me das precio y disponibilidad?`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  return (
    <div className="min-h-screen bg-[#050B18] pt-28 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/5 to-blue-500/10 p-8">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <p className="text-xs text-gray-200">Catálogo · {categoriaText}</p>
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {categoriaText}
          </h1>

          <p className="mt-3 text-gray-200 max-w-2xl">
            Mira nuestros productos. Dale en <b>Ver más</b> para detalles, o <b>Cotizar</b> para escribirnos por WhatsApp.
          </p>
        </div>

        {loading && <p className="text-gray-300 mt-8">Cargando productos...</p>}

        {!loading && products.length === 0 && (
          <p className="text-gray-300 mt-8">No hay productos en esta categoría todavía.</p>
        )}

        {/* GRID */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
            >
              
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-blue-500/20 blur-3xl" />
              </div>

              
             <div className="h-52 bg-black/20 overflow-hidden flex items-center justify-center">
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105 rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-white font-semibold text-lg leading-snug">
                    {p.title}
                  </h2>

                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/15 text-blue-200 border border-blue-500/20">
                    {categoriaText}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                  {p.descripcion}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelected(p)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white font-semibold hover:bg-white/10 transition"
                  >
                    Ver más
                  </button>

                  <a
                    href={buildWhatsappLink(p)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-white font-semibold hover:opacity-90 transition active:scale-[0.99]"
                  >
                    Cotizar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      
        {selected && (
          <div
            className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#071022] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-bold text-lg">{selected.title}</h3>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-300 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-5">
                {selected.image_url && (
                  <img
                    src={selected.image_url}
                    alt={selected.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                )}

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/15 text-blue-200 border border-blue-500/20">
                    {categoriaText}
                  </span>
                  <a
                    href={buildWhatsappLink(selected)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-white font-semibold hover:opacity-90 transition"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>

                <p className="mt-4 text-gray-200 leading-relaxed whitespace-pre-line">
                  {selected.descripcion}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="h-10" />
      </div>
    </div>
  )
}
