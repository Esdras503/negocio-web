# Asistente Nexobyte

Chatbot comercial del sitio de Nexobyte. Responde preguntas sobre el estudio, recomienda demos existentes, orienta al visitante hacia el plan adecuado, explica los precios oficiales y prepara solicitudes de cotización para enviarlas por WhatsApp.

## Arquitectura

- `src/components/chat/ChatWidget.jsx`: botón flotante, ventana de conversación, estados y envío de mensajes.
- `src/components/chat/ChatMessageText.jsx`: render seguro de texto y enlaces generados por el modelo. No usa `dangerouslySetInnerHTML`.
- `src/components/chat/QuoteForm.jsx`: formulario de cotización del chat, revisión del resumen y enlace a WhatsApp. No guarda datos ni envía formularios.
- `src/components/home/PricingSection.jsx`: sección **Planes y precios**, comparación, mantenimiento, servicios adicionales y preguntas frecuentes.
- `src/components/home/PricingQuoteDialog.jsx`: formulario de cotización de la sección de precios. Identifica el plan seleccionado, muestra un resumen y abre WhatsApp.
- `src/data/pricing.js`: fuente única de planes, precios, mantenimiento, servicios adicionales, comparación y preguntas comerciales. La usan la interfaz y el prompt del asistente.
- `src/data/quoteOptions.js`: opciones de tipo de negocio y medio de contacto para los formularios.
- `src/styles/pricing.css`: estilos de la sección y del diálogo de cotización.
- `api/chat.js`: función serverless de Vercel para `POST /api/chat`.
- `api/_lib/nexobyteKnowledge.js`: información verificada del estudio, planes, precios y reglas del asistente. Genera la parte comercial desde `src/data/pricing.js`.
- `api/_lib/topicGuard.js`: guarda de tema para inyecciones de instrucciones y preguntas generales claramente ajenas a Nexobyte.
- `api/_lib/responseLimit.js`: límite de longitud de las respuestas (100 palabras normal, 160 si se piden detalles).
- `api/_lib/rateLimit.js`: límite básico de solicitudes en memoria.
- `vite.config.js`: sirve el mismo endpoint durante `npm run dev` y `npm run preview`.

El chatbot se muestra en el inicio y en la página 404. No se monta en `/demo/:slug` ni en `/demos/gimnasio`.

## Modelo

- SDK oficial: `@google/genai` 3.x.
- Modelo predeterminado: `gemini-3.5-flash`.
- Se puede cambiar con la variable opcional `GEMINI_MODEL`.
- Antes de cambiar a otro modelo, verifica que siga disponible para la clave y que acepte `generateContent`.
- No se usa Gemini 1.5 Flash.
- Parámetros de generación: `temperature: 0.3`, `topP: 0.8`, `maxOutputTokens: 180` y `thinkingLevel: "minimal"`.
- El asistente está limitado a temas comerciales de Nexobyte. No es un asistente general.
- Las respuestas deben apuntar a 20-70 palabras, con un máximo de 100; si el visitante pide detalles de un servicio o un plan, el máximo es 160.
- Además del prompt, el backend recorta respuestas que superen ese límite y nunca acepta respuestas vacías.

## Alcance y guardas

El asistente solo atiende consultas comerciales sobre Nexobyte: servicios de diseño y desarrollo web, beneficios, catálogos digitales, demos, características documentadas, planes y precios oficiales, mantenimiento, servicios adicionales, proceso, cotizaciones y el WhatsApp público.

- No responde sobre política, religión, deportes, noticias, entretenimiento, historia, filosofía, relaciones personales, tareas escolares, programación general, inteligencia artificial general, medicina, temas legales ni finanzas personales.
- Si la consulta está fuera de alcance, redirige en una o dos frases y no desarrolla el tema.
- Si detecta una inyección de instrucciones, una petición del prompt, claves, configuración o información interna, responde con una negativa breve y vuelve al ámbito comercial.
- `api/_lib/topicGuard.js` intercepta los casos de alta confianza antes de llamar a Gemini. Las consultas que mencionan una página, un sitio, una demo o un chatbot se dejan al modelo para no bloquear encargos legítimos.
- `api/_lib/responseLimit.js` impone el límite de palabras aunque el modelo no obedezca el prompt. Los recortes se hacen en líneas o frases completas.

## Planes y precios

La única fuente comercial es `src/data/pricing.js`. La sección de inicio y el prompt del asistente se generan desde ahí:

- Plan Esencial: $149, pago único.
- Plan Profesional: $299, pago único.
- Plan Catálogo Digital: $399, pago único y marcado como **Más recomendado**.
- Plan Tienda Online: desde $699, pago único.
- Desarrollo personalizado: desde $900, según evaluación técnica.
- Mantenimiento Básico: $15/mes; Profesional: $25/mes; Premium: $40/mes. Es opcional.
- Servicios adicionales: página adicional $35, 10 productos adicionales $20, menú QR $35, WhatsApp adicional $15, galería $30, formulario avanzado $35, chatbot con IA desde $180, reservas desde $100, segundo idioma desde $80 y rediseño desde $100.

Reglas comerciales:

- No se inventan descuentos, promociones, precios ni inclusiones.
- El catálogo digital no incluye carrito, inventario automatizado ni pagos en línea.
- El mantenimiento no es obligatorio y no incluye cambios ilimitados.
- Dominio, alojamiento, correo, pasarelas de pago, comisiones y servicios externos se cotizan aparte.
- Los precios son de referencia en USD; la cotización final depende del alcance.

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
- Salida máxima: 180 tokens.
- Límite de respuesta: 100 palabras en consultas normales y 160 cuando se solicita detalle. Si el modelo se excede, el backend recorta en un límite de línea o frase.
- Guarda de tema: las inyecciones de instrucciones y las preguntas generales de alta confianza se responden con una redirección sin llamar al proveedor.
- Tiempo máximo de espera en el servidor: 22 segundos; en el navegador: 30 segundos.
- Rate limit básico: 15 solicitudes por minuto y 100 por día por IP.
- En Vercel, el rate limit en memoria es por instancia de función. No es un límite distribuido; para tráfico alto conviene complementarlo con Vercel WAF o un almacén externo.
- Los errores se registran sin incluir el mensaje del visitante, la clave ni la respuesta cruda del proveedor.
- Las respuestas del modelo se renderizan como texto seguro. Los enlaces solo se activan si apuntan a rutas conocidas del sitio o al WhatsApp público del estudio.
- No hay base de datos. La conversación vive únicamente en el estado de React y se pierde al cerrar la conversación o recargar la página.

## Cotizaciones

El chatbot conserva el botón **Preparar cotización** y la sección **Planes y precios** agrega **Contratar este plan** y **Solicitar cotización**. Ambos flujos permiten completar campos opcionales, revisar un resumen y abrir WhatsApp con el mensaje preparado. El sitio:

- No guarda los datos del formulario.
- No envía la solicitud automáticamente.
- No afirma que la solicitud fue recibida.
- Usa el WhatsApp público configurado en `src/data/agency.js`.
- Identifica automáticamente el plan cuando se pulsa **Contratar este plan**.
- Permite consultar por WhatsApp cada plan, el mantenimiento y cada servicio adicional.

## Pruebas realizadas

- `npm run lint` y `npm run build` finalizan correctamente.
- La sección **Planes y precios** renderiza los cuatro planes estándar con sus precios, el desarrollo personalizado, la comparación, el mantenimiento, los diez servicios adicionales y las siete preguntas frecuentes.
- Los precios y el enlace de WhatsApp coinciden entre la interfaz y el prompt generado desde `src/data/pricing.js`.
- **Contratar este plan** abre el formulario con el plan preseleccionado y el resumen incluye el plan, el negocio y el mensaje de WhatsApp.
- **Solicitar cotización** abre el formulario sin plan preseleccionado y exige elegir uno.
- Los botones **Consultar por WhatsApp** de planes, mantenimiento, servicios adicionales y cierre abren `https://wa.me/50372877953`.
- La tabla de comparación se puede desplazar horizontalmente en móvil y la página no genera desbordamiento horizontal.
- El diálogo de cotización se revisó a 390 px y 1280 px de ancho.
- El chat conserva su apertura, mensajes rápidos, formulario de cotización y límites de longitud.
- La guarda de tema devuelve 200 para las consultas fuera de alcance y de inyección sin llamar al proveedor.
- La verificación semántica en vivo de Gemini quedó pendiente porque la clave configurada en `.env.local` devuelve HTTP 401 (`API key not valid`). El endpoint responde `503 PROVIDER_UNAVAILABLE`; no se modificó ni se expuso la clave.
- El chatbot no aparece en las rutas de demostración.

## Comportamiento ante fallos

- Si falta `GEMINI_API_KEY`, el endpoint responde `503` con un mensaje controlado.
- Si Gemini devuelve un error o no hay respuesta válida, el frontend conserva la conversación y muestra una burbuja de error con acceso a WhatsApp.
- Si se alcanza el límite de solicitudes, el endpoint responde `429`.
- Si la solicitud excede el tamaño o el mensaje está vacío, el endpoint responde `400`.
