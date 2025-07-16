import { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'
import { Link } from 'react-router-dom'

// 🔽 Cambia a false cuando tengas backend
const MOCK_MODE = true

/* Datos de ejemplo */
const MOCK_LIST = [
  { id: 1, titulo: 'Nueva sede', depto: 'LIMA', activa: true },
  { id: 2, titulo: 'Horario invierno', depto: 'CUSCO', activa: false },
]

export default function Gestionar() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (MOCK_MODE) {
      setRows(MOCK_LIST)
      setLoading(false)
    } else {
      // getAll() reutilizado del servicio votaciones
    }
  }, [])

  const cerrar = (id) => {
    if (window.confirm('¿Cerrar votación?')) {
      if (MOCK_MODE) {
        setRows(r => r.map(v => v.id === id ? { ...v, activa: false } : v))
      } else {
        closeVote(id).then(() => setRows(r => r.map(v => v.id === id ? { ...v, activa: false } : v)))
      }
    }
  }

  if (loading) return <Spinner />

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Título</th>
          <th className="p-2">Depto</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(v => (
          <tr key={v.id} className="border-t">
            <td className="p-2">{v.titulo}</td>
            <td className="p-2">{v.depto}</td>
            <td className="p-2">{v.activa ? 'ACTIVA' : 'CERRADA'}</td>
            <td className="p-2 space-x-2">
              <Link to={`/admin/documentos/${v.id}`} className="text-blue-600">Docs</Link>
              {v.activa && <button onClick={() => cerrar(v.id)} className="text-orange-600">Cerrar</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
