import { Link } from 'react-router-dom'

const precio = (valor) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor)

function Item({ producto }) {
  if (!producto) return null

  const { id, nombre, imagen, categoria, origen, notas, precio: valor, peso, stock, destacado } = producto

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-espresso-900/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-espresso-300 hover:shadow-xl">
      <Link
        to={`/producto/${id}`}
        className="relative block aspect-square overflow-hidden bg-oat-100"
        aria-label={`Ver detalle de ${nombre}`}
      >
        <img
          src={imagen}
          alt={`Bolsa de café ${nombre}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-espresso-900/85 px-3 py-1 text-xs font-medium text-oat-50 backdrop-blur">
          {categoria}
        </span>
        {destacado && (
          <span className="absolute right-3 top-3 rounded-full bg-terracotta-500 px-3 py-1 text-xs font-semibold text-white">
            Destacado
          </span>
        )}
        {stock === 0 && (
          <span className="absolute inset-x-0 bottom-0 bg-espresso-900/90 py-2 text-center text-xs font-semibold uppercase tracking-wide text-oat-50">
            Sin stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-espresso-400">{origen}</p>
          <h3 className="mt-1 font-display text-xl leading-snug font-semibold text-espresso-900">
            <Link to={`/producto/${id}`} className="transition hover:text-terracotta-600">
              {nombre}
            </Link>
          </h3>
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {notas.map((nota) => (
            <li
              key={nota}
              className="rounded-full bg-oat-100 px-2.5 py-1 text-xs text-espresso-600"
            >
              {nota}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between border-t border-espresso-900/10 pt-4">
          <div>
            <p className="font-display text-2xl font-semibold text-espresso-900">{precio(valor)}</p>
            <p className="text-xs text-espresso-400">{peso}</p>
          </div>
          <Link
            to={`/producto/${id}`}
            className="rounded-full bg-espresso-900 px-4 py-2 text-sm font-semibold text-oat-50 transition hover:bg-terracotta-600"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Item
