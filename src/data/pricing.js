/**
 * Fuente única de planes, precios y servicios adicionales de Nexobyte.
 *
 * La usa tanto la interfaz como el prompt del Asistente Nexobyte. Cualquier
 * cambio comercial debe hacerse aquí para evitar cifras o inclusiones
 * distintas entre la página y el chatbot.
 */

export const PRICING_CURRENCY = 'USD';

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: PRICING_CURRENCY,
  maximumFractionDigits: 0,
});

export function formatUsd(amount) {
  return usdFormatter.format(amount);
}

export function formatPlanPrice(plan) {
  if (!plan || !Number.isFinite(plan.price)) return '';
  const prefix = plan.pricePrefix ? `${plan.pricePrefix} ` : '';
  return `${prefix}${formatUsd(plan.price)}`;
}

export function formatMaintenancePrice(plan) {
  if (!plan || !Number.isFinite(plan.price)) return '';
  return `${formatUsd(plan.price)}/mes`;
}

export function formatAddOnPrice(addOn) {
  if (!addOn || !Number.isFinite(addOn.price)) return '';
  const prefix = addOn.pricePrefix ? `${addOn.pricePrefix} ` : '';
  return `${prefix}${formatUsd(addOn.price)}`;
}

export function getPlanById(planId) {
  return pricingPlans.find((plan) => plan.id === planId) ?? null;
}

export const pricingPlans = [
  {
    id: 'esencial',
    name: 'Esencial',
    fullName: 'Plan Esencial',
    price: 149,
    pricePrefix: '',
    priceNote: 'Pago único',
    tagline: 'Para emprendedores y negocios pequeños.',
    description:
      'Una landing page clara para presentar tu negocio y recibir contactos.',
    icon: 'bolt',
    features: [
      'Landing page de una sola página, con hasta 5 bloques de contenido.',
      'Diseño responsive y presentación del negocio.',
      'Botón de WhatsApp, enlaces a redes sociales y formulario de contacto sencillo.',
      'SEO básico.',
      'Una ronda de ajustes.',
    ],
    notIncluded: [
      'Dominio, alojamiento y servicios externos se cotizan aparte.',
      'No incluye catálogo de productos ni carrito de compras.',
    ],
    comparison: {
      pages: '1 página',
      products: '—',
      commerce: 'No',
      orders: 'No',
      whatsapp: 'Sí',
      form: 'Sencillo',
      seo: 'Básico',
      maps: 'No',
      adjustments: '1 ronda',
      training: '—',
    },
  },
  {
    id: 'profesional',
    name: 'Profesional',
    fullName: 'Plan Profesional',
    price: 299,
    pricePrefix: '',
    priceNote: 'Pago único',
    tagline: 'Para negocios que necesitan una presencia digital más completa.',
    description:
      'Un sitio de varias secciones para presentar el negocio, sus servicios y su ubicación.',
    icon: 'building',
    features: [
      'Hasta 5 páginas o secciones principales: Inicio, Nosotros, Servicios, Galería y Contacto.',
      'Diseño personalizado.',
      'WhatsApp, Google Maps y enlaces a redes sociales.',
      'Formulario de contacto y SEO local básico.',
      'Dos rondas de ajustes.',
    ],
    notIncluded: [
      'Dominio, alojamiento y servicios externos se cotizan aparte.',
      'No incluye catálogo de productos, carrito ni pagos en línea.',
    ],
    comparison: {
      pages: 'Hasta 5',
      products: '—',
      commerce: 'No',
      orders: 'No',
      whatsapp: 'Sí',
      form: 'Sí',
      seo: 'Local básico',
      maps: 'Sí',
      adjustments: '2 rondas',
      training: '—',
    },
  },
  {
    id: 'catalogo-digital',
    name: 'Catálogo Digital',
    fullName: 'Plan Catálogo Digital',
    price: 399,
    pricePrefix: '',
    priceNote: 'Pago único',
    tagline: 'Para negocios que quieren mostrar y consultar productos.',
    description:
      'Todo lo del plan Profesional, más un catálogo visual con consultas por WhatsApp.',
    icon: 'cart',
    recommended: true,
    badge: 'Más recomendado',
    features: [
      'Todo lo incluido en el Plan Profesional.',
      'Catálogo de hasta 30 productos.',
      'Fotografías, descripciones, precios y categorías.',
      'Fichas individuales de producto.',
      'Botón de consulta por WhatsApp en cada producto.',
      'Diseño personalizado y dos rondas de ajustes.',
    ],
    notIncluded: [
      'No incluye carrito de compras, inventario automatizado ni pagos en línea.',
      'Dominio, alojamiento y servicios externos se cotizan aparte.',
    ],
    comparison: {
      pages: 'Hasta 5 + catálogo',
      products: 'Hasta 30',
      commerce: 'No',
      orders: 'No',
      whatsapp: 'Sí, por producto',
      form: 'Sí',
      seo: 'Local básico',
      maps: 'Sí',
      adjustments: '2 rondas',
      training: '—',
    },
  },
  {
    id: 'tienda-online',
    name: 'Tienda Online',
    fullName: 'Plan Tienda Online',
    price: 699,
    pricePrefix: 'Desde',
    priceNote: 'Pago único',
    tagline: 'Para vender productos con carrito y gestión de pedidos.',
    description:
      'Una tienda con catálogo, carrito, panel administrativo y pasarela de pago compatible.',
    icon: 'cart',
    features: [
      'Diseño personalizado.',
      'Catálogo inicial de hasta 50 productos.',
      'Carrito de compras y gestión de pedidos.',
      'Panel administrativo.',
      'Integración de pasarela de pago compatible.',
      'Configuración de métodos de entrega.',
      'Capacitación para administrar la tienda.',
      'Soporte de lanzamiento.',
    ],
    notIncluded: [
      'Comisiones de pasarelas de pago, servicios externos y funcionalidades adicionales se cotizan aparte.',
      'Dominio y alojamiento se cotizan aparte.',
    ],
    comparison: {
      pages: 'Tienda online',
      products: 'Hasta 50',
      commerce: 'Carrito + pasarela',
      orders: 'Sí',
      whatsapp: 'No indicado',
      form: 'No indicado',
      seo: 'No indicado',
      maps: 'No indicado',
      adjustments: 'Por confirmar',
      training: 'Sí',
    },
  },
  {
    id: 'personalizado',
    name: 'Desarrollo personalizado',
    fullName: 'Desarrollo personalizado',
    price: 900,
    pricePrefix: 'Desde',
    priceNote: 'Según evaluación técnica',
    tagline: 'Para proyectos que requieren funcionalidades especiales.',
    description:
      'Cotizamos una solución a la medida después de revisar el alcance del proyecto.',
    icon: 'sparkles',
    isCustom: true,
    features: [
      'Sistemas de gestión.',
      'Reservas y citas.',
      'Integraciones con APIs.',
      'Paneles administrativos.',
      'Automatizaciones.',
      'Funciones específicas para cada negocio.',
    ],
    notIncluded: [
      'El precio definitivo depende de la evaluación técnica del proyecto.',
      'Dominio, alojamiento y servicios externos se cotizan aparte.',
    ],
  },
];

export const comparisonRows = [
  { key: 'pages', label: 'Páginas o estructura' },
  { key: 'products', label: 'Productos en catálogo' },
  { key: 'commerce', label: 'Carrito y pagos en línea' },
  { key: 'orders', label: 'Pedidos y panel administrativo' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'form', label: 'Formulario de contacto' },
  { key: 'seo', label: 'SEO' },
  { key: 'maps', label: 'Google Maps' },
  { key: 'adjustments', label: 'Rondas de ajustes' },
  { key: 'training', label: 'Capacitación y soporte' },
];

export const maintenancePlans = [
  {
    id: 'mantenimiento-basico',
    name: 'Básico',
    fullName: 'Mantenimiento Básico',
    price: 15,
    tagline: 'Supervisión básica para mantener el sitio al día.',
    features: [
      'Supervisión básica del sitio.',
      'Hasta 30 minutos de cambios menores al mes.',
      'Revisión básica de funcionamiento.',
    ],
  },
  {
    id: 'mantenimiento-profesional',
    name: 'Profesional',
    fullName: 'Mantenimiento Profesional',
    price: 25,
    tagline: 'Más acompañamiento para negocios que actualizan contenido.',
    features: [
      'Todo lo del plan Básico.',
      'Hasta 1 hora de cambios de contenido al mes.',
      'Revisión técnica periódica.',
      'Atención prioritaria.',
    ],
  },
  {
    id: 'mantenimiento-premium',
    name: 'Premium',
    fullName: 'Mantenimiento Premium',
    price: 40,
    tagline: 'Atención prioritaria y más tiempo de cambios mensuales.',
    features: [
      'Todo lo del plan Profesional.',
      'Hasta 2 horas de cambios al mes.',
      'Revisión técnica prioritaria.',
      'Respaldo cuando la infraestructura lo permita.',
    ],
  },
];

export const maintenanceNote =
  'El mantenimiento es opcional. No incluye cambios ilimitados. Dominio, alojamiento, correo y servicios externos se presupuestan aparte.';

export const addOns = [
  {
    id: 'pagina-adicional',
    name: 'Página adicional',
    price: 35,
    pricePrefix: '',
    icon: 'globe',
  },
  {
    id: 'productos-adicionales',
    name: 'Carga de 10 productos adicionales',
    price: 20,
    pricePrefix: '',
    icon: 'cart',
  },
  {
    id: 'menu-qr',
    name: 'Menú digital con QR',
    price: 35,
    pricePrefix: '',
    icon: 'utensils',
  },
  {
    id: 'whatsapp-adicional',
    name: 'Integración adicional de WhatsApp',
    price: 15,
    pricePrefix: '',
    icon: 'whatsapp',
  },
  {
    id: 'galeria',
    name: 'Galería de fotografías',
    price: 30,
    pricePrefix: '',
    icon: 'palette',
  },
  {
    id: 'formulario-avanzado',
    name: 'Formulario avanzado',
    price: 35,
    pricePrefix: '',
    icon: 'clipboard',
  },
  {
    id: 'chatbot-ia',
    name: 'Chatbot con IA',
    price: 180,
    pricePrefix: 'Desde',
    icon: 'message',
  },
  {
    id: 'reservas',
    name: 'Integración de reservas',
    price: 100,
    pricePrefix: 'Desde',
    icon: 'calendar',
  },
  {
    id: 'segundo-idioma',
    name: 'Segundo idioma',
    price: 80,
    pricePrefix: 'Desde',
    icon: 'globe',
  },
  {
    id: 'rediseno',
    name: 'Rediseño de página existente',
    price: 100,
    pricePrefix: 'Desde',
    icon: 'palette',
  },
];

export const addOnsNote =
  'Los precios de servicios adicionales son orientativos y pueden variar según la complejidad.';

export const pricingFaqs = [
  {
    id: 'pago-unico',
    question: '¿Los precios son de pago único?',
    answer:
      'Sí. Los planes de creación de página web se cobran una vez. El mantenimiento es mensual y opcional.',
  },
  {
    id: 'dominio',
    question: '¿El dominio está incluido?',
    answer:
      'No está incluido en el precio base. Las condiciones del dominio se acuerdan antes de publicar cada proyecto y se detallan en la cotización.',
  },
  {
    id: 'alojamiento',
    question: '¿El alojamiento está incluido?',
    answer:
      'No está incluido en el precio base. Las condiciones del alojamiento se acuerdan antes de publicar y se detallan en la cotización.',
  },
  {
    id: 'modificaciones',
    question: '¿Puedo solicitar modificaciones?',
    answer:
      'Sí. El Plan Esencial incluye una ronda de ajustes; el Profesional y el Catálogo Digital incluyen dos. En Tienda Online, las rondas se confirman en la cotización. Los cambios adicionales se cotizan.',
  },
  {
    id: 'ampliar',
    question: '¿Puedo ampliar mi página posteriormente?',
    answer:
      'Sí. Puedes cotizar una página adicional, más productos, un menú QR, un segundo idioma u otras funcionalidades. Los precios de servicios adicionales son orientativos.',
  },
  {
    id: 'pagos',
    question: '¿Qué formas de pago aceptan?',
    answer:
      'No hay medios de pago publicados en el sitio. Los detalles se confirman directamente por WhatsApp o en la cotización.',
  },
  {
    id: 'mantenimiento',
    question: '¿Cómo funciona el mantenimiento?',
    answer:
      'Es opcional y mensual. El plan Básico incluye 30 minutos de cambios menores; el Profesional, 1 hora; el Premium, 2 horas. No hay cambios ilimitados ni servicios externos incluidos.',
  },
];

export const pricingNotes = [
  'Precios de referencia en dólares estadounidenses (USD).',
  'La cotización final puede variar según el alcance, el contenido y las funcionalidades adicionales.',
  'Dominio, alojamiento, correo, pasarelas de pago, comisiones y servicios externos se cotizan por separado salvo que se indique lo contrario.',
  'El mantenimiento es opcional y se contrata aparte.',
];
