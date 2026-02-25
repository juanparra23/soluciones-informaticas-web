import React, { useMemo } from 'react'

type Props = {
  products: Array<{ category?: string | null }>
  activeFilter: string | null
  onFilter: (category: string | null) => void
}

export default function StatsCards({ products, activeFilter, onFilter }: Props) {
  const stats = useMemo(() => {
    const norm = (s: string) => s.trim().toLowerCase()

    const total = products.length
    const count = (cat: string) =>
      products.filter((p) => norm(p.category || '') === norm(cat)).length

    return {
      total,
      camaras: count('camaras'),
      tintas: count('tintas'),
      toners: count('toners'),
      impresoras: count('impresoras'),
      computadores: count('computadores'),
    }
  }, [products])

  const Card = ({
    title,
    value,
    active,
    onClick,
  }: {
    title: string
    value: number
    active: boolean
    onClick: () => void
  }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border
        ${
          active
            ? 'bg-blue-600 border-blue-400 shadow-lg'
            : 'bg-white/5 border-white/10 hover:bg-white/10'
        }`}
    >
      <p className="text-gray-200 text-sm">{title}</p>
      <p className="text-white text-2xl font-bold mt-1">{value}</p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      <Card title="Total" value={stats.total} active={activeFilter === null} onClick={() => onFilter(null)} />
      <Card title="Cámaras" value={stats.camaras} active={activeFilter === 'camaras'} onClick={() => onFilter('camaras')} />
      <Card title="Tintas" value={stats.tintas} active={activeFilter === 'tintas'} onClick={() => onFilter('tintas')} />
      <Card title="Toners" value={stats.toners} active={activeFilter === 'toners'} onClick={() => onFilter('toners')} />
      <Card title="Impresoras" value={stats.impresoras} active={activeFilter === 'impresoras'} onClick={() => onFilter('impresoras')} />
      <Card title="Computadores" value={stats.computadores} active={activeFilter === 'computadores'} onClick={() => onFilter('computadores')} />
    </div>
  )
}
