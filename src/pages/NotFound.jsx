import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="font-display text-7xl text-espresso-300">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-espresso-900 sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-3 text-espresso-600">
        El link puede estar viejo o la dirección mal escrita. Volvé al catálogo y seguí
        explorando.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-espresso-900 px-7 py-3 font-semibold text-oat-50 transition hover:bg-terracotta-600"
        >
          Ir al inicio
        </Link>
        <Link
          to="/productos"
          className="rounded-full border border-espresso-900/20 px-7 py-3 font-semibold text-espresso-800 transition hover:border-espresso-900/50"
        >
          Ver productos
        </Link>
      </div>
    </div>
  )
}

export default NotFound
