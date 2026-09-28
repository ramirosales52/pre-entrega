import { useState } from 'react'
import { Link } from 'react-router-dom'
import EquipoCard from './EquipoCard'
import { equipo } from '../data/equipo'
import { sedes, contacto, legales } from '../data/empresa'

const ANIO_ACTUAL = new Date().getFullYear()

const enlacesInternos = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/carrito', label: 'Carrito' },
]

function Newsletter() {
  const [email, setEmail] = useState('')
  const [suscripto, setSuscripto] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) return
    setSuscripto(true)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4" noValidate>
      <label
        htmlFor="newsletter-email"
        className="block text-xs font-semibold uppercase tracking-widest text-oat-200/60"
      >
        Newsletter
      </label>

      {suscripto ? (
        <p
          role="status"
          className="mt-3 rounded-xl bg-leaf-500/20 px-4 py-3 text-sm text-leaf-400 ring-1 ring-leaf-400/40"
        >
          ¡Listo! Te mandamos el nuevo lote cada lunes.
        </p>
      ) : (
        <>
          <div className="mt-3 flex gap-2">
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full rounded-full border border-oat-200/20 bg-espresso-900/60 px-4 py-2.5 text-sm text-oat-50 placeholder:text-oat-200/40 focus:border-terracotta-400 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-terracotta-600"
            >
              Sumarme
            </button>
          </div>
          <p className="mt-2 text-xs text-oat-200/50">
            Un envío por semana. Podés darte de baja cuando quieras.
          </p>
        </>
      )}
    </form>
  )
}

function Columna({ titulo, children }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-terracotta-300">
        {titulo}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-auto bg-espresso-900 text-oat-100">
      {/* Información de la empresa */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Columna titulo="Tostado Norte">
            <p className="text-sm leading-relaxed text-oat-200/70">
              Tostamos café de especialidad desde 2018. Compramos directo a productores,
              tostamos en micros lotes y despachamos los lunes.
            </p>
            <Newsletter />
          </Columna>

          <Columna titulo="Navegación">
            <ul className="space-y-2 text-sm">
              {enlacesInternos.map((e) => (
                <li key={e.to}>
                  <Link
                    to={e.to}
                    className="text-oat-200/70 underline-offset-4 transition hover:text-terracotta-300 hover:underline"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Columna>

          <Columna titulo="Contacto">
            <ul className="space-y-2 text-sm text-oat-200/70">
              <li>
                <a
                  href={`mailto:${contacto.email}`}
                  className="underline-offset-4 transition hover:text-terracotta-300 hover:underline"
                >
                  {contacto.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contacto.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-4 transition hover:text-terracotta-300 hover:underline"
                >
                  WhatsApp {contacto.whatsapp}
                </a>
              </li>
              <li>
                Instagram{' '}
                <span className="text-oat-100">{contacto.instagram}</span>
              </li>
            </ul>
          </Columna>

          <Columna titulo="Sucursales">
            <ul className="space-y-4 text-sm text-oat-200/70">
              {sedes.map((sede) => (
                <li key={sede.id}>
                  <p className="font-semibold text-oat-100">{sede.nombre}</p>
                  <p>{sede.direccion}</p>
                  <p>{sede.horarios}</p>
                  <p>{sede.telefono}</p>
                </li>
              ))}
            </ul>
          </Columna>
        </div>

        {/* Tarjetas del equipo */}
        <div className="mt-14 border-t border-oat-200/10 pt-10">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-oat-50 sm:text-3xl">
              Quiénes hacemos Tostado Norte
            </h2>
            <p className="mt-2 text-sm text-oat-200/60">
              Un equipo chico, curado, que trabaja de la finca a tu taza.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {equipo.map((persona) => (
              <EquipoCard key={persona.id} persona={persona} />
            ))}
          </div>
        </div>
      </div>

      {/* Propiedad intelectual y legales */}
      <div className="border-t border-oat-200/10 bg-espresso-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-oat-200/50 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            © {ANIO_ACTUAL} Tostado Norte S.A.S. —CUIT 30-71234567-9. Todos los derechos
            reservados.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legales.map((legal) => (
              <li key={legal.id}>
                <a
                  href={legal.href}
                  className="underline-offset-4 transition hover:text-terracotta-300 hover:underline"
                >
                  {legal.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
