import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const enlaces = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos', end: false },
  { to: '/producto/1', label: 'Origen del mes', end: false },
]

function NavBar() {
  const [abierto, setAbierto] = useState(false)

  const clases = ({ isActive }) =>
    [
      'rounded-full px-4 py-2 text-sm font-semibold transition',
      isActive
        ? 'bg-espresso-900 text-oat-50'
        : 'text-espresso-700 hover:bg-oat-200 hover:text-espresso-900',
    ].join(' ')

  return (
    <nav aria-label="Navegación principal" className="flex items-center gap-2">
      <ul className="hidden items-center gap-1 md:flex">
        {enlaces.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={clases}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link
        to="/carrito"
        className="relative inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-terracotta-600"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-1 8h12M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
        Carrito
        <span className="rounded-full bg-white/25 px-1.5 py-0.5 text-xs">0</span>
      </Link>

      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        aria-label="Abrir menú de navegación"
        className="rounded-full border border-espresso-900/15 p-2 text-espresso-800 transition hover:bg-oat-200 md:hidden"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {abierto ? (
            <path d="M6 6l12 12M18 6 6 18" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {abierto && (
        <ul
          id="menu-movil"
          className="absolute inset-x-0 top-full z-20 flex flex-col gap-1 border-b border-espresso-900/10 bg-oat-50 p-4 shadow-lg md:hidden"
        >
          {enlaces.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={() => setAbierto(false)}
                className={clases}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default NavBar
