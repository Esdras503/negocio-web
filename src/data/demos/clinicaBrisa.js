export const clinicaBrisa = {
  id: 'clinica-brisa',
  template: 'salud',
  name: 'Clínica Brisa',
  sector: 'Salud y bienestar',
  location: 'Santa Ana, El Salvador',
  tagline: 'Un espacio tranquilo para cuidar tu bienestar.',
  logo: { text: 'CB' },
  theme: {
    primary: '#2a8f86',
    primaryDark: '#1d665f',
    accent: '#b99a62',
    background: '#f9fcfb',
    surface: '#ffffff',
    ink: '#17332f',
    muted: '#5d706b',
    headingFont: 'fraunces',
    bodyFont: 'manrope',
    heroStyle: 'split',
    radius: 'round',
  },
  hero: {
    eyebrow: 'Clínica y bienestar · Santa Ana',
    title: 'Cuidarte empieza',
    titleAccent: 'por sentirte escuchado.',
    description:
      'Una clínica de demostración con espacios tranquilos, información clara y una forma sencilla de solicitar tu cita.',
    image: {
      src: '/images/brisa/hero.webp',
      alt: 'Recepción luminosa de una clínica con sillas y escritorio de atención',
      width: 1600,
      height: 1000,
    },
    primaryCta: { label: 'Solicitar una cita' },
    secondaryCta: { label: 'Conocer especialidades' },
    features: [
      'Atención con cita',
      'Espacios tranquilos',
      'Información clara',
    ],
  },
  intro: {
    eyebrow: 'Nuestra forma de atender',
    title: 'La calma también forma parte de la experiencia.',
    text:
      'Desde la primera consulta hasta el seguimiento, buscamos que sepas qué esperar. Esta clínica es una demostración y no brinda atención médica real.',
  },
  specialties: {
    eyebrow: 'Especialidades',
    title: 'Áreas de atención de la clínica.',
    description:
      'Cuatro áreas de demostración con información general. Los servicios reales, profesionales y condiciones se definen con cada negocio.',
    items: [
      {
        id: 'odontologia',
        name: 'Odontología general',
        description:
          'Valoración, limpieza y orientación sobre cuidado dental en un entorno tranquilo.',
        icon: 'sparkles',
        note: 'Contenido demostrativo, sin consejo médico real.',
      },
      {
        id: 'fisioterapia',
        name: 'Fisioterapia',
        description:
          'Espacio para valoración y seguimiento de movilidad con un plan de atención individual.',
        icon: 'heart',
        note: 'Contenido demostrativo, sin consejo médico real.',
      },
      {
        id: 'nutricion',
        name: 'Nutrición',
        description:
          'Acompañamiento para organizar hábitos y conversar sobre alimentación cotidiana.',
        icon: 'leaf',
        note: 'Contenido demostrativo, sin consejo médico real.',
      },
      {
        id: 'bienestar',
        name: 'Bienestar',
        description:
          'Orientación general y seguimiento para quienes buscan un espacio de cuidado integral.',
        icon: 'droplet',
        note: 'Contenido demostrativo, sin consejo médico real.',
      },
    ],
  },
  team: {
    eyebrow: 'Equipo profesional',
    title: 'Personas detrás de la atención.',
    description:
      'Perfiles ficticios creados para mostrar cómo se presentaría un equipo en el sitio. No representan profesionales reales ni acreditaciones.',
    members: [
      {
        name: 'Dra. Inés Marín',
        role: 'Odontología general',
        image: {
          src: '/images/brisa/doc-ines.webp',
          alt: 'Retrato de una profesional de la salud con bata blanca',
          width: 700,
          height: 850,
        },
        note: 'Perfil de demostración',
      },
      {
        name: 'Dr. Daniel Reyes',
        role: 'Fisioterapia',
        image: {
          src: '/images/brisa/doc-daniel.webp',
          alt: 'Retrato de un profesional de la salud con estetoscopio',
          width: 700,
          height: 850,
        },
        note: 'Perfil de demostración',
      },
      {
        name: 'Lucía Campos',
        role: 'Nutrición y bienestar',
        image: {
          src: '/images/brisa/doc-lucia.webp',
          alt: 'Retrato de una profesional de la salud con uniforme turquesa',
          width: 700,
          height: 850,
        },
        note: 'Perfil de demostración',
      },
    ],
  },
  facilities: {
    eyebrow: 'Instalaciones',
    title: 'Un espacio pensado para bajar el ritmo.',
    description:
      'Las imágenes son parte de la demostración visual. La distribución final se adapta a las instalaciones de cada cliente.',
    images: [
      {
        src: '/images/brisa/hero.webp',
        alt: 'Recepción de clínica con iluminación suave y áreas de espera',
        caption: 'Recepción y espera',
        width: 1600,
        height: 1000,
      },
      {
        src: '/images/catalog/salud-bienestar.webp',
        alt: 'Consultorio dental equipado con sillón y luz de trabajo',
        caption: 'Consultorio de demostración',
        width: 1000,
        height: 750,
      },
      {
        src: '/images/brisa/exterior.webp',
        alt: 'Fachada de un edificio de salud con acceso y áreas verdes',
        caption: 'Acceso y ubicación',
        width: 1200,
        height: 800,
      },
    ],
  },
  hours: {
    eyebrow: 'Horarios',
    title: 'Planifica tu visita con tranquilidad.',
    note: 'Horarios de demostración. La disponibilidad real se confirma al solicitar la cita.',
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Antes de solicitar tu cita.',
    items: [
      {
        question: '¿Cómo se solicita una cita?',
        answer:
          'Puedes completar el formulario de demostración o escribir por WhatsApp. En un sitio real, recepción confirmaría disponibilidad y horario.',
      },
      {
        question: '¿El formulario envía información médica?',
        answer:
          'No. El formulario es una demostración visual y no recopila historial clínico. No incluyas síntomas, diagnósticos ni información médica sensible.',
      },
      {
        question: '¿Atienden urgencias?',
        answer:
          'La demostración no define servicios de urgencia. Para una necesidad médica real, contacta directamente a un centro de salud autorizado.',
      },
      {
        question: '¿Puedo cambiar la especialidad de mi cita?',
        answer:
          'En un sitio real, la recepción coordinaría el cambio según disponibilidad. Aquí solo se muestra el flujo de solicitud.',
      },
    ],
  },
  appointment: {
    eyebrow: 'Solicitar cita',
    title: 'Déjanos los datos de contacto.',
    description:
      'Este formulario es una demostración y no envía información a un servidor. No incluyas síntomas, diagnósticos ni datos médicos sensibles.',
    successTitle: 'Solicitud de demostración registrada.',
    successMessage:
      'En un sitio real, recepción revisaría la disponibilidad y se comunicaría por teléfono o WhatsApp.',
    areas: [
      { value: '', label: 'Selecciona un área' },
      { value: 'odontologia', label: 'Odontología general' },
      { value: 'fisioterapia', label: 'Fisioterapia' },
      { value: 'nutricion', label: 'Nutrición' },
      { value: 'bienestar', label: 'Bienestar' },
    ],
  },
  cta: {
    eyebrow: 'Clínica Brisa',
    title: 'Un primer paso puede ser una conversación.',
    description:
      'Solicita una cita de demostración o escríbenos para conocer más sobre esta propuesta de sitio.',
    buttonLabel: 'Solicitar una cita',
  },
  contact: {
    whatsappLabel: 'Escribir a recepción',
    whatsappMessage:
      'Hola, vi el sitio de Clínica Brisa y quiero solicitar información sobre una cita.',
    phone: '+503 7000 0000',
    whatsapp: '+503 7000 0000',
    address: 'Calle de Demostración 15, Santa Ana, El Salvador',
    addressNote: 'Dirección ficticia para esta demostración.',
    mapQuery: 'Santa Ana, El Salvador',
    hours: [
      { days: 'Lunes a viernes', time: '8:00 a. m. – 6:00 p. m.' },
      { days: 'Sábado', time: '8:00 a. m. – 12:00 m.' },
      { days: 'Domingo', time: 'Cerrado' },
    ],
    note: 'Demostración de Nexobyte: clínica, profesionales, dirección y datos de contacto son ficticios.',
  },
  footer: {
    tagline: 'Un espacio tranquilo para cuidar tu bienestar.',
  },
};
