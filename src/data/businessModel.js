/**
 * Modelo base para los negocios que utilizan la plantilla.
 *
 * El contenido y el diseño están separados: los datos de cada negocio viven
 * en src/data/demos y la presentación en src/templates/BusinessTemplate.jsx.
 */

export const SECTION_KEYS = ['about', 'services', 'gallery', 'contact'];

export const SECTION_LABELS = {
  about: 'Nosotros',
  services: 'Servicios',
  gallery: 'Galería',
  contact: 'Contacto',
};

export const defaultSectionOrder = [...SECTION_KEYS];

/**
 * Completa campos opcionales sin imponer contenido genérico al negocio.
 * Los textos, imágenes y precios siempre provienen de cada demo.
 */
export function createBusiness(config) {
  return {
    ...config,
    logo: { image: '', imageAlt: '', ...config.logo },
    nav: { ...SECTION_LABELS, ...config.nav },
    sections: {
      order: defaultSectionOrder,
      hidden: [],
      ...config.sections,
    },
    contact: {
      email: '',
      addressNote: '',
      note: '',
      ...config.contact,
    },
    footer: {
      note: '',
      ...config.footer,
    },
  };
}
