/**
 * Detalle.jsx  –  muestra título, descripción y opciones para votar
 *
 * MOCK_MODE = true  → usa datos dummy
 * MOCK_MODE = false → consulta al backend y envía voto real
 */

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'

// 🔽 Cambia a false cuando tengas backend
const MOCK_MODE = true

/* —— 1. Datos de ejemplo —— */
const MOCK_DETALLE = {
  id: 1,
  titulo: 'Nueva sede UNSA',
  descripcion: '¿Apruebas la construcción de la nueva sede?',
  depto: 'LIMA',
  opciones: [
    { id: 10, texto: 'Sí' },
    { id: 11, texto: 'No' },
  ],
}

/* —— 2. Importaciones reales – descomentar cuando MOCK_MODE = false —— */
// import { getDetalle, votar } from '@/api/votaciones'

export default function Detalle() {
  const { id } = useParams()            // id de la URL
  const navigate = useNavigate()

  const [detalle, setDetalle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  /* 3. Obtener detalle */
  useEffect(() => {
    if (MOCK_MODE) {
      setDetalle(MOCK_DETALLE)          // podrías usar id para cambiar mock
      setLoading(false)
    } else {
      getDetalle(id)
        .then((res) => setDetalle(res.data))
        .finally(() => setLoading(false))
    }
  }, [id])

  /* 4. Manejar click en votar */
  const handleVote = async (opcionId) => {
    if (sending) return
    setSending(true)

    try {
      if (MOCK_MODE) {
        alert(`(mock) voto emitido a opción ${opcionId}`)
      } else {
        await votar(opcionId)
        alert('¡Voto registrado!')
      }
      navigate(`/resultados/${id}`)
    } catch {
      alert('No se pudo votar. Intenta de nuevo.')
    } finally {
      setSending(false)
    }
  }

  /* 5. Render */
  if (loading) return <Spinner />
  if (!detalle) return <p>No se encontró la votación.</p>

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{detalle.titulo}</h2>
      <p className="mb-4 text-gray-600">{detalle.descripcion}</p>

      <h3 className="font-medium mb-2">Opciones:</h3>
      <div className="space-y-2">
        {detalle.opciones.map((op) => (
          <button
            key={op.id}
            onClick={() => handleVote(op.id)}
            disabled={sending}
            className="w-full border p-3 rounded hover:bg-blue-50 flex justify-between"
          >
            <span>{op.texto}</span>
            {sending && <Spinner />}
          </button>
        ))}
      </div>
    </div>
  )
}
