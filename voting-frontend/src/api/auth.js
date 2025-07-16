import { api } from './client'

export const login = (email, password) =>
  api.post('/login', { email, password })   // ajusta al endpoint real
