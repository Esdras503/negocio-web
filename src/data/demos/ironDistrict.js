export const ironDistrict = {
  id: 'iron-district',
  template: 'gimnasio',
  name: 'Iron District Fitness',
  sector: 'Gimnasio y entrenamiento',
  location: 'Santa Ana, El Salvador',
  tagline: 'Entrena con intención. Construye tu mejor versión.',
  logo: { text: 'ID' },
  theme: {
    primary: '#101113',
    primaryDark: '#08090a',
    accent: '#f14b3a',
    background: '#0b0c0e',
    surface: '#15171a',
    ink: '#f4f1ea',
    muted: '#a8a39b',
    headingFont: 'bebas',
    bodyFont: 'manrope',
    heroStyle: 'overlay',
    radius: 'sharp',
  },
  hero: {
    eyebrow: 'Iron District Fitness · Santa Ana',
    title: 'Supera tus límites.',
    titleAccent: 'Construye tu mejor versión.',
    description:
      'Fuerza, cardio y entrenamiento funcional en un espacio pensado para avanzar a tu ritmo. Entrena con acompañamiento, encuentra tu comunidad y construye una versión más fuerte de ti.',
    image: {
      src: '/images/gym/hero.webp',
      alt: 'Atleta entrenando con cuerdas de batalla en una terraza urbana',
      width: 1600,
      height: 1000,
    },
    primaryCta: { label: 'Conoce los planes' },
    secondaryCta: { label: 'Agenda una visita' },
    features: ['Entrenamiento guiado', 'Fuerza y cardio', 'Comunidad'],
    stats: [
      { value: '05', label: 'áreas para entrenar' },
      { value: '03', label: 'perfiles de entrenadores' },
      { value: '07', label: 'días de horario de ejemplo' },
    ],
    ticker: ['Fuerza', 'Disciplina', 'Constancia', 'Comunidad'],
    status: 'Demostración · Datos ficticios',
  },
  about: {
    eyebrow: 'Nosotros',
    title: 'No es solo entrenar. Es entrenar con intención.',
    lead: 'Iron District Fitness es un espacio de entrenamiento donde la fuerza, el movimiento y la constancia se trabajan con intención. Un gimnasio para avanzar paso a paso, sin atajos.',
    paragraphs: [
      'El distrito reúne áreas de musculación, cardio, entrenamiento funcional y clases grupales. La idea es simple: que cada visita tenga un propósito y que el progreso se construya repetición a repetición.',
      'Con el acompañamiento de entrenadores y una comunidad que empuja, el espacio está pensado para distintos niveles y objetivos. Aquí lo importante no es cómo empiezas, sino que sigas avanzando.',
    ],
    image: {
      src: '/images/gym/about.webp',
      alt: 'Persona haciendo dominadas en una barra fija dentro de un gimnasio',
      width: 1000,
      height: 1250,
    },
    imageCaption: 'Técnica, presencia y trabajo constante.',
    points: [
      {
        title: 'Entrenamiento con propósito',
        description:
          'Rutinas de fuerza y acondicionamiento para avanzar con técnica, control y progresión.',
      },
      {
        title: 'Ambiente de comunidad',
        description:
          'Un espacio para entrenar acompañado, compartir el proceso y mantener la constancia.',
      },
      {
        title: 'A tu ritmo',
        description:
          'Planes para distintos objetivos y horarios, con acompañamiento cuando lo necesites.',
      },
    ],
    stats: [
      { value: '01', label: 'objetivo a la vez' },
      { value: '05', label: 'áreas de entrenamiento' },
      { value: '03', label: 'perfiles de entrenadores' },
    ],
  },
  services: {
    eyebrow: 'Servicios',
    title: 'Cinco formas de moverte.',
    description:
      'Un menú de entrenamiento pensado para distintos objetivos. Encuentra la combinación que mejor se adapte a tu ritmo.',
    note: 'Los nombres, horarios y características de los servicios son ficticios y sirven para mostrar la estructura del sitio.',
    items: [
      {
        id: 'musculacion',
        name: 'Musculación',
        icon: 'dumbbell',
        description:
          'Trabajo de fuerza con pesas libres y máquinas, organizado para avanzar con técnica y progresión.',
        tags: ['Fuerza', 'Técnica', 'Progresión'],
      },
      {
        id: 'cardio',
        name: 'Cardio',
        icon: 'activity',
        description:
          'Caminadoras, bicicletas y remo para construir resistencia y complementar el entrenamiento de fuerza.',
        tags: ['Resistencia', 'Ritmo', 'Energía'],
      },
      {
        id: 'funcional',
        name: 'Entrenamiento funcional',
        icon: 'bolt',
        description:
          'Movimientos que combinan fuerza, coordinación y movilidad en una zona abierta para entrenar en circuito.',
        tags: ['Movimiento', 'Circuito', 'Control'],
      },
      {
        id: 'grupal',
        name: 'Clases grupales',
        icon: 'users',
        description:
          'Sesiones de demostración para entrenar en grupo, con rutinas guiadas y un ambiente que suma energía.',
        tags: ['Grupo', 'Rutina guiada', 'Comunidad'],
      },
      {
        id: 'personalizado',
        name: 'Entrenamiento personalizado',
        icon: 'target',
        description:
          'Sesiones uno a uno para trabajar un objetivo concreto con acompañamiento durante la rutina.',
        tags: ['Uno a uno', 'Objetivo', 'Acompañamiento'],
      },
    ],
  },
  plans: {
    eyebrow: 'Planes',
    title: 'Elige tu ritmo.',
    description:
      'Tres formas de entrenar según tu objetivo, tu disponibilidad y el acompañamiento que buscas.',
    note: 'Precios ilustrativos de demostración. No se procesa ningún pago, cobro ni reserva real.',
    items: [
      {
        id: 'basic',
        name: 'Basic',
        price: '$25',
        period: '/ mes',
        summary: 'Para empezar a moverte con acceso a las áreas principales.',
        features: [
          'Acceso a musculación y cardio',
          'Vestidores y área de descanso',
          'Horario de demostración',
          'Orientación inicial de ejemplo',
        ],
        ctaLabel: 'Elegir Basic',
        featured: false,
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '$39',
        period: '/ mes',
        summary: 'Para combinar entrenamiento libre con clases y seguimiento.',
        features: [
          'Todo lo del plan Basic',
          'Clases grupales de ejemplo',
          'Una evaluación mensual de demostración',
          'Acceso en horario ampliado',
        ],
        ctaLabel: 'Elegir Pro',
        featured: true,
        badge: 'Plan destacado',
      },
      {
        id: 'elite',
        name: 'Elite',
        price: '$59',
        period: '/ mes',
        summary: 'Para sumar acompañamiento y sesiones uno a uno.',
        features: [
          'Todo lo del plan Pro',
          'Dos sesiones personalizadas al mes',
          'Seguimiento de rutina de ejemplo',
          'Reserva prioritaria en clases de demostración',
        ],
        ctaLabel: 'Elegir Elite',
        featured: false,
      },
    ],
  },
  trainers: {
    eyebrow: 'Entrenadores',
    title: 'Guías, no solo rutinas.',
    description:
      'Un equipo para acompañarte en fuerza, movimiento y constancia.',
    note: 'Los nombres, especialidades y fotografías son parte de esta demostración. No representan personas ni credenciales reales.',
    items: [
      {
        name: 'Valeria Cruz',
        specialty: 'Fuerza y acondicionamiento',
        bio: 'Acompaña rutinas de fuerza con enfoque en técnica, control y progresión.',
        tags: ['Fuerza', 'Técnica', 'Progresión'],
        image: {
          src: '/images/gym/trainer-valeria.webp',
          alt: 'Entrenadora ficticia sosteniendo una cuerda de batalla en el gimnasio',
          width: 900,
          height: 1200,
        },
      },
      {
        name: 'Marco Rivas',
        specialty: 'Entrenamiento funcional',
        bio: 'Diseña circuitos que mezclan movimiento, energía y trabajo por intervalos.',
        tags: ['Funcional', 'Movilidad', 'Energía'],
        image: {
          src: '/images/gym/trainer-marco.webp',
          alt: 'Entrenador ficticio entrenando con cuerdas de batalla en el gimnasio',
          width: 900,
          height: 1200,
        },
      },
      {
        name: 'Sofía Méndez',
        specialty: 'Cardio y movilidad',
        bio: 'Combina trabajo cardiovascular con movilidad para construir una base sólida.',
        tags: ['Cardio', 'Movilidad', 'Respiración'],
        image: {
          src: '/images/gym/trainer-sofia.webp',
          alt: 'Entrenadora ficticia con una barra sobre los hombros en el gimnasio',
          width: 900,
          height: 1200,
        },
      },
    ],
  },
  gallery: {
    eyebrow: 'Galería',
    title: 'El distrito, por dentro.',
    description:
      'Instalaciones, equipo y movimiento. Explora las imágenes y ábrelas para verlas con más detalle.',
    images: [
      {
        id: 'pesas',
        src: '/images/gym/gallery-weights.webp',
        alt: 'Rack de mancuernas en primer plano dentro de un gimnasio',
        width: 1200,
        height: 900,
        caption: 'Pesas libres',
        meta: 'Sala de fuerza',
      },
      {
        id: 'maquinas',
        src: '/images/gym/gallery-floor.webp',
        alt: 'Área de máquinas y caminadoras en un gimnasio en blanco y negro',
        width: 1200,
        height: 900,
        caption: 'Vista general',
        meta: 'Área de máquinas',
      },
      {
        id: 'barbell',
        src: '/images/gym/gallery-barbell.webp',
        alt: 'Persona preparándose para levantar una barra con discos en el suelo',
        width: 1200,
        height: 900,
        caption: 'Peso muerto',
        meta: 'Entrenamiento de fuerza',
      },
      {
        id: 'funcional',
        src: '/images/gym/gallery-functional.webp',
        alt: 'Personas entrenando en una zona funcional con cuerdas y pasto sintético',
        width: 1200,
        height: 900,
        caption: 'Trabajo funcional',
        meta: 'Zona funcional',
      },
      {
        id: 'clase',
        src: '/images/gym/gallery-class.webp',
        alt: 'Grupo de personas en una clase de movilidad sobre colchonetas',
        width: 1200,
        height: 900,
        caption: 'Clase grupal',
        meta: 'Movilidad y core',
      },
      {
        id: 'sentadilla',
        src: '/images/gym/gallery-squat.webp',
        alt: 'Persona con una barra sobre los hombros preparándose para una sentadilla',
        width: 1200,
        height: 900,
        caption: 'Sentadilla',
        meta: 'Técnica y progresión',
      },
    ],
  },
  cta: {
    eyebrow: 'Empieza hoy',
    title: 'La primera repetición cambia el resto.',
    description:
      'Conoce el espacio, revisa los planes y agenda una visita de demostración. Sin pagos ni reservas reales.',
    buttonLabel: 'Agenda una visita',
    secondaryLabel: 'Escribir por WhatsApp',
    note: 'Sitio de demostración desarrollado por Nexobyte.',
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Ven a conocer el distrito.',
    description:
      'Escríbenos o agenda una visita de demostración. La información de contacto, la dirección y los horarios son ficticios.',
    whatsappLabel: 'Escribir por WhatsApp',
    whatsappMessage:
      'Hola, vi la demostración de Iron District Fitness y quiero información sobre los planes.',
    phone: '+503 7000 0000',
    whatsapp: '+503 7000 0000',
    address: 'Avenida de Demostración 18, Santa Ana, El Salvador',
    addressNote: 'Dirección de ejemplo; no corresponde a un local real.',
    hours: [
      { days: 'Lunes a viernes', time: '5:00 a. m. – 10:00 p. m.' },
      { days: 'Sábado', time: '6:00 a. m. – 8:00 p. m.' },
      { days: 'Domingo', time: '7:00 a. m. – 12:00 m.' },
    ],
    note: 'Los horarios son de ejemplo y pueden cambiar en un proyecto real.',
    form: {
      eyebrow: 'Agenda una visita',
      title: 'Déjanos tus datos.',
      description:
        'Este formulario valida la información en el navegador y muestra una confirmación simulada. No envía datos a ningún servidor.',
      goals: [
        { value: '', label: 'Selecciona tu objetivo' },
        { value: 'fuerza', label: 'Ganar fuerza' },
        { value: 'cardio', label: 'Mejorar cardio y resistencia' },
        { value: 'movilidad', label: 'Trabajar movilidad' },
        { value: 'constancia', label: 'Volver a la constancia' },
        { value: 'orientacion', label: 'Orientación general' },
      ],
      schedules: [
        { value: '', label: 'Selecciona un horario' },
        { value: 'manana', label: 'Mañana (5:00 a. m. – 11:00 a. m.)' },
        { value: 'tarde', label: 'Tarde (12:00 m. – 5:00 p. m.)' },
        { value: 'noche', label: 'Noche (5:00 p. m. – 10:00 p. m.)' },
        { value: 'fin-semana', label: 'Fin de semana' },
      ],
      note: 'Formulario de demostración. No se guarda información ni se envía a terceros.',
      success:
        'Solicitud simulada. No se envió ningún dato a un servidor ni se reservó una visita real.',
      submitLabel: 'Enviar solicitud de demostración',
    },
  },
  footer: {
    tagline: 'Entrena con intención. Construye tu mejor versión.',
    note: 'Demostración desarrollada por Nexobyte. Iron District Fitness es una marca ficticia; precios, horarios, perfiles y datos de contacto son de ejemplo.',
    social: [
      { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/' },
      { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/' },
      { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/' },
    ],
    socialNote: 'Enlaces de demostración a plataformas sociales; no representan perfiles reales.',
  },
};
