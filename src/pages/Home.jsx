import { Link } from 'react-router-dom'
import ItemListContainer from '../components/ItemListContainer'
import { sedes } from '../data/empresa'

const pasos = [
  {
    titulo: 'Compramos directo',
    texto: 'Pagamos arriba del mercado a productores de Huila, Yirgacheffe y Nyeri.',
  },
  {
    titulo: 'Tostamos en micros lotes',
    texto: 'Cuarenta kilos por tanda, tostados cada lunes para que lleguen frescos.',
  },
  {
    titulo: 'Te lo mandamos a casa',
    texto: 'Despachamos en 24 h dentro de CABA y en 72 h al resto del país.',
  },
]

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-espresso-900 text-oat-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full bg-terracotta-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-terracotta-300 ring-1 ring-terracotta-500/40">
              Tueste del lunes
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-6xl">
              Café de especialidad,
              <span className="text-terracotta-300"> tostado esta semana</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-oat-200/70">
              Origen único, trazabilidad real y una curva de tueste que no le roba nada al
              grano. Elegí tu bolsa y preparalo como quieras.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/productos"
                className="rounded-full bg-terracotta-500 px-7 py-3 font-semibold text-white transition hover:bg-terracotta-600"
              >
                Ver el catálogo
              </Link>
              <Link
                to="/producto/1"
                className="rounded-full border border-oat-200/30 px-7 py-3 font-semibold text-oat-100 transition hover:bg-oat-200/10"
              >
                Origen del mes
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
            {[
              { k: '8', v: 'orígenes en catálogo' },
              { k: '24 h', v: 'desde que tostamos hasta que despachamos' },
              { k: '3', v: 'sedes para retirar' },
              { k: '+85%', v: 'del precio queda en la finca' },
            ].map((stat) => (
              <div
                key={stat.v}
                className="rounded-2xl border border-oat-200/10 bg-oat-50/5 p-5"
              >
                <dt className="font-display text-3xl font-semibold text-terracotta-300">
                  {stat.k}
                </dt>
                <dd className="mt-1 text-sm text-oat-200/60">{stat.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Productos destacados — ItemListContainer + Item */}
      <ItemListContainer
        titulo="Los que más se nos van"
        subtitulo="Una selección de los lotes que más se nos van esta semana."
        soloDestacados
        mostrarEnlace
      />

      {/* Cómo trabajamos */}
      <section className="bg-oat-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold text-espresso-900 sm:text-4xl">
            De la finca a tu taza
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pasos.map((paso, i) => (
              <div
                key={paso.titulo}
                className="rounded-2xl border border-espresso-900/10 bg-white p-6"
              >
                <span className="font-display text-4xl font-semibold text-terracotta-400">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-espresso-900">
                  {paso.titulo}
                </h3>
                <p className="mt-2 text-espresso-600">{paso.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sedes */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold text-espresso-900 sm:text-4xl">
          Vení a probar
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {sedes.map((sede) => (
            <div
              key={sede.id}
              className="rounded-2xl border border-espresso-900/10 bg-white p-6 transition hover:border-espresso-300"
            >
              <h3 className="font-display text-xl font-semibold text-espresso-900">
                {sede.nombre}
              </h3>
              <p className="mt-2 text-espresso-600">{sede.direccion}</p>
              <p className="text-sm text-espresso-500">{sede.horarios}</p>
              <p className="mt-3 text-sm font-semibold text-terracotta-600">{sede.telefono}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
