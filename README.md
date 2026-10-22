# Nexobyte

Estudio web para negocios de El Salvador. El proyecto incluye una página principal y tres demostraciones completas, cada una con identidad visual y plantilla propias:

- Pupusería: `/demo/el-comal-de-casa` — cálida, artesanal y familiar.
- Café: `/demo/cafe-nube` — editorial, cinematográfica y de especialidad.
- Barbería: `/demo/barberia-don-rafael` — oscura, clásica y directa.

Las demostraciones usan nombres, precios, direcciones y teléfonos ficticios. Están marcadas con `noindex` y no representan sitios publicados de clientes.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0` (probado con Node 24.15.0)
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

La URL local que muestra Vite suele ser `http://localhost:5173`.

## Verificación

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` genera la versión de producción en `dist/`. `npm run preview` sirve esa versión localmente.

## Estructura

```text
src/
  components/
    business/       Componentes compartidos y legado de la plantilla genérica
    home/           Secciones de la página del estudio
  data/
    agency.js       Nombre, ubicación y contacto del estudio
    businessModel.js
    demoBusinesses.js
    demoCatalog.js  Categorías y disponibilidad del catálogo del inicio
    demos/          Contenido y tema de cada demostración
  pages/            Inicio, demo y página no encontrada
  styles/           global.css, home.css, business.css y el CSS de cada demo
  templates/        Selector y plantillas de pupusería, café y barbería
  utils/            Navegación, tema y validación
public/
  images/           Imágenes WebP de las demostraciones
```

## Plantillas de demostración

`src/templates/BusinessTemplate.jsx` lee `business.template` y elige la plantilla correspondiente:

- `pupuseria` → `PupuseriaTemplate.jsx` + `styles/pupuseria.css`
- `cafe` → `CafeTemplate.jsx` + `styles/cafe.css`
- `barberia` → `BarberiaTemplate.jsx` + `styles/barberia.css`

Cada plantilla recibe el mismo objeto de negocio validado, pero organiza el contenido, la navegación y los componentes con su propio criterio. La plantilla genérica anterior se conserva como respaldo para datos sin una plantilla registrada.

## Catálogo de la página principal

La sección de demostraciones del inicio se alimenta de `src/data/demoCatalog.js`. Cada categoría declara su nombre, descripción, ejemplos de negocios, imagen y un `demoId` opcional.

- Si `demoId` coincide con una demostración registrada, la tarjeta muestra el estado **Demo disponible** y enlaza a su ruta real.
- Si no existe `demoId`, la tarjeta muestra **Próximamente** y no genera ningún enlace. Esto evita dirigir visitantes a páginas inexistentes.
- Para publicar una nueva demo, primero se crea su negocio, se registra en `demoBusinesses.js` y luego se asigna su `demoId` en el catálogo.

El catálogo actual incluye nueve categorías: tres con demostración funcional y seis en preparación. No se añadieron filtros porque las nueve tarjetas se presentan en una cuadrícula clara de tres columnas en escritorio y una columna en móvil.

## Agregar o editar una demostración

1. Crear un archivo en `src/data/demos/` usando `createBusiness`.
2. Mantener el contenido, las imágenes y el tema dentro de ese objeto.
3. Registrar la demostración en `src/data/demoBusinesses.js`.
4. Elegir una de las plantillas disponibles en `template`.
5. Verificar que `validateBusinessData` no reporte errores al abrir `/demo/:slug`.

Los colores, las tipografías y los radios se declaran en `theme`; cada plantilla los consume mediante variables CSS (`--brand`, `--accent`, `--bg`, `--heading-font`, etc.).

## Alcance actual

Esta base todavía no incluye personalizador visual, autenticación, base de datos, publicación de sitios ni enlaces de compartición persistidos. Los enlaces actuales son URLs de demostración: para conservar cambios entre dispositivos hará falta un backend.

Las imágenes de las demos provienen de bancos de imágenes (Pexels/Unsplash) y fueron convertidas a WebP. Las fotografías de las nuevas categorías del catálogo están en `public/images/catalog/`. Antes de usarlas en un sitio comercial, confirma sus licencias y reemplázalas por material autorizado del cliente.

## Despliegue

El proyecto está preparado para desplegarse en Vercel. `vercel.json` incluye una reescritura para que las rutas `/demo/:slug` funcionen al abrirlas directamente. El directorio de salida es `dist/`.

No se ha realizado ningún despliegue de producción desde este repositorio.
