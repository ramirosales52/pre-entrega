# Tostado Norte — Pre-entrega

E-commerce de café de especialidad. React + Vite + Tailwind CSS 4 + React Router.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción
npm run preview  # previsualiza el build
npm run lint     # ESLint
```

## Estructura de carpetas

```
pre-entrega/
├── public/
│   ├── productos.json          # datos del catálogo (consumido con fetch)
│   └── img/
│       ├── productos/          # 8 ilustraciones SVG de producto
│       └── equipo/             # 4 avatares SVG
└── src/
    ├── main.jsx                # punto de entrada
    ├── App.jsx                 # BrowserRouter + definición de rutas
    ├── index.css               # @import "tailwindcss" + @theme (tokens)
    ├── components/
    │   ├── Layout.jsx          # Header + <Outlet /> + Footer
    │   ├── Header.jsx          # logo + barra superior sticky
    │   ├── NavBar.jsx          # navegación con <Link> / <NavLink>
    │   ├── Footer.jsx          # info de empresa, newsletter, sedes, legales, equipo
    │   ├── EquipoCard.jsx      # tarjeta reutilizable de persona
    │   ├── ItemListContainer.jsx # useEffect + fetch + estados de carga/error
    │   └── Item.jsx            # tarjeta reutilizable de producto (datos por props)
    ├── pages/
    │   ├── Home.jsx            # ruta  /
    │   ├── Productos.jsx       # ruta  /productos
    │   ├── DetalleProducto.jsx # ruta  /producto/:id
    │   ├── Carrito.jsx         # ruta  /carrito  (placeholder)
    │   └── NotFound.jsx        # ruta  *
    └── data/
        ├── categorias.js       # filtros del catálogo
        ├── empresa.js          # sedes, contacto y legales
        └── equipo.js           # personas del equipo
```

## Rutas

| Ruta            | Vista            | Componente             |
| --------------- | ---------------- | ---------------------- |
| `/`             | Bienvenida       | `Home.jsx`             |
| `/productos`    | Catálogo         | `Productos.jsx`        |
| `/producto/:id` | Detalle          | `DetalleProducto.jsx`  |
| `/carrito`      | Carrito          | `Carrito.jsx`          |
| `*`             | 404              | `NotFound.jsx`         |

## Cómo se cargan los productos

`ItemListContainer.jsx` y `DetalleProducto.jsx` piden el catálogo con `fetch` dentro de un
`useEffect`, con `AbortController` para cancelar la petición si el componente se desmonta:

```jsx
useEffect(() => {
  const controller = new AbortController()

  async function cargarProductos() {
    const respuesta = await fetch('/productos.json', { signal: controller.signal })
    const data = await respuesta.json()
    setProductos(data.productos)
  }

  cargarProductos()
  return () => controller.abort()
}, [])
```

`Item.jsx` es un componente presentacional: recibe un único prop `producto` y no sabe nada
de fetch ni de ruteo, así que se puede reutilizar en el catálogo, en el home o en el
carrito sin cambios.

## Estado de la pre-entrega

- [x] **Req #1** — Estructura de carpetas, `Layout.jsx` con `Header.jsx`, `NavBar` y `Footer.jsx` (newsletter, contacto, sedes, legales, propiedad intelectual y 4 tarjetas de equipo).
- [x] **Req #2** — `ItemListContainer.jsx` con `useEffect` + `fetch` a `public/productos.json`, renderizado con `Item.jsx` por props.
- [x] **Req #3** — Ruteo con `react-router-dom` y navegación por `<Link>`/`<NavLink>` sin recargas.
- [ ] **Req #4** — Carrito con Context API. **No entra en la pre-entrega**: la ruta `/carrito` existe y muestra un placeholder. Se implementa para la entrega final.

## Decisiones técnicas

- **Tailwind CSS 4** vía el plugin `@tailwindcss/vite`. Los colores y tipografías son tokens
  de `@theme` en `index.css` (`espresso`, `oat`, `terracotta`, `leaf`, `font-display`).
- **Imágenes locales en SVG** para que el proyecto no dependa de la red al correrlo.
- **Formato de precio** con `Intl.NumberFormat('es-AR', { currency: 'ARS' })`.
- **Accesibilidad**: `aria-label` en los enlaces de productos, `aria-expanded`/`aria-controls`
  en el menú mobile, `aria-pressed` en los filtros, `role="status"` en los estados de carga.
