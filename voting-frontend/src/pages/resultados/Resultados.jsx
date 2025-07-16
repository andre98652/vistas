/**
 * Resultados.jsx — gráfico Recharts
 *
 * MOCK_MODE = true   → muestra datos de ejemplo
 * MOCK_MODE = false  → consulta al backend
 */

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import Spinner from '@/components/Spinner'

// 🔽 Cambia a false cuando tengas backend
const MOCK_MODE = true

/* —— 1. Datos de ejemplo —— */
const MOCK_DATA = [
  { opcion: 'Sí', votos: 12 },
  { opcion: 'No', votos: 8 },
]

/* —— 2. Import real — descomenta con backend —— */
// import { getResultados } from '@/api/votaciones'

export default function Resultados() {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  /* 3. Traer resultados */
  useEffect(() => {
    if (MOCK_MODE) {
      setData(MOCK_DATA)
      setLoading(false)
    } else {
      getResultados(id)
        .then((res) => setData(res.data))
        .finally(() => setLoading(false))
    }
  }, [id])

  /* 4. Render */
  if (loading) return <Spinner />
  if (!data.length) return <p>No hay votos registrados todavía.</p>

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Resultados</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="opcion" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="votos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
