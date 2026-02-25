import { useState } from 'react'
import ProductForm from '@/Components-Admin/Molecules/ProductForm'
import ProductsGrid, { Producto } from '@/Organism-Admin/ProductsGrid'
import StatsCards from '@/Organism-Admin/StatsCards'

export default function AdminProductosPage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [products, setProducts] = useState<Producto[]>([])
  const [filter, setFilter] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#050B18] pt-28 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white">Admin · Productos</h1>
        <p className="text-gray-300 mt-2">
          Administra los productos que se ven en la página pública.
        </p>

        <div className="mt-6">
          <StatsCards
            products={products}
            activeFilter={filter}
            onFilter={setFilter}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <ProductForm onCreated={() => setRefreshKey((k) => k + 1)} />
          </div>

          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">
                {filter ? `Productos · ${filter}` : 'Productos'}
              </h2>

              <div className="flex items-center gap-3">
                {filter && (
                  <button
                    onClick={() => setFilter(null)}
                    className="text-sm text-gray-200 hover:text-white transition"
                  >
                    Quitar filtro
                  </button>
                )}

                <button
                  onClick={() => setRefreshKey((k) => k + 1)}
                  className="text-sm text-gray-200 hover:text-white transition"
                >
                  Refrescar
                </button>
              </div>
            </div>

            <div className="mt-4">
              <ProductsGrid
                refreshKey={refreshKey}
                filter={filter}
                onData={(rows) => setProducts(rows)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

