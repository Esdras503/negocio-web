export const casalista = {
  id: 'casalista',
  template: 'servicios',
  name: 'CasaLista',
  sector: 'Servicios técnicos para el hogar',
  location: 'Santa Ana, El Salvador',
  tagline: 'Electricidad, plomería y climatización con una visita bien coordinada.',
  logo: { text: 'CL' },
  theme: {
    primary: '#123a5c',
    primaryDark: '#0b2841',
    accent: '#0f8f88',
    background: '#f3f8f8',
    surface: '#ffffff',
    ink: '#102431',
    muted: '#536874',
    headingFont: 'manrope',
    bodyFont: 'manrope',
    heroStyle: 'split',
    radius: 'soft',
  },
  hero: {
    eyebrow: 'Servicios técnicos · Santa Ana',
    title: 'Problemas resueltos,',
    titleAccent: 'sin vueltas.',
    description:
      'Electricidad, fontanería, aire acondicionado y reparaciones para hogares y negocios. Contanos qué pasa y coordinamos una visita.',
    image: {
      src: '/images/servicios/hero.webp',
      alt: 'Técnico electricista instalando y revisando un panel eléctrico',
      width: 1600,
      height: 1000,
    },
    primaryCta: { label: 'Cotizar un servicio' },
    secondaryCta: { label: 'Ver servicios' },
    features: [
      'Visita coordinada',
      'Presupuesto antes de empezar',
      'Hogares y negocios',
    ],
  },
  trust: [
    {
      icon: 'calendar',
      title: 'Horario acordado',
      text: 'Coordinamos día y franja para que sepas cuándo esperar la visita.',
    },
    {
      icon: 'clipboard',
      title: 'Alcance claro',
      text: 'Explicamos qué se revisará y qué trabajo se propone antes de comenzar.',
    },
    {
      icon: 'home',
      title: 'Espacio cuidado',
      text: 'Trabajamos en casas, oficinas y locales con orden y comunicación directa.',
    },
  ],
  services: {
    eyebrow: 'Servicios',
    title: 'Una sola llamada para resolver lo técnico.',
    description:
      'Atendemos instalaciones y reparaciones del hogar y de pequeños negocios. Si el trabajo requiere otra especialidad, te lo decimos desde el inicio.',
    items: [
      {
        id: 'electricidad',
        name: 'Electricidad',
        description:
          'Revisión de apagones, tomacorrientes, luminarias, tableros y cableado.',
        icon: 'bolt',
        includes: ['Diagnóstico de fallas', 'Cambio de puntos', 'Revisión de tablero'],
      },
      {
        id: 'fontaneria',
        name: 'Fontanería',
        description:
          'Fugas, grifos, tuberías, sanitarios y problemas de presión de agua.',
        icon: 'droplet',
        includes: ['Detección de fugas', 'Cambio de grifos', 'Reparación de tubería'],
      },
      {
        id: 'aire',
        name: 'Aire acondicionado',
        description:
          'Mantenimiento, limpieza y revisión de equipos split para hogares y oficinas.',
        icon: 'wind',
        includes: ['Limpieza de filtros', 'Revisión de drenaje', 'Diagnóstico de equipo'],
      },
      {
        id: 'reparaciones',
        name: 'Reparaciones generales',
        description:
          'Ajustes, instalaciones y trabajos menores que necesitan una mano técnica.',
        icon: 'wrench',
        includes: ['Instalación de accesorios', 'Ajustes de puertas', 'Reparaciones puntuales'],
      },
    ],
  },
  advantages: {
    eyebrow: 'Ventajas del servicio',
    title: 'La diferencia está en cómo se comunica el trabajo.',
    description:
      'No se trata solo de reparar. También importa que entiendas qué se hará, cuánto tomará y cómo quedará el espacio.',
    image: {
      src: '/images/servicios/plomeria.webp',
      alt: 'Detalle de un grifo y una instalación de fontanería en buen estado',
      width: 1000,
      height: 750,
    },
    items: [
      {
        title: 'Explicación antes de la reparación',
        description:
          'Te contamos qué encontramos y las opciones disponibles, sin tecnicismos innecesarios.',
      },
      {
        title: 'Presupuesto por escrito',
        description:
          'El alcance y el costo se conversan antes de ejecutar el trabajo.',
      },
      {
        title: 'Seguimiento cercano',
        description:
          'Podés consultar por el avance y pedir aclaraciones durante el servicio.',
      },
      {
        title: 'Atención para varios espacios',
        description:
          'Trabajamos en viviendas, oficinas y locales comerciales de tamaño pequeño o mediano.',
      },
    ],
  },
  process: {
    eyebrow: 'Proceso de trabajo',
    title: 'De la consulta a la solución, con orden.',
    steps: [
      {
        title: 'Recibimos tu solicitud',
        description:
          'Nos contás el problema, el tipo de espacio y la zona donde estás.',
      },
      {
        title: 'Coordinamos la visita',
        description:
          'Acordamos una fecha y franja horaria para revisar el trabajo.',
      },
      {
        title: 'Diagnóstico y propuesta',
        description:
          'Revisamos, explicamos el alcance y compartimos el presupuesto.',
      },
      {
        title: 'Ejecutamos y revisamos',
        description:
          'Hacemos el trabajo acordado y verificamos el resultado contigo.',
      },
    ],
  },
  clients: {
    eyebrow: 'A quién atendemos',
    title: 'Espacios distintos, la misma claridad.',
    items: [
      {
        icon: 'home',
        title: 'Hogares',
        text: 'Casas y apartamentos que necesitan mantenimiento o una reparación puntual.',
      },
      {
        icon: 'building',
        title: 'Oficinas',
        text: 'Espacios de trabajo que necesitan resolver electricidad, clima o instalaciones.',
      },
      {
        icon: 'utensils',
        title: 'Negocios pequeños',
        text: 'Locales que dependen de sus instalaciones para atender todos los días.',
      },
    ],
  },
  quote: {
    eyebrow: 'Solicitar cotización',
    title: 'Contanos qué necesitás resolver.',
    description:
      'Completá el formulario de demostración y revisa la confirmación. En un sitio real, el equipo daría seguimiento por teléfono o WhatsApp.',
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que conviene saber antes de la visita.',
    items: [
      {
        question: '¿Cómo se define el precio de un trabajo?',
        answer:
          'Primero se revisa el problema y el alcance. Después se comparte una propuesta con el trabajo y el costo antes de comenzar.',
      },
      {
        question: '¿Atienden casas y negocios?',
        answer:
          'Sí. La demostración contempla hogares, oficinas y locales pequeños. El alcance depende del tipo de instalación y del trabajo solicitado.',
      },
      {
        question: '¿Puedo pedir solo una revisión?',
        answer:
          'Sí. Podés solicitar una visita de diagnóstico para conocer el estado de una instalación antes de decidir una reparación.',
      },
      {
        question: '¿Qué pasa si el trabajo necesita otra especialidad?',
        answer:
          'Se explica desde el inicio. Si el servicio no corresponde a esta demostración, se indica qué tipo de profesional hace falta.',
      },
    ],
  },
  coverage: {
    eyebrow: 'Zona de cobertura',
    title: 'Coordinamos visitas en Santa Ana y alrededores.',
    description:
      'La zona exacta se confirma al recibir la solicitud. Esta lista es ilustrativa y forma parte de la demostración.',
    zones: [
      'Santa Ana centro',
      'Zona residencial norte',
      'Zona sur y accesos',
      'Municipios cercanos',
    ],
    note: 'Cobertura de demostración. La disponibilidad real se define con cada negocio.',
  },
  cta: {
    eyebrow: 'Hablemos',
    title: 'Una visita bien coordinada empieza con un mensaje.',
    description:
      'Escribinos con el servicio que necesitás, tu zona y el mejor horario para contactarte.',
    buttonLabel: 'Consultar por WhatsApp',
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Conversemos sobre lo que necesitas resolver.',
    description:
      'Escríbenos con el servicio, tu zona y el mejor horario para contactarte. La conversación puede continuar por WhatsApp o por teléfono.',
    whatsappLabel: 'Escribir por WhatsApp',
    whatsappMessage:
      'Hola, vi el sitio de CasaLista y quiero cotizar un servicio técnico.',
    phone: '+503 7000 0000',
    whatsapp: '+503 7000 0000',
    address: 'Calle de Demostración 8, Santa Ana, El Salvador',
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
    tagline: 'Servicios técnicos con alcance claro y comunicación directa.',
  },
};
