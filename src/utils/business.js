import { SECTION_KEYS } from '../data/businessModel';

export const SECTION_ANCHORS = {
  about: 'nosotros',
  services: 'servicios',
  gallery: 'galeria',
  contact: 'contacto',
};

export function getSectionHref(section) {
  return `#${SECTION_ANCHORS[section] ?? 'inicio'}`;
}

export function getVisibleSections(business) {
  const order = business?.sections?.order ?? SECTION_KEYS;
  const hidden = new Set(business?.sections?.hidden ?? []);
  return order.filter((section) => SECTION_KEYS.includes(section) && !hidden.has(section));
}

export function getNavigation(business) {
  return getVisibleSections(business).map((section) => ({
    key: section,
    label: business?.nav?.[section] ?? section,
    href: getSectionHref(section),
  }));
}

export function normalizePhone(value) {
  let digits = String(value ?? '').replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.length === 8) digits = `503${digits}`;
  if (digits.length < 8 || digits.length > 15) return '';
  return digits;
}

export function buildWhatsAppUrl(business, message) {
  const number = normalizePhone(business?.contact?.whatsapp);
  if (!number) return null;

  const text =
    message ||
    business?.contact?.whatsappMessage ||
    `Hola, quiero más información sobre ${business?.name ?? 'el negocio'}.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildPhoneHref(value) {
  const number = normalizePhone(value);
  if (!number) return null;
  return `tel:+${number}`;
}

export function buildMapUrl(query) {
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getPrimaryContact(business) {
  const whatsappUrl = buildWhatsAppUrl(business);
  if (whatsappUrl) {
    return { href: whatsappUrl, icon: 'whatsapp', type: 'whatsapp', external: true };
  }

  const phoneHref = buildPhoneHref(business?.contact?.phone);
  if (phoneHref) {
    return { href: phoneHref, icon: 'phone', type: 'phone', external: false };
  }

  if (business?.contact?.email) {
    return {
      href: `mailto:${business.contact.email}`,
      icon: 'mail',
      type: 'email',
      external: false,
    };
  }

  return { href: '#contacto', icon: 'message', type: 'contact', external: false };
}

export function getHeroSecondaryHref(business) {
  const visible = getVisibleSections(business);
  const target = visible.includes('services')
    ? 'services'
    : visible.includes('about')
      ? 'about'
      : visible.includes('contact')
        ? 'contact'
        : 'services';

  return getSectionHref(target);
}

export function getInitials(name = '') {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !['de', 'del', 'la', 'las', 'el', 'los', 'y'].includes(word.toLowerCase()));

  return (words[0]?.[0] ?? '') + (words[1]?.[0] ?? '');
}

export function getLogoText(business) {
  return business?.logo?.text?.trim() || getInitials(business?.name).toUpperCase();
}
