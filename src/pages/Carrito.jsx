import { Link } from 'react-router-dom'

function Carrito() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-oat-100 text-espresso-400">
        <svg
          className="h-9 w-9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-1 8h12M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
      </span>

      <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-terracotta-600">
        Requerimiento #4
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-espresso-900 sm:text-5xl">
        Tu carrito está vacío
      </h1>


      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/productos"
          className="rounded-full bg-espresso-900 px-7 py-3 font-semibold text-oat-50 transition hover:bg-terracotta-600"
        >
          Ver productos
        </Link>
        <Link
          to="/"
          className="rounded-full border border-espresso-900/20 px-7 py-3 font-semibold text-espresso-800 transition hover:border-espresso-900/50"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default Carrito
