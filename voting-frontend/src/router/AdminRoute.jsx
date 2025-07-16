import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function AdminRoute() {
  const { isLogged, user } = useAuth()
  const isAdmin = isLogged && user?.role === 'ADMIN'
  return isAdmin ? <Outlet /> : <Navigate to="/" />
}
