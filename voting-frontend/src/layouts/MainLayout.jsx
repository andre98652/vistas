import { Outlet, Link } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="font-bold">Votaciones</h1>
        <nav>
          <Link to="/" className="mx-2">Votaciones</Link>
          <Link to="/login" className="mx-2" onClick={() => localStorage.clear()}>
            Salir
          </Link>
        </nav>
      </header>

      <section className="flex-1 p-4">
        <Outlet />
      </section>
    </div>
  )
}
