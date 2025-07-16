import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedRoute() {
  return useAuth().isLogged ? <Outlet /> : <Navigate to="/login" />
}
