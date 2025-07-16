import ProtectedRoute from './ProtectedRoute'
import { createBrowserRouter } from 'react-router-dom'
import AuthLayout  from '@/layouts/AuthLayout'
import MainLayout  from '@/layouts/MainLayout'
import Login       from '@/pages/auth/Login'
import Lista       from '@/pages/votante/Lista'
import Detalle     from '@/pages/votante/Detalle'
import Resultados  from '@/pages/resultados/Resultados'
import AdminLayout  from '@/layouts/AdminLayout'
import AdminRoute   from './AdminRoute'
import Crear        from '@/pages/admin/Crear'
import Gestionar    from '@/pages/admin/Gestionar'
import Documentos   from '@/pages/admin/Documentos'

export const router = createBrowserRouter([
  { element: <AuthLayout />, children: [{ path: '/login', element: <Login /> }] },
  {
    //element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <Lista /> },
          { path: '/votacion/:id', element: <Detalle /> },
          { path: '/resultados/:id', element: <Resultados /> },
        ],
      },
    ],
  },
  {
    //element: <ProtectedRoute />,
    children: [
      {
        //element: <AdminRoute />,   // ⬅️ sólo admins
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: '/admin/crear',        element: <Crear /> },
              { path: '/admin/votaciones',   element: <Gestionar /> },
              { path: '/admin/documentos/:id', element: <Documentos /> },
            ],
          },
        ],
      },
    ],
  },
])
