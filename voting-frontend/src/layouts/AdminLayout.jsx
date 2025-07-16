import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-800 text-white p-4 space-y-2">
        <h2 className="font-bold text-lg mb-4">Panel Admin</h2>
        <Link to="/admin/crear"      className="block hover:bg-gray-700 p-2 rounded">Nueva votación</Link>
        <Link to="/admin/votaciones" className="block hover:bg-gray-700 p-2 rounded">Gestionar</Link>
      </aside>

      {/* Área principal con animación */}
      <main className="flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
