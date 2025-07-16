import { Outlet, Link } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Side bar */}
      <aside className="w-56 bg-gray-800 text-white p-4 space-y-2">
        <h2 className="font-bold text-lg mb-4">Panel Admin</h2>
        <Link to="/admin/crear"        className="block hover:bg-gray-700 p-2 rounded">Nueva votación</Link>
        <Link to="/admin/votaciones"   className="block hover:bg-gray-700 p-2 rounded">Gestionar</Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
