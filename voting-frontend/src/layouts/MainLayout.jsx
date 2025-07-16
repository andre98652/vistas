import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function MainLayout() {
  const location = useLocation()          // ⬅️ dentro del componente

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white p-4 flex justify-between">
        <h1 className="font-bold">Votaciones</h1>
        <nav>
          <Link to="/" className="mx-2">Votaciones</Link>
          {/* en mock quitamos login; en real será un botón de logout */}
          <Link to="/login" className="mx-2">Salir</Link>
        </nav>
      </header>

      {/* Contenido con animación */}
      <section className="flex-1 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}              // cambia al cambiar ruta
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  )
}
