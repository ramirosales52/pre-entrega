function EquipoCard({ persona }) {
  if (!persona) return null

  const { nombre, rol, bio, github, imagen } = persona

  return (
    <article className="group flex flex-col items-center gap-3 rounded-2xl border border-oat-200/10 bg-espresso-800/60 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-terracotta-500/50 hover:bg-espresso-800">
      <img
        src={imagen}
        alt={`Retrato de ${nombre}`}
        loading="lazy"
        className="h-20 w-20 rounded-full ring-2 ring-terracotta-500/40 ring-offset-2 ring-offset-espresso-800 transition group-hover:ring-terracotta-500"
      />
      <div>
        <h3 className="font-display text-lg font-semibold text-oat-50">{nombre}</h3>
        <p className="text-xs font-semibold uppercase tracking-widest text-terracotta-300">
          {rol}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-oat-200/70">{bio}</p>
      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="mt-auto text-sm font-semibold text-oat-200 underline-offset-4 transition hover:text-terracotta-300 hover:underline"
      >
        Ver perfil
      </a>
    </article>
  )
}

export default EquipoCard
