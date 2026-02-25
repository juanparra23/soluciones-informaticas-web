import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import SectionHeader from '@/Components/Atoms/SectionHeader'
import NewProductCard from '@/Components/Molecules/Newproductcard'

const WHATSAPP_NUMBER = '573137955864'

type Product = {
  id: string
  title: string
  description: string
  category: string
  image_url: string | null
  created_at: string
}

const labels: Record<string, string> = {
  camaras: 'Cámaras',
  tintas: 'Tintas',
  toners: 'Toners',
  impresoras: 'Impresoras',
  computadores: 'Computadores',
}

export default function LoNuevo() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const categoryLabel = (c: string) => labels[c] || c

  const quoteUrl = (p: Product) => {
    const msg = `Hola 👋, vi este producto en la web:\n\n• ${p.title}\n• Categoría: ${categoryLabel(
      p.category
    )}\n\n¿Me das precio y disponibilidad?`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

      const { data, error } = await supabase
        .from('Productos')
        .select('id, title, description, category, image_url, created_at')
        .gte('created_at', sevenDaysAgo)
        .order('created_at', { ascending: false })
        .limit(6)

      if (!error) setItems((data as Product[]) || [])
      setLoading(false)
    }

    load()
  }, [])

  return (
    <section className="py-16 bg-[#050B18]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/5 to-blue-500/10 p-8">
          <SectionHeader
            title="Lo nuevo esta semana"
            subtitle="Productos agregados en los últimos 7 días. Cotiza directo por WhatsApp."
            
          />

          <div className="mt-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-52 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : items.length === 0 ? (
              <p className="text-gray-300">Aún no hay productos nuevos esta semana.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((p) => (
                  <NewProductCard
                    key={p.id}
                    product={p}
                    categoryLabel={categoryLabel}
                    onQuoteUrl={(product) =>`https://wa.me/573137955864?text=Hola, quiero cotizar ${product.title}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
