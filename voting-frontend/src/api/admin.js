import { api } from './client'

/* —— Endpoints reales — descomenta cuando tengas backend —— */
export const createVote     = (payload)        => api.post('/admin/votaciones', payload)
export const updateVote     = (id, payload)    => api.put(`/admin/votaciones/${id}`, payload)
export const deleteVote     = (id)             => api.delete(`/admin/votaciones/${id}`)
export const closeVote      = (id)             => api.patch(`/admin/votaciones/${id}/cerrar`)
export const uploadDocument = (id, file) => {
  const form = new FormData()
  form.append('file', file)
  return api.post(`/admin/votaciones/${id}/documentos`, form)
}
export const listDocs       = (id)             => api.get(`/admin/votaciones/${id}/documentos`)

