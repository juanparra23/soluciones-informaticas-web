import React, { useState } from 'react'
import Input from '@/Components-Admin/Atoms/Input'
import Textarea from '@/Components-Admin/Atoms/Textarea'
import Select from '@/Components-Admin/Atoms/Select'
import Button from '@/Components-Admin/Atoms/Buttom'
import { supabase } from '@/lib/supabaseClient'

type Props = { onCreated?: () => void }

export default function ProductForm({ onCreated }: Props) {
  const [titulo, setTitulo] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let finalUrl: string | null = imageUrl.trim() || null

    // Si hay archivo, se sube a Supabase Storage y se ignora la URL
    if (file) {
      const ext = file.name.split('.').pop() || 'jpg'
      const fileName = `${Date.now()}.${ext}`
      const filePath = `productos/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('productos')
        .upload(filePath, file)

      if (uploadError) {
        alert(uploadError.message)
        setLoading(false)
        return
      }

      const { data } = supabase.storage.from('productos').getPublicUrl(filePath)
      finalUrl = data.publicUrl
    }

    const { error } = await supabase.from('Productos').insert([
      {
        title: titulo.trim(),
        category: categoria,
        descripcion: descripcion.trim(),
        image_url: finalUrl,
      },
    ])

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    setTitulo('')
    setCategoria('')
    setDescripcion('')
    setImageUrl('')
    setFile(null)

    onCreated?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-white text-xl font-semibold">Agregar producto</h2>
      <p className="text-gray-300 text-sm mt-1">
        Completa los datos para publicarlo en la web.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm text-gray-200">Título</label>
          <Input
            placeholder="Ej: Cámara ColorVu 4K"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-200">Categoría</label>
          <Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecciona</option>
            <option value="camaras">Cámaras</option>
            <option value="tintas">Tintas</option>
            <option value="computadores">Computadores</option>
            <option value="impresoras">Impresoras</option>
            <option value="toners">Tóner</option>
          </Select>
        </div>

        <div>
          <label className="text-sm text-gray-200">Descripción</label>
          <Textarea
            placeholder="Describe el producto (características, garantía, etc.)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-200">URL de imagen (opcional)</label>
          <Input
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <label className="text-sm text-gray-200">Subir imagen (desde PC)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2 text-sm text-gray-200"
          />
          <p className="text-xs text-gray-300 mt-2">
            Si subes un archivo, se usará el archivo y se ignorará la URL.
          </p>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
