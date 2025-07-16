import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import Spinner from '@/components/Spinner'

// 🔽 Cambia a false cuando tengas backend
const MOCK_MODE = true

/* —— Esquema de validación —— */
const schema = z.object({
  titulo: z.string().min(3),
  descripcion: z.string().min(5),
  depto: z.string().min(2),
  opciones: z.array(z.object({ texto: z.string().min(1) })).min(2),
})

/* —— Datos de ejemplo para mock —— */
const FAKE_ID = 99

export default function Crear() {
  const navigate = useNavigate()
  const { register, control, handleSubmit, formState: { errors } } =
    useForm({ resolver: zodResolver(schema), defaultValues: { opciones: [{ texto: '' }, { texto: '' }] } })
  const { fields, append, remove } = useFieldArray({ control, name: 'opciones' })

  const onSubmit = async (data) => {
    try {
      if (MOCK_MODE) {
        console.log('(mock) data enviada', data)
        alert('Votación creada!')
        navigate(`/admin/documentos/${FAKE_ID}`)
      } else {
        const res = await createVote(data)
        navigate(`/admin/documentos/${res.data.id}`)
      }
    } catch {
      alert('Error al crear')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <h2 className="text-2xl font-bold">Nueva votación</h2>

      <div>
        <label className="block text-sm">Título</label>
        <input {...register('titulo')} className="border p-2 w-full rounded" />
        {errors.titulo && <p className="text-red-500 text-xs">{errors.titulo.message}</p>}
      </div>

      <div>
        <label className="block text-sm">Descripción</label>
        <textarea {...register('descripcion')} className="border p-2 w-full rounded" />
      </div>

      <div>
        <label className="block text-sm">Departamento</label>
        <input {...register('depto')} className="border p-2 w-full rounded" />
      </div>

      <div>
        <label className="block text-sm">Opciones</label>
        {fields.map((f, idx) => (
          <div key={f.id} className="flex gap-2 mb-2">
            <input
              {...register(`opciones.${idx}.texto`)}
              className="border p-2 flex-1 rounded"
              placeholder={`Opción ${idx + 1}`}
            />
            {fields.length > 2 && (
              <button type="button" onClick={() => remove(idx)} className="px-2 bg-red-500 text-white rounded">X</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => append({ texto: '' })}
                className="mt-1 text-blue-600 text-sm">+ Añadir opción</button>
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Guardar</button>
    </form>
  )
}
