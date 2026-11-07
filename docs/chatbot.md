# Asistente Nexobyte

Chatbot comercial del sitio de Nexobyte. Responde preguntas sobre el estudio, recomienda demos existentes, orienta al visitante hacia el servicio adecuado y prepara solicitudes de cotización para enviarlas por WhatsApp.

## Arquitectura

- `src/components/chat/ChatWidget.jsx`: botón flotante, ventana de conversación, estados y envío de mensajes.
- `src/components/chat/ChatMessageText.jsx`: render seguro de texto y enlaces generados por el modelo. No usa `dangerouslySetInnerHTML`.
- `src/components/chat/QuoteForm.jsx`: formulario de cotización, revisión del resumen y enlace a WhatsApp. No guarda datos ni envía formularios.
- `api/chat.js`: función serverless de Vercel para `POST /api/chat`.
- `api/_lib/nexobyteKnowledge.js`: información verificada del estudio y reglas del asistente.
- `api/_lib/rateLimit.js`: límite básico de solicitudes en memoria.
- `vite.config.js`: sirve el mismo endpoint durante `npm run dev` y `npm run preview`.

El chatbot se muestra en el inicio y en la página 404. No se monta en `/demo/:slug` ni en `/demos/gimnasio`.

## Modelo

- SDK oficial: `@google/genai` 3.x.
- Modelo predeterminado: `gemini-3.5-flash`.
- Se puede cambiar con la variable opcional `GEMINI_MODEL`.
- Antes de cambiar a otro modelo, verifica que siga disponible para la clave y que acepte `generateContent`.
- No se usa Gemini 1.5 Flash.

## Requisitos

- Node.js `>=22.12.0`.
- Una clave de Google AI Studio con acceso a Gemini API.

## Obtener la clave

1. Entra a <https://aistudio.google.com/apikey>.
2. Crea o selecciona una clave de API.
3. No la escribas en archivos del frontend, en variables `VITE_*`, en GitHub ni en respuestas del servidor.

## Configuración local

1. Crea `.env.local` en la raíz del proyecto. Ese archivo está ignorado por Git.
2. Agrega:

```env
GEMINI_API_KEY=tu_clave_real
```

3. Opcionalmente, define el modelo:

```env
GEMINI_MODEL=gemini-3.5-flash
```

4. Instala dependencias y arranca:

```bash
npm install
npm run dev
```

Vite carga `GEMINI_API_KEY` solo en el proceso del servidor de desarrollo y monta `POST /api/chat` en la misma URL del frontend. La clave no se incluye en el bundle del navegador.

Para probar la compilación de producción en local:

```bash
npm run build
npm run preview
```

El plugin de Vite también monta `/api/chat` en `vite preview`.

## Variables en Vercel

1. Abre el proyecto en Vercel.
2. Ve a **Settings → Environment Variables**.
3. Crea `GEMINI_API_KEY` para **Production**, **Preview** y **Development**.
4. Opcionalmente crea `GEMINI_MODEL` con `gemini-3.5-flash`.
5. Verifica que el proyecto use Node.js 22 o superior. `package.json` declara `engines.node`.
6. Vuelve a desplegar para que la función reciba las variables nuevas. No se realizó ningún despliegue automático desde este repositorio.

`vercel.json` declara `maxDuration: 30` para `api/chat.js`. El endpoint se sirve antes de la reescritura catch-all del SPA porque Vercel da prioridad al sistema de archivos y a las funciones.

## Seguridad y límites

- La clave se lee únicamente en el backend (`process.env.GEMINI_API_KEY`).
- El frontend solo llama a `/api/chat`; nunca importa el SDK de Gemini ni conoce la clave.
- Mensaje máximo: 1,000 caracteres.
- Historial enviado al backend: máximo 8 mensajes y 3,200 caracteres.
- Cuerpo máximo de la solicitud: 16 KB.
- Salida máxima: 700 tokens.
- Tiempo máximo de espera en el servidor: 22 segundos; en el navegador: 30 segundos.
- Rate limit básico: 15 solicitudes por minuto y 100 por día por IP.
- En Vercel, el rate limit en memoria es por instancia de función. No es un límite distribuido; para tráfico alto conviene complementarlo con Vercel WAF o un almacén externo.
- Los errores se registran sin incluir el mensaje del visitante, la clave ni la respuesta cruda del proveedor.
- Las respuestas del modelo se renderizan como texto seguro. Los enlaces solo se activan si apuntan a rutas conocidas del sitio o al WhatsApp público del estudio.
- No hay base de datos. La conversación vive únicamente en el estado de React y se pierde al cerrar la conversación o recargar la página.

## Cotizaciones

El botón **Preparar cotización** permite completar campos opcionales, revisar un resumen y abrir WhatsApp con el mensaje preparado. El sitio:

- No guarda los datos del formulario.
- No envía la solicitud automáticamente.
- No afirma que la solicitud fue recibida.
- Usa el WhatsApp público configurado en `src/data/agency.js`.

## Pruebas realizadas

- El botón flotante aparece en el inicio.
- El chat abre, minimiza, cierra y reinicia la conversación.
- Se envían mensajes y Gemini responde desde el backend.
- Se verificó que la clave no aparece en `dist/`.
- Se comprobó que el asistente conoce los servicios y demos reales.
- El asistente no inventa precios y remite a cotización.
- Se manejan mensajes vacíos, errores del proveedor y tiempos de espera.
- La ventana se revisó en escritorio y móvil, sin desbordamiento horizontal.
- El chat no aparece en las rutas de demostración.

## Comportamiento ante fallos

- Si falta `GEMINI_API_KEY`, el endpoint responde `503` con un mensaje controlado.
- Si Gemini devuelve un error o no hay respuesta válida, el frontend conserva la conversación y muestra una burbuja de error con acceso a WhatsApp.
- Si se alcanza el límite de solicitudes, el endpoint responde `429`.
- Si la solicitud excede el tamaño o el mensaje está vacío, el endpoint responde `400`.
