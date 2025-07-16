import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = create(set => ({
  token: null,
  user:  null,
  login: (token) => set({ token, user: jwtDecode(token) }),
  logout: ()      => set({ token: null, user: null }),
}))
