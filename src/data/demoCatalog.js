/**
 * Catálogo de categorías de la página principal.
 *
 * `demoId` conecta la categoría con una demostración real de
 * `demoBusinesses`. Si se deja vacío, la tarjeta se muestra como
 * "Próximamente" y no genera ningún enlace.
 *
 * Para publicar una nueva demo:
 * 1. Crear el negocio en `src/data/demos/`.
 * 2. Registrarlo en `src/data/demoBusinesses.js`.
 * 3. Asignar aquí su `demoId`.
 */
export const demoCategories = [
  {
    id: 'restaurantes',
    name: 'Restaurantes y pupuserías',
    description:
      'Una carta clara, pedidos por WhatsApp y una presentación que abre el apetito desde el primer vistazo.',
    examples: [
      'Pupuserías',
      'Comedores',
      'Restaurantes',
      'Pizzerías y comida rápida',
    ],
    demoId: 'el-comal-de-casa',
    imagePosition: 'center 68%',
  },
  {
    id: 'cafeterias',
    name: 'Cafeterías y reposterías',
    description:
      'Bebidas, panes y postres con la calidez de tu local, listos para antojar a quien visita la página.',
    examples: ['Cafeterías', 'Pastelerías', 'Panaderías', 'Tiendas de postres'],
    demoId: 'cafe-nube',
  },
  {
    id: 'belleza',
    name: 'Barberías y belleza',
    description:
      'Servicios, estilo y citas en una página directa que transmite confianza desde el primer clic.',
    examples: [
      'Barberías',
      'Salones de belleza',
      'Servicios de uñas',
      'Maquillaje y cuidado personal',
    ],
    demoId: 'barberia-don-rafael',
  },
  {
    id: 'automotriz',
    name: 'Automotriz',
    description:
      'Servicios, tiempos y confianza técnica para que el cliente sepa dónde dejar su vehículo.',
    examples: [
      'Talleres mecánicos',
      'Autolavados',
      'Detailing automotriz',
      'Venta de repuestos',
    ],
    demoId: 'torque-norte',
    image: {
      src: '/images/catalog/automotriz.webp',
      alt: 'Mecánico dando mantenimiento al motor de un automóvil',
      width: 1000,
      height: 750,
    },
  },
  {
    id: 'servicios-tecnicos',
    name: 'Servicios profesionales y técnicos',
    description:
      'Explica qué haces, en qué zonas atiendes y cómo solicitar una visita sin rodeos.',
    examples: [
      'Electricistas',
      'Fontaneros',
      'Técnicos de aire acondicionado',
      'Construcción y reparaciones',
    ],
    demoId: 'casalista',
    image: {
      src: '/images/catalog/servicios-tecnicos.webp',
      alt: 'Técnico electricista instalando un panel eléctrico',
      width: 1000,
      height: 750,
    },
  },
  {
    id: 'construccion',
    name: 'Construcción y arquitectura',
    description:
      'Proyectos, procesos y acabados con una imagen sólida que respalde el trabajo de tu equipo.',
    examples: [
      'Empresas constructoras',
      'Arquitectos',
      'Remodelaciones',
      'Contratistas y profesionales de obra',
    ],
    demoId: 'estudio-alba',
    image: {
      src: '/images/catalog/construccion.webp',
      alt: 'Arquitecto dibujando los planos de una construcción',
      width: 1000,
      height: 750,
    },
  },
  {
    id: 'bienes-raices',
    name: 'Bienes raíces',
    description:
      'Propiedades, ubicaciones y datos de contacto para facilitar cada consulta.',
    examples: [
      'Agentes inmobiliarios',
      'Inmobiliarias',
      'Alquiler y venta de propiedades',
    ],
    demoId: 'habita',
    image: {
      src: '/images/catalog/bienes-raices.webp',
      alt: 'Casa moderna iluminada al atardecer',
      width: 1000,
      height: 750,
    },
  },
  {
    id: 'salud-bienestar',
    name: 'Salud y bienestar',
    description:
      'Especialidades, horarios y una forma clara de agendar tu visita.',
    examples: [
      'Clínicas dentales',
      'Fisioterapia',
      'Nutrición',
      'Centros de bienestar',
    ],
    demoId: 'clinica-brisa',
    image: {
      src: '/images/catalog/salud-bienestar.webp',
      alt: 'Consultorio dental equipado y listo para atender',
      width: 1000,
      height: 750,
    },
  },
  {
    id: 'tiendas',
    name: 'Tiendas y comercios',
    description:
      'Productos, categorías y canales de pedido en una experiencia de compra simple y directa.',
    examples: [
      'Tiendas de ropa',
      'Accesorios',
      'Regalos',
      'Productos locales',
    ],
    demoId: 'luma',
    image: {
      src: '/images/catalog/tiendas-comercios.webp',
      alt: 'Tienda de ropa con prendas exhibidas y iluminación cálida',
      width: 1000,
      height: 750,
    },
  },
];
