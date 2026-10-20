# Nexobyte

Estudio web para negocios de El Salvador. El proyecto incluye una página principal y una plantilla reutilizable con tres demostraciones completas:

- Pupusería: `/demo/el-comal-de-casa`
- Café: `/demo/cafe-nube`
- Barbería: `/demo/barberia-don-rafael`

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
    business/       Componentes de la plantilla de negocio
    home/           Secciones de la página del estudio
  data/
    agency.js       Nombre, ubicación y contacto del estudio
    businessModel.js
    demoBusinesses.js
    demos/          Contenido y tema de cada demostración
  pages/            Inicio, demo y página no encontrada
  styles/           global.css, home.css y business.css
  templates/        BusinessTemplate.jsx
  utils/            Navegación, tema y validación
public/
  images/           Imágenes WebP de las demostraciones
```

## Agregar o editar una demostración

1. Crear un archivo en `src/data/demos/` usando `createBusiness`.
2. Mantener el contenido, las imágenes y el tema dentro de ese objeto.
3. Registrar la demostración en `src/data/demoBusinesses.js`.
4. Verificar que `validateBusinessData` no reporte errores al abrir `/demo/:slug`.

Los colores, la tipografía, el estilo del héroe y los radios se configuran en `theme`. La plantilla reutiliza ese tema mediante variables CSS.

## Alcance actual

Esta base todavía no incluye personalizador visual, autenticación, base de datos, publicación de sitios ni enlaces de compartición persistidos. Los enlaces actuales son URLs de demostración: para conservar cambios entre dispositivos hará falta un backend.

Las imágenes de las demos provienen de bancos de imágenes (Pexels/Unsplash) y fueron convertidas a WebP. Antes de usarlas en un sitio comercial, confirma sus licencias y reemplázalas por material autorizado del cliente.

## Despliegue

El proyecto está preparado para desplegarse en Vercel. `vercel.json` incluye una reescritura para que las rutas `/demo/:slug` funcionen al abrirlas directamente. El directorio de salida es `dist/`.

No se ha realizado ningún despliegue de producción desde este repositorio.
