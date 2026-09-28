import { useState } from 'react'
import ItemListContainer from '../components/ItemListContainer'
import { categorias } from '../data/categorias'

function Productos() {
  const [categoria, setCategoria] = useState('todas')

  return (
    <>
      <section className="border-b border-espresso-900/10 bg-oat-100">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-espresso-400">
            Catálogo
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-espresso-900 sm:text-5xl">
            Todos nuestros cafés
          </h1>
          <p className="mt-3 max-w-2xl text-espresso-600">
            Ocho lotes, tostados por el equipo de la barra. Filtrá por categoría para
            encontrar el que vas a preparar hoy.
          </p>

          <div
            role="group"
            aria-label="Filtrar por categoría"
            className="mt-8 flex flex-wrap gap-2"
          >
            {categorias.map(({ id, label }) => {
              const activa = categoria === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategoria(id)}
                  aria-pressed={activa}
                  className={[
                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                    activa
                      ? 'bg-espresso-900 text-oat-50'
                      : 'border border-espresso-900/15 bg-white text-espresso-700 hover:border-espresso-400',
                  ].join(' ')}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <ItemListContainer
        titulo={categoria === 'todas' ? 'Catálogo completo' : categorias.find((c) => c.id === categoria)?.label}
        categoria={categoria === 'todas' ? undefined : categoria}
      />
    </>
  )
}

export default Productos
