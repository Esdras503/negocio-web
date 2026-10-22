export const estudioAlba = {
  id: 'estudio-alba',
  template: 'arquitectura',
  name: 'Estudio Alba',
  sector: 'Arquitectura y construcción',
  location: 'Santa Ana, El Salvador',
  tagline: 'Arquitectura que escucha el lugar y la forma de habitarlo.',
  logo: { text: 'EA' },
  theme: {
    primary: '#1d1b18',
    primaryDark: '#0f0e0c',
    accent: '#a66a43',
    background: '#f6f3ee',
    surface: '#fffdf9',
    ink: '#1d1b18',
    muted: '#696258',
    headingFont: 'fraunces',
    bodyFont: 'manrope',
    heroStyle: 'overlay',
    radius: 'sharp',
  },
  hero: {
    eyebrow: 'Arquitectura y construcción · Santa Ana',
    title: 'Espacios que se habitan,',
    titleAccent: 'no solo se ven.',
    description:
      'Diseñamos y acompañamos proyectos residenciales y de remodelación con una mirada atenta al lugar, la luz y la vida cotidiana.',
    image: {
      src: '/images/alba/hero.webp',
      alt: 'Edificio contemporáneo de geometría angular y fachada blanca',
      width: 1600,
      height: 1000,
    },
    primaryCta: { label: 'Solicitar una consulta' },
    secondaryCta: { label: 'Ver proyectos' },
    features: [
      'Diseño arquitectónico',
      'Construcción acompañada',
      'Remodelación de interiores',
    ],
  },
  about: {
    eyebrow: 'El estudio',
    title: 'Una forma tranquila de construir.',
    paragraphs: [
      'Estudio Alba trabaja entre la arquitectura y la construcción. Cada proyecto empieza con una conversación sobre cómo se vive el espacio, qué luz entra y qué materiales envejecen bien.',
      'No buscamos un gesto por proyecto. Buscamos una solución que tenga sentido para el terreno, el presupuesto y la rutina de quienes lo van a habitar.',
    ],
    image: {
      src: '/images/catalog/construccion.webp',
      alt: 'Arquitecto dibujando los planos de una construcción sobre una mesa de trabajo',
      width: 1000,
      height: 750,
    },
    note: 'Proyectos y datos del estudio son ficticios y forman parte de esta demostración.',
  },
  services: {
    eyebrow: 'Servicios',
    title: 'Del primer boceto a la obra terminada.',
    description:
      'Podemos acompañar el proyecto completo o sumarnos en una etapa específica. El alcance se define antes de comenzar.',
    items: [
      {
        number: '01',
        title: 'Diseño arquitectónico',
        description:
          'Estudio del terreno, distribución, volumetría, materiales y documentación para construir.',
        items: ['Vivienda nueva', 'Ampliaciones', 'Anteproyecto y planos'],
      },
      {
        number: '02',
        title: 'Construcción',
        description:
          'Coordinación de obra y acompañamiento técnico para que lo diseñado llegue al terreno.',
        items: ['Presupuesto de obra', 'Supervisión', 'Coordinación de especialidades'],
      },
      {
        number: '03',
        title: 'Remodelación',
        description:
          'Intervenciones puntuales o integrales para actualizar la forma en que se usa un espacio.',
        items: ['Interiores', 'Cocinas y baños', 'Cambios de distribución'],
      },
    ],
  },
  projects: {
    eyebrow: 'Proyectos destacados',
    title: 'Tres formas de habitar un espacio.',
    description:
      'Una selección de proyectos de demostración. Cada ficha describe el punto de partida y el enfoque del estudio.',
    items: [
      {
        id: 'casa-bosque',
        title: 'Casa El Bosque',
        type: 'Vivienda unifamiliar',
        location: 'Santa Ana',
        year: '2025',
        area: '240 m²',
        image: {
          src: '/images/alba/casa-bosque.webp',
          alt: 'Casa moderna de una planta con grandes ventanales y jardín',
          width: 1200,
          height: 900,
        },
        summary:
          'Una casa de una planta que abre el interior al jardín y protege la intimidad de la calle.',
        description:
          'El proyecto parte de un terreno profundo y de la necesidad de una familia que quería vivir cerca del jardín. La planta se organiza alrededor de un patio central que lleva luz y ventilación a las áreas comunes.',
        approach:
          'Materiales cálidos, aleros profundos y una transición gradual entre la sala, la terraza y el jardín.',
        details: ['3 habitaciones', 'Patio central', 'Cocina integrada'],
      },
      {
        id: 'patio-norte',
        title: 'Patio Norte',
        type: 'Remodelación',
        location: 'San Salvador',
        year: '2024',
        area: '180 m²',
        image: {
          src: '/images/alba/patio.webp',
          alt: 'Sala y comedor remodelados con vegetación interior y luz natural',
          width: 1200,
          height: 900,
        },
        summary:
          'La remodelación de una vivienda existente que necesitaba más luz y una relación más clara con el exterior.',
        description:
          'Se reordenaron las circulaciones y se abrió la fachada posterior. El nuevo patio se convirtió en el centro de la vida diaria y en el filtro entre la casa y la ciudad.',
        approach:
          'Menos divisiones, materiales continuos y una paleta de tonos claros que amplía la sensación de espacio.',
        details: ['Patio posterior', 'Cocina abierta', 'Iluminación natural'],
      },
      {
        id: 'interior-alba',
        title: 'Interior Alba',
        type: 'Interiorismo',
        location: 'Santa Ana',
        year: '2023',
        area: '120 m²',
        image: {
          src: '/images/alba/interior.webp',
          alt: 'Interior contemporáneo con muebles de madera, planta y ventanales',
          width: 1000,
          height: 1250,
        },
        summary:
          'Un ejercicio de calma material para un apartamento urbano con luz de tarde.',
        description:
          'El proyecto trabaja con pocos materiales y una paleta neutra. Los muebles bajos y las líneas limpias permiten que la luz y las vistas sean las protagonistas.',
        approach:
          'Madera, piedra y textiles naturales en una composición serena, pensada para envejecer bien.',
        details: ['Sala y comedor', 'Iluminación cálida', 'Almacenamiento integrado'],
      },
    ],
  },
  process: {
    eyebrow: 'Proceso de trabajo',
    title: 'Un proyecto se construye conversando.',
    steps: [
      {
        title: 'Escucha y visita',
        description:
          'Conocemos el terreno, el espacio existente y lo que querés cambiar.',
      },
      {
        title: 'Idea y anteproyecto',
        description:
          'Traducimos las necesidades en una propuesta de distribución y atmósfera.',
      },
      {
        title: 'Documentación',
        description:
          'Definimos materiales, detalles y planos para que la obra tenga una guía clara.',
      },
      {
        title: 'Obra y cierre',
        description:
          'Acompañamos la ejecución y revisamos el resultado antes de entregarlo.',
      },
    ],
  },
  approach: {
    eyebrow: 'Enfoque',
    title: 'La arquitectura también es una forma de escuchar.',
    description:
      'Cada decisión responde a algo: la orientación del sol, el viento, la forma en que se cocina, el lugar donde se guardan las cosas. El resultado debe sentirse natural, no forzado.',
    image: {
      src: '/images/alba/detalle.webp',
      alt: 'Fachada de un edificio contemporáneo con ritmo de ventanas y líneas verticales',
      width: 1200,
      height: 900,
    },
    principles: [
      {
        title: 'Luz primero',
        description:
          'La orientación y las aberturas se estudian antes de definir los acabados.',
      },
      {
        title: 'Materiales honestos',
        description:
          'Elegimos materiales que se ven bien y envejecen con dignidad.',
      },
      {
        title: 'Proporción cotidiana',
        description:
          'La escala se mide desde el uso real: circular, guardar, descansar, compartir.',
      },
    ],
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Antes de empezar un proyecto.',
    items: [
      {
        question: '¿Trabajan solo proyectos nuevos?',
        answer:
          'No. También trabajamos remodelaciones, ampliaciones e interiorismo en espacios existentes.',
      },
      {
        question: '¿Puedo contratar solo el diseño?',
        answer:
          'Sí. El alcance puede incluir el diseño y la documentación, o extenderse al acompañamiento de obra.',
      },
      {
        question: '¿Cómo se define el costo?',
        answer:
          'Depende del tipo de proyecto, los metros cuadrados y el nivel de acompañamiento. Se conversa antes de iniciar.',
      },
      {
        question: '¿Qué necesito para la primera consulta?',
        answer:
          'Idealmente, fotos del lugar, medidas aproximadas y una idea de lo que querés lograr. Si no tenés planos, lo revisamos juntos.',
      },
    ],
  },
  consultation: {
    eyebrow: 'Solicitar consulta',
    title: 'Conversemos sobre tu proyecto.',
    description:
      'Completá el formulario de demostración. En un sitio real, el estudio recibiría la solicitud y coordinaría una primera conversación.',
  },
  cta: {
    eyebrow: 'Estudio Alba',
    title: 'Un buen proyecto empieza con una buena conversación.',
    description:
      'Contanos qué espacio querés transformar y en qué etapa estás.',
    buttonLabel: 'Solicitar una consulta',
  },
  contact: {
    whatsappLabel: 'Escribir al estudio',
    whatsappMessage:
      'Hola, vi el sitio de Estudio Alba y quiero conversar sobre un proyecto de arquitectura.',
    phone: '+503 7000 0000',
    whatsapp: '+503 7000 0000',
    address: 'Calle de Demostración 4, Santa Ana, El Salvador',
    addressNote: 'Dirección ficticia para esta demostración.',
    mapQuery: 'Santa Ana, El Salvador',
    hours: [
      { days: 'Lunes a viernes', time: '9:00 a. m. – 5:00 p. m.' },
      { days: 'Sábado', time: 'Con cita previa' },
      { days: 'Domingo', time: 'Cerrado' },
    ],
    note: 'Demostración de Nexobyte: proyectos, nombres, dirección y datos de contacto son ilustrativos.',
  },
  footer: {
    tagline: 'Arquitectura, construcción y una mirada atenta al lugar.',
  },
};
