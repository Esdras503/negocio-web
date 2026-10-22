export const torqueNorte = {
  id: 'torque-norte',
  template: 'automotriz',
  name: 'Torque Norte',
  sector: 'Taller automotriz',
  location: 'Santa Ana, El Salvador',
  tagline: 'Mecánica general con diagnóstico claro.',
  logo: { text: 'TN' },
  theme: {
    primary: '#181a1c',
    primaryDark: '#0b0c0d',
    accent: '#ef6a23',
    background: '#f2f1ed',
    surface: '#ffffff',
    ink: '#17191b',
    muted: '#5d6267',
    headingFont: 'bebas',
    bodyFont: 'manrope',
    heroStyle: 'overlay',
    radius: 'sharp',
  },
  hero: {
    eyebrow: 'Taller automotriz · Santa Ana',
    title: 'Tu vehículo',
    titleAccent: 'en buenas manos.',
    description:
      'Mecánica general, mantenimiento y diagnóstico para que sepas qué tiene tu carro y qué necesita antes de repararlo.',
    image: {
      src: '/images/torque/hero.webp',
      alt: 'Mecánico trabajando en el motor de un vehículo dentro del taller',
      width: 1600,
      height: 1000,
    },
    primaryCta: { label: 'Solicitar diagnóstico' },
    secondaryCta: { label: 'Ver servicios' },
    features: [
      'Diagnóstico explicado',
      'Presupuesto antes de reparar',
      'Atención con cita',
    ],
  },
  intro: {
    eyebrow: 'Así trabajamos',
    title: 'Primero entendemos qué pasa. Después abrimos el taller.',
    text:
      'Recibimos tu vehículo, revisamos el síntoma y te explicamos las opciones con claridad. No empezamos una reparación sin tu aprobación.',
  },
  services: {
    eyebrow: 'Servicios',
    title: 'Lo que tu carro necesita, en un solo lugar.',
    description:
      'Atendemos mantenimiento y reparaciones de vehículos livianos. Cada servicio empieza con una revisión y una explicación del trabajo.',
    items: [
      {
        id: 'mecanica',
        name: 'Mecánica general',
        description:
          'Revisión y reparación de motor, transmisión, suspensión y dirección.',
        icon: 'wrench',
      },
      {
        id: 'frenos',
        name: 'Frenos y seguridad',
        description:
          'Inspección de pastillas, discos, líquido de frenos y componentes de seguridad.',
        icon: 'gauge',
      },
      {
        id: 'mantenimiento',
        name: 'Mantenimiento preventivo',
        description:
          'Cambio de aceite, filtros, bujías y revisión por kilometraje.',
        icon: 'clipboard',
      },
      {
        id: 'diagnostico',
        name: 'Diagnóstico automotriz',
        description:
          'Lectura de códigos, pruebas y revisión visual para encontrar el origen del problema.',
        icon: 'search',
      },
      {
        id: 'motor',
        name: 'Reparación de motor',
        description:
          'Trabajos de mayor alcance con diagnóstico previo y presupuesto detallado.',
        icon: 'car',
      },
    ],
  },
  specialties: {
    eyebrow: 'Especialidades',
    title: 'Un taller para tu rutina y para los días largos.',
    description:
      'Cada vehículo llega con una historia distinta. La revisión se adapta al uso, al kilometraje y al síntoma que reportás.',
    image: {
      src: '/images/torque/workshop.webp',
      alt: 'Mecánico revisando el motor de un vehículo en un taller profesional',
      width: 1000,
      height: 750,
    },
    items: [
      {
        title: 'Vehículos de uso diario',
        description:
          'Mantenimiento y reparaciones para carros de trabajo, familia y recorridos urbanos.',
      },
      {
        title: 'Flotas pequeñas',
        description:
          'Coordinación de revisiones para negocios que dependen de sus vehículos.',
      },
      {
        title: 'Revisión antes de viajar',
        description:
          'Inspección de niveles, frenos, llantas y puntos básicos antes de salir de la ciudad.',
      },
      {
        title: 'Repuestos a consulta',
        description:
          'Te explicamos qué opciones hay y cuáles se ajustan al trabajo, sin sorpresas.',
      },
    ],
  },
  gallery: {
    eyebrow: 'Galería de trabajos',
    title: 'Precisión que se nota en el detalle.',
    description:
      'Una muestra del tipo de revisión y acabado que puede tener un taller con presencia digital bien construida.',
    images: [
      {
        src: '/images/torque/detail.webp',
        alt: 'Lavado y detallado de un automóvil deportivo en el taller',
        caption: 'Limpieza y detalle',
        width: 1000,
        height: 750,
      },
      {
        src: '/images/torque/engine.webp',
        alt: 'Componentes internos del motor de un vehículo revisados en el taller',
        caption: 'Revisión de motor',
        width: 1000,
        height: 750,
      },
      {
        src: '/images/torque/wheel.webp',
        alt: 'Automóvil deportivo blanco dentro de un taller con iluminación controlada',
        caption: 'Entrega y prueba',
        width: 1000,
        height: 750,
      },
      {
        src: '/images/torque/workshop.webp',
        alt: 'Mecánico trabajando sobre el compartimiento del motor de un vehículo',
        caption: 'Diagnóstico en bahía',
        width: 1000,
        height: 750,
      },
    ],
  },
  process: {
    eyebrow: 'Proceso de atención',
    title: 'Cuatro pasos, cero adivinanzas.',
    steps: [
      {
        title: 'Contanos el síntoma',
        description:
          'Escuchamos qué hace el vehículo, cuándo empezó y qué necesitás resolver.',
      },
      {
        title: 'Revisamos y diagnosticamos',
        description:
          'Hacemos la inspección y te explicamos qué encontramos, en lenguaje claro.',
      },
      {
        title: 'Aprobás el presupuesto',
        description:
          'Recibís el detalle del trabajo y decidís si seguimos. Sin trabajos sorpresa.',
      },
      {
        title: 'Reparamos y probamos',
        description:
          'Ejecutamos el servicio y hacemos una prueba final antes de entregarte el carro.',
      },
    ],
  },
  cta: {
    eyebrow: 'Agenda tu visita',
    title: '¿Tu carro necesita una revisión?',
    description:
      'Escribinos con el modelo, el año y el síntoma. Coordinamos una cita para revisarlo en el taller.',
    buttonLabel: 'Solicitar diagnóstico',
  },
  contact: {
    whatsappLabel: 'Escribir al taller',
    whatsappMessage:
      'Hola, vi el sitio de Torque Norte y quiero solicitar un diagnóstico para mi vehículo.',
    phone: '+503 7000 0000',
    whatsapp: '+503 7000 0000',
    address: 'Avenida de Demostración 12, Santa Ana, El Salvador',
    addressNote: 'Dirección ficticia para esta demostración.',
    mapQuery: 'Santa Ana, El Salvador',
    hours: [
      { days: 'Lunes a viernes', time: '8:00 a. m. – 5:00 p. m.' },
      { days: 'Sábado', time: '8:00 a. m. – 12:00 m.' },
      { days: 'Domingo', time: 'Cerrado' },
    ],
    note: 'Demostración de Nexobyte: nombre, dirección, horarios y datos de contacto son ilustrativos.',
  },
  footer: {
    tagline: 'Diagnóstico claro, servicio directo y un taller que explica su trabajo.',
  },
};
