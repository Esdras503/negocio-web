import { CUSTOM_TEMPLATE_KEYS, SECTION_KEYS, TEMPLATE_KEYS } from '../data/businessModel';
import { fontStacks, isHexColor, radiusValues } from './theme';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function pushRequired(errors, value, path, minLength = 1) {
  if (typeof value !== 'string' || value.trim().length < minLength) {
    errors.push(`${path} debe ser un texto de al menos ${minLength} caracteres.`);
    return false;
  }
  return true;
}

function validateImage(image, path, errors, { dimensions = true } = {}) {
  if (!image || typeof image !== 'object') {
    errors.push(`${path} es obligatorio.`);
    return;
  }

  if (pushRequired(errors, image.src, `${path}.src`)) {
    if (!/^(\/|https:\/\/)/.test(image.src)) {
      errors.push(`${path}.src debe ser una ruta local (/...) o una URL HTTPS.`);
    }
  }

  pushRequired(errors, image.alt, `${path}.alt`, 5);

  if (dimensions) {
    if (!Number.isInteger(image.width) || image.width <= 0) {
      errors.push(`${path}.width debe ser un entero positivo.`);
    }
    if (!Number.isInteger(image.height) || image.height <= 0) {
      errors.push(`${path}.height debe ser un entero positivo.`);
    }
  }
}

function validateContactNumbers(contact, errors) {
  const hasWhatsApp = Boolean(contact.whatsapp?.trim());
  const hasPhone = Boolean(contact.phone?.trim());
  const hasEmail = Boolean(contact.email?.trim());

  if (!hasWhatsApp && !hasPhone && !hasEmail) {
    errors.push('contact debe incluir al menos WhatsApp, teléfono o correo electrónico.');
  }

  [['whatsapp', 'WhatsApp'], ['phone', 'teléfono']].forEach(([key, label]) => {
    if (!contact[key]?.trim()) return;
    const digits = contact[key].replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15) {
      errors.push(`contact.${key} debe tener entre 8 y 15 dígitos (${label}).`);
    }
  });

  if (hasEmail && !EMAIL_PATTERN.test(contact.email.trim())) {
    errors.push('contact.email no tiene un formato válido.');
  }
}

/**
 * Validación común de las plantillas con composición propia. Cada una conserva
 * su propio contenido y estructura; aquí solo se comprueba la información
 * mínima que comparten la portada, el contacto y la ficha del catálogo.
 */
function validateCustomDemoData(business) {
  const errors = [];

  if (!SLUG_PATTERN.test(business.id ?? '')) {
    errors.push('id debe ser un identificador en minúsculas separado por guiones.');
  }
  pushRequired(errors, business.name, 'name', 2);
  pushRequired(errors, business.sector, 'sector', 2);
  pushRequired(errors, business.location, 'location', 2);

  if (!TEMPLATE_KEYS.includes(business.template)) {
    errors.push(`template debe ser uno de: ${TEMPLATE_KEYS.join(', ')}.`);
  }

  if (!business.logo?.text?.trim()) {
    errors.push('logo.text es obligatorio para las plantillas personalizadas.');
  }

  const theme = business.theme ?? {};
  ['primary', 'primaryDark', 'accent', 'background', 'surface', 'ink', 'muted'].forEach(
    (key) => {
      if (!isHexColor(theme[key])) {
        errors.push(`theme.${key} debe ser un color hexadecimal de seis dígitos.`);
      }
    },
  );
  if (!fontStacks[theme.headingFont]) {
    errors.push('theme.headingFont debe ser una tipografía configurada.');
  }
  if (!fontStacks[theme.bodyFont]) {
    errors.push('theme.bodyFont debe ser una tipografía configurada.');
  }
  if (!radiusValues[theme.radius]) {
    errors.push('theme.radius debe ser "sharp", "soft" o "round".');
  }

  const hero = business.hero ?? {};
  ['eyebrow', 'title', 'titleAccent', 'description'].forEach((key) =>
    pushRequired(errors, hero[key], `hero.${key}`, 2),
  );
  validateImage(hero.image, 'hero.image', errors);
  pushRequired(errors, hero.primaryCta?.label, 'hero.primaryCta.label', 2);
  pushRequired(errors, hero.secondaryCta?.label, 'hero.secondaryCta.label', 2);

  const contact = business.contact ?? {};
  ['whatsappLabel', 'whatsappMessage', 'address'].forEach((key) =>
    pushRequired(errors, contact[key], `contact.${key}`, 2),
  );
  validateContactNumbers(contact, errors);

  if (!Array.isArray(contact.hours) || contact.hours.length < 1) {
    errors.push('contact.hours debe incluir al menos un horario.');
  } else {
    contact.hours.forEach((entry, index) => {
      pushRequired(errors, entry?.days, `contact.hours[${index}].days`, 2);
      pushRequired(errors, entry?.time, `contact.hours[${index}].time`, 2);
    });
  }

  pushRequired(errors, business.footer?.tagline, 'footer.tagline', 5);

  return { valid: errors.length === 0, errors };
}

/**
 * Validación estructural del contenido de un negocio. No valida que una
 * imagen exista en disco, pero sí que el modelo sea coherente antes de
 * publicar una demo o guardar una propuesta.
 */
export function validateBusinessData(business) {
  if (!business || typeof business !== 'object') {
    return { valid: false, errors: ['La configuración del negocio no es un objeto válido.'] };
  }

  if (CUSTOM_TEMPLATE_KEYS.includes(business.template)) {
    return validateCustomDemoData(business);
  }

  const errors = [];

  if (!SLUG_PATTERN.test(business.id ?? '')) {
    errors.push('id debe ser un identificador en minúsculas separado por guiones.');
  }
  pushRequired(errors, business.name, 'name', 2);
  pushRequired(errors, business.sector, 'sector', 2);
  pushRequired(errors, business.location, 'location', 2);

  if (business.template !== undefined && !TEMPLATE_KEYS.includes(business.template)) {
    errors.push(`template debe ser uno de: ${TEMPLATE_KEYS.join(', ')}.`);
  }

  if (!business.logo || (!business.logo.text?.trim() && !business.logo.image)) {
    errors.push('logo debe incluir un texto o una imagen.');
  }
  if (business.logo?.image) {
    validateImage(
      { alt: business.logo.imageAlt, src: business.logo.image },
      'logo.image',
      errors,
      { dimensions: false },
    );
  }

  const theme = business.theme ?? {};
  ['primary', 'primaryDark', 'accent', 'background', 'surface', 'ink', 'muted'].forEach(
    (key) => {
      if (!isHexColor(theme[key])) {
        errors.push(`theme.${key} debe ser un color hexadecimal de seis dígitos.`);
      }
    },
  );
  if (!fontStacks[theme.headingFont]) {
    errors.push('theme.headingFont debe ser una tipografía configurada.');
  }
  if (!fontStacks[theme.bodyFont]) {
    errors.push('theme.bodyFont debe ser una tipografía configurada.');
  }
  if (!['split', 'overlay'].includes(theme.heroStyle)) {
    errors.push('theme.heroStyle debe ser "split" u "overlay".');
  }
  if (!radiusValues[theme.radius]) {
    errors.push('theme.radius debe ser "sharp", "soft" o "round".');
  }

  const hero = business.hero ?? {};
  ['eyebrow', 'title', 'titleAccent', 'description'].forEach((key) =>
    pushRequired(errors, hero[key], `hero.${key}`, 2),
  );
  validateImage(hero.image, 'hero.image', errors);

  if (!Array.isArray(hero.features) || hero.features.length < 1) {
    errors.push('hero.features debe incluir al menos una característica.');
  } else {
    hero.features.forEach((feature, index) =>
      pushRequired(errors, feature, `hero.features[${index}]`, 2),
    );
  }
  pushRequired(errors, hero.primaryCta?.label, 'hero.primaryCta.label', 2);
  pushRequired(errors, hero.secondaryCta?.label, 'hero.secondaryCta.label', 2);

  const about = business.about ?? {};
  ['eyebrow', 'title'].forEach((key) =>
    pushRequired(errors, about[key], `about.${key}`, 2),
  );
  if (!Array.isArray(about.paragraphs) || about.paragraphs.length < 1) {
    errors.push('about.paragraphs debe incluir al menos un párrafo.');
  } else {
    about.paragraphs.forEach((paragraph, index) =>
      pushRequired(errors, paragraph, `about.paragraphs[${index}]`, 20),
    );
  }
  validateImage(about.image, 'about.image', errors);

  if (about.stats !== undefined) {
    if (!Array.isArray(about.stats)) {
      errors.push('about.stats debe ser una lista.');
    } else {
      about.stats.forEach((stat, index) => {
        pushRequired(errors, stat?.value, `about.stats[${index}].value`, 1);
        pushRequired(errors, stat?.label, `about.stats[${index}].label`, 2);
      });
    }
  }

  const services = business.services ?? {};
  ['eyebrow', 'title', 'description'].forEach((key) =>
    pushRequired(errors, services[key], `services.${key}`, 2),
  );
  if (!Array.isArray(services.items) || services.items.length < 1) {
    errors.push('services.items debe incluir al menos un servicio.');
  } else {
    const ids = new Set();
    services.items.forEach((item, index) => {
      pushRequired(errors, item?.id, `services.items[${index}].id`, 1);
      pushRequired(errors, item?.name, `services.items[${index}].name`, 2);
      pushRequired(errors, item?.description, `services.items[${index}].description`, 10);
      if (item?.id && ids.has(item.id)) {
        errors.push(`services.items[${index}].id está duplicado.`);
      }
      if (item?.id) ids.add(item.id);
    });
  }

  const gallery = business.gallery ?? {};
  ['eyebrow', 'title'].forEach((key) =>
    pushRequired(errors, gallery[key], `gallery.${key}`, 2),
  );
  if (!Array.isArray(gallery.images) || gallery.images.length < 1) {
    errors.push('gallery.images debe incluir al menos una imagen.');
  } else {
    gallery.images.forEach((image, index) =>
      validateImage(image, `gallery.images[${index}]`, errors),
    );
  }

  if (business.cta) {
    ['eyebrow', 'title', 'description', 'buttonLabel'].forEach((key) =>
      pushRequired(errors, business.cta[key], `cta.${key}`, 2),
    );
    validateImage(business.cta.image, 'cta.image', errors);
  }

  const contact = business.contact ?? {};
  ['eyebrow', 'title', 'description', 'whatsappLabel'].forEach((key) =>
    pushRequired(errors, contact[key], `contact.${key}`, 2),
  );
  pushRequired(errors, contact.address, 'contact.address', 5);
  validateContactNumbers(contact, errors);

  if (!Array.isArray(contact.hours) || contact.hours.length < 1) {
    errors.push('contact.hours debe incluir al menos un horario.');
  } else {
    contact.hours.forEach((entry, index) => {
      pushRequired(errors, entry?.days, `contact.hours[${index}].days`, 2);
      pushRequired(errors, entry?.time, `contact.hours[${index}].time`, 2);
    });
  }

  pushRequired(errors, business.footer?.tagline, 'footer.tagline', 5);

  const order = business.sections?.order;
  if (!Array.isArray(order)) {
    errors.push('sections.order debe ser una lista.');
  } else {
    const missing = SECTION_KEYS.filter((section) => !order.includes(section));
    const unknown = order.filter((section) => !SECTION_KEYS.includes(section));
    if (missing.length) errors.push(`sections.order no incluye: ${missing.join(', ')}.`);
    if (unknown.length) errors.push(`sections.order contiene secciones desconocidas: ${unknown.join(', ')}.`);
    if (new Set(order).size !== order.length) errors.push('sections.order tiene secciones duplicadas.');
  }

  const hidden = business.sections?.hidden;
  if (!Array.isArray(hidden)) {
    errors.push('sections.hidden debe ser una lista.');
  } else {
    hidden.forEach((section) => {
      if (!SECTION_KEYS.includes(section)) {
        errors.push(`sections.hidden contiene una sección desconocida: ${section}.`);
      }
    });
    if (SECTION_KEYS.every((section) => hidden.includes(section))) {
      errors.push('No se puede ocultar todas las secciones.');
    }
  }

  SECTION_KEYS.forEach((section) => {
    pushRequired(errors, business.nav?.[section], `nav.${section}`, 2);
  });

  return { valid: errors.length === 0, errors };
}
