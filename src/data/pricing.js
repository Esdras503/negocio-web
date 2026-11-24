/**
 * Fuente única de planes, precios y servicios adicionales de Nexobyte.
 *
 * La usa tanto la interfaz como el prompt del Asistente Nexobyte. Cualquier
 * cambio comercial debe hacerse aquí para evitar cifras o inclusiones
 * distintas entre la página y el chatbot.
 */

export const PRICING_CURRENCY = 'USD';
export const MEMBERSHIP_ACTIVATION_FEE = 10;
export const MEMBERSHIP_TERM_MONTHS = 12;

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

export function formatMembershipMonthlyPrice(plan) {
  if (!plan || !Number.isFinite(plan.monthly?.recurring)) return '';
  return `${formatUsd(plan.monthly.recurring)}/mes`;
}

export function formatMembershipFirstMonth(plan) {
  if (!plan || !Number.isFinite(plan.monthly?.firstMonth)) return '';
  return formatUsd(plan.monthly.firstMonth);
}

export function formatMembershipAnnualPrice(plan) {
  if (!plan || !Number.isFinite(plan.annual?.price)) return '';
  return `${formatUsd(plan.annual.price)}/año`;
}

export function formatMembershipSavings(plan) {
  if (!plan || !Number.isFinite(plan.annual?.savings)) return '';
  return formatUsd(plan.annual.savings);
}

export function formatMembershipPriceSummary(plan, period = 'monthly') {
  if (!plan) return '';

  if (period === 'annual') {
    return `${formatUsd(plan.annual.price)}/año por ${plan.annual.months} meses, sin activación; ahorras ${formatUsd(plan.annual.savings)} frente a ${formatUsd(plan.annual.regularTotal)} en mensualidades normales.`;
  }

  return `${formatUsd(plan.monthly.recurring)}/mes desde el segundo mes; primer mes ${formatUsd(plan.monthly.firstMonth)} (incluye ${formatUsd(plan.monthly.activationFee)} de activación única).`;
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

export function getMembershipById(planId) {
  return membershipPlans.find((plan) => plan.id === planId) ?? null;
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

const membershipPlanDefinitions = [
  {
    id: 'landing',
    name: 'Landing',
    fullName: 'Membresía Landing',
    monthlyRecurring: 25,
    annualPrice: 275,
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
      'El dominio se cobra por separado.',
      'No incluye catálogo de productos ni carrito de compras.',
      'Los servicios externos se cotizan aparte.',
    ],
    infrastructure: 'Infraestructura web administrada por Nexobyte',
    database: 'No',
  },
  {
    id: 'business',
    name: 'Business',
    fullName: 'Membresía Business',
    monthlyRecurring: 39,
    annualPrice: 432,
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
      'El dominio se cobra por separado.',
      'No incluye catálogo de productos, carrito ni pagos en línea.',
      'Los servicios externos se cotizan aparte.',
    ],
    infrastructure: 'Infraestructura web administrada por Nexobyte',
    database: 'No',
  },
  {
    id: 'catalogo',
    name: 'Catálogo',
    fullName: 'Membresía Catálogo',
    monthlyRecurring: 49,
    annualPrice: 540,
    tagline: 'Para negocios que quieren mostrar y consultar productos.',
    description:
      'Un catálogo visual con consultas por WhatsApp, sin carrito ni pagos en línea.',
    icon: 'cart',
    features: [
      'Todo lo incluido en la membresía Business.',
      'Catálogo de hasta 30 productos.',
      'Fotografías, descripciones, precios y categorías.',
      'Fichas individuales de producto.',
      'Botón de consulta por WhatsApp en cada producto.',
      'Diseño personalizado y dos rondas de ajustes.',
    ],
    notIncluded: [
      'No incluye carrito de compras, inventario automatizado ni pagos en línea.',
      'El dominio se cobra por separado.',
      'Los servicios externos se cotizan aparte.',
    ],
    infrastructure: 'Infraestructura web administrada por Nexobyte',
    database: 'No',
  },
  {
    id: 'catalogo-dinamico',
    name: 'Catálogo Dinámico',
    fullName: 'Membresía Catálogo Dinámico',
    monthlyRecurring: 69,
    annualPrice: 756,
    tagline: 'Para catálogos que necesitan actualizarse con frecuencia.',
    description:
      'Un catálogo administrable con base de datos para organizar productos, categorías y contenido.',
    icon: 'sparkles',
    features: [
      'Todo lo incluido en la membresía Catálogo.',
      'Catálogo dinámico con base de datos para organizar productos y categorías.',
      'Actualización de productos, precios y contenido del catálogo.',
      'Fotografías, descripciones y fichas individuales.',
      'Botón de consulta por WhatsApp en cada producto.',
      'Diseño personalizado y dos rondas de ajustes.',
    ],
    notIncluded: [
      'No incluye carrito de compras ni pagos en línea.',
      'El dominio se cobra por separado.',
      'Los servicios externos se cotizan aparte.',
    ],
    infrastructure: 'Infraestructura web administrada por Nexobyte',
    database: 'Sí, para el catálogo administrable',
  },
  {
    id: 'e-commerce',
    name: 'E-Commerce',
    fullName: 'Membresía E-Commerce',
    monthlyRecurring: 99,
    annualPrice: 1080,
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
      'El dominio se cobra por separado.',
      'Comisiones de pasarelas de pago, servicios externos y funcionalidades adicionales se cotizan aparte.',
    ],
    infrastructure: 'Infraestructura web administrada por Nexobyte',
    database: 'Sí, para catálogo y pedidos',
  },
];

export const membershipPlans = membershipPlanDefinitions.map(
  ({ monthlyRecurring, annualPrice, ...plan }) => {
    const regularAnnualTotal = monthlyRecurring * MEMBERSHIP_TERM_MONTHS;

    return {
      ...plan,
      pricingMode: 'membership',
      priceNote: 'Membresía mensual o anual',
      monthly: {
        recurring: monthlyRecurring,
        activationFee: MEMBERSHIP_ACTIVATION_FEE,
        firstMonth: monthlyRecurring + MEMBERSHIP_ACTIVATION_FEE,
      },
      annual: {
        price: annualPrice,
        months: MEMBERSHIP_TERM_MONTHS,
        regularTotal: regularAnnualTotal,
        savings: regularAnnualTotal - annualPrice,
      },
    };
  },
);

export const membershipConditions = [
  'La membresía mensual se paga por adelantado.',
  `La activación de ${formatUsd(MEMBERSHIP_ACTIVATION_FEE)} se cobra una sola vez por cliente.`,
  'La mensualidad normal comienza desde el segundo mes.',
  `La membresía anual se paga por adelantado y cubre ${MEMBERSHIP_TERM_MONTHS} meses de servicio.`,
  'La anualidad no tiene costo de activación.',
  'No hay renovación automática sin autorización expresa.',
  'El dominio se cobra por separado.',
  'Los servicios externos y consumos extraordinarios se cobran aparte.',
  'La cancelación debe seguir el procedimiento establecido en los términos y condiciones.',
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
    question: '¿Los planes son de pago único o membresía?',
    answer:
      'Hay dos modalidades. La compra única se paga una vez por el diseño y desarrollo. Las membresías Nexobyte Web se pagan por mes o por año e incluyen la modalidad contratada según sus condiciones.',
  },
  {
    id: 'membresia-primer-mes',
    question: '¿Cómo funciona el primer mes de una membresía?',
    answer:
      `El primer mes incluye una activación única de ${formatUsd(MEMBERSHIP_ACTIVATION_FEE)}. Por ejemplo, Landing cuesta ${formatUsd(membershipPlans[0].monthly.firstMonth)} el primer mes y ${formatUsd(membershipPlans[0].monthly.recurring)}/mes desde el segundo. La activación no se repite.`,
  },
  {
    id: 'membresia-anual',
    question: '¿Qué incluye la membresía anual?',
    answer:
      `La anualidad se paga por adelantado, cubre ${MEMBERSHIP_TERM_MONTHS} meses y no tiene costo de activación. El precio anual ya incluye el descuento; por ejemplo, Landing cuesta ${formatUsd(membershipPlans[0].annual.price)} al año frente a ${formatUsd(membershipPlans[0].annual.regularTotal)} en mensualidades normales.`,
  },
  {
    id: 'membresia-renovacion',
    question: '¿La membresía se renueva automáticamente?',
    answer:
      'No. No hay renovación automática sin autorización expresa. Cualquier renovación debe ser autorizada por el cliente.',
  },
  {
    id: 'membresia-cancelacion',
    question: '¿Cómo se cancela una membresía?',
    answer:
      'La cancelación debe seguir el procedimiento establecido en los términos y condiciones. No se realiza automáticamente desde el sitio.',
  },
  {
    id: 'membresia-mantenimiento',
    question: '¿La membresía es lo mismo que el mantenimiento?',
    answer:
      'No. La membresía es una modalidad de contratación del sitio, mensual o anual. El mantenimiento es un servicio adicional opcional. Las condiciones aplicables se confirman en la cotización.',
  },
  {
    id: 'base-datos',
    question: '¿Qué planes requieren base de datos?',
    answer:
      'Catálogo Dinámico la requiere para el catálogo administrable. E-Commerce la requiere para catálogo y pedidos. Landing, Business y Catálogo no la requieren para su funcionamiento publicado.',
  },
  {
    id: 'dominio',
    question: '¿El dominio está incluido?',
    answer:
      'El dominio se cobra por separado en ambas modalidades. Sus condiciones se acuerdan antes de publicar y se detallan en la cotización.',
  },
  {
    id: 'alojamiento',
    question: '¿El alojamiento está incluido?',
    answer:
      'En compra única, el alojamiento se cotiza aparte. En las membresías, la infraestructura web administrada por Nexobyte está incluida; el dominio y los servicios externos se cobran por separado.',
  },
  {
    id: 'modificaciones',
    question: '¿Puedo solicitar modificaciones?',
    answer:
      'Sí. El Plan Esencial y la membresía Landing incluyen una ronda de ajustes; Profesional, Catálogo Digital, Business y Catálogo incluyen dos. En Tienda Online y E-Commerce se confirman en la cotización. Los cambios adicionales se cotizan.',
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
      'Es un servicio adicional opcional y mensual. El plan Básico incluye 30 minutos de cambios menores; el Profesional, 1 hora; el Premium, 2 horas. No hay cambios ilimitados ni servicios externos incluidos.',
  },
];

export const pricingNotes = [
  'Precios de referencia en dólares estadounidenses (USD).',
  'La cotización final puede variar según el alcance, el contenido y las funcionalidades adicionales.',
  'En compra única, dominio, alojamiento, correo, pasarelas de pago, comisiones y servicios externos se cotizan por separado.',
  'En membresías, el dominio se cobra por separado; los servicios externos y consumos extraordinarios se cobran aparte.',
  'Las membresías no tienen renovación automática sin autorización expresa.',
  'El mantenimiento es opcional y se contrata aparte.',
];
