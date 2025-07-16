import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'

// 🔽 Cambia a false cuando tengas backend
const MOCK_MODE = true

const MOCK_DOCS = [
  { nombre: 'Acta.pdf', url: '#' },
  { nombre: 'Listado.xlsx', url: '#' },
]

export default function Documentos() {
  const { id } = useParams()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (MOCK_MODE) {
      setDocs(MOCK_DOCS)
      setLoading(false)
    } else {
      listDocs(id).then(res => setDocs(res.data)).finally(() => setLoading(false))
    }
  }, [id])

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (MOCK_MODE) {
      alert('(mock) archivo subido')
    } else {
      await uploadDocument(id, file)
    }
  }

  return (
    <div className="max-w-lg space-y-4">
      <h2 className="text-xl font-bold">Documentos de la votación {id}</h2>

      <label className="block">
        <span className="text-sm">Subir archivo</span>
        <input type="file" onChange={handleUpload} className="mt-1" />
      </label>

      {loading && <Spinner />}
      {!loading && docs.length === 0 && <p>No hay documentos todavía.</p>}

      <ul className="list-disc pl-5">
        {docs.map((d, idx) => (
          <li key={idx}>
            <a href={d.url} className="text-blue-600" target="_blank" rel="noreferrer">
              {d.nombre}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

