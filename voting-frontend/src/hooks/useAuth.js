import { useAuthStore } from '@/store/auth'

export const useAuth = () => {
  const { token, user, login, logout } = useAuthStore()
  return { token, user, login, logout, isLogged: !!token }
}
