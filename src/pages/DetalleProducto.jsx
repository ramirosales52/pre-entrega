import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const URL_PRODUCTOS = '/productos.json'

const formatearPrecio = (valor) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor)

function DetalleProducto() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function cargarProducto() {
      try {
        setCargando(true)
        setError(null)
        const respuesta = await fetch(URL_PRODUCTOS, { signal: controller.signal })
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        const data = await respuesta.json()
        const lista = Array.isArray(data) ? data : (data?.productos ?? [])
        setProducto(lista.find((p) => String(p.id) === String(id)) ?? null)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError('No pudimos cargar este producto. Probá de nuevo en un rato.')
        }
      } finally {
        setCargando(false)
      }
    }

    cargarProducto()

    return () => controller.abort()
  }, [id])

  if (cargando) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div role="status" className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-oat-100" />
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-oat-100" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-oat-100" />
            <div className="h-24 w-full animate-pulse rounded bg-oat-100" />
          </div>
          <span className="sr-only">Cargando producto…</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold text-espresso-900">
          Algo salió mal
        </h1>
        <p className="mt-3 text-espresso-600">{error}</p>
        <Link
          to="/productos"
          className="mt-8 inline-block rounded-full bg-espresso-900 px-6 py-3 font-semibold text-oat-50 transition hover:bg-terracotta-600"
        >
          Volver al catálogo
        </Link>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-display text-6xl text-espresso-300">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-espresso-900">
          No encontramos ese café
        </h1>
        <p className="mt-3 text-espresso-600">
          El producto <span className="font-semibold">#{id}</span> no existe o dejó de estar
          disponible.
        </p>
        <Link
          to="/productos"
          className="mt-8 inline-block rounded-full bg-espresso-900 px-6 py-3 font-semibold text-oat-50 transition hover:bg-terracotta-600"
        >
          Ver todos los productos
        </Link>
      </div>
    )
  }

  const ficha = [
    { label: 'Origen', valor: producto.origen },
    { label: 'Variedad', valor: producto.variedad },
    { label: 'Altitud', valor: producto.altitud },
    { label: 'Proceso', valor: producto.proceso },
    { label: 'Tueste', valor: producto.tueste },
    { label: 'Peso', valor: producto.peso },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Migas de pan" className="text-sm text-espresso-500">
        <Link to="/" className="hover:text-terracotta-600">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link to="/productos" className="hover:text-terracotta-600">
          Productos
        </Link>
        <span className="mx-2">/</span>
        <span className="text-espresso-800">{producto.nombre}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl border border-espresso-900/10 bg-oat-100">
          <img
            src={producto.imagen}
            alt={`Bolsa de café ${producto.nombre}`}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-espresso-400">
            {producto.categoria}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-espresso-900 sm:text-5xl">
            {producto.nombre}
          </h1>
          <p className="mt-1 text-espresso-500">{producto.origen}</p>

          <p className="mt-6 leading-relaxed text-espresso-700">{producto.descripcion}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {producto.notas.map((nota) => (
              <li
                key={nota}
                className="rounded-full bg-oat-100 px-3 py-1.5 text-sm text-espresso-700"
              >
                {nota}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-espresso-900/10 py-6">
            <span className="font-display text-4xl font-semibold text-espresso-900">
              {formatearPrecio(producto.precio)}
            </span>
            <span
              className={[
                'rounded-full px-3 py-1 text-sm font-semibold',
                producto.stock > 0
                  ? 'bg-leaf-500/15 text-leaf-600'
                  : 'bg-terracotta-400/15 text-terracotta-600',
              ].join(' ')}
            >
              {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/carrito"
              className="rounded-full bg-espresso-900 px-7 py-3 font-semibold text-oat-50 transition hover:bg-terracotta-600"
            >
              Agregar al carrito
            </Link>
            <Link
              to="/productos"
              className="rounded-full border border-espresso-900/20 px-7 py-3 font-semibold text-espresso-800 transition hover:border-espresso-900/50"
            >
              Seguir comprando
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {ficha.map((fila) => (
              <div
                key={fila.label}
                className="flex items-baseline justify-between border-b border-espresso-900/10 pb-2 text-sm"
              >
                <dt className="text-espresso-500">{fila.label}</dt>
                <dd className="text-right font-semibold text-espresso-800">{fila.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto
