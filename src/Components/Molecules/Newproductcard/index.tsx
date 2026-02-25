import React from 'react'
import Badge from '@/Components/Atoms/Badge'

type Product = {
  id: string
  title: string
  description: string
  category: string
  image_url: string | null
}

type Props = {
  product: Product
  categoryLabel: (c: string) => string
  onQuoteUrl: (p: Product) => string
}

export default function NewProductCard({ product, categoryLabel, onQuoteUrl }: Props) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 hover:border-white/20 transition">
      <div className="relative h-44 bg-black/20">
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="new">Nuevo</Badge>
        </div>

        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            Sin imagen
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-semibold text-lg">{product.title}</h3>
          <Badge variant="category">{categoryLabel(product.category)}</Badge>
        </div>

        <p className="text-gray-300 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex gap-3">
          <a
            href={onQuoteUrl(product)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            Cotizar
          </a>

          <a
            href={`/Productos/${product.category}`}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white hover:bg-white/10 transition"
          >
            Ver más
          </a>
        </div>
      </div>
    </div>
  )
}
