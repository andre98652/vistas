import { api } from './client'

export const getDepartamentos = () =>
  api.get('/departamentos')                 // ⇒ ["LIMA", "CUSCO", …]

export const getAll = () =>
  api.get('/votaciones')                    // ⇒ [{ id, titulo, depto, estado }]

export const getByDepto = (dpto) =>
  api.get('/votaciones', { params: { dpto } })

/* Añade estas dos funciones al final del archivo */

export const getDetalle = (id) =>
  api.get(`/votaciones/${id}`)         // ⇒ { id, titulo, descripcion, depto, opciones: [...] }

export const votar = (opcionId) =>
  api.post('/votar', { opcionId })     // ⇒ { ok: true }

/* Añade al final */
export const getResultados = (id) =>
  api.get(`/resultados/${id}`)        // ⇒ [{ opcion:'Sí', votos:12 }, …]
