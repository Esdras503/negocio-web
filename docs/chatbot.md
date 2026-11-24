# Asistente Nexobyte

Chatbot comercial del sitio de Nexobyte. Responde preguntas sobre el estudio, recomienda demos existentes, orienta al visitante hacia el plan adecuado, explica los precios de compra única y de las membresías mensuales o anuales, y prepara solicitudes de cotización para enviarlas por WhatsApp.

## Arquitectura

- `src/components/chat/ChatWidget.jsx`: botón flotante, ventana de conversación, estados y envío de mensajes.
- `src/components/chat/ChatMessageText.jsx`: render seguro de texto y enlaces generados por el modelo. No usa `dangerouslySetInnerHTML`.
- `src/components/chat/QuoteForm.jsx`: formulario de cotización del chat, revisión del resumen y enlace a WhatsApp. No guarda datos ni envía formularios.
- `src/components/home/PricingSection.jsx`: sección **Planes y precios**, compra única, membresías, comparación, mantenimiento, servicios adicionales y preguntas frecuentes.
- `src/components/home/PricingQuoteDialog.jsx`: formulario de cotización de la sección de precios. Identifica la modalidad, el plan y el período, muestra un resumen y abre WhatsApp.
- `src/data/pricing.js`: fuente única de planes de compra única, membresías, cálculos de activación y ahorro anual, mantenimiento, servicios adicionales, comparación y preguntas comerciales. La usan la interfaz, los formularios y el prompt del asistente.
- `src/data/quoteOptions.js`: opciones de tipo de negocio y medio de contacto para los formularios.
- `src/pages/Terms.jsx` y `src/styles/legal.css`: términos y condiciones comerciales, con tablas generadas desde `src/data/pricing.js`. Es un documento preparado para revisión legal en El Salvador.
- `src/styles/pricing.css`: estilos de la sección y del diálogo de cotización.
- `api/chat.js`: función serverless de Vercel para `POST /api/chat`.
- `api/_lib/nexobyteKnowledge.js`: información verificada del estudio, planes, precios y reglas del asistente. Genera la parte comercial desde `src/data/pricing.js`.
- `api/_lib/topicGuard.js`: guarda de tema para inyecciones de instrucciones y preguntas generales claramente ajenas a Nexobyte.
- `api/_lib/responseLimit.js`: límite de longitud de las respuestas (100 palabras normal, 160 si se piden detalles).
- `api/_lib/rateLimit.js`: rate limit por IP con contadores atómicos en Upstash Redis REST cuando está configurado; en desarrollo sin credenciales usa memoria.
- `vite.config.js`: sirve el mismo endpoint durante `npm run dev` y `npm run preview`.

El chatbot se muestra en el inicio, en `/terminos` y en la página 404. No se monta en `/demo/:slug` ni en `/demos/gimnasio`.

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

El asistente solo atiende consultas comerciales sobre Nexobyte: servicios de diseño y desarrollo web, beneficios, catálogos digitales, demos, características documentadas, planes de compra única, membresías mensuales y anuales, mantenimiento, servicios adicionales, proceso, cotizaciones, términos y el WhatsApp público.

- No responde sobre política, religión, deportes, noticias, entretenimiento, historia, filosofía, relaciones personales, tareas escolares, programación general, inteligencia artificial general, medicina, temas legales ni finanzas personales.
- Si la consulta está fuera de alcance, redirige en una o dos frases y no desarrolla el tema.
- Si detecta una inyección de instrucciones, una petición del prompt, claves, configuración o información interna, responde con una negativa breve y vuelve al ámbito comercial.
- `api/_lib/topicGuard.js` intercepta los casos de alta confianza antes de llamar a Gemini. Las consultas que mencionan una página, un sitio, una demo o un chatbot se dejan al modelo para no bloquear encargos legítimos.
- `api/_lib/responseLimit.js` impone el límite de palabras aunque el modelo no obedezca el prompt. Los recortes se hacen en líneas o frases completas.

## Planes, membresías y precios

La única fuente comercial es `src/data/pricing.js`. La sección de inicio, el diálogo de cotización, la página de términos y el prompt del asistente se generan desde ahí.

### Compra única

- Plan Esencial: $149, pago único.
- Plan Profesional: $299, pago único.
- Plan Catálogo Digital: $399, pago único y marcado como **Más recomendado**.
- Plan Tienda Online: desde $699, pago único.
- Desarrollo personalizado: desde $900, según evaluación técnica.

### Membresías Nexobyte Web

| Plan | Primer mes | Desde el segundo mes | Anual | Ahorro anual |
| --- | --- | --- | --- | --- |
| Landing | $35 | $25/mes | $275 | $25 |
| Business | $49 | $39/mes | $432 | $36 |
| Catálogo | $59 | $49/mes | $540 | $48 |
| Catálogo Dinámico | $79 | $69/mes | $756 | $72 |
| E-Commerce | $109 | $99/mes | $1,080 | $108 |

- El primer mes incluye una activación única de $10 por cliente. No se repite en las mensualidades posteriores.
- La mensualidad normal comienza desde el segundo mes.
- La anualidad se paga por adelantado, cubre 12 meses y no tiene costo de activación.
- El ahorro compara el precio anual con 12 mensualidades normales, sin incluir la activación del primer mes.
- No hay renovación automática sin autorización expresa.
- La membresía incluye la infraestructura web administrada por Nexobyte según el plan. El dominio se cobra por separado.
- Catálogo Dinámico y E-Commerce requieren base de datos; Landing, Business y Catálogo no.
- El mantenimiento es un servicio opcional; cualquier inclusión se confirma en la cotización.

### Servicios adicionales y mantenimiento

- Mantenimiento Básico: $15/mes; Profesional: $25/mes; Premium: $40/mes. Es opcional.
- Servicios adicionales: página adicional $35, 10 productos adicionales $20, menú QR $35, WhatsApp adicional $15, galería $30, formulario avanzado $35, chatbot con IA desde $180, reservas desde $100, segundo idioma desde $80 y rediseño desde $100.

Reglas comerciales:

- No se inventan descuentos, promociones, precios ni inclusiones.
- El catálogo digital no incluye carrito, inventario automatizado ni pagos en línea.
- El mantenimiento no es obligatorio y no incluye cambios ilimitados.
- En compra única, dominio, alojamiento, correo, pasarelas de pago, comisiones y servicios externos se cotizan aparte.
- En membresías, el dominio se cobra por separado; los servicios externos y consumos extraordinarios se cobran aparte.
- Los precios son de referencia en USD; la cotización final depende del alcance.
- No se implementan cobros automáticos ni una pasarela de suscripción. El pago se coordina por el canal acordado.
- Las condiciones de cancelación, suspensión, reembolso y recuperación de datos están en `/terminos` y deben revisarse legalmente en El Salvador.

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
6. Crea una base Redis REST en Upstash y configura `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` para Production, Preview y Development. El endpoint usa estas credenciales para mantener contadores atómicos compartidos entre instancias.
7. Vuelve a desplegar para que la función reciba las variables nuevas. No se realizó ningún despliegue automático desde este repositorio.

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
- Rate limit: 15 solicitudes por minuto y 100 por día por IP. Con `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`, los contadores se comparten entre instancias mediante operaciones atómicas de Redis.
- En local, sin credenciales de Upstash, se usa el límite en memoria. En producción, configura Upstash para que el límite sea compartido. Si las credenciales están configuradas pero Redis no responde, el endpoint falla en cerrado con `503` en lugar de desactivar el límite.
- Los errores se registran sin incluir el mensaje del visitante, la clave ni la respuesta cruda del proveedor.
- Las respuestas del modelo se renderizan como texto seguro. Los enlaces solo se activan si apuntan a rutas conocidas del sitio o al WhatsApp público del estudio.
- No hay base de datos. La conversación vive únicamente en el estado de React y se pierde al cerrar la conversación o recargar la página.

## Cotizaciones

El chatbot conserva el botón **Preparar cotización** y la sección **Planes y precios** agrega **Contratar este plan** y **Solicitar cotización**. El diálogo de precios permite elegir **Compra única**, **Membresía mensual** o **Membresía anual**, y preselecciona la modalidad y el plan desde la tarjeta. Ambos flujos permiten completar campos opcionales, revisar un resumen y abrir WhatsApp con el mensaje preparado. El sitio:

- No guarda los datos del formulario.
- No envía la solicitud automáticamente.
- No afirma que la solicitud fue recibida.
- Usa el WhatsApp público configurado en `src/data/agency.js`.
- Identifica automáticamente la modalidad y el plan cuando se pulsa **Contratar este plan**.
- Incluye en el resumen el primer mes, la mensualidad recurrente o el precio anual y el ahorro, según la modalidad elegida.
- Permite consultar por WhatsApp cada plan de compra única, cada membresía, el mantenimiento y cada servicio adicional.
- Enlaza a `/terminos` para las condiciones comerciales completas.

## Pruebas realizadas

- `npm run lint` y `npm run build` finalizan correctamente. Solo se mantiene la advertencia existente por el tamaño del paquete principal.
- La sección **Planes y precios** conserva los cuatro planes estándar de compra única, el desarrollo personalizado, la comparación, el mantenimiento y los diez servicios adicionales.
- Los precios de compra única no cambiaron: Esencial $149, Profesional $299, Catálogo Digital $399, Tienda Online desde $699 y Desarrollo personalizado desde $900.
- La sección de membresías renderiza los cinco planes con primer mes, mensualidad recurrente, precio anual, ahorro, infraestructura, base de datos, características y exclusiones.
- El selector **Mensual / Anual** actualiza las tarjetas y conserva la otra modalidad como referencia. La vista anual muestra el ahorro contra doce mensualidades normales.
- Los cálculos verificados desde `src/data/pricing.js` son: Landing $35 / $25 / $275 / ahorro $25; Business $49 / $39 / $432 / ahorro $36; Catálogo $59 / $49 / $540 / ahorro $48; Catálogo Dinámico $79 / $69 / $756 / ahorro $72; E-Commerce $109 / $99 / $1,080 / ahorro $108.
- La activación de $10 aparece solo en el primer mes de la modalidad mensual y no se suma a la anualidad.
- **Contratar este plan** abre el formulario con la modalidad y el plan preseleccionados, tanto en compra única como en membresía mensual o anual.
- Al cambiar la modalidad en el formulario, se filtran los planes y se limpia la selección anterior. La validación exige un plan y algo de contexto del negocio.
- El resumen y el enlace de WhatsApp incluyen modalidad, plan, precio del primer mes y mensualidad recurrente o precio anual y ahorro, según corresponda. No se afirma que la solicitud fue enviada o guardada.
- **Solicitar cotización** abre el formulario sin plan preseleccionado y exige elegir uno.
- Los botones **Consultar por WhatsApp** de planes de compra única, membresías, mantenimiento, servicios adicionales y cierre abren `https://wa.me/50372877953`.
- La página `/terminos` renderiza las condiciones de compra única, membresía mensual, anualidad, activación, cancelación, suspensión, renovación, dominio, infraestructura, recuperación de datos y revisión legal. Las tablas de precios se generan desde `src/data/pricing.js`. La anualidad se describe como equivalente aproximado a once mensualidades normales.
- `ChatMessageText` permite enlaces internos a `/terminos` y a las secciones documentadas del inicio; cualquier otro enlace generado por el modelo se muestra como texto.
- La tabla legal y la tabla de comparación se pueden desplazar horizontalmente en móvil sin generar desbordamiento de la página.
- Se revisó el inicio y el diálogo de cotización a 1280 px y 390 px de ancho. A 390 px el ancho del documento permanece en 390 px y la cuadrícula de membresías pasa a una columna.
- El prompt del asistente contiene los precios mensuales, anuales, ahorros y condiciones generados desde `src/data/pricing.js`. Las preguntas "¿Cuánto cuesta una página web?", "¿Cuánto cuesta una página web mensual?", "¿Qué pasa si pago el año completo?" y "Quiero una página para mi tienda de ropa" pasan la guarda de tema y cuentan con respuestas de referencia aprobadas.
- El prompt generado coincide con las tarjetas y la página legal: cinco membresías, activación única en el primer mes, anualidad sin activación, ahorros anuales y remisión a `/terminos`. También indica que la activación no se suma al ahorro anual ni se presenta como un descuento adicional.
- La guarda de tema sigue bloqueando inyecciones y consultas claramente ajenas sin llamar al proveedor.
- La verificación semántica en vivo de Gemini se realizó con el endpoint local. Las preguntas sobre precio general, precio mensual, pago anual, renovación, dominio y recomendación para una tienda de ropa respondieron con las cifras y reglas publicadas. Dos intentos devolvieron `503 PROVIDER_UNAVAILABLE` de forma transitoria y los reintentos respondieron 200. No se modificó ni se expuso la clave.
- El chatbot no aparece en las rutas de demostración.

## Comportamiento ante fallos

- Si falta `GEMINI_API_KEY`, el endpoint responde `503` con un mensaje controlado.
- Si Gemini devuelve un error o no hay respuesta válida, el frontend conserva la conversación y muestra una burbuja de error con acceso a WhatsApp.
- Si se alcanza el límite de solicitudes, el endpoint responde `429`.
- Si la solicitud excede el tamaño o el mensaje está vacío, el endpoint responde `400`.
