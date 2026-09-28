import { Link } from 'react-router-dom'
import NavBar from './NavBar'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Tostado Norte, ir al inicio">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-espresso-900 text-oat-50">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M4 9h13a4 4 0 0 1 0 8h-1M4 9v6a4 4 0 0 0 4 4h5" />
          <path d="M8 2c0 1.5 1 2 1 3.5S8 8 8 9.5 9 11 9 12" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold text-espresso-900">
          Tostado Norte
        </span>
        <span className="block text-[11px] uppercase tracking-widest text-espresso-400">
          Café de especialidad
        </span>
      </span>
    </Link>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-espresso-900/10 bg-oat-50/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <NavBar />
      </div>
    </header>
  )
}

export default Header
