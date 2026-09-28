import { useEffect, useState } from 'react'
import Item from './Item'
import { Link } from 'react-router-dom'

const URL_PRODUCTOS = '/productos.json'

function normalize(data) {
  return Array.isArray(data) ? data : (data?.productos ?? [])
}

export default function ItemListContainer({
  titulo = 'Nuestro catálogo',
  subtitulo,
  soloDestacados = false,
  categoria,
  mostrarEnlace = false,
}) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function cargarProductos() {
      try {
        setCargando(true)
        setError(null)
        const respuesta = await fetch(URL_PRODUCTOS, { signal: controller.signal })
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        const data = await respuesta.json()
        setProductos(normalize(data))
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError('No pudimos cargar el catálogo. Probá de nuevo en un rato.')
        }
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()

    return () => controller.abort()
  }, [])

  const productosFiltrados = productos.filter((p) => {
    if (soloDestacados && !p.destacado) return false
    if (categoria && p.categoria !== categoria) return false
    return true
  })

  if (cargando) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-espresso-400">{titulo}</p>
        <div
          role="status"
          aria-live="polite"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-2xl border border-espresso-900/5 bg-white"
            />
          ))}
          <span className="sr-only">Cargando productos…</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-terracotta-400/40 bg-terracotta-400/10 p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-espresso-900">
            Algo salió mal
          </h2>
          <p className="mt-2 text-espresso-600">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-espresso-400">
            Catálogo
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-espresso-900 sm:text-4xl">
            {titulo}
          </h2>
          {subtitulo && <p className="mt-2 max-w-xl text-espresso-600">{subtitulo}</p>}
        </div>
        {mostrarEnlace && (
          <Link
            to="/productos"
            className="font-semibold text-terracotta-600 underline-offset-4 hover:underline"
          >
            Ver todos los productos →
          </Link>
        )}
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-espresso-300 p-10 text-center text-espresso-500">
          No hay productos que coincidan con este filtro.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productosFiltrados.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </section>
  )
}
