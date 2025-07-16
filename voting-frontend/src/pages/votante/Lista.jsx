/**
 * Lista.jsx – Vista de votaciones con filtro por departamento
 *
 * Cómo usar ----------------------------
 * 1️⃣  MOCK_MODE = true   → usa datos de ejemplo (sin backend)
 * 2️⃣  MOCK_MODE = false  → usa Axios y pega al backend real
 *
 * Si pasas a backend real:
 *   • Descomenta las importaciones de la API
 *   • Crea /api/votaciones.js como se indicó antes
 *   • Asegúrate de tener VITE_API_URL en .env
 */

import Card      from '@/components/Card'
import Button    from '@/components/Button'
import { ArrowRightIcon } from '@heroicons/react/24/solid'




import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '@/components/Spinner'

// 🔽 Cambia a false cuando tengas backend
const MOCK_MODE = true

/* —— 1. Datos de ejemplo (solo se usan si MOCK_MODE =true) —— */
const MOCK_DEPTOS = ['LIMA', 'CUSCO', 'AREQUIPA']
const MOCK_VOTACIONES = [
  { id: 1, titulo: 'Nueva sede UNSA', depto: 'LIMA', estado: 'ACTIVA' },
  { id: 2, titulo: 'Horario invierno', depto: 'CUSCO', estado: 'CERRADA' },
  { id: 3, titulo: 'Reglamento Biblioteca', depto: 'AREQUIPA', estado: 'ACTIVA' },
]

/* —— 2. Importaciones de la API real — descomenta cuando MOCK_MODE =false —— */
// import { getDepartamentos, getAll, getByDepto } from '@/api/votaciones'

export default function Lista() {
  const [departamentos, setDepartamentos] = useState([])
  const [depto, setDepto] = useState('TODOS')
  const [votaciones, setVotaciones] = useState([])
  const [loading, setLoading] = useState(true)

  /* 3. Cargar departamentos una sola vez */
  useEffect(() => {
    if (MOCK_MODE) {
      setDepartamentos(MOCK_DEPTOS)
    } else {
      getDepartamentos()
        .then((res) => setDepartamentos(res.data))
        .catch(() => setDepartamentos([]))
    }
  }, [])

  /* 4. Cargar votaciones cada vez que cambia el filtro */
  useEffect(() => {
    setLoading(true)

    if (MOCK_MODE) {
      const data =
        depto === 'TODOS'
          ? MOCK_VOTACIONES
          : MOCK_VOTACIONES.filter((v) => v.depto === depto)
      setVotaciones(data)
      setLoading(false)
    } else {
      const req = depto === 'TODOS' ? getAll() : getByDepto(depto)
      req
        .then((res) => setVotaciones(res.data))
        .catch(() => setVotaciones([]))
        .finally(() => setLoading(false))
    }
  }, [depto])

  return (
    <div>
      {/* 5. Selector de departamento */}
      <label className="block mb-4">
        <span className="text-sm font-medium">Filtrar por departamento:</span>
        <select
          value={depto}
          onChange={(e) => setDepto(e.target.value)}
          className="border p-2 mt-1 rounded"
        >
          <option value="TODOS">Todos</option>
          {departamentos.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      {/* 6. Estado de carga */}
      {loading && <Spinner />}

      {/* 7. Mensaje sin resultados */}
      {!loading && votaciones.length === 0 && (
        <p className="text-gray-500">No hay votaciones para mostrar.</p>
      )}

      {/* 8. Tarjetas de votaciones */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {votaciones.map((v) => (
          <Card as={Link} to={`/votacion/${v.id}`}>
            <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full
                  bg-green-100 text-green-700">
              {v.estado}
            </span>

            <h3 className="text-lg font-semibold text-gray-800">{v.titulo}</h3>
            <p className="text-sm text-gray-500 mb-4">{v.depto}</p>

            <Button variant="primary" className="w-full mt-2 justify-between">
              Entrar <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </Card>

        ))}
      </div>
    </div>
  )
}
